import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  canGoToStep: (step: number) => boolean;
}

export const StepNavigation = ({ steps, currentStep, onStepChange, canGoToStep }: StepNavigationProps) => {
  const handleStepClick = (stepId: number) => {
    if (canGoToStep(stepId)) {
      onStepChange(stepId);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => {
        const isClickable = canGoToStep(step.id);

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={!isClickable}
                className={`
                w-12 h-12 rounded-full flex items-center justify-center font-semibold
                transition-all duration-200
                ${step.id === currentStep
                    ? "bg-primary text-primary-foreground scale-110"
                    : step.completed
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }
                ${isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed opacity-50"}
              `}
                aria-label={`Step ${step.id}: ${step.title}`}
                title={isClickable ? `Go to ${step.title}` : `Complete previous steps to unlock`}
              >
                {step.completed ? <Check className="w-6 h-6" /> : step.id}
              </button>
              <div className="mt-2 text-center max-w-[120px]">
                <p className={`text-xs font-medium ${step.id === currentStep ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${step.completed ? "bg-green-500" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
