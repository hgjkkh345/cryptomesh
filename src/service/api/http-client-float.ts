import axios, { AxiosInstance, AxiosResponse } from "axios"
export abstract class HttpClientFloat {
  protected readonly instance: AxiosInstance

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        Accept: "application/json; charset=UTF-8",
        "X-API-KEY": `GwmdyXtCsQxEeZvGxTVcZ0YVs788Y8tZpMVh4c8E`,
        "X-API-SIGN": "4f171e7c8732317037eef352cc56afc12213f6f506a714e4e90fb075d3e1004f\n",
      },
    })

    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError)
  }

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: any) => Promise.reject(error)
}
