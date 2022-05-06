import { Avatar } from "./avatar";

export class Header {
  static headerAuthElement = document.querySelector(".header__auth");
  constructor() {}

  updateButtons(logged = false) {
    if (logged) {
      const avatarData = {
        element: Header.headerAuthElement,
        name: "John Doe",
        src: "https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg",
        rounded: "rounded",
      };
      new Avatar(avatarData);

      const container = document.createElement("div");
      container.classList = "header__auth__content";
      Header.headerAuthElement.appendChild(container);

      const username = document.createElement("span");
      username.classList = "header__auth__content__username";
      username.innerText = "John Doe";
      container.appendChild(username);

      const email = document.createElement("span");
      email.classList = "header__auth__content__email";
      email.innerText = "johndoe@gmail.com";
      container.appendChild(email);
    } else {
      this.#createButton("Sign In", "/sign-in.html", "header__auth__link");

      this.#createButton(
        "Sign Up",
        "/sign-up.html",
        "header__auth__link --sign-up"
      );
    }
  }

  #createButton(text, href, className) {
    const btn = document.createElement("a");
    btn.setAttribute("href", href);
    btn.classList = className;
    btn.innerText = text;
    Header.headerAuthElement.appendChild(btn);
  }
}