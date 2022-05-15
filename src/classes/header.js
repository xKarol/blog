import { Avatar } from "./avatar";
import Logo from "../assets/logo.svg";
import { navbarItems } from "../config/navbar-items";
import { Dropdown } from "./dropdown";
import { User } from "./user";
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
    const authContent = document.querySelector("#header-auth");
    hamburgerMenu.addEventListener("click", this.#handleClickMenu);

    if (authContent) {
      const dropdownItems = [
        { text: "Create new post", href: "/", icon: "uil uil-plus" },
        { text: "Settings", href: "/", icon: "uil uil-setting" },
        { text: "Log out", icon: "uil uil-signout", action: User.logout },
      ];
      new Dropdown(dropdownItems, authContent);
    }
  }

  #handleClickMenu(e) {
    const el = e.target;
    if (el.classList.contains("active")) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
    el.classList.toggle("active");
    window.scrollTo(0, 0);
  }

  #renderLogo() {
    return `<a href="/" class="header__logo">
        ${Logo}
      </a>`;
  }

  #renderNavbar() {
    return `
      <nav class="header__nav">
        <div class="header__nav__menu" id="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          ${navbarItems
            .map(({ name, href }) => {
              return `<li class="header__nav__item">
            <a href="${href}">${name}</a>
            </li>`;
            })
            .join("")}
        </ul>
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
        <button class="header__auth" id="header-auth">
          ${avatarHTML}
          <div class="header__auth__content">
            <span class="header__auth__content__username">${fullName}</span>
            <span class="header__auth__content__email">${user.email}</span>
          </div>
        </button>
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
