import { Response } from "express";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from "../config/config";
import { ValidationError } from "../utils/utils";

export const handleError = (error: any, res: Response) => {
  console.error(error);
  if (error instanceof ValidationError) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: error.message,
      data: error.formattedErrors,
    });
  }
  return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
    message: error?.message,
    data: [],
  });
};