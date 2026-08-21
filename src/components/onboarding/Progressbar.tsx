type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="h-1 w-full rounded-full bg-[#471396]">
      <div
        className="h-1 rounded-full bg-[#B13BFF] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
