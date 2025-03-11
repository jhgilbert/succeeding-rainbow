#!/usr/bin/env node
import { Scoreboard } from "./Scoreboard.js";
import readlineSync from "readline-sync";

const scoreboard = new Scoreboard();
const score = scoreboard.getScore();

const strengthTasks = [
  "Use the stepper for 1 minute.",
  "Do 10 squats.",
  "Use the stepper for 1 minute.",
  "Do 10 push-ups (knees on the floor).",
  "Do chores for at least 2 minutes.",
  "Do 10 reverse lunges per leg.",
  "Do 20 crunches.",
  "Do 10 supermans.",
  "Do chores for at least 2 minutes.",
  "Use the stepper for 1 minute.",
  "Hold a 30-second plank.",
  "Use the stepper for 1 minute.",
  "Do 20 calf raises.",
  "Use the stepper for 1 minute.",
  "Boat pose (30 seconds).",
  "Do 10 reverse crunches.",
  "Use the stepper for 1 minute.",
  "Side plank (30 seconds each side).",
  "10 mountainclimbers each side.",
  "Do 10 supermans.",
  "Use the stepper for 1 minute.",
  "Do chores for at least 2 minutes.",
  "Hold a 30-second plank.",
  "Use the stepper for 1 minute.",
  "Do 10 squats.",
];

const stretchingTasks = [
  "Forward fold.",
  "Malasana squat.",
  "Stretch your quads.",
  "Morning stretch.",
  "Stretch your calves.",
  "Lying twist (both sides).",
  "Wrist and forearm stretch.",
  "Forward fold.",
  "Pigeon pose (both sides).",
  "Lizard pose (both sides).",
  "Morning stretch.",
  "Triceps stretch.",
  "Cat-cow pose for 1 minute.",
  "Figure-four stretch (both sides).",
  "Wide-leg forward bend with shoulder stretch.",
  "Forward fold.",
  "Pyramid pose.",
  "Side-body stretch.",
  "Happy baby.",
  "Warrior 3.",
  "Tree pose.",
  "Ear-to-shoulder neck stretch (both sides).",
  "Child's pose with side stretches.",
  "Forward fold.",
  "Lying twist (both sides).",
];

const strengthTask = strengthTasks[score % strengthTasks.length];
const stretchingTask = stretchingTasks[score % stretchingTasks.length];

console.log("\n" + strengthTask);
console.log(stretchingTask + "\n");

const answer = readlineSync.question(
  "Type 'done' if you completed the above.\n"
);

if (answer === "done") {
  scoreboard.awardPoint();
  scoreboard.save();
  console.log("\nPoint awarded! 🌈");
  console.log("♫ A task complete, you moved your feet, succeeding rainbow ♫");
}
