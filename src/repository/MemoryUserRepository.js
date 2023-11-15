import UserRepository from "./UserRepository";

class MemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.store = {};
    this.sequence = 0;
  }

  findByUid(uid) {
    if (uid in this.store) return this.store[uid];
    return undefined;
  }

  findById(id) {
    for (const value of Object.values(this.store)) if (value.id === id) return value;
    return undefined;
  }

  findByName(name) {
    for (const value of Object.values(this.store)) if (value.name === name) return value;
    return undefined;
  }

  save(user) {
    user.setUid(++this.sequence);
    this.store[user.getUid()] = user;
    return user;
  }

  findAll() {
    return Object.values(this.store);
  }
}

export default MemoryUserRepository;
