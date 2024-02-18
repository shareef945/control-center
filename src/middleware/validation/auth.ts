import { body, ValidationChain } from "express-validator";

export const refreshTokenValidationMapping: { [key: string]: ValidationChain } = {
  accessToken: body("accessToken").isString().notEmpty().withMessage("accessToken must be a string and is required"),
  refreshToken: body("refreshToken").isString().notEmpty().withMessage("refreshToken must be a string and is required"),
};

export const validateRefreshTokenPost = Object.values(refreshTokenValidationMapping);