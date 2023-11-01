const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");
let offset = 0;
let totalCount = -1;

router.get("/", async (req, res) => {
  if (totalCount === -1) {
    pool.query(`SELECT COUNT(*) FROM projects`, (error, result) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while counting rows" });
      } else {
        totalCount = result.rows;
        fetchNextPage(req, res);
      }
    });
  } else {
    fetchNextPage(req, res);
  }
});

function fetchNextPage(req, res) {
  if (offset >= totalCount) {
    offset = 0;
  }

  pool.query(
    `SELECT * FROM projects ORDER BY id LIMIT 6 OFFSET ${offset}`,
    (error, result) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      } else {
        offset += 6;
        res.json({ rows: result.rows, totalRows: totalCount });
      }
    }
  );
}

router.post("/", async (req, res) => {
  const newProject = req.body;
  const query = `insert into projects (name, description, repository_link, live_demo_link, project_image_link, technologies_used, instructors_names, team_member_names, team_member_roles, trello_link, product_presentation_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
  pool.query(
    query,
    [
      newProject.name,
      newProject.description,
      newProject.repository_link,
      newProject.live_demo_link,
      newProject.project_image_link,
      newProject.technologies_used,
      newProject.instructors_names,
      newProject.team_member_names,
      newProject.team_member_roles,
      newProject.trello_link,
      newProject.product_presentation_link,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.status(200).send(`Project created!`);
      }
    }
  );
});

router.delete("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const queryProject = `SELECT * FROM projects WHERE id = $1`;

  pool.query(queryProject, [projectId], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }

    if (result && result.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "The project ID does not exist in the database" });
    }

    const deleteQuery = `DELETE FROM projects WHERE id = $1`;

    pool.query(deleteQuery, [projectId], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred" });
      }

      res.status(200).send(`Project with ID ${projectId} deleted!`);
    });
  });
});

router.patch("/:projectId/:column", function (req, res) {
  const projectId = req.params.projectId;
  const column = req.params.column;
  const newValue = req.body[column];
  const queryProject = `SELECT * FROM projects WHERE id = $1`;
  const updateQuery = `UPDATE projects SET ${column} = $1 WHERE id = $2`;

  if (!newValue) {
    return res.status(400).json({ error: `New ${column} is required` });
  }

  pool.query(queryProject, [projectId], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }

    if (result && result.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "The project ID does not exist in the database" });
    }

    pool
      .query(updateQuery, [newValue, projectId])
      .then(() =>
        res.send(`Project ${projectId} ${column} updated to ${newValue}`)
      )
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
      });
  });
});

module.exports = router;
