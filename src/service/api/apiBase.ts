import { HttpClient } from "./http-client"

const apiUrl = "https://api.basescan.org"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=balance&address=${address}&apikey=HIF7ZSUIM64W7MSQ25SDGQ7F7W9MYQW531`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiBase = new Api()

export { apiBase }
