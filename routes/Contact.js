const router = require("express").Router();
const axios = require("axios");
// var Airtable = require("airtable");

const tableId = "tblJfNpg9qgste0H4";

const airtableURL = `https://api.airtable.com/v0/${process.env.BASE_ID}/${tableId}`;

// var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    // process.env.BASE_ID
// );

const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
};

// router.get("/", async (req, res) => {
//     let {} = req.query;

//     const queryParams = {
//         headers,
//         params: {
//             maxRecords: 1500,
//         },
//     };
//     try {
//         const dbResponse = await axios.get(airtableURL, queryParams);
//         const { data } = dbResponse;
//         return res.status(200).json({
//             data: data,
//         });
//     } catch (error) {
//         console.log(error);
//         console.error("Error retrieving students:", error.message);
//         return res.status(500).json({
//             message: "An error occurred while getting the students.",
//         });
//     }
// });

router.post("/", async (req, res) => {
    let { Recruiter, Message, Student, Name } = req.body;

    const data = { fields: { Recruiter, Message, Student, Name } };
    console.log(data);
    try {
        const dbResponse = await axios.post(
            airtableURL,
            // { Recruiter, Message, Student, Name },
            data,
            { headers }
        );

        // console.log(dbResponse);

        return res.status(201).json({
            message: "Data posted successfully",
            data: dbResponse.data
        });
    } catch (error) {
        console.log(error);
        console.error("Error posting contact data to Airtable:", error.message);
        return res.status(500).json({
            message:
                "An error occurred while posting contact data to Airtable.",
        });
    }
    //    base(tableId).create([data], function (err, records) {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         records.forEach(function (record) {
    //             console.log(record.getId());
    //             return res.status(201).json({
    //                 message: "Data posted successfully",
    //                 record: record.getId(),
    //             });
    //         });
    //     });
});

module.exports = router;
