import Web3 from "web3"

// @ts-ignore
const web3 = new Web3(window.ethereum as any)

export class Api {
  /**
   * Replaces old beaconcha.in v1 getGas()
   * Returns the same shape you used: { data: { fast: string } }
   */
  public getGas = async () => {
    const gasPrice = await web3.eth.getGasPrice()

    return {
      data: {
        fast: gasPrice, // same usage as before
      },
    }
  }

  public fetch = async () => {
    const block = await web3.eth.getBlock("latest")
    return {
      data: block,
    }
  }
}

const apiBeaconcha = new Api()

export { apiBeaconcha }