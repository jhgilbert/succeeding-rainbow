import { rainbowColors, uglyColors } from "./colors.js";
import chalk from "chalk";
import { readData, writeData } from "./data.js";

export class Scoreboard {
  data: Record<string, number> = {};
  today: string;

  constructor() {
    const now = new Date();
    const timeZoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - timeZoneOffset).toISOString();
    this.today = localISOTime.split("T")[0];

    this.data = readData();
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
    writeData(this.data);
  }
}
