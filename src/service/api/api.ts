import { HttpClient } from "./http-client"

const apiUrl = "https://api.etherscan.io/v2"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getBalance = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=8YHXJWV9BCUVJCYYDBKSX83EHGV2TU88H8`,
    )
  }

  public getTokenBalance = (address: string, addAddress: string) => {
    return this.instance.get<any[], any>(
      `/api?chainid=1&module=account&action=balance&contractaddress=${address}&address=${addAddress}&tag=latest&apikey=8YHXJWV9BCUVJCYYDBKSX83EHGV2TU88H8`,
    )
  }

  public getStats = (address: string) => {
    return this.instance.get<any[], any>(
      `/api?chainid=1&module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=8YHXJWV9BCUVJCYYDBKSX83EHGV2TU88H8`,
    )
  }

  public fetch() {
    return this.instance.get("")
  }
}

const api = new Api()

export { api }
