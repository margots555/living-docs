import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { appendFile } from "fs";

class LogStrategy {
  static none(timestamp, message) {
    console.log(`${timestamp} - ${message}`);
  }

  static noDate(timestamp, message) {
    console.log(message);
  }

  static toFile(timestamp, message) {
    let fileName = path.join(__dirname, "ld-logs.js");
    appendFile(fileName, `${timestamp} - ${message} \n`, (error) => {
      if (error) {
        console.log("Error writing in file");
        console.error(error);
      }
    });
  }

  static toConsole(timestamp, message) {
    console.log(`${timestamp} - ${message}`);
  }
}

export default LogStrategy;
