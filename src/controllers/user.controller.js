import {
  createUser as createUserApi,
  verifyUser as varifyUserApi,
} from "../services/user.service.js";
import AppError from "../utils/AppError.js";
import {sendJsonResponse, sendSuccessResponse} from "../utils/response.helper.js";
import {generateToken} from "../utils/JWT.helper.js";

export async function createUser(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    throw AppError(`Email or password is required`, 400, `Bad request`);
  }
  const createdUser = await createUserApi(email, password);
  
  return sendSuccessResponse(res, createdUser);
}

export async function login(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    throw AppError('Email or password is required', 400, `Bad request`);
  }
  const result = await varifyUserApi(email, password);
  if (!result) {
    return sendJsonResponse(res, 401, 'Unauthorized', result)
  }

  const token = await generateToken({email});

  return sendSuccessResponse(res, token)
}