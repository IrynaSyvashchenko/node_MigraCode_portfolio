const router = require("express").Router();
const axios = require("axios");

const tableId = "tbly3GA5n6FGYScXt";

const airtableURL = `https://api.airtable.com/v0/${process.env.BASE_ID}/${tableId}`;

const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
};

router.get("/", async (req, res) => {
    let {
        offset,
        filterBy,
        filterById,
        studentFullName,
        limit = 6,
    } = req.query;

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
    // } else if (filterBy === "newToOldGraduationDate") {
    //     // filter students by new to old graduated date
    //     filterBy = [{ field: "Graduation date", direction: "desc" }];
    // } else if (filterBy === "oldToNewGraduationDate") {
    //     // filter students by old to new graduated date
    //     filterBy = [{ field: "Graduation date", direction: "asc" }];
    } else {
        filterBy = "";
    }

    const queryParams = {
        headers,
        params: {
            pageSize: limit,
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
        let allData = { items: [], offset: data.offset };
        // console.log(data);
        // return res.json(data);

        // each record
        data.records.map(async (record) => {
            allData.items.push({
                id: record.id,
                createdTime: record.createdTime,
                fullName: record.fields["Full name"],
                countryOfBirth: record.fields["Country of Birth"],
                email: record.fields["Email address"],
                Languages: record.fields["Language(s)"],
                gender: record.fields.Gender,
                gitHub: record.fields["GitHub handle"],
                imageUrl: ``,
                group: record.fields.Group,
                LinkedIn: record.fields.LinkedIn ? record.fields.LinkedIn : "",
                skills: record.fields["Coding stack"],
                selectedCourse: record.fields["Selected course"],
                currentLocation: record.fields["Current location"],
                comment: record.fields["MC comment"],
                courseCertificate: record.fields["Course certificate"],
                topSkills: record.fields["Top skills"],
                // graduationDate: record.fields["Graduation date"],
            });
        });
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
