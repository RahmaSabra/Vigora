import { useState } from "react";
import type { TrainingGoal } from "../../../types/onboarding";

type TrainingGoalsProps = {
  onNext: (trainingGoal: TrainingGoal) => void;
};

export default function TrainingGoals({ onNext }: TrainingGoalsProps) {
  const [trainingGoal, setTrainingGoal] = useState<TrainingGoal | "">("");

  return (
    <div className="flex h-screen max-w-96 flex-col gap-2 text-white p-4">
      <h1 className="text-xl font-bold">Tell us about your goal</h1>
      <div className="flex flex-col gap-2">
        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "lose weight"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="lose weight"
            checked={trainingGoal === "lose weight"}
            onChange={() => setTrainingGoal("lose weight")}
            className="hidden"
          />
          Lose weight: okay with losing muscle alongside losing fat
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "lose fat" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="lose fat"
            checked={trainingGoal === "lose fat"}
            onChange={() => setTrainingGoal("lose fat")}
            className="hidden"
          />
          Lose fat: maintain muscle while losing fat
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "maintain" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="maintain"
            checked={trainingGoal === "maintain"}
            onChange={() => setTrainingGoal("maintain")}
            className="hidden"
          />
          Maintain: keep your current physique as is
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "recompose"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="recompose"
            checked={trainingGoal === "recompose"}
            onChange={() => setTrainingGoal("recompose")}
            className="hidden"
          />
          Recomp: gain muscle while losing fat
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "gain muscle"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="gain muscle"
            checked={trainingGoal === "gain muscle"}
            onChange={() => setTrainingGoal("gain muscle")}
            className="hidden"
          />
          Gain muscle: gain muscle while keeping body fat perecentage roughly
          the same
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            trainingGoal === "gain weight"
              ? "border-[#B13BFF]"
              : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="gain weight"
            checked={trainingGoal === "gain weight"}
            onChange={() => setTrainingGoal("gain weight")}
            className="hidden"
          />
          Gain weight: gain both fat and muscle
        </label>

        {trainingGoal && (
          <button
            className="rounded-md px-4 py-2 bg-[#B13BFF]"
            onClick={() => onNext(trainingGoal)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
