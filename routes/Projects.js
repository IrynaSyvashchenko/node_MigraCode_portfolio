const router = require("express").Router();
const pool = require("../database/db");
const moment = require("moment");
const authorization = require("../middleware/authorization");
let totalProjects = 0;
let limit = 6;

router.get("/", async (req, res) => {
    let { nextpage, orderby } = req.query;
    // first fetching should start with 1 or undefined

    // checking if the next page has a length greater than 0 and it's not undefined and is not a valid number
    if (
        nextpage?.length > 0 &&
        nextpage !== undefined &&
        isNaN(parseInt(nextpage))
    ) {
        return res.status(400).json({ error: "Invalid nextpage value" });
    }

    // checking if the next page is undefined or equal to 1
    if (!nextpage || parseInt(nextpage) == 1) {
        try {
            // query to get count of projects
            const responseCountProjects = await pool.query(
                `SELECT COUNT(*) FROM projects`
            );

            // checking if the count in the response bigger than 0
            if (responseCountProjects.rows[0].count > 0) {
                // setting number of projects to totalProjects variable
                totalProjects = responseCountProjects.rows[0].count;
                // I set nextpage = 1 to set undefined to 1
                nextpage = 1;
            } else {
                return res.status(200).json({ items: [] });
            }
        } catch (error) {
            console.log(error);
            console.error("Error retrieving Projects:", error.message);
            return res.status(500).json({
                message: "An error occurred while getting the Projects.",
            });
        }
    }

    // calculate the maximum number of pages
    let maxPages = Math.ceil(totalProjects / limit);

    // converting string to int number
    nextpage = parseInt(nextpage);

    //checking if nextpage is bigger than maxPages or less or equal to 0
    if (nextpage > maxPages || nextpage <= 0) {
        return res
            .status(400)
            .json({ error: `There is no page number ${nextpage}` });
    }

    try {
        // checking if query order equal to a-z or z-a if not it will filter by id from the smallest to the largest
        if (orderby == "a-z") {
            orderby = `"name" ASC`;
        } else if (orderby == "z-a") {
            orderby = `"name" desc`;
        } else if (orderby == "date-a-z") {
            orderby = `date_have_been_done asc`;
        } else if (orderby == "date-z-a") {
            orderby = `date_have_been_done desc`;
        } else {
            orderby = '"id" ASC';
        }

        // calculates the offset for query
        // offset in postgresql indicating where to start
        let offset = limit * nextpage - limit;

        const responseNextPage = await pool.query(
            `SELECT * FROM projects ORDER BY ${orderby} LIMIT $1 OFFSET $2;`,
            [limit, offset]
        );

        // forming date_have_been_done
        responseNextPage.rows = responseNextPage.rows.map((row) => {
            if (row.date_have_been_done) {
                row.date_have_been_done = moment(
                    row.date_have_been_done
                ).format("YYYY-MM-DD");
            }
            return row;
        });

        if (responseNextPage.rows.length > 0) {
            // checking if next page to pass just items without offset
            if (nextpage == maxPages) {
                return res.status(200).json({ items: responseNextPage.rows });
            }

            nextpage += 1;

            return res
                .status(200)
                .json({ items: responseNextPage.rows, nextpage: nextpage });
        }
        return res.status(200).json({ items: [] });
    } catch (error) {
        console.log(error);
        console.error("Error retrieving Projects:", error.message);
        return res.status(500).json({
            message: "An error occurred while getting the Projects.",
        });
    }
});

