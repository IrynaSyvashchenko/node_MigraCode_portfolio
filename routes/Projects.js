const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");
let totalRows = -1;
let limit = 6;


router.get("/", async (req, res) => {
  let pageNumber = parseInt(req.query.pageNumber);
  let offset = (limit * pageNumber) - limit;
  let maxPage = Math.ceil(totalRows / pageNumber);

    if (isNaN(pageNumber)) {
      res.status(400).json({ error: "Invalid pageNumber value" });
      return;
    }

  if (totalRows === -1) {
    pool.query(`SELECT COUNT(*) FROM projects`, (error, result) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while counting rows" });
      } else {
        totalRows = result.rows[0].count;
        fetchNextPage(pageNumber, maxPage, res, offset);
      }
    });
  } else {
    fetchNextPage(pageNumber, maxPage, res, offset);
  }
});

function fetchNextPage(pageNumber, maxPage, res, offset) {
  if (pageNumber < maxPage) {
    pool.query(
      `SELECT * FROM projects ORDER BY id LIMIT ${limit} OFFSET ${offset}`,
      (error, result) => {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching data" });
        } else {
          offset += limit;
          res.json({ rows: result.rows, totalRows: totalRows });
        }
      }
    );
  }
}

router.post("/", authorization, async (req, res) => {
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

router.delete("/:projectId", authorization, async (req, res) => {
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

router.patch("/:projectId/:column", authorization, function (req, res) {
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
