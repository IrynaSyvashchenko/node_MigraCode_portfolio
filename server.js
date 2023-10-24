const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const { Octokit } = require("@octokit/core");
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

app.get("/gitusers", async function (request, response) {
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: "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",
  });

  try {
    const results2 = await octokit.request("GET /users/IrynaSyvashchenko", {
      username: "IrynaSyvashchenko",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return response.status(200).json(results2);
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message });
  }
});


// routes
// signUp route
app.use("/singup", require("./routes/SignUp"));

// signIn route
app.use("/login", require("./routes/LogIn"));

// user route
app.use('/users', require("./routes/Users"));

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
