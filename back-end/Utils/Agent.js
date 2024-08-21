import logger from "./Logger.js";
import Luncher from "./CommandStrategy.js";
// import path from "path";
// // import config from "./ld-config.json" with {type: "json"};
// // const config = require("./ld-config.json");
// import { readFile } from "fs/promises";
// const config = JSON.parse(
//   await readFile(new URL("./ld-config.json", import.meta.url))
// );

class Agent {
  constructor(builder) {
    this.name = builder.name;
    // this.browser = null;
    // this.page = null;
    this.url = builder.initialUrl;
    this.browserUrl = builder.browserUrl;
    // this.options = null;
    this.luncher = Luncher[builder.name];
  }

  // async lunchPW() {
  //   // [this.browser, this.page] = (await this.luncher()) || [];
  //   // this.browser = await Luncher.browser;
  //   // this.page = await Luncher.page;
  // }

  // goTo(url) {
  //   this.url = url;
  //   return this;
  // }

  //   async closePW() {
  //     await browser.close();
  //   }

  async run() {
    this.luncher(this);
    // await this.lunchPW();
    // [this.browser, this.page] = (await this.luncher(this)) || [];
    // // this.url.forEach(async (url) => {
    // //   await this.page.goto(url);
    // // });
    // if (this.url) {
    //   logger.log(`Navigating to ${this.url}`);
    //   await this.page.goto(this.url);
    // }
    // setTimeout(async () => {
    //   console.log("browser opened and delayed for 10 sec...");
    //   await this.browser.close();
    //   logger.log("Test finished and browser closed...");
    // }, 10000);
    // await this.browser.close();
  }
}

export default Agent;
