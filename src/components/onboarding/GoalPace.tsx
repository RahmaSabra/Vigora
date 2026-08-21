import { useState } from "react";
import type { Pace } from "../../../types/onboarding";

type GoalPaceProps = {
  onNext: (pace: Pace) => void;
};

export default function GoalPace({ onNext }: GoalPaceProps) {
  const [pace, setPace] = useState<Pace | "">("");

  return (
    <div className="flex h-screen max-w-96 flex-col gap-2 text-white p-4">
      <h1 className="text-xl font-bold">
        At which pace do you want to reach your goal?
      </h1>
      <div className="flex flex-col gap-2">
        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            pace === "fast" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="fast"
            checked={pace === "fast"}
            onChange={() => setPace("fast")}
            className="hidden"
          />
          Fast
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            pace === "moderate" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="moderate"
            checked={pace === "moderate"}
            onChange={() => setPace("moderate")}
            className="hidden"
          />
          Moderate
        </label>

        <label
          className={`cursor-pointer rounded-md border p-2 text-xs ${
            pace === "slow" ? "border-[#B13BFF]" : "border-gray-500"
          }`}
        >
          <input
            type="radio"
            value="slow"
            checked={pace === "slow"}
            onChange={() => setPace("slow")}
            className="hidden"
          />
          Slow
        </label>

        {pace && (
          <button
            className="rounded-md px-4 py-2 bg-[#B13BFF]"
            onClick={() => onNext(pace)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
