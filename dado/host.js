export default class Host {
  static url() {
    return process.env.url
    return "https://gestaocomercial1.herokuapp.com";
    return "http://lucas-pc:3000";
    return "http://localhost:3000";

  }
  static urlApi() {
    return process.env.urlApi
    return "https://gestaocomercialapi.herokuapp.com";
    return "http://lucas-pc:3001";
    return "http://localhost:3001";

  }
}