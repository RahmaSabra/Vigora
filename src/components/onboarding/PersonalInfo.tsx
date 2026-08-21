import { useState } from "react";

type PersonalInfoProps = {
  onNext: (dob: string, sex: "male" | "female") => void;
};

export default function PersonalInfo({ onNext }: PersonalInfoProps) {
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState<"male" | "female" | "">("");

  return (
    <div className="flex max-w-96 flex-col gap-4 text-white p-4">
      <h1 className="text-xl font-bold">Tell us about yourself</h1>
      <p className="text-sm font-light">
        This helps us estimate your calorie and nutrition needs more accurately.
      </p>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal">What's your date of birth?</h2>
        <input
          className="rounded-sm border"
          type="date"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-normal">What's your sex?</h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sex"
              value="male"
              checked={sex === "male"}
              onChange={() => setSex("male")}
            />
            Male
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sex"
              value="female"
              checked={sex === "female"}
              onChange={() => setSex("female")}
            />
            Female
          </label>
        </div>
      </div>

      {dob && sex && (
        <button
          className="rounded-md px-4 py-2 bg-[#B13BFF]"
          onClick={() => onNext(dob, sex)}
        >
          Next
        </button>
      )}
    </div>
  );
}
