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
  const post_id = parseInt(req.params["post_id"], 10);
  try {
    let comments = await db.any(
      "SELECT * FROM comments WHERE post_id=$1",
      post_id
    );

    res["post_id"] = post_id;
    return res.status(200).json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get all comments for a business
async function getBusinessComments(req, res) {
  const business_id = parseInt(res["business_id"], 10);
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
  const comment_id = parseInt(req.params["comment_id"], 10);
  try {
    let comment = await db.one(
      "SELECT * FROM comments WHERE id=$1",
      comment_id
    );
    
    res["comment_id"] = comment_id;

    return res.status(200).json(comment);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

//create a comment
async function createComment(req, res) {
  const data = {
    content: req.body.content,
    post_id: req.params.post_id,
    business_id: res.business_id,
  };

  try {
    const comment_id = await db.one(
      "INSERT INTO comments (content,post_id,business_id) VALUES (${content},${post_id},${business_id}) RETURNING id",
      data
    );

    res["comment_id"] = comment_id;
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

//update a comment
async function updateComment(req, res) {
  let comment_id = parseInt(req.params.comment_id, 10);

  try {
    await db.none("UPDATE comments SET content=$1 WHERE id=$2 AND business_id = $3", [
      req.body.content,
      comment_id,
      res["business_id"]
    ]);
    res["comment_id"] = comment_id;
    return res.status(200).json({ message: "updates a comment" });
  
  } catch (err) {
    res.status(500).send({message: err.message});
  }
}
//delete a comment
async function deleteComment(req, res) {
  let comment_id = parseInt(req.params.comment_id, 10);
  let post_id = parseInt(req.params.post_id, 10)

  try {

    const isCommentOwner = await db.one('SELECT EXISTS(SELECT * FROM comments WHERE id = $1 AND business_id = $2)', [comment_id, res["business_id"]]);

    console.log("is user the comment owner? ", isCommentOwner)

    const isPostOwner = await db.one('SELECT EXISTS(SELECT * FROM posts WHERE id = $1 AND business_id = $2)', [post_id, res["business_id"]]);

    console.log("is user the post owner? ", isPostOwner)

    console.log("is user the post owner? ", isPostOwner)

    if (isCommentOwner) {

      console.log("user is comment owner")

      await db.none("DELETE FROM comments WHERE id=$1 AND business_id=$2", [comment_id, res["business_id"]]);

      console.log("comment deleted by comment owner")

      return res.status(200).json({
        message: "comment deleted"
      });

    } else if (isPostOwner) {

      console.log("user is post owner")

      await db.none("DELETE FROM comments WHERE id=$1", comment_id);

      console.log("comment deleted by post owner)")

      return res.status(200).json({
        message: "comment deleted"
      });      

    } else {
      console.log("this comment is not yours to delete")
      return res.status(401).json({
        message: "You do not have permission to delete this comment"
      });

    }
  } catch (err) {

    console.log("you dont effed up")

    res.status(500).send({
      message: err.message
    });
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
