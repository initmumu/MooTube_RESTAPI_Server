class User {
  constructor(uid, id, password, name) {
    this.uid = uid;
    this.id = id;
    this.password = password;
    this.name = name;
  }

  getUid() {
    return this.uid;
  }

  setUid(uid) {
    this.uid = uid;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

export default User;
