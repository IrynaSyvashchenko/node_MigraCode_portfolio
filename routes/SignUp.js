const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const { jwtGenerator, checkJwt } = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const { name, email, password, type = "migracode student" } = req.body;


        // Check if the request contains all required parameters
        if (!email || !password ) {
            return res.status(400).json({
                message:
                    "The request body is incomplete, please complete the request",
            });
        }

        // check if user exists
        const user = await pool.query(
            "select COUNT(email) from users where email = $1",
            [email]
        );

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
            "insert into users (password, email) values($1, $2) returning id, username, email",
            [encryptedPassword, email]
        );

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
