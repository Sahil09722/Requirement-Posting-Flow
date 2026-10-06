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
import { ReviewRequirement } from "./ReviewRequirement";
import api from "@/lib/api";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
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
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await api.post("/requirements", data);
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Submission failed", error);
      setErrorMsg(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto p-8 md:p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for trusting GoPratle. Our team will review your requirement and match you with the best professionals soon.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Post Another Requirement
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <StepIndicator currentStep={currentStep} />
      
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {errorMsg}
        </div>
      )}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          {currentStep === 1 && <EventBasics form={form} />}
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "planner" && <PlannerDetails form={form} currentStep={currentStep} />}
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "performer" && <PerformerDetails form={form} currentStep={currentStep} />}
          {(currentStep === 2 || currentStep === 3) && form.watch("category") === "crew" && <CrewDetails form={form} currentStep={currentStep} />}
          {currentStep === 4 && <ReviewRequirement form={form} />}
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            ) : <div />}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Requirement</span>
                )}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
