const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Exercise = require("../models/Exercise");
const exercises = require("../data/exercises");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const importData = async () => {
  await connectDB();
  await Exercise.deleteMany();
  await Exercise.insertMany(exercises);
  console.log(`Seeded ${exercises.length} exercises`);
  process.exit(0);
};

const destroyData = async () => {
  await connectDB();
  await Exercise.deleteMany();
  console.log("Destroyed exercise data");
  process.exit(0);
};

const run = async () => {
  try {
    if (process.argv.includes("--destroy")) {
      await destroyData();
      return;
    }

    await importData();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
