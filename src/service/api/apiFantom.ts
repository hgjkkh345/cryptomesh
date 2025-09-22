import { HttpClient } from "./http-client"

const apiUrl = "https://api.ftmscan.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=balance&address=${address}&apikey=GUAIF2TCBGHNEIU2GXCPA2CH8XFSAZYE34`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiFantom = new Api()

export { apiFantom }
