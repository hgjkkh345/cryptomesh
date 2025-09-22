import { ethers } from "ethers"
import img2 from "assets/icons/poolIcons/tether-poolcoin.svg"
import img3 from "assets/icons/poolIcons/usdc-poolcoin.svg"
import img4 from "assets/icons/poolIcons/shib-poolcoin.svg"
import img5 from "assets/icons/poolIcons/uni-poolcoin.svg"
import img6 from "assets/icons/poolIcons/link-poolcoin.svg"
import img7 from "assets/icons/poolIcons/wbtc-poolcoin.png"
import img12 from "assets/icons/poolIcons/busd-poolcoin.webp"
import img13 from "assets/icons/poolIcons/cake-poolcoin.png"
import img15 from "assets/icons/poolIcons/baby-doge-poolcoin.png"
import img16 from "assets/icons/poolIcons/trust-wallet-poolcoin.png"
import img17 from "assets/icons/poolIcons/gmt-poolcoin.webp"
import img18 from "assets/icons/poolIcons/c981-poolcoin.png"

const switchNetwork = async () => {
  // @ts-ignore
  const { ethereum } = window
  if (ethereum) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      })
    } catch (error) {
      console.error(error)
    }
  } else {
    alert("Please, change network to ETH")
  }
}

const bscDesc = {
  chainId: `0x${Number(56).toString(16)}`,
  chainName: "Binance Smart Chain Mainnet",
  nativeCurrency: {
    name: "Binance Smart Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.binance.org/",
    "https://bsc-dataseed2.binance.org/",
    "https://bsc-dataseed3.binance.org/",
    "https://bsc-dataseed4.binance.org/",
  ],
  blockExplorerUrls: ["https://bscscan.com"],
}

export const connectToToken = (token: string, chainId?: number) => {
  // @ts-ignore
  const { ethereum } = window
  if (ethereum) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(ethereum)
    if (chainId !== 56) {
      provider.getNetwork().then(r => {
        if (r.chainId !== 1) {
          switchNetwork()
        }
      })
    }
    switch (token) {
      case "ETH":
        return switchNetwork()
      case "USDT":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0xdac17f958d2ee523a2206206994597c13d831ec7", // The address that the token is at.
                symbol: "USDT", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 6, // The number of decimals in the token
                image: img2, // A string url of the token logo
              },
            },
          })
        })
      case "BNB":
        return ethereum.request({
          method: "wallet_addEthereumChain",
          params: [bscDesc],
        })
      case "USDC":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // The address that the token is at.
                symbol: "USDC", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 6, // The number of decimals in the token
                image: img3, // A string url of the token logo
              },
            },
          })
        })
      case "BUSD":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // The address that the token is at.
                symbol: "BUSD", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img12, // A string url of the token logo
              },
            },
          })
        })
      case "SHIB":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce", // The address that the token is at.
                symbol: "SHIB", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img4, // A string url of the token logo
              },
            },
          })
        })
      case "CAKE":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82", // The address that the token is at.
                symbol: "CAKE", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img13, // A string url of the token logo
              },
            },
          })
        })
      case "UNI":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // The address that the token is at.
                symbol: "UNI", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img5, // A string url of the token logo
              },
            },
          })
        })
      case "BABYDOGE":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0xc748673057861a797275cd8a068abb95a902e8de", // The address that the token is at.
                symbol: "BABYDOGE", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 9, // The number of decimals in the token
                image: img15, // A string url of the token logo
              },
            },
          })
        })
      case "LINK":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", // The address that the token is at.
                symbol: "LINK", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img6, // A string url of the token logo
              },
            },
          })
        })
      case "TWT":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x4b0f1812e5df2a09796481ff14017e6005508003", // The address that the token is at.
                symbol: "TWT", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img16, // A string url of the token logo
              },
            },
          })
        })
      case "WBTC":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // The address that the token is at.
                symbol: "WBTC", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 8, // The number of decimals in the token
                image: img7, // A string url of the token logo
              },
            },
          })
        })
      case "GMT":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1", // The address that the token is at.
                symbol: "GMT", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 8, // The number of decimals in the token
                image: img17, // A string url of the token logo
              },
            },
          })
        })
      case "C98":
        return provider.getNetwork().then(r => {
          ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0xaec945e04baf28b135fa7c640f624f8d90f1c3a6", // The address that the token is at.
                symbol: "C98", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: img18, // A string url of the token logo
              },
            },
          })
        })
    }
  }
}