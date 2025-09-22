import { HttpClient } from "./http-client"

const apiUrl = "https://api.bscscan.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=balance&address=${address}&apikey=VHGVFXS17Y12534CDK49IQZHS2VWYJYJXG`,
    )
  }

  // public getBalances = (params: any) => {
  //   return this.instance.get<any[], any>(
  //     `/api?module=account&action=balance&apikey=VHGVFXS17Y12534CDK49IQZHS2VWYJYJXG&address=${params.map(i => `${i}%2C%20`)}`,
  //   )
  // }

  public getTokenBalance = (address: string, addAddress: string) => {
    return this.instance.get<any[], any>(
      `/api?module=account&action=tokenbalance&contractaddress=${address}&address=${addAddress}&tag=latest&apikey=Z9T7GVUPQ9S8K4TY79R52YUUE54AAUA1H5`,
    )
  }
  public fetch() {
    return this.instance.get("")
  }
}

const apiScan = new Api()

export { apiScan }
