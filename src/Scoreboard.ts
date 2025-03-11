import fs from "fs";
import { rainbowColors } from "./colors.js";
import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE_PATH = __dirname + "/data.json";

export class Scoreboard {
  data: Record<string, number> = {};
  today: string = new Date().toISOString().split("T")[0];

  constructor() {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({}));
      this.data = {};
    } else {
      this.data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf-8"));
    }
    if (!this.data[this.today]) {
      this.data[this.today] = 0;
    }
  }

  getScore() {
    return this.data[this.today];
  }

  printScore(config: { size: "large" | "small" } = { size: "large" }) {
    const score = this.getScore();
    let rainbowChar = "█";

    if (config.size === "small") {
      rainbowChar = "-";
    }

    if (score === 0) {
      console.log("😩");
    }

    let rainbow = "";

    for (let i = 0; i < score; i++) {
      const color = rainbowColors[i % rainbowColors.length];
      rainbow += chalk.hex(color)(rainbowChar);
    }

    if (score >= rainbowColors.length) {
      rainbow += "🏆";
    }

    console.log(rainbow);
  }

  awardPoint() {
    this.data[this.today]++;
  }

  save() {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.data));
  }
}
