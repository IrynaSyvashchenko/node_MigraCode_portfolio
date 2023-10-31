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

module.exports = router;
