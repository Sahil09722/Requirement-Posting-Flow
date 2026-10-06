export type Category = 'planner' | 'performer' | 'crew';

export interface IRequirement {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  eventName: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue?: string;
  category: Category;
  details: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
