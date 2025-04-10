
import React from "react";

interface PrototypeFormStepperProps {
  currentStep: number;
}

export const PrototypeFormStepper = ({ currentStep }: PrototypeFormStepperProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
          1
        </div>
        <span className="text-sm mt-2">Detalles</span>
      </div>
      <div className="flex-1 flex items-center px-4">
        <div className={`h-1 w-full ${currentStep >= 2 ? "bg-bloodRed" : "bg-muted"}`}></div>
      </div>
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
          2
        </div>
        <span className="text-sm mt-2">Plan</span>
      </div>
      <div className="flex-1 flex items-center px-4">
        <div className={`h-1 w-full ${currentStep >= 3 ? "bg-bloodRed" : "bg-muted"}`}></div>
      </div>
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
          3
        </div>
        <span className="text-sm mt-2">Pago</span>
      </div>
    </div>
  );
};
