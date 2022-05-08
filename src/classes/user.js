export class User {
  constructor() {
    this.loggedIn = false;
    this.data = {};
    const user = User.get();
    if (user) {
      this.data = user;
      this.loggedIn = true;
    }
  }

  static get() {
    const userJSON = window.sessionStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return user;
  }
}
