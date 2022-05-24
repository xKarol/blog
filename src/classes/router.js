export class Router {
  static set(url, options = {}) {
    if (!url?.length) throw new Error();

    if (options?.params) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(options?.params.name, options?.params.value);
      window.location.href = url + "?" + queryParams.toString();
    } else {
      window.location.pathname = url;
    }
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
