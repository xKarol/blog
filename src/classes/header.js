import { Avatar } from "./avatar";
import Logo from "../assets/logo.svg";
import { navbarItems } from "../config/navbar-items";
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
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    hamburgerMenu.addEventListener("click", this.#handleClickMenu);
  }

  #handleClickMenu(e) {
    const el = e.target;
    el.classList.toggle("active");
  }

  #renderLogo() {
    return `<a href="/" class="header__logo">
        ${Logo}
      </a>`;
  }

  #renderNavbar() {
    return `
      <nav class="header__nav">
        <ul>
          ${navbarItems.map(({ name, href }) => {
            return `<li class="header__nav__item">
            <a href="${href}">${name}</a>
            </li>`;
          })}
        </ul>
        <div class="header__nav__menu" id="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    `;
  }

  #renderButtons() {
    const user = this.user;
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

  #renderButton(text, href, className) {
    return `
      <a class="${className}" href="${href}">${text}</a>
    `;
  }
}
