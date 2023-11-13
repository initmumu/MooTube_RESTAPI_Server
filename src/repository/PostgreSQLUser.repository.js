import UserRepository from "./UserRepository";
import { LogPrinter } from "../util/LogPrinter";
import { Pool } from "pg";
import User from "../domain/User";

class PostgreSQLUserRepository extends UserRepository {
  constructor() {
    super();
    this.pool = new Pool({
      user: "postgres",
      host: "host",
      database: "mootube",
      password: "password",
      port: 5433,
    });
  }

  async findByUid(uid) {
    const selectQuery = `SELECT * FROM public.user WHERE uid = $1`;
    const values = [uid];

    try {
      const result = await this.pool.query(selectQuery, values);
      if (result) {
        LogPrinter.info(`Finding user by uid is success`);
        const user = new User(result[0], result[1], result[2], result[3]);
        return user;
      } else {
        return undefined;
      }
    } catch (err) {
      LogPrinter.error(err);
      return false;
    }
  }

  async findById(id) {
    const selectQuery = `SELECT * FROM public.user WHERE user_id = $1`;
    const values = [id];

    try {
      const result = await this.pool.query(selectQuery, values);
      if (result) {
        LogPrinter.info(`Finding user by id is success`);
        const userRow = result.rows[0];
        const user = new User(userRow.uid, userRow.user_id, userRow.user_pw, userRow.user_name);
        return user;
      } else {
        return undefined;
      }
    } catch (err) {
      LogPrinter.error(err);
      return false;
    }
  }

  async findByName(name) {
    const selectQuery = `SELECT * FROM public.user WHERE user_name = $1`;
    const values = [name];

    try {
      const result = await this.pool.query(selectQuery, values);
      if (result) {
        LogPrinter.info(`Finding user by name is success`);
        const user = new User(result[0], result[1], result[2], result[3]);
        return user;
      } else {
        return undefined;
      }
    } catch (err) {
      LogPrinter.error(err);
      return false;
    }
  }

  async save(user) {
    const insertQuery = `INSERT INTO public.user (user_id, user_pw, user_name) VALUES ($1, $2, $3);`;
    const values = [user.getId(), user.getPassword(), user.getName()];
    try {
      const result = await this.pool.query(insertQuery, values);
      LogPrinter.info(`New user is successfully inserted to postgreSQL ${result}`);
      return true;
    } catch (err) {
      LogPrinter.error(err);
      return false;
    }
  }

  async findAll() {
    const selectQuery = `SELECT * FROM public.user`;

    try {
      const result = await this.pool.query(selectQuery);
      if (result) {
        LogPrinter.info(`Finding all user is success`);
        return result;
      } else {
        return undefined;
      }
    } catch (err) {
      LogPrinter.error(err);
      return false;
    }
  }
}

export default new PostgreSQLUserRepository();
