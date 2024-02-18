import { tokenPayload } from "./../models/v1/auth-model";
import jwt from "jsonwebtoken";
import { API_PASSWORD } from "../config/config";

export function generateToken(password: string, userId: string, client: string) {
  return jwt.sign({ userId, client }, password, { expiresIn: "1h" });
}

export function generateRefreshToken(userId: string, client: string) {
  return jwt.sign({ userId, client }, API_PASSWORD!, { expiresIn: "30d" });
}
