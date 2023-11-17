import PostgreSQLUserRepository from "../repository/PostgreSQLUser.repository";
import { login, hashPassword } from "../service/login.service";
import User from "../domain/User";

export async function loginController(req, res) {
  const id = req.body.id;
  const pw = req.body.pw;

  const result = await login(id, pw);
  if (result.status == 0)
    res.status(200).json({
      result: 0,
      message: "로그인에 성공하였습니다.",
      token: result.token,
    });
  else {
    res.status(403).json({
      result: 1,
      message: "사용자 정보에 존재하지 않는 계정 정보입니다.",
    });
  }
}

export async function isIdExistController(req, res) {
  const id = req.body.id;

  const result = await PostgreSQLUserRepository.findById(id);

  if (result === undefined) {
    res.status(200).json({ result: 0, message: "사용할 수 있는 ID입니다." });
  } else if (result) {
    res.status(400).json({ result: 1, message: "중복된 ID입니다." });
  }
}

export async function registerAccountController(req, res) {
  const id = req.body.id;
  const pw = await hashPassword(req.body.pw);
  const name = req.body.name;

  const user = new User(undefined, id, pw, name);

  const result = await PostgreSQLUserRepository.save(user);

  if (result) {
    res.status(200).json({ result: 0, message: "회원가입이 완료되었습니다." });
  } else {
    res.status(500).json({ result: 2, message: "예기치 않은 서버의 오류로 인해 요청을 처리하지 못했습니다." });
  }
}
