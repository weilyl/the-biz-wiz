const db = require("../db");

async function matchPostsAndComments(req, res) {
    try{
        const matchingPosts = await db.any("SELECT * FROM posts WHERE content LIKE '%${query}%' OR title LIKE '%${query}%' ORDER BY created_at DESC", req.params);

        const matchingComments = await db.any("SELECT * FROM comments WHERE content LIKE '%${query}%' ORDER BY created_at DESC", req.params);

        // join 
        const postsWithMatchingComments = await db.any("SELECT * FROM posts AS p JOIN comments as c ON (p.id = c.post_id) WHERE c.content LIKE '%${query}%' ORDER BY c.created_at DESC", req.params);
        
        //// above but with subquery
        // await db.any("SELECT * FROM posts WHERE id=(SELECT post_id FROM comments WHERE content LIKE '%${query}%' ORDER BY created_at DESC)", req.params)

        // union of posts with matching content and posts with matching comments
        const all = await db.any("SELECT * FROM (SELECT * FROM posts WHERE content LIKE '%${query}%' OR title LIKE '%${query}%' UNION ALL SELECT * FROM posts AS p JOIN comments as c ON (p.id = c.post_id) WHERE c.content LIKE '%${query}%') ORDER BY created_at DESC", req.params);

        return res.status(200).send({
            posts: all,
            comments: matchingComments
        });

    } catch(err) {

        return res.status(400).json(err.message);
    }
}

module.exports = matchPostsAndComments;