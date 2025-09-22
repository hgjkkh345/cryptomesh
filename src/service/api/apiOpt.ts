import { HttpClient } from "./http-client"

const apiUrl = "https://api-optimistic.etherscan.io"
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
  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=tokenbalance&contractaddress=0x4200000000000000000000000000000000000042&address=${address}&tag=latest&apikey=WFVNTX55UEMEE4YKG4T63X5IISQC79F5UC`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiOpt = new Api()

export { apiOpt }
