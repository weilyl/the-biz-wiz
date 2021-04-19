function log(req, res, next) {
  console.log("the req url is", req.url);
  next();
}

module.exports = log;
