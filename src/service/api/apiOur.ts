import { HttpClient } from "./http-client"

const apiUrl = "/api/v1"
export type IRefRequest = {
  user: string
  follower: string
}

export type IWithdrawalRequest = {
  user: string
  amount: string
  dbName?: string
}

export type IWithdrawal = {
  user: string
  amount: string
  id: string
  env: string
}

export type IDepositRequest = {
  account: string
  amount: number
  plan: string
  token: string
}

export type IRefUser = {
  user: string
  follower: string
  id: string
  env: string
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getWithdrawals = (user: string) => {
    const dbName = "default"
    return this.instance.get<string, IWithdrawal[]>(`/withdrawals/${user}/${dbName}`)
  }

  public addWithdrawals = (data: IWithdrawalRequest) => {
    const dataResult = {
      user: data.user,
      amount: data.amount,
      dbName: "default",
    }
    return this.instance.post<IWithdrawalRequest, boolean>(`/withdrawals`, dataResult)
  }

  public removeWithdrawals = (user: string, recordId: string) => {
    const dbName = "default"
    return this.instance.delete<string, boolean>(`/withdrawals/${user}/${dbName}/${recordId}`)
  }

  public addDeposit = (data: IDepositRequest) => {
    const dataResult = {
      dbName: "julia",
      ...data,
    }
    return this.instance.post<IDepositRequest, boolean>(`/deposits`, dataResult)
  }

  public addRefAddress = (data: IRefRequest) => {
    return this.instance.post<IRefRequest, boolean>(`/leads`, data)
  }

  public getRefAddress = (user: string) => {
    return this.instance.get<string, IRefUser[]>(`/leads/${user}`)
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiOur = new Api()

export { apiOur }
