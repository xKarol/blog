import { Avatar } from "./avatar";
import Logo from "../assets/logo.svg";
import { navbarItems } from "../config/navbar-items";
import { Dropdown } from "./dropdown";
import { User } from "./user";
import { ROUTE_HOME } from "../config/routes";

export class Header {
  constructor() {
    this.rendered = false;
    this.render();
  }

  render() {
    if (!this.rendered) {
      const headerEl = document.createElement("header");
      headerEl.className = "header container-sm";
      this.headerElement = headerEl;
      document.body.prepend(headerEl);
    }

    if (this.logoEl) {
      this.logoEl.remove();
    }
    if (this.navbarEl) {
      this.navbarEl.remove();
    }
    if (this.authContentEl) {
      this.authContentEl.remove();
    }

    this.logoEl = this.#renderLogo();
    this.navbarEl = this.#renderNavbar();
    this.authContentEl = this.#renderAuthContent();

    console.log(this.headerElement);
    this.headerElement.insertBefore(
      this.logoEl,
      this.headerElement.children[1]
    );
    this.headerElement.insertBefore(
      this.navbarEl,
      this.headerElement.children[2]
    );
    this.headerElement.insertBefore(
      this.authContentEl,
      this.headerElement.children[3]
    );

    this.rendered = true;
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
    const logoEl = document.createElement("a");
    logoEl.href = ROUTE_HOME;
    logoEl.className = "header__logo";
    logoEl.innerHTML = Logo;
    return logoEl;
  }

  #renderHamburgerMenu() {
    const hamburgerEl = document.createElement("div");
    hamburgerEl.className = "header__nav__menu";
    hamburgerEl.id = "hamburger-menu";
    hamburgerEl.innerHTML = "<span></span><span></span><span></span>";
    hamburgerEl.addEventListener("click", this.#handleClickMenu);
    return hamburgerEl;
  }

  #renderNavbar() {
    const navEl = document.createElement("nav");
    navEl.className = "header__nav";
    const hamburgerEl = this.#renderHamburgerMenu(navEl);
    navEl.appendChild(hamburgerEl);
    const navItemsEl = document.createElement("ul");
    navEl.appendChild(navItemsEl);
    navbarItems.forEach(({ name, href }) => {
      const navItemEl = document.createElement("li");
      navItemEl.className = "header__nav__item";
      const navItemAnchorEl = document.createElement("a");
      navItemAnchorEl.href = href;
      navItemAnchorEl.innerText = name;
      navItemEl.appendChild(navItemAnchorEl);
      navItemsEl.appendChild(navItemEl);
    });
    const authContentEl = this.#renderAuthContent("header-auth-menu");
    navEl.appendChild(authContentEl);
    return navEl;
  }

  #renderUserData(user) {
    if (!user?.loggedIn) return;
    const fullName = `${user.firstName} ${user.lastName}`;
    const avatarData = {
      name: fullName,
      src: user?.avatar,
      rounded: "rounded",
    };
    const { element: avatarElement } = new Avatar(avatarData);
    const buttonEl = document.createElement("button");
    buttonEl.className = "header__auth";
    buttonEl.id = "header-userData";
    buttonEl.appendChild(avatarElement);
    const userDataEl = document.createElement("div");
    userDataEl.className = "header__auth__content";
    const usernameEl = document.createElement("span");
    usernameEl.className = "header__auth__content__username";
    usernameEl.innerText = fullName;
    userDataEl.appendChild(usernameEl);
    const emailEl = document.createElement("span");
    emailEl.className = "header__auth__content__email";
    emailEl.innerText = user.email;
    userDataEl.appendChild(emailEl);
    buttonEl.appendChild(userDataEl);

    const dropdownItems = [
      { text: "Create new post", href: "/", icon: "uil uil-plus" },
      { text: "Settings", href: "/", icon: "uil uil-setting" },
      { text: "Log out", icon: "uil uil-signout", action: User.logout },
    ];
    new Dropdown(dropdownItems, buttonEl);
    return buttonEl;
  }

  #renderAuthContent(dataId = "header-auth") {
    const user = User.data;
    let authEl;
    const authContentEl = document.querySelector(".header__auth");
    if (authContentEl) authContentEl.remove();
    if (user?.loggedIn) {
      authEl = this.#renderUserData(user);
    } else {
      authEl = this.#renderButtons(user);
    }
    console.log(authEl);
    authEl.setAttribute("data-id", dataId);
    return authEl;
  }

  #renderButtons(user) {
    if (user?.loggedIn) return;
    const buttonsEl = document.createElement("section");
    buttonsEl.setAttribute("data-id", "header-buttons");
    buttonsEl.className = "header__auth";
    const signInBtn = this.#renderButton(
      "Sign In",
      "/sign-in.html",
      "header__auth__link"
    );
    const signUpBtn = this.#renderButton(
      "Sign Up",
      "/sign-up.html",
      "header__auth__link --sign-up"
    );
    buttonsEl.appendChild(signInBtn);
    buttonsEl.appendChild(signUpBtn);
    return buttonsEl;
  }

  #renderButton(text, href, className) {
    const btnEl = document.createElement("a");
    btnEl.className = className;
    btnEl.href = href;
    btnEl.innerText = text;
    return btnEl;
  }
}
