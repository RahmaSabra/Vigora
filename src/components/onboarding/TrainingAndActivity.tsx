import { useState } from "react";
import type { ActivityLevel } from "../../../types/onboarding";

type TrainingAndActivityProps = {
  onNext: (resistanceTraining: boolean, activityLevel: ActivityLevel) => void;
};

export default function TrainingAndActivity({
  onNext,
}: TrainingAndActivityProps) {
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | "">("");
  const [resistanceTraining, setResistanceTraining] = useState<boolean | null>(
    null,
  );

  return (
    <div className="flex h-screen max-w-96 flex-col gap-2 text-white p-4">
      <h1 className="text-xl font-bold">Tell us about your activity</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal">How active are you?</h2>
        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            activityLevel === "sedentary"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            name="activityLevel"
            value="sedentary"
            checked={activityLevel === "sedentary"}
            onChange={() => setActivityLevel("sedentary")}
            className="hidden"
          />
          sedentary: Desk job with little to no structured exercise.
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            activityLevel === "light" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            name="activityLevel"
            value="light"
            checked={activityLevel === "light"}
            onChange={() => setActivityLevel("light")}
            className="hidden"
          />
          Lightly Active : Light exercise or sports 1 to 3 days per week.
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            activityLevel === "moderate"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            name="activityLevel"
            value="moderate"
            checked={activityLevel === "moderate"}
            onChange={() => setActivityLevel("moderate")}
            className="hidden"
          />
          Moderately Active: Moderate exercise or sports 3 to 5 days per week.
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            activityLevel === "very" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            name="activityLevel"
            value="very"
            checked={activityLevel === "very"}
            onChange={() => setActivityLevel("very")}
            className="hidden"
          />
          Very Active: Hard exercise or sports 6 to 7 days per week.
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            activityLevel === "extra" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            name="activityLevel"
            value="extra"
            checked={activityLevel === "extra"}
            onChange={() => setActivityLevel("extra")}
            className="hidden"
          />
          Extremely Active: Very hard physical job, intense daily training, or
          twice-per-day workouts.
        </label>

        <h1>Do you do resistanceTraining?</h1>
        <p className="text-xs font-light">
          This includes activities like weightlifting, bodyweight exercises, or
          other strength-based training.
        </p>
        <div className="flex flex-row gap-2">
          <button
            className={`rounded-md px-4 py-1.5 ${resistanceTraining ? "bg-black border" : "bg-[#B13BFF]"} text-xs`}
            onClick={() => setResistanceTraining(true)}
          >
            Yes
          </button>
          <button
            className={`rounded-md px-4 py-1.5 ${resistanceTraining == false ? "bg-black border" : "bg-[#471396]"} text-xs`}
            onClick={() => setResistanceTraining(false)}
          >
            No
          </button>
        </div>
        {activityLevel !== "" && resistanceTraining !== null && (
          <button
            className="rounded-md px-4 py-2 bg-[#B13BFF]"
            onClick={() => onNext(resistanceTraining, activityLevel)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
