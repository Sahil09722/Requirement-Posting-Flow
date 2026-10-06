import { UseFormReturn } from "react-hook-form";
import { RequirementFormData, Category } from "@/types/requirement";
import { Users, Mic, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventBasicsProps {
  form: UseFormReturn<RequirementFormData>;
}

export function EventBasics({ form }: EventBasicsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const currentCategory = watch("category");

  const handleCategorySelect = (category: Category) => {
    if (currentCategory !== category) {
      setValue("details", {}, { shouldValidate: false });
    }
    setValue("category", category, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Your Name *</label>
            <input
              {...register("contactName")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. John Doe"
            />
            {errors.contactName && <p className="text-sm text-red-500">{errors.contactName?.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              {...register("contactEmail")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="john@example.com"
            />
            {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail?.message as string}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <input
              {...register("contactPhone")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. +1 234 567 890"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Event Basics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Event Name *</label>
          <input
            {...register("eventName")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Tech Conference 2026"
          />
          {errors.eventName && <p className="text-sm text-red-500">{errors.eventName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Event Type *</label>
          <input
            {...register("eventType")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Corporate Event"
          />
          {errors.eventType && <p className="text-sm text-red-500">{errors.eventType.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Start Date *</label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">End Date *</label>
          <input
            type="date"
            {...register("endDate")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location *</label>
          <input
            {...register("location")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Mumbai"
          />
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Venue (Optional)</label>
          <input
            {...register("venue")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Grand Hyatt"
          />
        </div>
      </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">What are you looking for? *</h3>
        {errors.category && <p className="text-sm text-red-500 mb-4">{errors.category.message}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handleCategorySelect("planner")}
            className={cn(
              "flex flex-col items-center p-4 border rounded-xl text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
              currentCategory === "planner" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            )}
          >
            <Users className="w-8 h-8 mb-2" />
            <span className="font-medium">Event Planner</span>
            <span className="text-xs mt-1 opacity-80">Planning and coordination for your event</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategorySelect("performer")}
            className={cn(
              "flex flex-col items-center p-4 border rounded-xl text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
              currentCategory === "performer" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            )}
          >
            <Mic className="w-8 h-8 mb-2" />
            <span className="font-medium">Performer</span>
            <span className="text-xs mt-1 opacity-80">Artists and entertainment for your event</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategorySelect("crew")}
            className={cn(
              "flex flex-col items-center p-4 border rounded-xl text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
              currentCategory === "crew" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            )}
          >
            <Wrench className="w-8 h-8 mb-2" />
            <span className="font-medium">Crew</span>
            <span className="text-xs mt-1 opacity-80">Technical and operational event staff</span>
          </button>
        </div>
      </div>
    </div>
  );
}
