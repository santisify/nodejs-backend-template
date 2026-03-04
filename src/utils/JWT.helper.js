import jwt from 'jsonwebtoken';
import AppError from "./AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(data) {
  const token = jwt.sign({data}, JWT_SECRET);
  return token;
}

export async function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AppError(err.message || 'Invalid token', 401, err.name);
  }
}