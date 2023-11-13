import PostgreSQLUserRepository from "../repository/PostgreSQLUser.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function login(id, pw) {
  const user = await PostgreSQLUserRepository.findById(id);

  if (!user) return { status: 1 };
  if (await checkPassword(pw, user.getPassword())) {
    const token = jwt.sign({ id: user.getId(), name: user.getName() }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: "MooTube",
    });
    return { status: 0, token: token };
  } else return { status: 1 };
}

export async function hashPassword(pw) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pw, saltRounds);
  return hashedPassword;
}

export async function checkPassword(pw, hashedPw) {
  const match = await bcrypt.compare(pw, hashedPw);
  return match;
}
