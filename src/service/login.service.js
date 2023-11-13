import PostgreSQLUserRepository from "../repository/PostgreSQLUser.repository";
import bcrypt from "bcrypt";

export async function login(id, pw) {
  const user = await PostgreSQLUserRepository.findById(id);

  if (!user) return 1;
  if (await checkPassword(pw, user.getPassword())) return 0;
  else return 1;
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
