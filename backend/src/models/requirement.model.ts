import mongoose, { Schema, Document } from 'mongoose';
import { IRequirement, Category } from '../types/requirement.types';

export interface RequirementDocument extends IRequirement, Document {}

const requirementSchema = new Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    venue: { type: String },
    category: {
      type: String,
      enum: ['planner', 'performer', 'crew'],
      required: true,
    },
    details: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

export const Requirement = mongoose.model<RequirementDocument>('Requirement', requirementSchema);
