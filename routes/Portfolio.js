const router = require("express").Router();

const pool = require("../database/db");


// New endpoint to get projects for a specific student by full name
router.get("/:studentFullName", async (req, res) => {
  let { studentFullName } = req.params;


  try {


    // Fetch projects for the specified student full name
       studentFullName = studentFullName.toLowerCase().replace(/\s+/g, "");

       // Fetch projects for the specified student full name
       const queryText = `
      SELECT * FROM projects
      WHERE REPLACE(LOWER($1), ' ', '') LIKE ANY (
        SELECT REPLACE(LOWER(unnest(team_member_names)), ' ', '')
      )
    `;
       console.log("Query:", queryText);

    const projectsResponse = await pool.query(queryText, [studentFullName]);

    const projects = projectsResponse.rows;
    return res.json({ projects });
  } catch (error) {
    console.error("Error retrieving projects for student:", error.message);
    return res.status(500).json({
      message: "An error occurred while getting the projects for the student.",
    });
  }
});

module.exports = router;
