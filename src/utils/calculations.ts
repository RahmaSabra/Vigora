import type {
  NonTrainingGoal,
  TrainingGoal,
  ActivityLevel,
  Pace,
  NutritionTargets,
} from "../../types/onboarding";

export function calculateAge(dob: string): number {
  const dateOfBirth = new Date(dob);
  const currentDate = new Date();
  const monthDiff = currentDate.getMonth() + 1 - dateOfBirth.getMonth();

  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
}

export function calculateBMI(weight: number, height: number): number {
  const squaredHeight = (height / 100) ** 2;
  const bmi = weight / squaredHeight;
  return bmi;
}

export function calculateBMR(
  dob: string,
  sex: "male" | "female",
  weight: number,
  height: number,
): number {
  let bmr: number;
  if (sex === "male") {
    bmr = weight * 10 + height * 6.25 - 5 * calculateAge(dob) + 5;
  } else {
    bmr = weight * 10 + height * 6.25 - 5 * calculateAge(dob) - 161;
  }
  return bmr;
}

export function calculateTDEE(
  dob: string,
  sex: "male" | "female",
  height: number,
  weight: number,
  activityLevel: ActivityLevel,
): number {
  const bmr = calculateBMR(dob, sex, weight, height);
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
  dob: string,
  sex: "male" | "female",
  height: number,
  weight: number,
  goal: TrainingGoal | NonTrainingGoal,
  activityLevel: ActivityLevel,
  pace?: Pace,
): number {
  const tdee = calculateTDEE(dob, sex, height, weight, activityLevel);
  let calorieEstimate = tdee;
  if (goal === "lose fat" || goal === "lose weight" || goal === "recompose") {
    if (pace === "fast") {
      calorieEstimate = tdee - (30 / 100) * tdee;
    } else if (pace === "moderate") {
      calorieEstimate = tdee - (20 / 100) * tdee;
    } else if (pace === "slow") {
      calorieEstimate = tdee - (15 / 100) * tdee;
    }
  } else if (goal === "gain muscle" || goal === "gain weight") {
    if (pace === "fast") {
      calorieEstimate = tdee + (15 / 100) * tdee;
    } else if (pace === "moderate") {
      calorieEstimate = tdee + (10 / 100) * tdee;
    } else if (pace === "slow") {
      calorieEstimate = tdee + (5 / 100) * tdee;
    }
  }

  return calorieEstimate;
}

export function calculateProtein(
  weight: number,
  resistanceTraining: boolean,
  goal: TrainingGoal | NonTrainingGoal,
): number {
  const proteinMultiplier =
    resistanceTraining &&
    (goal === "lose fat" || goal === "gain muscle" || goal === "recompose")
      ? 2
      : resistanceTraining &&
          (goal === "gain weight" ||
            goal === "lose weight" ||
            goal === "maintain")
        ? 1.6
        : !resistanceTraining && goal === "lose weight"
          ? 1.2
          : 1;
  const proteinGrams = proteinMultiplier * weight;
  return proteinGrams;
}

export function calculateFat(
  weight: number,
  resistanceTraining: boolean,
  goal: TrainingGoal | NonTrainingGoal,
): number {
  const fatMultiplier =
    goal === "lose weight" ||
    (resistanceTraining && (goal === "lose fat" || goal === "recompose"))
      ? 0.7
      : goal === "maintain" || (resistanceTraining && goal === "gain muscle")
        ? 1
        : 1.2;
  const fatGrams = fatMultiplier * weight;
  return fatGrams;
}

export function calculateNutritionTargets(
  dob: string,
  sex: "male" | "female",
  height: number,
  weight: number,
  resistanceTraining: boolean,
  goal: TrainingGoal | NonTrainingGoal,
  activityLevel: ActivityLevel,
  pace?: Pace,
): NutritionTargets {
  const calories = calculateCalorieTarget(
    dob,
    sex,
    height,
    weight,
    goal,
    activityLevel,
    pace,
  );
  const protein = calculateProtein(weight, resistanceTraining, goal);
  const fat = calculateFat(weight, resistanceTraining, goal);

  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;

  const carbs = (calories - proteinCalories - fatCalories) / 4;

  return {
    calories,
    protein,
    fat,
    carbs,
  };
}
