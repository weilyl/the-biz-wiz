const { Router } = require("express");
const router = new Router();
const {
  getAllBusinesses,
  locateBusiness,
  getBusinessByName,
  getABusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/Business");

const {
  getAComment,
  getAllComments,
  getBusinessComments,
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/Comments");

const {
  getAPost,
  getBusinessPosts,
  getEveryPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/Posts");
// business related routes

// get all businesses
router.get("/all", getAllBusinesses);

// business own profile
router.get("/home/:id", getABusiness);

// search engine for business name, description
router.get("/find/?search=:query", getBusinessByName);

// get all businesses by type
router.get("/category/:type");

// get all businesses by location

// get all businesses by type & location
router.get("/category/:type/distance/?rad=:distance");

// register a new business
router.post("/register", createBusiness);

// business login
router.post("/login");

// business makes a post
router.post("/home/create-post", createPost);

// business comments on a post
router.post("/post/:postId/comment", createComment);

// business updates a post
router.put("/home/posts/:postId", updatePost);

// business updates a comment
router.put("/post/comment/:commentId", updateComment);

// delete a business
router.delete("/home/delete-business/:id", deleteBusiness);

// business deletes a post
router.delete("/post/:postId/remove", deletePost);

// business deletes a comment it made or a comment on a post it made
router.delete("/post/:postId/comment/:commentsId", deleteComment);

module.exports = router;
