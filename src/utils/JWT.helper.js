import * as jose from 'jose';
import AppError from "./AppError.js";

const JWT_SECRET = new TextEncoder(process.env.JWT_SECRET);

export async function generateToken(data) {
  const jwt = await new jose.SignJWT({data})
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  return jwt;
}

export async function verifyToken(token) {
  try {
    await jose.jwtVerify(token, JWT_SECRET);
  } catch (err) {
    throw new AppError(err.message || 'Invalid token', 401, err.name);
  }
}