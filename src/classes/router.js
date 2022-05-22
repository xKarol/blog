export class Router {
  static set(url, options = {}) {
    if (!url?.length) throw new Error();

    window.location.pathname = url;

    if (options?.query) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(options?.query.name, options?.query.value);
      window.location.search = urlParams;
    }
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
