export type NonTrainingGoal = "lose weight" | "maintain" | "gain weight";

export type TrainingGoal =
  | "lose weight"
  | "lose fat"
  | "maintain"
  | "recompose"
  | "gain muscle"
  | "gain weight";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

export type Pace = "slow" | "moderate" | "fast";

export type OnboardingData =
  | {
      age: number;
      sex: "male" | "female";
      height: number;
      weight: number;
      resistanceTraining: true;
      trainingFrequency: number;
      goal: TrainingGoal;
      activityLevel: ActivityLevel;
      pace?: Pace;
    }
  | {
      age: number;
      sex: "male" | "female";
      height: number;
      weight: number;
      resistanceTraining: false;
      goal: NonTrainingGoal;
      activityLevel: ActivityLevel;
      pace?: Pace;
    };

export type NutritionTargets = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
