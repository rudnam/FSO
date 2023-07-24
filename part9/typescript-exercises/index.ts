import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    res.send("malformatted parameters");
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      daily_exercises: dailyExercisesStrings,
      target: targetString,
    }: { daily_exercises: string[]; target: string } = req.body;
    console.log(dailyExercisesStrings, targetString);

    if (!dailyExercisesStrings || !targetString) {
      res.status(400).send({
        error: "parameters missing",
      });
    }

    const target = Number(targetString);
    if (isNaN(target)) {
      res.status(400).send({
        error: "malformatted parameters",
      });
      throw new Error();
    }

    const dailyExercises: number[] = dailyExercisesStrings.map((hours) => {
      const parsedHours = Number(hours);
      if (isNaN(parsedHours)) {
        res.status(400).send({
          error: "malformatted parameters",
        });
        throw new Error();
      }
      return parsedHours;
    });

    const results = calculateExercises(dailyExercises, target);

    res.send(results);
  } catch (error: unknown) {
    res.status(500).send({
      error: "Unexpected error occured.",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
