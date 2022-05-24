export class Router {
  static set(url, options = {}) {
    if (!url?.length) throw new Error();

    window.location.pathname = url;

    if (options?.params) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(options?.params.name, options?.params.value);
      window.location.search = urlParams;
      window.history.replaceState("", "", `${url}?${urlParams}`);
    }
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
