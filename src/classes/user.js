export class User {
  constructor() {
    this.loggedIn = false;
    this.data = {};
    const userJSON = window.sessionStorage.getItem("user");
    const user = JSON.parse(userJSON);
    if (user) {
      this.data = user;
      this.loggedIn = true;
    }
  }
}
