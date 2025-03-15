import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE_PATH = __dirname + "/data.json";

export function readData() {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({}));
    return {
      snoozedAt: new Date().getTime(),
      snoozeDuration: 0,
    };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf-8"));
}

export function writeData(data: Record<string, any>) {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
}

export function snooze(snoozeDurationInMs?: number) {
  const data = readData();
  data.snoozedAt = new Date().getTime();
  data.snoozeDuration = snoozeDurationInMs || 5 * 60 * 1000;
  writeData(data);
}

export function isSnoozed() {
  const data = readData();
  const now = new Date().getTime();
  return now < data.snoozedAt + data.snoozeDuration;
}
