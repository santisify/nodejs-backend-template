import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function createUser(email, password) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    id: Math.floor(Date.now() / 1000), email, password: encryptedPassword
  });

  return createdUser;
}

export async function verifyUser(email, password) {
  const user = await User.findOne({
    where: {
      email: email,
    }
  })

  const result = await bcrypt.compare(password, user.password)

  return result;
}