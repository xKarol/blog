export class User {
  constructor() {
    this.loggedIn = false;
    this.data = {};
    const user = User.get();
    if (user.loggedIn) {
      this.data = user;
    }
  }

  static get() {
    const userJSON = window.sessionStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return user ?? { loggedIn: false };
  }

  static save(data){
    
  }
}
