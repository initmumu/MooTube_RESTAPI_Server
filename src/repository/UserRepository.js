import User from "../domain/User";

class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new Error("An instance was created as an abstract class.");
    }
  }

  findByUid(uid) {
    throw new Error("Methods of abstract classes must be overridden.");
  }

  findById(id) {
    throw new Error("Methods of abstract classes must be overridden.");
  }

  findByName(name) {
    throw new Error("Methods of abstract classes must be overridden.");
  }

  save(user) {
    throw new Error("Methods of abstract classes must be overridden.");
  }

  findAll() {
    throw new Error("Methods of abstract classes must be overridden.");
  }
}

export default UserRepository;
