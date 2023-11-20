const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, user_type) {
  const payload = {
    userId: user_id,
    userType: user_type,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = {
  jwtGenerator,
};
