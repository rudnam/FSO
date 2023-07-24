interface exerciseData {
  dailyExercises: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): exerciseData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_x, _y, targetString, ...hoursArray] = args;
  if (isNaN(Number(targetString)))
    throw new Error("Provided target is not a number!");
  const target = Number(targetString);

  const dailyExercises: number[] = [];
  for (const hours of hoursArray) {
    if (isNaN(Number(hours)))
      throw new Error("Provided hours contained a non-number!");
    dailyExercises.push(Number(hours));
  }

  return {
    dailyExercises,
    target,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  let periodLength = 0;
  let trainingDays = 0;
  let totalHours = 0;
  for (const hours of dailyHours) {
    periodLength += 1;
    if (hours > 0) {
      trainingDays += 1;
      totalHours += hours;
    }
  }

  let success: boolean;
  let rating: number;
  let ratingDescription: string;
  const average = totalHours / periodLength;
  if (average < 0.5 * target) {
    success = false;
    rating = 1;
    ratingDescription = "needs improvement";
  } else if (average >= 0.5 * target && average < target) {
    success = false;
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    success = true;
    rating = 3;
    ratingDescription = "target reached, good job!";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyExercises, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
