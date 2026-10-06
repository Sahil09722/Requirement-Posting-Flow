export type Category = 'planner' | 'performer' | 'crew';

export interface RequirementFormData {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  category: Category;
  details: Record<string, any>;
}
