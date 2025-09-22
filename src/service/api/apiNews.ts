import { HttpClient } from "./http-client"

const apiUrl = "https://cryptonews-api.com/api/v1"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }
  public getGeneralNews = (page: number, items: number, topic?: string) => {
    return this.instance.get<any[], any>(
      `/category?section=general&items=${items}&page=${page}${
        topic && `&topic=${topic.replaceAll(" ", "+")}`
      }&token=ccuikkjkktytqeeah7gic6xiv0ob0f68tfxbv0wh`,
    )
  }
  public fetch() {
    return this.instance.get("")
  }
}

const apiNews = new Api()

export { apiNews }
