#!/usr/bin/env node
import { Scoreboard } from "./Scoreboard.js";
import { isSnoozed } from "./data.js";

if (!isSnoozed()) {
  const scoreboard = new Scoreboard();
  scoreboard.printScore();
}
