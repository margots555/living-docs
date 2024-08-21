import playwright from "playwright";
import require from "requirejs";
import logger from "./Logger.js";
import path from "path";
import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./ld-config.json", import.meta.url))
);

class CommandStrategy {
  static async local(agent) {
    let options = {
      headless: false,
      // ignoreDefaultArgs: true,
      slowMo: 100,
      // all args added to help run Chromium in headless mode
      // args: [
      //   // "--enable-logging=stderr",
      //   // "--v=1",
      //   // "--user-data-dir=/home/margots/chrome-user",
      //   "--user-data-dir=/mnt/c/User/adm-kapacma",
      //   // "--mote-debugging-pipe",
      //   "--no-first-run",
      //   "--no-default-browser-check",
      // ],
      // userDataDir: "/mnt/c/User/adm-kapacma",
      // executablePath:
      // "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
      // "/usr/bin/google-chrome",
      // video: "true"
    };
    let browser = await playwright.chromium.launch(options);
    logger.log(`browser: ${JSON.stringify(browser)}`);
    let page = await browser.newPage();
    logger.log(`page: ${JSON.stringify(page)}`);
    // return [browser, page];
    if (agent.url) {
      logger.log(`Navigating to ${agent.url}`);
      await page.goto(agent.url);
    }
    setTimeout(async () => {
      console.log("browser opened and delayed for 10 sec...");
      await browser.close();
      logger.log("Test finished and browser closed...");
    }, 10000);
  }

  /**start browser in host
   * .\chrome.exe --remote-debugging-port=9214 --no-first-run --no-default-browser-check --user-data-dir="C:\Users\adm-kapacma\AppData\Local\Google\Chrome\User Data\Default\TestUser"
   * google-chrome --remote-debugging-port=9214 --no-first-run --no-default-browser-check
   */
  static async remote(agent) {
    if (!agent.browserUrl) {
      logger.log(`Error: browser URL missing: `);
      return;
    }
    let browser = await playwright.chromium.connectOverCDP(agent.browserUrl);
    logger.log(`browser: ${JSON.stringify(browser)}`);
    let default_context = browser.contexts()[0];
    logger.log(`context: ${JSON.stringify(default_context)}`);
    let page = default_context.pages()[0];
    logger.log(`page: ${JSON.stringify(page)}`);
    // return [browser, page];
    if (agent.url) {
      logger.log(`Navigating to ${agent.url}`);
      await page.goto(agent.url);
    }
    setTimeout(async () => {
      console.log("browser opened and delayed for 10 sec...");
      await browser.close();
      logger.log("Test finished and browser closed...");
    }, 10000);
  }

  static command(agent) {
    const { spawn } = require("node:child_process");
    const ls = spawn("ls", ["-lh", "/usr"]);

    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  static docs(agent) {
    const shell = require("shelljs");
    shell.exec("npx playwright test --workers=1 --headed --project=profile");
  }
}

export default CommandStrategy;
