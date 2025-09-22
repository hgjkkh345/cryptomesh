import { HttpClient } from "./http-client"

const apiUrl = "https://api.arbiscan.io"
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
      `/api?module=account&action=tokenbalance&contractaddress=0x912ce59144191c1204e64559fe8253a0e49e6548&address=${address}&tag=latest&apikey=I1Q87XR3XK8SUVTTA1BTFVSQ3XWS65VBYC`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiArb = new Api()

export { apiArb }
