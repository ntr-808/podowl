import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-4 h-4 rounded-full ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentStep - 1 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}