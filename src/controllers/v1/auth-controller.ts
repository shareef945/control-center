import { NextFunction, Request, Response } from "express";
import { handleError } from "../../middleware/error";
import jwt from "jsonwebtoken";
import { generateToken /* verifyRefreshToken */ } from "../../utils/generateToken";
import { tokenPayload } from "../../models/v1/auth-model";
import { API_PASSWORD, INVALID_PASSWORD_MASSAGE, STATUS_OK } from "../../config/config";

/** GENERATE TOKEN */
const generateAToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const correctPassword = API_PASSWORD;
    if (req.body.Password !== correctPassword) {
      return res.status(401).json({ message: INVALID_PASSWORD_MASSAGE });
    }
    const token = generateToken(req.body.Password, "admin", "admin");
    res.json({ token });
  } catch (error: any) {
    return handleError(error, res);
  }
};

/*const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = req.body;
    const decoded = jwt.verify(accessToken, API_PASSWORD!, { ignoreExpiration: true }) as tokenPayload;

    const isValidRefreshToken = verifyRefreshToken(refreshToken, decoded.userId);
    if (!isValidRefreshToken) {
      return res.status(401).json({
        error: "Invalid refresh token",
        message: "The refresh token is not valid or expired",
      });
    }

    const newAccessToken = generateToken(API_PASSWORD!, decoded.userId, decoded?.client ? decoded.client : "admin");
    return res.status(STATUS_OK).json({
      message: "Access token refreshed",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};*/

export default { generateAToken /*refreshAccessToken*/ };
