import { HttpClient } from "./http-client"

const apiUrl = "https://api.polygonscan.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=balance&address=${address}&apikey=6VBM3PUM9JGAMKMYIXAU73UZQCDJE4Z2VW`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiPol = new Api()

export { apiPol }
