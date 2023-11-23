const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
// const validator = require("email-validator");
// const fs = require("fs");

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

// routes
// signUp route
app.use("/signup", require("./routes/SignUp"));

// signIn route
app.use("/login", require("./routes/LogIn"));

// students route
app.use("/students", require("./routes/Students"));


// projects route
app.use("/projects", require("./routes/Projects"));

// portfolio route
app.use("/student", require("./routes/Portfolio"));

// contact route
app.use("/contact", require("./routes/Contact"));

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
