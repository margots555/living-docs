import express from "express";
import agentBuilder from "../Utils/AgentBuilder.js";
import logger from "../Utils/Logger.js";
// var logger = new Logger();
import playwright from "playwright";
// const { chromium } = require("/mnt/c/Playwright/node_modules/playwright");
// const import_playwright = require("@playwright/test");

const app = express();
app.use(express.json());
// c;

//setting up endpoints
app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.post("/exec", (req, res) => {
  const logs = [];
  const command = req.body.command;
  const project = req.body.project;
  const response =
    // "Request: " +
    // "Go First" +
    // " --project " +
    // "hidden gem" +
    // " is being executed...";
    "Request: " + command + " --project " + project + " is being executed...";

  // agent.goTo("https://www.wikipedia.org/");
  // agent.goTo("http://localhost:8080/").run();
  // agent.changeLuncher("remote").;
  // agentBuilder
  //   .changeProfile("local")
  //   .setInitialUrl("http://localhost:8080/")
  //   .build()
  //   .run();
  // agentBuilder
  //   .changeProfile("remote")
  //   .setBrowserUrl("http://localhost:9214")
  //   .setInitialUrl("https://www.wikipedia.org/")
  //   .build()
  //   .run();
  // agentBuilder.changeProfile("command").build().run();

  res.send(
    response
    // "Post request exec..."
  );
  // logger.log("Logging: \n" + logs);
  agentBuilder.changeProfile("docs").build().run();
});

app.listen(8001, () => {
  logger.log("Server is listening on port 8001");
});
