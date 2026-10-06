"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequirementFormData, Category } from "@/types/requirement";
import { eventBasicsSchema } from "@/lib/validation";
import { StepIndicator } from "./StepIndicator";
import { EventBasics } from "./EventBasics";
import { PlannerDetails } from "./PlannerDetails";
import { PerformerDetails } from "./PerformerDetails";
import { CrewDetails } from "./CrewDetails";
import { z } from "zod";
import { plannerDetailsSchema, performerDetailsSchema, crewDetailsSchema } from "@/lib/validation";

// Create a combined schema
const masterSchema = z.object({
  eventName: z.string().min(3, 'Event name must be at least 3 characters'),
  eventType: z.string().min(2, 'Event type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().min(2, 'Location is required'),
  venue: z.string().optional(),
  category: z.enum(['planner', 'performer', 'crew'], {
    errorMap: () => ({ message: 'Please select a category' })
  }),
  details: z.any()
}).superRefine((data, ctx) => {
  if (data.startDate && data.endDate) {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date cannot be before start date",
        path: ["endDate"]
      });
    }
  }

  if (data.category === 'planner') {
    const res = plannerDetailsSchema.safeParse(data.details);
    if (!res.success) {
      res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["details", ...i.path] }));
    }
  } else if (data.category === 'performer') {
    const res = performerDetailsSchema.safeParse(data.details);
    if (!res.success) {
      res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["details", ...i.path] }));
    }
  } else if (data.category === 'crew') {
    const res = crewDetailsSchema.safeParse(data.details);
    if (!res.success) {
      res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["details", ...i.path] }));
    }
  }
});

export function RequirementForm() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<RequirementFormData>({
    resolver: zodResolver(masterSchema) as any, 
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
    let fieldsToValidate: any[] = [];
    const category = form.getValues("category");
    
    if (currentStep === 1) {
      fieldsToValidate = ['eventName', 'eventType', 'startDate', 'endDate', 'location', 'category'];
    } else if (currentStep === 2) {
      if (category === 'planner') fieldsToValidate = ['details.services'];
      if (category === 'performer') fieldsToValidate = ['details.performerType', 'details.genre', 'details.performanceDuration'];
      if (category === 'crew') fieldsToValidate = ['details.crewType', 'details.workingHours'];
    } else if (currentStep === 3) {
      if (category === 'planner') fieldsToValidate = ['details.expectedGuestCount', 'details.estimatedBudget'];
      if (category === 'performer') fieldsToValidate = ['details.numberOfPerformers', 'details.estimatedBudget'];
      if (category === 'crew') fieldsToValidate = ['details.numberOfCrewMembers', 'details.estimatedBudget'];
    }

    const isValid = await form.trigger(fieldsToValidate);
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
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "planner" && <PlannerDetails form={form} currentStep={currentStep} />}
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "performer" && <PerformerDetails form={form} currentStep={currentStep} />}
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "crew" && <CrewDetails form={form} currentStep={currentStep} />}
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
