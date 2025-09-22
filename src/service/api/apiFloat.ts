import { HttpClientFloat } from "./http-client-float"

const apiUrl = "https://fixedfloat.com/api/v2"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClientFloat {
  public constructor() {
    super(apiUrl as string)
  }
  public getCurrencies = () => {
    return this.instance.post<any[], any>(`/ccies`)
  }
  public fetch() {
    return this.instance.get("")
  }
}

const apiFloat = new Api()

export { apiFloat }
