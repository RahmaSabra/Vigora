export type OnboardingData = {
  age: number;
  sex: "male" | "female";
  height: number;
  weight: number;
  goal:
    | "lose weight"
    | "lose fat"
    | "maintain"
    | "recompose"
    | "gain muscle"
    | "gain weight";
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra";
  pace?: "slow" | "moderate" | "fast";
};
