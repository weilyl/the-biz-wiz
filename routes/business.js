const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const db = require("../db");

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

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionName",
  })
);

// business related routes

// router.get("/", (req, res) => {
//   req.session.user = {

//   }
// })

// register a new business
router.post("/register", createBusiness);

// business login
router.post("/login", async (req, res) => {
  const { password } = req.body;

  const { exists } = await db.one(
    "SELECT EXISTS(SELECT * FROM businesses WHERE user_name=${user_name})",
    req.body
  );

  let user;

  if (!exists) {
    return res.status(404).json({
      message: "No user found with that user name",
    });
  } else {
    user = await db.one(
      "SELECT * FROM businesses WHERE user_name=${user_name}",
      req.body
    );
  }

  let match;

  try {
    match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    } else {
      req.session.user = user;

      return res.status(200).json({
        message: "Logged in",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  req.session.user = {};
  return res.status(200).json({
    message: "Logged out",
  });
});

// get all businesses
router.get("/all", getAllBusinesses);

// business own profile
router.get("/home/:id", getABusiness);

// update business profile
router.put("/home/:id", updateBusiness);

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
