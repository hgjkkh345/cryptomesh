import { HttpClient } from "./http-client"

const apiUrl = "https://beaconcha.in/api/v1"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getGas = () => {
    return this.instance.get<any[], any>(`/execution/gasnow`)
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiBeaconcha = new Api()

export { apiBeaconcha }
