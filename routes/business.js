const express = require("express");
const router = new express.Router();
const session = require("express-session");
const {authorize} = require("../middleware/business-auth");

const {
  getAllBusinesses,
  locateBusiness,
  getBusinessByName,
  businessByType,
  getABusiness,
  getBusinessInfo,
  createBusiness,
  loginBusiness,
  updateBusiness,
  deleteBusiness
} = require("../controllers/Business");

const {
  getAComment,
  getAllComments,
  getBusinessComments,
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
  checkCommentOwner
} = require("../controllers/Comments");

const {
  getAPost,
  getBusinessPosts,
  getEveryPost,
  createPost,
  updatePost,
  deletePost,
  checkPostOwner
} = require("../controllers/Posts");

const matchPostsAndComments = require("../controllers/Searches");

//middleware
router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionName",
  })
);

router.use(express.json());

router.use((req, res, next) => {
  console.log("business router");
  next();
});

// business related routes

// register a new business
router.post("/register", createBusiness);

// business login
router.post("/login", loginBusiness);

router.get("/logout", async (req, res) => {
  req.session.user = {};
  return res.status(200).json({
    message: "Logged out"
  })
})

// get all businesses
router.get("/all", getAllBusinesses);

// business own profile
router.get("/home/profile", authorize, getABusiness);

// get info for a particular business
router.post("/business-info/:business_id?", getBusinessInfo);

// update business profile
router.patch("/home/update", authorize, updateBusiness);

// get one post belonging to a business (& comments on that post
router.get("/posts/post/:post_id", authorize, getAPost);

// search engine for business name, description
router.get("/find/name/:query", getBusinessByName);

// search engine for posts, comments
router.get("/find/content", authorize, matchPostsAndComments);

// get all businesses by type
router.get("/category/:type", businessByType);

// get all businesses by location
router.post("/location-search", locateBusiness);

// get all businesses by type & location
router.get("/category/:type/distance/?rad=:distance");

// business makes a post
router.post("/create-post", authorize, createPost);

// get all posts belonging to a business
router.get("/home/posts/all", authorize, getBusinessPosts);

// get all comments made by a business
router.get("/home/comments/all", authorize, getBusinessComments);

// get all comments on a post
router.get("/posts/post/:post_id/comments/all", authorize, getPostComments);

// business comments on a post
router.post("/posts/post/:post_id/comment/create", authorize, createComment);

// business updates a post
router.patch("/posts/post/:post_id/edit", authorize, updatePost);

// business updates a comment
router.patch("/posts/post/:post_id/comment/:comment_id", authorize, updateComment);

// check if logged in as comment owner
router.get("/comment/author/:comment_id", authorize, checkCommentOwner);

// check if logged in as post owner
router.get("/post/author/:post_id", authorize, checkPostOwner);

// delete a business
router.delete("/home/delete-business", authorize, deleteBusiness);

// business deletes a post
router.delete("/posts/post/:post_id/remove", authorize, deletePost);

// business deletes a comment it made or a comment on a post it made
router.delete("/posts/post/:post_id/comment/:comment_id", authorize, deleteComment);

module.exports = router;
