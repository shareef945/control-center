import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidationError = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .filter((err) => err.msg !== "Invalid value")
      .map((err) => ({
        field: (err as any).path,
        message: err.msg,
      }));
    throw new ValidationError(formattedErrors);
  }
};

export class ValidationError extends Error {
  formattedErrors: any;
  constructor(formattedErrors: any) {
    super("Validation error");
    this.name = "ValidationError";
    this.message = "Validation Error";
    this.formattedErrors = formattedErrors;
  }
}
