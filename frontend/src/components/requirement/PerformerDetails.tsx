import { UseFormReturn } from "react-hook-form";
import { RequirementFormData } from "@/types/requirement";

const PERFORMER_TYPES = [
  "Singer", "DJ", "Band", "Dancer", "Comedian", "Speaker", "Other"
];
const EQUIPMENT_OPTIONS = [
  "Sound System", "Lighting", "Instruments", "Microphones", "Stage"
];

export function PerformerDetails({ form, currentStep }: { form: UseFormReturn<RequirementFormData>, currentStep: number }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const equipment = watch("details.equipmentRequired") || [];

  const handleEquipmentToggle = (item: string) => {
    if (equipment.includes(item)) {
      setValue("details.equipmentRequired", equipment.filter((e: string) => e !== item));
    } else {
      setValue("details.equipmentRequired", [...equipment, item]);
    }
  };

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Performer Type & Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Performer Type *</label>
            <select
              {...register("details.performerType")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select type...</option>
              {PERFORMER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.details?.performerType && <p className="text-sm text-red-500">{errors.details.performerType.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Genre/Style</label>
            <input
              {...register("details.genre")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Rock, Hip Hop, Classical"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Performance Duration (minutes) *</label>
            <input
              type="number"
              {...register("details.performanceDuration")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="120"
            />
            {errors.details?.performanceDuration && <p className="text-sm text-red-500">{errors.details.performanceDuration.message as string}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Requirements & Logistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Performers *</label>
            <input
              type="number"
              {...register("details.numberOfPerformers")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1"
            />
            {errors.details?.numberOfPerformers && <p className="text-sm text-red-500">{errors.details.numberOfPerformers.message as string}</p>}
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
            <label className="text-sm font-medium text-gray-700">Equipment Provided by Organizer</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {EQUIPMENT_OPTIONS.map(item => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={equipment.includes(item)}
                    onChange={() => handleEquipmentToggle(item)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              {...register("details.additionalNotes")}
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
