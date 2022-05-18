export class Route {
  static set(url) {
    if (!url?.length) throw new Error();
    window.location.pathname = url;
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
