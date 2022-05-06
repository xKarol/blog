export class Header {
  static headerAuthElement = document.querySelector(".header__auth");
  constructor() {}

  updateButtons(logged = false) {
    if (logged) {
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
