import { Avatar } from "./avatar";
import Logo from "../assets/logo.svg";
export class Header {
  constructor(user) {
    if (!user) throw new Error("User data was not provided");
    this.user = user;
    this.#render();
  }

  #render() {
    const headerEl = document.createElement("header");
    headerEl.classList.add("header");
    const logo = this.#renderLogo();
    const navbar = this.#renderNavbar();
    const buttons = this.#renderButtons();
    headerEl.innerHTML = logo + navbar + buttons;
    document.body.prepend(headerEl);
  }

  #renderLogo() {
    return `<a href="/" class="header__logo">
        <img src="${Logo}" alt="blog logo" />
      </a>`;
  }

  #renderNavbar() {
    return `
      <nav class="header__nav">
        <ul>
          <li class="header__nav__item">Home</li>
          <li class="header__nav__item">About</li>
          <li class="header__nav__item">Contact</li>
        </ul>
        <i class="uil uil-bars header__nav__menu"></i>
      </nav>
    `;
  }

  #renderButtons() {
    const user = this.user;
    console.log(user);
    if (user.loggedIn) {
      const fullName = `${user.firstName} ${user.lastName}`;
      const avatarData = {
        name: fullName,
        src: user?.avatar,
        rounded: "rounded",
      };
      const { html: avatarHTML } = new Avatar(avatarData);
      return `
        <section class="header__auth">
          ${avatarHTML}
          <div class="header__auth__content">
            <span class="header__auth__content__username">${fullName}</span>
            <span class="header__auth__content__email">${user.email}</span>
          </div>
        </section>
      `;
    } else {
      return `
        <section class="header__auth">
          ${this.#renderButton(
            "Sign In",
            "/sign-in.html",
            "header__auth__link"
          )}
          ${this.#renderButton(
            "Sign Up",
            "/sign-up.html",
            "header__auth__link --sign-up"
          )}
        </section>
      `;
    }
  }

  // updateButtons(logged = false) {
  //   if (logged) {
  //     const user = JSON.parse(window.sessionStorage.getItem("user"));
  //     const fullName = `${user.firstName} ${user.lastName}`;

  //     const avatarData = {
  //       name: fullName,
  //       src: "https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg",
  //       rounded: "rounded",
  //     };
  //     const { html: avatarHTML } = new Avatar(avatarData);
  //     Header.headerAuthElement.innerHTML += avatarHTML;

  //     const container = document.createElement("div");
  //     container.classList = "header__auth__content";
  //     Header.headerAuthElement.appendChild(container);

  //     const username = document.createElement("span");
  //     username.classList = "header__auth__content__username";
  //     username.innerText = fullName;
  //     container.appendChild(username);

  //     const email = document.createElement("span");
  //     email.classList = "header__auth__content__email";
  //     email.innerText = user.email;
  //     container.appendChild(email);
  //   } else {
  //     this.#createButton("Sign In", "/sign-in.html", "header__auth__link");

  //     this.#createButton(
  //       "Sign Up",
  //       "/sign-up.html",
  //       "header__auth__link --sign-up"
  //     );
  //   }
  // }

  #renderButton(text, href, className) {
    return `
      <a class="${className}" href="${href}">${text}</a>
    `;
  }
}
