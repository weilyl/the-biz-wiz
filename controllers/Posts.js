const { json } = require("express");
const db = require("../db");

//get all posts in database
async function getEveryPost(req, res) {
  try {
    const posts = await db.any("SELECT * FROM posts ORDER BY created_at DESC");
    return res.json(posts);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
}

//get all posts for a business
async function getBusinessPosts(req, res) {
  const business_id = parseInt(req["business_id"], 10);

  try {
    const posts = await db.any(
      "SELECT * FROM posts WHERE business_id=$1",
      business_id
    );
    return res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//get specific post by id
async function getAPost(req, res) {
  const post_id = parseInt(req.params.post_id, 10);
  try {
    const post = await db.one("SELECT * FROM posts WHERE id = $1", post_id);
    res["post_id"] = post_id;
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
//create a post
async function createPost(req, res) {
  const id = parseInt(req.business_id, 10);
  const content = req.body.content;
  const info = {
    title: req.body.title,
    content: content,
    business_id: id,
  };

  try {
    const post = await db.one(
      "INSERT INTO posts (content, business_id, title) VALUES (${content},${business_id}, ${title}) RETURNING *",
      info
    );
    res["post_id"] = post.id;
    return res.status(200).json({ message: "sucessfully created" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//delete a post
async function deletePost(req, res) {
  const post_id = parseInt(req.params.post_id, 10);
  try {

    await db.none("DELETE FROM posts where id = $1 AND business_id = $2", [post_id, req["business_id"]]);

    return res.status(200).json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//update a post
async function updatePost(req, res) {
  const post_id = parseInt(req.params.post_id, 10);

  console.log(`post ID: ${post_id}`)

  try {
    const exists = await db.one('SELECT EXISTS(SELECT * FROM posts WHERE business_id = $1 and id = $2)', [
      req["business_id"], post_id
    ])
    console.log(exists)

    if (exists) {
      await db.one("UPDATE posts SET content = $1 WHERE id = $2 RETURNING id", [
        req.body.content,
        post_id,
      ]);
      
      res[post_id] = post_id

      return res.status(200).json({ message: "updated post" });
    } else {
      return res.status(404).json({
        message: "Permission denied or post not found",
        error: err.message
      })
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

module.exports = {
  getAPost,
  getBusinessPosts,
  getEveryPost,
  createPost,
  updatePost,
  deletePost,
};
