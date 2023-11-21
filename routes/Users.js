const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");

router.get("/user", authorization, async (req, res) => {
  try {
    const query = `select * from users where id = $1`;
    const values = [req.userId];
    const results = await pool.query(query, values);

    return res.status(200).json({ message: "ok", data: results2 });
    //   if (results.rows.length > 0) {
    //     return res.status(200).json({ message: "ok", data: results.rows });
    //   }
    return res.status(400).json({ message: "invalid Data" });
  } catch (error) {
    console.error("Error retrieving user:", error.message);
    return res.status(500).json({
      message: "An error occurred while getting the user.",
    });
  }
});

// router.get("/", authorization, async (req, res) => {
//   try {
//     const { userType } = req;
//     if (userType !== "web developer") {
//       return res.status(403);
//     }

//     const query = `select * from users`;
//     const results = await pool.query(query);

//     return res.status(200).json({
//       data: results.rows.map((user) => {
//         return {
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           userType: user.user_type,
//         };
//       }),
//     });
//   } catch (error) {
//     console.error("Error retrieving users", error.message);
//     return res.status(500).json({
//       message: "An error occurred while getting the users list.",
//     });
//   }
// });

// router.post("/signup", async(req, async (req, res) => {
//   const { email, password } = req.body

//   // check if user already exists
//   // if yes, throw error (make sure response is returned with error inside it)

//   // check if password is good enough (longer than 6 characters or equal to 6 characters)
//   // if not, throw error (make sure response is returned with error inside it)

// })

module.exports = router;
