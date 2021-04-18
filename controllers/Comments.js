const db = require("../db");

//get all comments
async function getAllComments(req, res) {
  try {
    let comments = await db.any("SELECT * FROM comments");
    return res.json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}
//get all comments for a post
async function getPostComments(req, res) {
  const post_id = parseInt(req.params.id, 10);
  try {
    let comments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      post_id
    );
    return res.status(200).json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get all comments for a business
async function getBusinessComments(req, res) {
  const business_id = parseInt(req.params.business_id);
  try {
    let comments = await db.any(
      "SELECT * FROM comments WHERE business_id=$1",
      business_id
    );
    return res.json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get a specific comment
async function getAComment(req, res) {
  const comment_id = parseInt(req.params.id, 10);
  try {
    let comment = await db.one(
      "SELECT * FROM comments WHERE id=$1",
      comment_id
    );
    return res.json(comment);
  } catch (err) {
    res.status(500).send(err);
  }
}

//create a comment
async function createComment(req, res) {
  const data = {
    content: req.body.content,
    post_id: req.params.post_id,
    business_id: req.params.business_id,
  };

  try {
    await db.none(
      "INSERT INTO comments (content,post_id,business_id) VALUES (${content},${post_id},${business_id})",
      data
    );
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
//update a comment
async function updateComment(req, res) {
  let comment_id = parseInt(req.params.commentId, 10);
  try {
    await db.none("UPDATE comments SET content=$1 WHERE id=$2", [
      req.body.content,
      comment_id,
    ]);
    return res.status(200).json({ message: "updates a comment" });
  } catch (err) {
    res.status(500).send(err);
  }
}
//delete a comment
async function deleteComment(req, res) {
  let comment_id = parseInt(req.params.commentId, 10);
  try {
    await db.none("DELETE FROM comments WHERE id=$1", comment_id);
    return res.status(200).json({
      message: "comment deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAComment,
  getAllComments,
  getBusinessComments,
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
};
