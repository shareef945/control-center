import { NextFunction, Request, Response } from "express";
import { ValidationChain } from "express-validator";

export const validateFields = <T>(allowedFieldsMapping: { [key: string]: ValidationChain }) => {
  const allowedFields: Array<keyof T> = Object.keys(allowedFieldsMapping) as Array<keyof T>;
  return (req: Request, res: Response, next: NextFunction) => {
    const fieldsInRequestBody = Object.keys(req.body);
    const disallowedFields = fieldsInRequestBody.filter((field) => !allowedFields.includes(field as keyof T));
    if (disallowedFields.length > 0) {
      return res.status(400).json({ message: "Fields not recognised:", disallowedFields });
    }
    next();
  };
};
