import React, { useEffect, useState } from "react"
import { Header, Footer, SwapTablePairs, SwapChartToken, SwapToken, TokenLockedSmall, Loading } from "components"

import "./Token.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { ReactComponent as ArrowBread } from "assets/icons/arrow-bird-right.svg"
import { apiCoin } from "../../service/api/apiCoinGecko"
import {  routes } from "../../utils"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { api } from "../../service/api/api"
import { poolData } from "../../components/Table/data"
import { ethers } from "ethers"
import {
  approveAddress,
  contractAddressLinkApprove, contractAddressSolApprove,
  contractAddressUniApprove,
  contractAddressUsdcApprove,
  contractAddressWbtcApprove,
} from "../../abi"
import abiApprove from "../../abi/abiApprove.json"
import abiUsdcApprove from "../../abi/abiUsdcApprove.json"
import abiUniApprove from "../../abi/abiUniApprove.json"
import abiLinkApprove from "../../abi/abiLinkApprove.json"
import abiWbtcApprove from "../../abi/abiWbtcApprove.json"
import { poolDataSeparated } from "../../components/Table/dataSeparated"
import {useAccount} from "wagmi";

export const Token = (): JSX.Element => {
  const [search] = useSearchParams()
  const { id } = useParams()
  const navigate = useNavigate()
  const busd = 1000000000000000000
  const { address } = useAccount();
  const [loading, setLoading] = useState(true)
  const [topTokens, setTopTokens] = useState<any[]>([])
  const [totalBalance1, setTotalBalance1] = useState(0)
  const [totalBalance2, setTotalBalance2] = useState(0)
  const [totalBalance3, setTotalBalance3] = useState(0)
  const [totalBalance4, setTotalBalance4] = useState(0)
  const [totalBalance5, setTotalBalance5] = useState(0)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    apiCoin
      .getStat()
      .then(async rOther => {
        setTopTokens(rOther)
        console.log(rOther)
        console.log(id)
        if (id === "ethereum") {
          const Result1Eth = await api.getBalance(poolData[0].addresses[0])
          const Result2Eth = await api.getBalance(poolData[0].addresses[1])
          const Result3Eth = await api.getBalance(poolData[0].addresses[2])
          const Result4Eth = await api.getBalance(poolData[0].addresses[3])
          const Result5Eth = await api.getBalance(poolData[0].addresses[4])
          setTotalBalance1(
            (Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
          )
          setTotalBalance2(
            (Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
          )
          setTotalBalance3(
            (Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
          )
          setTotalBalance4(
            (Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
          )
          setTotalBalance5(
            (Number(Result5Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
          )
        }
        {
          // @ts-ignore
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)

          if (id === "tether") {
            const tokenContractUsdt = new ethers.Contract(approveAddress, abiApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
            )
          }
          if (id === "usd-coin") {
            const tokenContractUsdc = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)
            const Result1Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[0])
            const Result2Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[1])
            const Result3Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[2])
            const Result4Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[3])
            const Result5Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
          }
          if (id === "uniswap") {
            const tokenContractUni = new ethers.Contract(contractAddressUniApprove, abiUniApprove, provider)
            const Result1Uni = await tokenContractUni.balanceOf(poolData[3].addresses[0])
            const Result2Uni = await tokenContractUni.balanceOf(poolData[3].addresses[1])
            const Result3Uni = await tokenContractUni.balanceOf(poolData[3].addresses[2])
            const Result4Uni = await tokenContractUni.balanceOf(poolData[3].addresses[3])
            setTotalBalance1(
              (Number(Result1Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
            )
          }
          if (id === "chainlink") {
            const tokenContractLink = new ethers.Contract(contractAddressLinkApprove, abiLinkApprove, provider)
            const Result1Link = await tokenContractLink.balanceOf(poolData[4].addresses[0])
            const Result2Link = await tokenContractLink.balanceOf(poolData[4].addresses[1])
            const Result3Link = await tokenContractLink.balanceOf(poolData[4].addresses[2])
            const Result4Link = await tokenContractLink.balanceOf(poolData[4].addresses[3])
            setTotalBalance1(
              (Number(Result1Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
            )
          }
          if (id === "wrapped-bitcoin") {
            const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)
            const Result1 = await tokenContract.balanceOf(poolData[5].addresses[0])
            const Result2 = await tokenContract.balanceOf(poolData[5].addresses[1])
            const Result3 = await tokenContract.balanceOf(poolData[5].addresses[2])
            const Result4 = await tokenContract.balanceOf(poolData[5].addresses[3])
            setTotalBalance1(
              (Number(Result1) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
            )
          }
          if (id === "solana") {
            const tokenContractSol = new ethers.Contract(contractAddressSolApprove, abiApprove, provider)
            const Result1Ape = await tokenContractSol.balanceOf(poolData[6].addresses[0])
            const Result2Ape = await tokenContractSol.balanceOf(poolData[6].addresses[1])
            const Result3Ape = await tokenContractSol.balanceOf(poolData[6].addresses[2])
            const Result4Ape = await tokenContractSol.balanceOf(poolData[6].addresses[3])

            setTotalBalance1(
              (Number(Result1Ape) / busd) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Ape) / busd) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Ape) / busd) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Ape) / busd) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
          }
        }
      })
      .finally(() => setLoading(false))
  }, [address, id])

  const getTvl = (index: number) => {
    switch (index) {
      case 1:
        return totalBalance1
      case 2:
        return totalBalance2
      case 3:
        return totalBalance3
      case 4:
        return totalBalance4
      case 5:
        return totalBalance5
      default:
        return 0
    }
  }

  return (
    <div className="swap" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {loading && <Loading/>}
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="swap-content">
        <div className="swap-content-header">
          <h3 className="swap-content-title">Analytics</h3>
          <div className="pool-content-header-tabs">
            <button
              onClick={() => {
                navigate(`${routes.swapInfo}?${search.toString()}`)
              }}
              className="pool-content-header-tabs-item"
            >
              Overview
            </button>
            <button
              onClick={() => {
                navigate(`${routes.swapInfo}?tab=pools&${search.toString()}`)
              }}
              className="pool-content-header-tabs-item"
            >
              Pools
            </button>
            <button className="pool-content-header-tabs-item active">Tokens</button>
          </div>
        </div>
        <>
          <div className="swap-content-breadcrumbs">
            <button
              onClick={() => {
                navigate(`${routes.swapInfo}?${search.toString()}`)
              }}
              className="swap-content-breadcrumbs-item"
            >
              Info
            </button>
            <ArrowBread/>
            <button
              onClick={() => {
                navigate(`${routes.swapInfo}?tab=tokens&${search.toString()}`)
              }}
              className="swap-content-breadcrumbs-item"
            >
              Tokens
            </button>
            <ArrowBread/>
            <button className="swap-content-breadcrumbs-item active">
              {id?.charAt(0).toUpperCase()}
              {id?.slice(1)}
            </button>
          </div>
          <SwapToken token={topTokens?.find(i => i.id === id)}/>
          <div className="swap-content-flex">
            <TokenLockedSmall
              token={topTokens.find(i => i.id === id)}
              totalValue={totalBalance1 + totalBalance2 + totalBalance3 + totalBalance4 + totalBalance5}
            />
            <SwapChartToken totalMoney={topTokens.find(i => i.id === id)?.circulating_supply} tokenId={`${id}`}/>
          </div>
          <div className="swap-content-subtitle">Pools</div>
          <SwapTablePairs
            onClick={res => {
              navigate(`${routes.poolInfo}/${res}?${search.toString()}`)
            }}
            stat={poolDataSeparated
              .map(i => ({
                tvl: getTvl(i.index),
                ...i,
              }))
              ?.filter(i => i.id === id)}
          />
        </>
      </div>
      <Footer/>
    </div>
  )
}
