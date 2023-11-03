const router = require("express").Router();
const axios = require("axios");

const tableId = "tbly3GA5n6FGYScXt";

const airtableURL = `https://api.airtable.com/v0/${process.env.BASE_ID}/${tableId}`;

const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
};

router.get("/", async (req, res) => {
    let { offset, filterBy, filterById, studentFullName } = req.query;

    let filterByFormula = "";

    if (filterById) {
        // Filter records by ID
        filterByFormula = `RECORD_ID() = '${filterById}'`;
    } else if (studentFullName) {
        // Filter by student's name
        filterByFormula = `AND(FIND("${studentFullName}", {Full name}))`;
    }

    if (filterBy === "a-z") {
        // filter students by a-z
        filterBy = [{ field: "Full name", direction: "asc" }];
    } else if (filterBy === "z-a") {
        // filter students by z-a
        filterBy = [{ field: "Full name", direction: "desc" }];
    } else if (filterBy === "graduatedDate") {
        // to sort the data to graduated date column type the name of column  graduated date in the field
        filterBy = [{ field: "", direction: "asc" }];
    } else {
        filterBy = "";
    }

    const queryParams = {
        headers,
        params: {
            pageSize: 6,
            maxRecords: 1500,
            offset: offset,
            sort: filterBy,
            filterByFormula,
        },
    };
    // console.log(queryParams.params);

    try {
        const dbResponse = await axios.get(airtableURL, queryParams);
        const { data } = dbResponse;

        // offset for next page
        let allData = { values: [], offset: data.offset };

        // promise to fetch images
        await Promise.all(
            // each record
            data.records.map(async (record) => {
                let avatar_url = "";
                try {
                    // 1) fetch image link
                    const githubResponse = await axios.get(
                        `https://api.github.com/users/${record.fields["GitHub handle"]}`
                    );
                    // set image in variable
                    avatar_url = githubResponse.data.avatar_url;
                } catch (error) {
                    console.error(error.message);
                }

                allData.values.push({
                    id: record.id,
                    createdTime: record.createdTime,
                    fullName: record.fields["Full name"],
                    countryOfBirth: record.fields["Country of Birth"],
                    email: record.fields["Email address"],
                    Languages: record.fields["Language(s)"],
                    gender: record.fields.Gender,
                    gitHub: record.fields["GitHub handle"],
                    imageUrl: avatar_url,
                    group: record.fields.Group,
                    LinkedIn: record.fields.LinkedIn
                        ? record.fields.LinkedIn
                        : "",
                    skills: record.fields.Skills,
                    selectedCourse: record.fields["Selected course"],
                    comment: record.fields.Comment,
                    courseCertificate: record.fields["Course certificate"],
                });
            })
        );
        return res.json(allData);
    } catch (error) {
        console.log(error);
        console.error("Error retrieving students:", error.message);
        return res.status(500).json({
            message: "An error occurred while getting the students.",
        });
    }
});

module.exports = router;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// to fetch next page http://localhost:3001/students?offset=...
// ?offset=itrgOuEr5Q9Dj48dA/rec2EKNbV3JBuDsmV
// ?filterBy= a-z, z-a
// ?studentFullName=...
// ?filterById=...
