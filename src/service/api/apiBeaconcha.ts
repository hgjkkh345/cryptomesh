import Web3 from "web3"

// @ts-ignore
const web3 = new Web3(window.ethereum as any)

export class Api {
  /**
   * Modern fee data for EIP-1559 chains
   * Returns shape similar to your old code
   */
  public getGas = async () => {
    const latestBlock = await web3.eth.getBlock("pending")

    const baseFeePerGas = latestBlock.baseFeePerGas
      ? BigInt(latestBlock.baseFeePerGas.toString())
      : BigInt(await web3.eth.getGasPrice())

    // simple safe default priority fee = 2 gwei
    const priorityFee = Web3.utils.toWei("2", "gwei")
    const maxPriorityFeePerGas = BigInt(priorityFee)

    // max fee = base * 2 + priority
    // @ts-ignore
    const maxFeePerGas = baseFeePerGas * 2n + maxPriorityFeePerGas

    return {
      data: {
        fast: maxFeePerGas.toString(), // legacy fallback if needed
        maxFeePerGas: maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
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