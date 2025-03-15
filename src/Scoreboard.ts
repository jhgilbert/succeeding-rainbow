import fs from "fs";
import { rainbowColors, uglyColors } from "./colors.js";
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
    let unitChar = "█";

    if (config.size === "small") {
      unitChar = "-";
    }

    const score = this.getScore();
    let result = "";

    for (let i = 0; i < rainbowColors.length; i++) {
      let color: string;
      if (score > i) {
        color = rainbowColors[i];
      } else {
        color = uglyColors[i % uglyColors.length];
      }
      result += chalk.hex(color)(unitChar);
    }

    if (score >= rainbowColors.length) {
      result += "🏆";
    }

    console.log(result);
  }

  awardPoint() {
    this.data[this.today]++;
  }

  save() {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.data));
  }
}
