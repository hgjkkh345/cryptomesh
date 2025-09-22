import { HttpClient } from "./http-client"

const apiUrl = "https://pro-api.coingecko.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getStat = () => {
    return this.instance.get<any[], any>(
      `/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20weth%2C%20solana%2C%20binancecoin%2C%20optimism%2C%20avalanche-2%2C%20arbitrum%2C%20fantom%2C%20manta-network%2C%20polygon-ecosystem-token%2C%20binance-usd%2C%20pancakeswap-token%2C%20baby-doge-coin%2C%20trust-wallet-token%2C%20stepn%2C%20coin98%2C%20tether%2C%20usd-coin%2C%20uniswap%2C%20chainlink%2C%20wrapped-bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_pro_api_key=CG-fRnbDfaqDuWTXht3orzXW1s6`,
    )
  }

  public getChart = (id: string) => {
    return this.instance.get<any[], any>(
      `/api/v3/coins/${id}/market_chart?vs_currency=usd&days=29&interval=daily&x_cg_pro_api_key=CG-fRnbDfaqDuWTXht3orzXW1s6	`,
    )
  }

  public getChartDaily = (id: string) => {
    return this.instance.get<any[], any>(
      `/api/v3/coins/${id}/market_chart?vs_currency=usd&days=29&x_cg_pro_api_key=CG-fRnbDfaqDuWTXht3orzXW1s6	`,
    )
  }

  public getPools = () => {
    return this.instance.get<any[], any>(`/api/v3/exchanges/binance`)
  }

  public fetch() {
    return this.instance.get("")
  }
}

const apiCoin = new Api()

export { apiCoin }
