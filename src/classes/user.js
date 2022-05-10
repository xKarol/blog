export class User {
  constructor() {
    this.data = {};
    const user = User.get();
    if (user.loggedIn === true) {
      return user;
    }
  }

  static get() {
    const userJSON = window.sessionStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return user ?? { loggedIn: false };
  }

  static save(data) {
    sessionStorage.setItem("user", JSON.stringify({ ...data, loggedIn: true }));
  }
}
