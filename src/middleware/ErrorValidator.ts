import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const errorValidator = (req: Request, res: Response, next: NextFunction) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("validation error :", errors);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default errorValidator;
