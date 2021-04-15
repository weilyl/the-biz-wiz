const db = require("../db");

//get all posts in database
async function getEveryPost(req, res) {
  try {
    const posts = await db.any("SELECT * FROM posts");
    return res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get all posts for a business
async function getBusinessPosts(req, res) {
  const business_id = parseInt(req.params.business_id, 10);
  try {
    const posts = await db.any(
      "SELECT * FROM posts WHERE business_id=$1",
      business_id
    );
    return res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get specific post by id
async function getAPost(req, res) {
  const post_id = parseInt(req.params.id, 10);
  try {
    const post = await db.one("SELECT * FROM posts WHERE id=$1", post_id);
    return res.json(post);
  } catch (err) {
    res.status(500).send(err);
  }
}
//create a post
async function createPost(req, res) {
  try {
    await db.none(
      "INSERT INTO posts (content, business_id) VALUES (${content},${business_id})",
      req.body
    );
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
//delete a post
async function deletePost(req, res) {
  const post_id = parseInt(req.params.id, 10);
  try {
    await db.none("DELETE FROM posts where id=$1", post_id);
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
//update a post
async function updatePost(req, res) {
  const post_id = parseInt(req.params.id, 10);
  try {
    await db.none("UPDATE posts SET content=$1 WHERE id=$2", [
      req.body.content,
      post_id,
    ]);
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = Posts;
