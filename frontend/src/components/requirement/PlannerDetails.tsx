import { UseFormReturn } from "react-hook-form";
import { RequirementFormData } from "@/types/requirement";

const PLANNER_SERVICES = [
  "Full Event Planning",
  "Vendor Management",
  "Guest Management",
  "Logistics",
  "Event Coordination"
];

export function PlannerDetails({ form, currentStep }: { form: UseFormReturn<RequirementFormData>, currentStep: number }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const services = watch("details.services") || [];

  const handleServiceToggle = (service: string) => {
    if (services.includes(service)) {
      setValue("details.services", services.filter((s: string) => s !== service), { shouldValidate: true });
    } else {
      setValue("details.services", [...services, service], { shouldValidate: true });
    }
  };

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Planning Services Required *</h3>
        {errors.details?.services && <p className="text-sm text-red-500">{errors.details.services.message as string}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLANNER_SERVICES.map(service => (
            <label key={service} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="checkbox" 
                checked={services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Guest & Budget Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expected Guest Count *</label>
            <input
              type="number"
              {...register("details.expectedGuestCount")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 500"
            />
            {errors.details?.expectedGuestCount && <p className="text-sm text-red-500">{errors.details.expectedGuestCount.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Estimated Budget *</label>
            <input
              type="number"
              {...register("details.estimatedBudget")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Amount"
            />
            {errors.details?.estimatedBudget && <p className="text-sm text-red-500">{errors.details.estimatedBudget.message as string}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Experience Preference</label>
            <input
              {...register("details.experiencePreference")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 5+ years experience"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Additional Requirements</label>
            <textarea
              {...register("details.additionalRequirements")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-24"
              placeholder="Any other details..."
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
