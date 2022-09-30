export default class Host {
  static url() {
    console.log(process.env.URL)
    return process.env.URL
  }
  static urlApi() {
    console.log(process.env.URL_API)
    return process.env.URL_API
  }
}