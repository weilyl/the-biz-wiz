const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const db = require("../db");
const {authorize} = require("../middleware/business-auth");

const {
  getAllBusinesses,
  locateBusiness,
  getBusinessByName,
  getABusiness,
  createBusiness,
  loginBusiness,
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

router.post("/login", authorize, loginBusiness);

router.get("/logout", async (req, res) => {
  req.session.user = {};
  return res.status(200).json({
    message: "Logged out"
  })
})

// get all businesses
router.get("/all", getAllBusinesses);

// business own profile
router.get("/home/:id", authorize, getABusiness);

// update business profile
router.patch("/home/:id", updateBusiness);

// get one post belonging to a business (& comments on that post
router.get("/post/:postId", getAPost);

// search engine for business name, description
router.get("/find/?search=:query", getBusinessByName);

// get all businesses by type
router.get("/category/:type");

// get all businesses by location

// get all businesses by type & location
router.get("/category/:type/distance/?rad=:distance");

// business makes a post
router.post("/home/create-post", createPost);

// get all posts belonging to a business
router.get("/posts/:businessId/all", getBusinessPosts);

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
