const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, user_type) {
  const payload = {
    userId: user_id,
    userType: user_type,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

function checkJwt(token) {
  try {
    const jwtContent = jwt.verify(token, process.env.jwtSecret);

    return { jwtValid: true, jwtContent };
  } catch (error) {
    console.log("Jwt not valid, error:", error);
    return { jwtValid: false };
  }
}

module.exports = {
  jwtGenerator,
  checkJwt,
};
