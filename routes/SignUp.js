const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the request contains all required parameters
        // if (!name || !email || !password || !userType) {
        if (!name || !email || !password ) {
            return res.status(400).json({
                message:
                    "The request body is incomplete, please complete the request",
            });
        }

        // check if userType === web developer or migracode student
        // if (userType !== "web developer" && userType !== "migracode student") {
        //     return res
        //         .status(400)
        //         .json({ message: "There is an incorrect value" });
        // }

        // check if user exists
        const user = await pool.query(
            "select COUNT(email) from users where email = $1",
            [email]
        );

        if (user.rows[0].count > 0) {
            return res.status(401).json({ message: "Invalid data" });
        }


        // bcrypt the password
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt);

        // enter the new user inside the database
        const newUser = await pool.query(
            "insert into users (username, password, email) values($1, $2, $3) returning id, username, email",
            [name, encryptedPassword, email]
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
