import { Requirement } from '../models/requirement.model';
import { IRequirement } from '../types/requirement.types';

export const createRequirement = async (data: IRequirement) => {
  const requirement = new Requirement(data);
  return await requirement.save();
};
