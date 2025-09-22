import React, { useEffect, useRef, useState } from "react"
import cn from "classnames"

import { ReactComponent as Arrow } from "assets/icons/arrow-bird-down.svg"
import { ReactComponent as Polygon } from "assets/icons/pyramide.svg"
import eth from "assets/icons/poolIcons/eth-poolcoin.svg"
import bsc from "assets/images/bsc1-logo.png"
import apos from "assets/images/apos-1.png"
import opt from "assets/images/op-logo.webp"
import arb from "assets/icons/all-chains/arb-1.svg"
import fant from "assets/icons/all-chains/fantom-new.svg"
import avax from "assets/icons/all-chains/aval-1.svg"
import base from "assets/icons/all-chains/base1.svg"
import manta from "assets/icons/all-chains/marta1.svg"
import polygon from "assets/icons/all-chains/matic-new.svg"
import "./NetworkDropdown.scss"
import { useClickOutside } from "../../utils"

type Props = {
  account: string
  mobileRight?: boolean
  onChangeCoin?: (networkId: number) => void
  chainId?: number
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
const polygonDesc = {
  chainId: `0x${Number(137).toString(16)}`,
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "Matic Token",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: [
    "https://polygon-rpc.com/",
  ],
  blockExplorerUrls: ["https://polygon.technology/"],
}
const opDesc = {
  chainId: `0x${Number(10).toString(16)}`,
  chainName: "OP Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://mainnet.optimism.io/",
  ],
  blockExplorerUrls: ["https://optimistic.etherscan.io/"],
}
const baseDesc = {
  chainId: `0x${Number(8453).toString(16)}`,
  chainName: "Base",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://mainnet.base.org",
  ],
  blockExplorerUrls: ["https://base.blockscout.com/"],
}

const arbitrumDesc = {
  chainId: `0x${Number(42161).toString(16)}`,
  chainName: "Arbitrum One",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://arb1.arbitrum.io/rpc",
  ],
  blockExplorerUrls: ["https://arbiscan.io/"],
}

const avalanDesc = {
  chainId: `0x${Number(43114).toString(16)}`,
  chainName: "Avalanche (C-Chain)",
  nativeCurrency: {
    name: "Avalanche Token",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [
    "https://api.avax.network/ext/bc/C/rpc",
  ],
  blockExplorerUrls: ["https://snowtrace.io/"],
}
const fantomDesc = {
  chainId: `0x${Number(250).toString(16)}`,
  chainName: "Fantom Opera",
  nativeCurrency: {
    name: "Fantom Token",
    symbol: "FTM",
    decimals: 18,
  },
  rpcUrls: [
    "https://rpc.ankr.com/fantom/",
  ],
  blockExplorerUrls: ["https://ftmscan.com/"],
}
const mantaDesc = {
  chainId: `0x${Number(169).toString(16)}`,
  chainName: "Manta Pacific L2 Rollup",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://pacific-rpc.manta.network/http",
  ],
  blockExplorerUrls: ["https://pacific-info.manta.network/"],
}

const networks = [
  {
    img: eth,
    name: "Ethereum",
    id: 1,
  },
  {
    img: bsc,
    name: "BNB Chain",
    id: 56,
  },
  {
    img: opt,
    name: "Optimism",
    id: 10,
  },
  {
    img: arb,
    name: "Arbitrum",
    id: 42161,
  },
  {
    img: fant,
    name: "Fantom",
    id: 250,
  },
  {
    img: avax,
    name: "Avalanche",
    id: 43114,
  },
  {
    img: base,
    name: "Base",
    id: 8453,
  },
  {
    img: polygon,
    name: "Polygon",
    id: 137,
  },
  {
    img: manta,
    name: "Manta",
    id: 169,
  },
  {
    img: apos,
    name: "Aptos",
    id: 0,
    disabled: true,
  },
]

export const NetworkDropdown = ({ account, mobileRight, onChangeCoin, chainId }: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState<any>(networks[0])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const toggleDropdown = () => setOpen(!open)

  useEffect(() => {
    if (chainId) {
      setCurrentNetwork(networks.find(i => i.id === chainId) || undefined)
    }
  }, [chainId])

  const onChangeNetwork = (networkId: number) => {
    if (networkId === 1) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to ETH")
      }
    }

    if (networkId === 56) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [bscDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to BSC")
      }
    }

    if (networkId === 10) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [opDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to OP")
      }
    }
    if (networkId === 42161) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [arbitrumDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Arbitrum")
      }
    }
    if (networkId === 250) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [fantomDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Fantom")
      }
    }
    if (networkId === 43114) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [avalanDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Avalanche")
      }
    }
    if (networkId === 8453) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [baseDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Base")
      }
    }
    if (networkId === 169) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [mantaDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Manta")
      }
    }
    if (networkId === 137) {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        try {
          ethereum.request({
            method: "wallet_addEthereumChain",
            params: [polygonDesc],
          }).then(() => {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        alert("Please, change network to Polygon")
      }
    }
  }

  return (
    <div
      className={cn("network-dropdown", {
        active: open,
        mobileRight: mobileRight,
      })}
    >
      <button onClick={toggleDropdown} className="network-dropdown-trigger">
        <img src={currentNetwork?.img} alt="network" className="network-dropdown-trigger-img" />
        <div className="network-dropdown-trigger-name">{currentNetwork?.name}</div>
        <Arrow />
      </button>
      <div className="network-dropdown-content">
        <div className="network-dropdown-content-header">Select a Network</div>
        {networks.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              onChangeNetwork(item.id)
              onChangeCoin && onChangeCoin(item.id)
              toggleDropdown()
            }}
            disabled={item.disabled}
            className={cn("network-dropdown-content-item", {
              disabled: item.disabled,
            })}
          >
            <img src={item.img} alt="network" className="network-dropdown-content-item-img" />
            <div className="network-dropdown-content-item-name">{item.name}</div>
            <div className="network-dropdown-content-item-coming">
              <Polygon />
              Coming Soon...
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
