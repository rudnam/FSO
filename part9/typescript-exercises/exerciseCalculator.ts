interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (dailyHours: number[], target: number): Result => {
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
  let average = totalHours / periodLength;
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

const dailyHours = [3, 0, 2, 4.5, 0, 3, 1];
console.log(calculateExercises(dailyHours, 2));
