import { CheckIcon } from '@radix-ui/react-icons';

interface StepperProps {
  currentStep: number;
  numberOfSteps: number;
}

export const Stepper = ({ currentStep, numberOfSteps }: StepperProps) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {[...Array(numberOfSteps)].map((_, index) => {
        const stepNumber = index + 1;
        return (
          <div key={index} className="flex items-center">
            <div className="relative flex items-center justify-center">
              {/* Outer Circle */}
              <div
                className={`w-8 h-8 rounded-full border-2 ${
                  currentStep > stepNumber
                    ? 'border-green-500'
                    : currentStep === stepNumber
                    ? 'border-black'
                    : 'border-gray-300'
                }`}
              ></div>

              {/* Inner Circle */}
              <div
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-lg ${
                  currentStep > stepNumber
                    ? 'bg-green-500 text-white'
                    : currentStep === stepNumber
                    ? 'bg-black text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {currentStep > stepNumber ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  stepNumber
                )}
              </div>
            </div>

            {/* Line connecting to the next step */}
            {index < numberOfSteps - 1 && (
              <div
                className={`w-16 h-0 border-t-2 ml-2 mr-0 ${
                  currentStep > stepNumber ? 'border-black' : 'border-gray-300'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
