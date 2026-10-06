import { z } from 'zod';

const plannerDetailsSchema = z.object({
  services: z.array(z.string()).min(1, 'Select at least one service'),
  expectedGuestCount: z.number().int().positive('Guest count must be positive'),
  estimatedBudget: z.number().nonnegative('Budget cannot be negative'),
  experiencePreference: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

const performerDetailsSchema = z.object({
  performerType: z.string().min(1, 'Performer type is required'),
  genre: z.string().optional(),
  performanceDuration: z.number().positive('Duration must be positive'),
  numberOfPerformers: z.number().int().positive('Number of performers must be positive'),
  equipmentRequired: z.array(z.string()).optional(),
  estimatedBudget: z.number().nonnegative('Budget cannot be negative'),
  additionalNotes: z.string().optional(),
});

const crewDetailsSchema = z.object({
  crewType: z.string().min(1, 'Crew type is required'),
  numberOfCrewMembers: z.number().int().positive('Number of crew members must be positive'),
  workingHours: z.number().positive('Working hours must be positive'),
  equipmentRequirements: z.string().optional(),
  estimatedBudget: z.number().nonnegative('Budget cannot be negative'),
  additionalRequirements: z.string().optional(),
});

export const createRequirementSchema = z.object({
  body: z.object({
    eventName: z.string().min(3),
    eventType: z.string().min(2),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().min(2),
    venue: z.string().optional(),
    category: z.enum(['planner', 'performer', 'crew']),
    details: z.any()
  }).superRefine((data, ctx) => {
    // Validate dates
    if (new Date(data.endDate) < new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date cannot be before start date",
        path: ["endDate"]
      });
    }

    // Validate category details
    if (data.category === 'planner') {
      const result = plannerDetailsSchema.safeParse(data.details);
      if (!result.success) {
        result.error.issues.forEach(issue => {
          ctx.addIssue({ ...issue, path: ["details", ...issue.path] });
        });
      }
    } else if (data.category === 'performer') {
      const result = performerDetailsSchema.safeParse(data.details);
      if (!result.success) {
        result.error.issues.forEach(issue => {
          ctx.addIssue({ ...issue, path: ["details", ...issue.path] });
        });
      }
    } else if (data.category === 'crew') {
      const result = crewDetailsSchema.safeParse(data.details);
      if (!result.success) {
        result.error.issues.forEach(issue => {
          ctx.addIssue({ ...issue, path: ["details", ...issue.path] });
        });
      }
    }
  })
});
