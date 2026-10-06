export type Category = 'planner' | 'performer' | 'crew';

export interface IRequirement {
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