// router.post("/", authorization, async (req, res) => {
router.post("/", async (req, res) => {
    const newProject = req.body;

    const query = `
  INSERT INTO projects (
    "name", "description", "repository_link", "live_demo_link", "project_image_link",
    "technologies_used", "instructors_names", "team_member_names",
    "team_leader", "fullstack_developers", "frontend_developers", "backend_developers", "designers",
    "trello_link", "product_presentation_link", "date_have_been_done", "migracode_batch"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;

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
            newProject.team_leader,
            newProject.fullstack_developers,
            newProject.frontend_developers,
            newProject.backend_developers,
            newProject.backend_developers,
            newProject.trello_link,
            newProject.product_presentation_link,
            newProject.date_have_been_done,
            newProject.migracode_batch,
        ],
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "An error occurred" });
            } else {
                return res.status(201).json({
                    message: `Project created!}`,
                    newProject: {
                        name: newProject.name,
                        description: newProject.description,
                        repository_link: newProject.repository_link,
                        live_demo_link: newProject.live_demo_link,
                        project_image_link: newProject.project_image_link,
                        technologies_used: newProject.technologies_used,
                        instructors_names: newProject.instructors_names,
                        team_member_names: newProject.team_member_names,
                        team_leader: newProject.team_leader,
                        fullstack_developers: newProject.fullstack_developers,
                        frontend_developers: newProject.frontend_developers,
                        backend_developers: newProject.backend_developers,
                        backend_developers: newProject.backend_developers,
                        trello_link: newProject.trello_link,
                        project_image_link: newProject.project_image_link,
                        date_have_been_done: newProject.date_have_been_done,
                        migracode_batch: newProject.migracode_batch,
                    },
                });
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
            return res.status(400).json({
                error: "The project ID does not exist in the database",
            });
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

// router.patch("/:projectId/:column", authorization, function (req, res) {
//     const projectId = req.params.projectId;
//     const column = req.params.column;
//     const newValue = req.body[column];
//     const queryProject = `SELECT * FROM projects WHERE id = $1`;
//     const updateQuery = `UPDATE projects SET ${column} = $1 WHERE id = $2`;

//     if (!newValue) {
//         return res.status(400).json({ error: `New ${column} is required` });
//     }

//     pool.query(queryProject, [projectId], (error, result) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: "An error occurred" });
//         }

//         if (result && result.rows.length === 0) {
//             return res.status(400).json({
//                 error: "The project ID does not exist in the database",
//             });
//         }

//         pool.query(updateQuery, [newValue, projectId])
//             .then(() =>
//                 res.send(
//                     `Project ${projectId} ${column} updated to ${newValue}`
//                 )
//             )
//             .catch((e) => {
//                 console.error(e);
//                 res.status(500).json({ error: "An error occurred" });
//             });
//     });
// });

module.exports = router;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const router = require("express").Router();
// const pool = require("../database/db");
// const authorization = require("../middleware/authorization");
// let totalRows = -1;
// let limit = 6;

// router.get("/", async (req, res) => {
//   let pageNumber = parseInt(req.query.pageNumber);
//   let offset = (limit * pageNumber) - limit;
//   let maxPage = Math.ceil(totalRows / pageNumber);

//     if (isNaN(pageNumber)) {
//       res.status(400).json({ error: "Invalid pageNumber value" });
//       return;
//     }

//   if (totalRows === -1) {
//     pool.query(`SELECT COUNT(*) FROM projects`, (error, result) => {
//       if (error) {
//         console.log(error);
//         res
//           .status(500)
//           .json({ error: "An error occurred while counting rows" });
//       } else {
//         totalRows = result.rows[0].count;
//         fetchNextPage(pageNumber, maxPage, res, offset);
//       }
//     });
//   } else {
//     fetchNextPage(pageNumber, maxPage, res, offset);
//   }
// });

// function fetchNextPage(pageNumber, maxPage, res, offset) {
//   if (pageNumber < maxPage) {
//     pool.query(
//       `SELECT * FROM projects ORDER BY id LIMIT ${limit} OFFSET ${offset}`,
//       (error, result) => {
//         if (error) {
//           console.log(error);
//           res
//             .status(500)
//             .json({ error: "An error occurred while fetching data" });
//         } else {
//           offset += limit;
//           res.json({ rows: result.rows, totalRows: totalRows });
//         }

//       }
//     );
//   }
// }
