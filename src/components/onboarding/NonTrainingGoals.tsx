import { useState } from "react";
import type { NonTrainingGoal } from "../../../types/onboarding";

type NonTrainingGoalsProps = {
  onNext: (nonTrainingGoal: NonTrainingGoal) => void;
};

export default function NonTrainingGoals({ onNext }: NonTrainingGoalsProps) {
  const [nonTrainingGoal, setNonTrainingGoal] = useState<NonTrainingGoal | "">(
    "",
  );

  return (
    <div className="flex h-screen max-w-96 flex-col gap-2 text-white p-4">
      <h1 className="text-xl font-bold">Tell us about your goal</h1>
      <div className="flex flex-col gap-2">
        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            nonTrainingGoal === "lose weight"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="lose weight"
            checked={nonTrainingGoal === "lose weight"}
            onChange={() => setNonTrainingGoal("lose weight")}
            className="hidden"
          />
          Lose weight: okay with losing muscle alongside losing fat
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            nonTrainingGoal === "maintain"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="maintain"
            checked={nonTrainingGoal === "maintain"}
            onChange={() => setNonTrainingGoal("maintain")}
            className="hidden"
          />
          Maintain: keep your current physique as is
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            nonTrainingGoal === "gain weight"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="gain weight"
            checked={nonTrainingGoal === "gain weight"}
            onChange={() => setNonTrainingGoal("gain weight")}
            className="hidden"
          />
          Gain weight: gain both fat and muscle
        </label>

        {nonTrainingGoal && (
          <button
            className="rounded-md px-4 py-2 bg-[#B13BFF]"
            onClick={() => onNext(nonTrainingGoal)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
