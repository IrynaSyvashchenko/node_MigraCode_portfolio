const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    // check if token exist in header request
    if (!jwtToken) {
      return res.status(403).json("There is no token in the request");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    // set userId from payload
    req.userId = payload.userId;
    req.userType = payload.userType;

    next();
  } catch (error) {
    console.error("Error", error.message);
    return res.status(403).json("Not Authorize");
  }
};
