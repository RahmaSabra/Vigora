export function calculateBMI(weight: number, height: number): number {
  const squaredHeight = (height / 100) ** 2;
  const bmi = weight / squaredHeight;
  return bmi;
}

export function calculateBMR(
  sex: "male" | "female",
  weight: number,
  height: number,
  age: number,
): number {
  let bmr: number;
  if (sex === "male") {
    bmr = weight * 10 + height * 6.25 - 5 * age + 5;
  } else {
    bmr = weight * 10 + height * 6.25 - 5 * age - 161;
  }
  return bmr;
}

export function calculateTDEE(
  sex: "male" | "female",
  weight: number,
  height: number,
  age: number,
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra",
): number {
  const bmr = calculateBMR(sex, weight, height, age);
  const multipliedNumber =
    activityLevel === "sedentary"
      ? 1.2
      : activityLevel === "light"
        ? 1.375
        : activityLevel === "moderate"
          ? 1.55
          : activityLevel === "very"
            ? 1.725
            : 1.9;
  const tdee = bmr * multipliedNumber;
  return tdee;
}

export function calculateCalorieTarget(
  goal:
    | "lose weight"
    | "lose fat"
    | "maintain"
    | "recompose"
    | "gain muscle"
    | "gain weight",
  sex: "male" | "female",
  weight: number,
  height: number,
  age: number,
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra",
  pace?: "slow" | "moderate" | "fast",
): number {
  const TDEE = calculateTDEE(sex, weight, height, age, activityLevel);
  let calorieEstimate = TDEE;
  if (goal === "lose fat" || goal === "lose weight" || goal === "recompose") {
    if (pace === "fast") {
      calorieEstimate = TDEE - (30 / 100) * TDEE;
    } else if (pace === "moderate") {
      calorieEstimate = TDEE - (20 / 100) * TDEE;
    } else if (pace === "slow") {
      calorieEstimate = TDEE - (15 / 100) * TDEE;
    }
  } else if (goal === "gain muscle" || goal === "gain weight") {
    if (pace === "fast") {
      calorieEstimate = TDEE + (15 / 100) * TDEE;
    } else if (pace === "moderate") {
      calorieEstimate = TDEE + (10 / 100) * TDEE;
    } else if (pace === "slow") {
      calorieEstimate = TDEE + (5 / 100) * TDEE;
    }
  }
  return calorieEstimate;
}
