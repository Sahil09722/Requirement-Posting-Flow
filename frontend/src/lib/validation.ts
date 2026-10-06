import { z } from 'zod';

export const eventBasicsSchema = z.object({
  contactName: z.string().min(2, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().optional(),
  eventName: z.string().min(3, 'Event name must be at least 3 characters'),
  eventType: z.string().min(2, 'Event type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().min(2, 'Location is required'),
  venue: z.string().optional(),
  category: z.enum(['planner', 'performer', 'crew'], {
    errorMap: () => ({ message: 'Please select a category' })
  }),
  details: z.any().optional(),
}).refine(data => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "End date cannot be before start date",
  path: ["endDate"]
});

export const plannerDetailsSchema = z.object({
  services: z.array(z.string()).min(1, 'Select at least one service'),
  expectedGuestCount: z.coerce.number({ invalid_type_error: "Must be a number" }).int().positive('Guest count must be positive'),
  estimatedBudget: z.coerce.number({ invalid_type_error: "Must be a number" }).nonnegative('Budget cannot be negative'),
  experiencePreference: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

export const performerDetailsSchema = z.object({
  performerType: z.string().min(1, 'Performer type is required'),
  genre: z.string().optional(),
  performanceDuration: z.coerce.number({ invalid_type_error: "Must be a number" }).positive('Duration must be positive'),
  numberOfPerformers: z.coerce.number({ invalid_type_error: "Must be a number" }).int().positive('Number of performers must be positive'),
  equipmentRequired: z.array(z.string()).optional(),
  estimatedBudget: z.coerce.number({ invalid_type_error: "Must be a number" }).nonnegative('Budget cannot be negative'),
  additionalNotes: z.string().optional(),
});

export const crewDetailsSchema = z.object({
  crewType: z.string().min(1, 'Crew type is required'),
  numberOfCrewMembers: z.coerce.number({ invalid_type_error: "Must be a number" }).int().positive('Number of crew members must be positive'),
  workingHours: z.coerce.number({ invalid_type_error: "Must be a number" }).positive('Working hours must be positive'),
  equipmentRequirements: z.string().optional(),
  estimatedBudget: z.coerce.number({ invalid_type_error: "Must be a number" }).nonnegative('Budget cannot be negative'),
  additionalRequirements: z.string().optional(),
});
