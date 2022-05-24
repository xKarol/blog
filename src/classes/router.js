export class Router {
  static set(url, options = {}) {
    if (!url?.length) throw new Error();
    window.location.pathname = url;

    if (options?.params) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(options?.params.name, options?.params.value);
      history.pushState(null, null, "?" + queryParams.toString());
    }
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
