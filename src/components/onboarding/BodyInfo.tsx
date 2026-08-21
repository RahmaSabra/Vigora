import { useState } from "react";

type BodyInfoProps = {
  onNext: (height: number, weight: number) => void;
};

export default function BodyInfo({ onNext }: BodyInfoProps) {
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");

  return (
    <div className="flex max-w-96 flex-col gap-4 text-white p-4">
      <h1 className="text-xl font-bold">Let’s get your measurements</h1>
      <p className="text-sm font-light">
        These measurements help us create more accurate nutrition targets.
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal">How tall are you?</h2>
        <label htmlFor="height">Height</label>
        <input
          id="height"
          className="rounded-sm border p-2"
          type="number"
          value={height}
          placeholder="Enter your height in centimeters"
          onChange={(event) =>
            setHeight(
              event.target.value === "" ? "" : Number(event.target.value),
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal">How much do you weigh?</h2>
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          className="rounded-sm border p-2"
          type="number"
          value={weight}
          placeholder="Enter your weight in kilograms"
          onChange={(event) =>
            setWeight(
              event.target.value === "" ? "" : Number(event.target.value),
            )
          }
        />
      </div>

      {height && weight && (
        <button
          className="rounded-md px-4 py-2 bg-[#B13BFF]"
          onClick={() => onNext(height, weight)}
        >
          Next
        </button>
      )}
    </div>
  );
}
