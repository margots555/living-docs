import LogStrategy from "./LogStrategy.js";
import path from "path";
// import config from "./ld-config.json" with {type: "json"};
// const config = require("./ld-config.json");
import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./ld-config.json", import.meta.url))
);

class Logger {
  constructor(strategy) {
    this.logs = [];
    this.strategy = LogStrategy[strategy];
  }
  get count() {
    return this.logs.length;
  }
  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ message, timestamp });
    // console.log(`${timestamp} - ${message}`);
    this.strategy(timestamp, message);
  }

  changeStrategy(newStrategy = "toConsole") {
    this.strategy = LogStrategy[newStrategy];
  }
}

// module.exports = new Logger();
export default new Logger(config.logs.strategy);
