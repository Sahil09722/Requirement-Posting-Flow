export type Category = 'planner' | 'performer' | 'crew';

export interface RequirementFormData {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  category: Category;
  details: Record<string, any>;
}
