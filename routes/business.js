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

// register a new business
router.post("/register", createBusiness);

// business login
router.post("/login");

// business own profile
router.get("/:id", getABusiness);

// get all businesses
router.get("/all", getAllBusinesses);

// get all businesses by type
router.get("/:type");

// get all businesses by location

// get all businesses by type & location
router.get("/:type/?rad=:distance");

// delete a business
router.delete("/:id/delete", deleteBusiness);

// business makes a post
router.post("/createPost", createPost);

// business comments on a post
router.post("/:postId", createComment);

// get one post belonging to a business (& comments on that post)
router.get("/:postId", getAPost);

// get all posts belonging to a business
router.get("/:businessId", getBusinessPosts);

// business updates a post
router.put("/:postId", updatePost);

// business updates a comment
router.put("/:commentId", updateComment);

// business deletes a post
router.delete("/:postId", deletePost);

// business deletes a comment it made or a comment on a post it made
router.delete("/:postId/:commentsId", deleteComment);

// search engine for business name, description
router.get("/?search=:query", getBusinessByName);


module.exports = router;
