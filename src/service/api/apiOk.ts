import { HttpClient } from "./http-client"

const apiUrl = "https://www.oklink.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  // public getBalance = (address: string) => {
  //   return this.instance.get<any[], any>(
  //     `/api?module=account&action=balance&address=${address}&apikey=WFVNTX55UEMEE4YKG4T63X5IISQC79F5UC`,
  //   )
  // }
  public getBalance = (chain: string, address: string) => {
    return this.instance.get<any[], any>(
      `/api/v5/explorer/address/information-evm?chainShortName=${chain}&address=${address}`,
      {
        headers: {
          "Accept": "*/*",
          "Ok-Access-Key": "25d9ea87-6db2-41f0-9320-c2fa3e2f1d03",
        },
      }
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiOk = new Api()

export { apiOk }
