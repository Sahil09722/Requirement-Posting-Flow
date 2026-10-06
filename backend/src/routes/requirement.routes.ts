import { Router } from 'express';
import { createRequirement } from '../controllers/requirement.controller';
import { validate } from '../middlewares/validation.middleware';
import { createRequirementSchema } from '../validators/requirement.validator';

const router = Router();

router.post('/', validate(createRequirementSchema), createRequirement);

export default router;
