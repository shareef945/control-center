import { body, ValidationChain } from "express-validator";

export const todoValidationMapping: { [key: string]: ValidationChain } = {
  userId: body("userId").notEmpty().withMessage("User ID is required"),
};

export const validateTodo = Object.values(todoValidationMapping);

export const filterPatchTodoValidation = (reqBody: object): ValidationChain[] => {
  const fieldsToUpdate = Object.keys(reqBody);
  const validations = fieldsToUpdate
    .filter((fieldName) => todoValidationMapping.hasOwnProperty(fieldName))
    .map((fieldName) => todoValidationMapping[fieldName])
    .filter(Boolean);
  return validations;
};
