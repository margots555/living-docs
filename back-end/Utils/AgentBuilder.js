import Agent from "./Agent.js";
import path from "path";
// import config from "./ld-config.json" with {type: "json"};
// const config = require("./ld-config.json");
import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./ld-config.json", import.meta.url))
);

class AgentBuilder {
  constructor(config) {
    this.name = config.default;
    // this.luncher = Luncher[profile.default];
    this.browserUrl = config.profiles.remote.browserUrl;
    this.initialUrl = null;
  }

  changeProfile(profile_name) {
    this.name = profile_name;
    // this.luncher = Luncher[profile_name];
    return this;
  }

  setBrowserUrl(url) {
    this.browserUrl = url;
    return this;
  }

  setInitialUrl(url) {
    this.initialUrl = url;
    return this;
  }

  build() {
    return new Agent(this);
  }
}

export default new AgentBuilder(config.agent);
