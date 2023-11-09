const router = require("express").Router();
require("dotenv").config();
const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/", async (req, res) => {
    try {
        const { password, email } = req.body;

        // check if the request contains password and (username or email)
        if (!email || !password) {
            return res.status(400).json({
                message: "The request body is incomplete",
                loggedIn: false,
            });
        }

        // check if the user exist in the database
        const user = await pool.query("select * from users where email = $1", [
            email,
        ]);

        if (user.rows.length === 0) {
            return res
                .status(401)
                .json({
                    message: "Email or password is incorrect!",
                    loggedIn: false,
                });
        }

        // check if th incoming password is correct
        const isValidPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!isValidPassword) {
            return res
                .status(400)
                .json({
                    message: "Email or password is incorrect!",
                    loggedIn: false,
                });
        }

        // give token to the user
        const token = jwtGenerator(user.rows[0].id);
        return res.json({
            message: "User logged in successfully!",
            loggedIn: true,
            user: {
                id: user.rows[0].id,
                userName: user.rows[0].username,
                email: user.rows[0].email,
                userType: user.rows[0].user_type,
            },
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
