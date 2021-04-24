const db = require("../db");

async function matchPostsAndComments(req, res) {
    try{
        // route /find/content/?content=:query
        const query = req.query.content
        console.log(query)

        // union of posts with matching content and posts with matching comments
        const all = await db.any(
            `SELECT * FROM 
            (SELECT * 
            FROM posts AS p1 
            WHERE p1.content LIKE '%${query}%' 
            OR p1.title LIKE '%${query}%' 
            UNION 
            SELECT * FROM posts AS p2
            JOIN comments AS c2 
            ON (p2.id = c2.post_id)
            WHERE p2.content LIKE '%${query}%') 
            ORDER BY created_at DESC`);

        ////// posts that match input
        const matchingPosts = await db.any(`SELECT * FROM posts WHERE content LIKE '%${query}%' OR title LIKE '%${query}%' ORDER BY created_at DESC;`)

        // ////// comments that match input
        // const matchingComments = await db.any("SELECT * FROM comments WHERE content LIKE '%${query}%' ORDER BY created_at DESC", req.params);

        ////// posts with comments that match input // join 
        const postsWithMatchingComments = await db.any(`SELECT * FROM posts AS p JOIN comments as c ON (p.id = c.post_id) WHERE c.content LIKE '%${query}%' ORDER BY p.created_at DESC;`)
        
        // ////// posts with comments that match input // subquery
        // await db.any("SELECT * FROM posts WHERE id=(SELECT post_id FROM comments WHERE content LIKE '%${query}%' ORDER BY created_at DESC)", req.params)

        // concatenate posts that match input
        // with posts with comments that match input
        // do not duplicate

        const combined = matchingPosts.concat(postsWithMatchingComments)
        console.log(combined)

        return res.status(302).json(all);

    } catch(err) {

        return res.status(400).send(err.message);
    }
}

module.exports = matchPostsAndComments;