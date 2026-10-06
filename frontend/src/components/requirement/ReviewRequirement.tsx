import { UseFormReturn } from "react-hook-form";
import { RequirementFormData } from "@/types/requirement";
import { Calendar, MapPin, Tag } from "lucide-react";

interface ReviewRequirementProps {
  form: UseFormReturn<RequirementFormData>;
}

export function ReviewRequirement({ form }: ReviewRequirementProps) {
  const data = form.getValues();

  const formatCamelCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Event Basics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <span className="block text-sm font-medium text-gray-500">Event Name</span>
            <span className="block text-gray-900 font-medium">{data.eventName}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Event Type</span>
            <span className="block text-gray-900">{data.eventType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <span className="block text-sm font-medium text-gray-500">Dates</span>
              <span className="block text-gray-900">{data.startDate} to {data.endDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <span className="block text-sm font-medium text-gray-500">Location & Venue</span>
              <span className="block text-gray-900">{data.location} {data.venue ? `- ${data.venue}` : ""}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div>
              <span className="block text-sm font-medium text-gray-500">Requirement Category</span>
              <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                {data.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Requirements & Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {Object.entries(data.details).map(([key, value]) => {
            if (value === undefined || value === null || value === "") return null;
            if (Array.isArray(value) && value.length === 0) return null;
            
            return (
              <div key={key}>
                <span className="block text-sm font-medium text-gray-500">{formatCamelCase(key)}</span>
                <span className="block text-gray-900">
                  {Array.isArray(value) ? value.join(", ") : String(value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-blue-800">
          Please review the information carefully before submitting. You cannot edit it once submitted.
        </p>
      </div>
    </div>
  );
}
