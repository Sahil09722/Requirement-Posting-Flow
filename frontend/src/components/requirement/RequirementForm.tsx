"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequirementFormData, Category } from "@/types/requirement";
import { eventBasicsSchema } from "@/lib/validation";
import { StepIndicator } from "./StepIndicator";
import { EventBasics } from "./EventBasics";

export function RequirementForm() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<RequirementFormData>({
    resolver: zodResolver(eventBasicsSchema) as any, 
    defaultValues: {
      eventName: "",
      eventType: "",
      startDate: "",
      endDate: "",
      location: "",
      venue: "",
      category: "" as unknown as Category,
      details: {}
    },
    mode: "onTouched"
  });

  const onSubmit = async (data: RequirementFormData) => {
    console.log("Final data:", data);
  };

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setCurrentStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 1));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <StepIndicator currentStep={currentStep} />
      
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          {currentStep === 1 && <EventBasics form={form} />}
          {currentStep === 2 && <div className="text-center py-12 text-gray-500">Step 2 (Coming in Phase 9)</div>}
          {currentStep === 3 && <div className="text-center py-12 text-gray-500">Step 3 (Coming in Phase 9)</div>}
          {currentStep === 4 && <div className="text-center py-12 text-gray-500">Review (Coming in Phase 10)</div>}
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : <div />}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Requirement
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
