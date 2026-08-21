import { useState } from "react";
import type {
  OnboardingState,
  OnboardingData,
} from "../../../types/onboarding";
import ProgressBar from "./Progressbar";
import PersonalInfo from "./PersonalInfo";
import BodyInfo from "./BodyInfo";
import TrainingAndActivity from "./TrainingAndActivity";
import TrainingGoals from "./TrainingGoals";
import NonTrainingGoals from "./NonTrainingGoals";
import GoalPace from "./GoalPace";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<
    Partial<OnboardingState> | Partial<OnboardingData>
  >({});
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const totalSteps = onboardingData.goal === "maintain" ? 4 : 5;

  return (
    <div className="flex flex-col justify-center items-center">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {currentStep === 1 && (
        <PersonalInfo
          onNext={(dob, sex) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              dob,
              sex,
            }));
            setCurrentStep((prevStep) => prevStep + 1);
          }}
        />
      )}
      {currentStep === 2 && (
        <BodyInfo
          onNext={(height, weight) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              height,
              weight,
            }));
            setCurrentStep((prevStep) => prevStep + 1);
          }}
        />
      )}
      {currentStep === 3 && (
        <TrainingAndActivity
          onNext={(resistanceTraining, activityLevel) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              resistanceTraining,
              activityLevel,
            }));
            setCurrentStep((prevStep) => prevStep + 1);
          }}
        />
      )}

      {currentStep === 4 && onboardingData.resistanceTraining && (
        <TrainingGoals
          onNext={(trainingGoal) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              goal: trainingGoal,
            }));
            if (trainingGoal === "maintain") {
              setOnboardingComplete(true);
            } else {
              setCurrentStep((prevStep) => prevStep + 1);
            }
          }}
        />
      )}

      {currentStep === 4 && onboardingData.resistanceTraining === false && (
        <NonTrainingGoals
          onNext={(nonTrainingGoal) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              goal: nonTrainingGoal,
            }));
            if (nonTrainingGoal === "maintain") {
              setOnboardingComplete(true);
            } else {
              setCurrentStep((prevStep) => prevStep + 1);
            }
          }}
        />
      )}
      {currentStep === 5 && !onboardingComplete && (
        <GoalPace
          onNext={(pace) => {
            setOnboardingData((prevData) => ({
              ...prevData,
              pace,
            }));
            setOnboardingComplete(true);
          }}
        />
      )}
    </div>
  );
}
