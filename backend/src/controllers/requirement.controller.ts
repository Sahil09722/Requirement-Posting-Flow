import { Request, Response, NextFunction } from 'express';
import * as requirementService from '../services/requirement.service';

export const createRequirement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requirement = await requirementService.createRequirement(req.body);
    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      data: requirement
    });
  } catch (error) {
    next(error);
  }
};
