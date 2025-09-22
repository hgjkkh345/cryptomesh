import { HttpClient } from "./http-client"

const apiUrl = "https://api.1inch.io/v5.0"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public swap = (network: number, params: any) => {
    return this.instance.get<any, any>(`/${network}/swap`, { params })
  }

  public quote = (network: number, params: any) => {
    return this.instance.get<any, any>(`/${network}/quote`, { params })
  }

  public limit = (network: number, data: any) => {
    return this.instance.post<any, any>(`/${network}/limit-order`, data)
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiInch = new Api()

export { apiInch }
