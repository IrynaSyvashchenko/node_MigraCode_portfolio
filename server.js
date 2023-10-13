const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const validator = require("email-validator");
const dotenv = require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ENDPOINT PART (middleware)

app.use((request, response, next) => {
  //
  console.log(`

Incoming request: 
    http method: ${request.method}
    url: ${request.url}
    params: ${JSON.stringify(request.params)}
    query: ${JSON.stringify(request.query)}
    body: ${JSON.stringify(request.body)}
`);
  next();
});

app.get("/", function (request, response) {
  response.send("MigraCode portfolio server.");
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
