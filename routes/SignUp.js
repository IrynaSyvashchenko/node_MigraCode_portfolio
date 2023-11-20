const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const { jwtGenerator, checkJwt } = require("../utils/jwtGenerator");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, type = "migracode student" } = req.body;

    if (!name || !email || !password) {
      // Check if the request contains all required parameters
      // if (!name || !email || !password || !userType) {
      return res.status(400).json({
        message: "The request body is incomplete, please complete the request",
      });
    }

    if (type !== "web developer" && type !== "migracode student") {
      return res.status(400).json({
        message: "Type must be 'web developer' or 'migracode student'",
      });
    }

    // check if user is logged in and is an admin
    const jwt = req.headers.authorization;
    const { jwtValid, jwtContent } = checkJwt(jwt);
    const signupsAreOpen = process.env.ALLOW_SIGNUP_BY_ANYONE !== "true";
    if (!jwtValid && !signupsAreOpen) {
      return res.status(400).json({ message: "jwt not valid" });
    }

    const userType = jwtContent.userType;
    if (userType !== "web developer") {
      return res.status(400).json({ message: "Only admin can create users" });
    }

    // check if user exists
    const user = await pool.query(
      "select COUNT(email) from users where email = $1",
      [email]
    );

    if (parseInt(user.rows[0].count) > 0) {
      console.log(user);
      return res.status(401).json({ message: "Invalid data" });
    }

    // bcrypt the password
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    // enter the new user inside the database
    const newUser = await pool.query(
      "insert into users (username, password, email, user_type) values($1, $2, $3, $4) returning id, username, email",
      [name, encryptedPassword, email, type]
    );
    // const newUser = await pool.query(
    //     "insert into users (username, password, email, user_type) values($1, $2, $3, $4) returning id, username, email, user_type",
    //     [name, encryptedPassword, email, userType]
    // );

    // generate token
    const token = jwtGenerator(newUser.rows[0].id);

    res.status(201).json({
      message: "Successfully created",
      loggedIn: true,
      newUser: newUser.rows[0],
      token,
    });
  } catch (error) {
    console.error("Error :", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
