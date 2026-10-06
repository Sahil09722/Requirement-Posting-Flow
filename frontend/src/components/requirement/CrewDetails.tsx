import { UseFormReturn } from "react-hook-form";
import { RequirementFormData } from "@/types/requirement";

const CREW_TYPES = [
  "Photographer", "Videographer", "Sound Engineer", 
  "Lighting Technician", "Stage Manager", "Security", "Other"
];

export function CrewDetails({ form, currentStep }: { form: UseFormReturn<RequirementFormData>, currentStep: number }) {
  const { register, formState: { errors } } = form;

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Crew Type & Working Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Crew Type *</label>
            <select
              {...register("details.crewType")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select type...</option>
              {CREW_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.details?.crewType && <p className="text-sm text-red-500">{errors.details.crewType.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Working Hours *</label>
            <input
              type="number"
              {...register("details.workingHours")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 8"
            />
            {errors.details?.workingHours && <p className="text-sm text-red-500">{errors.details.workingHours.message as string}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Logistics & Budget</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Crew Members *</label>
            <input
              type="number"
              {...register("details.numberOfCrewMembers")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 2"
            />
            {errors.details?.numberOfCrewMembers && <p className="text-sm text-red-500">{errors.details.numberOfCrewMembers.message as string}</p>}
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
            <label className="text-sm font-medium text-gray-700">Equipment Requirements</label>
            <input
              {...register("details.equipmentRequirements")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Cameras, Lenses, Walkie-talkies"
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
