import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { num: 1, label: "Event Basics" },
  { num: 2, label: "Details" },
  { num: 3, label: "Requirements" },
  { num: 4, label: "Review" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-12 w-full px-2">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center relative">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors z-10",
                currentStep > step.num
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === step.num
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-gray-300 text-gray-400 bg-white"
              )}
            >
              {currentStep > step.num ? "✓" : step.num}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium absolute top-8 whitespace-nowrap",
                currentStep >= step.num ? "text-gray-900" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-2 md:mx-4 transition-colors",
                currentStep > step.num ? "bg-blue-600" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
