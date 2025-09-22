import React, { useEffect, useState } from "react"
import { Header, Footer, SwapPair, Loading, SwapChartPools, TokenLocked } from "components"

import "./PoolInfo.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { ReactComponent as ArrowBread } from "assets/icons/arrow-bird-right.svg"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { api } from "../../service/api/api"
import { poolData } from "../../components/Table/data"
import { ethers } from "ethers"
import {
  approveAddress,
  contractAddressLinkApprove,
  contractAddressUniApprove,
  contractAddressUsdcApprove,
  contractAddressWbtcApprove,
  contractAddressBusdApprove,
  contractAddressCakeApprove,
  contractAddressBabyDogeApprove,
  contractAddressTwtApprove,
  contractAddressGmtApprove, contractAddressC98Approve, contractAddressSolApprove,
} from "../../abi"
import abiApprove from "../../abi/abiApprove.json"
import abiUsdcApprove from "../../abi/abiUsdcApprove.json"
import abiUniApprove from "../../abi/abiUniApprove.json"
import abiLinkApprove from "../../abi/abiLinkApprove.json"
import abiWbtcApprove from "../../abi/abiWbtcApprove.json"
import abiBusdApprove from "../../abi/abiBusdApprove.json"
import abiC98Approve from "../../abi/abiC98Approve.json"
import abiCakeApprove from "../../abi/abiCakeApprove.json"
import abiBabyApprove from "../../abi/abiBabyDogeApprove.json"
import abiGmtApprove from "../../abi/abiGmtApprove.json"
import abiTwtApprove from "../../abi/abiTwtApprove.json"
import { poolDataSeparated } from "../../components/Table/dataSeparated"
import { routes } from "../../utils"
import {poolDataBsc} from "../../components/Table/dataBsc";
import {apiScan} from "../../service/api/apiScan";
import {poolDataSeparatedBsc} from "../../components/Table/dataSeparatedBsc";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import {poolDataOpt} from "../../components/Table/dataOpt";
import {apiOpt} from "../../service/api/apiOpt";
import {poolDataArb} from "../../components/Table/dataArb";
import {apiArb} from "../../service/api/apiArb";
import {apiFantom} from "../../service/api/apiFantom";
import {poolDataFantom} from "../../components/Table/dataFantom";
import {apiPol} from "../../service/api/apiPol";
import {poolDataPol} from "../../components/Table/dataPol";
import {apiBase} from "../../service/api/apiBase";
import {poolDataBase} from "../../components/Table/dataBase";
import {poolDataSeparatedOpt} from "../../components/Table/dataSeparatedOpt";
import {poolDataSeparatedArb} from "../../components/Table/dataSeparatedArb";
import {poolDataSeparatedFantom} from "../../components/Table/dataSeparatedFantom";
import {poolDataSeparatedBase} from "../../components/Table/dataSeparatedBase";
import {poolDataSeparatedAvax} from "../../components/Table/dataSeparatedAvax";
import {poolDataSeparatedManta} from "../../components/Table/dataSeparatedManta";
import {poolDataSeparatedPol} from "../../components/Table/dataSeparatedPol";

export const PoolInfo = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [search] = useSearchParams()
  const [token, setToken] = useState("")
  const [indexGlobal, setIndexGlobal] = useState("")
  const [pair, setPair] = useState<any>(undefined)
  const [loading, setLoading] = useState(false)
  const [topTokens, setTopTokens] = useState<any[]>([])
  const busd = 1000000000000000000
  const [totalBalance1, setTotalBalance1] = useState(0)
  const [totalBalance2, setTotalBalance2] = useState(0)
  const [totalBalance3, setTotalBalance3] = useState(0)
  const [totalBalance4, setTotalBalance4] = useState(0)
  const [totalBalance5, setTotalBalance5] = useState(0)
  const { address } = useAccount();
  const chainId = getChainId(config)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (!!id?.length) {
      const localToken = id.split("-")[0] === 'WBTC1' || id.split("-")[0] === 'WBTC2' ? 'WBTC' : id.split("-")[0]
      setToken(localToken)
      setIndexGlobal(id.split("-")[1])
      if (chainId === 1 || !address) {
        setPair(poolDataSeparated?.find(i => i.token === localToken && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 56) {
        setPair(poolDataSeparatedBsc?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 10) {
        setPair(poolDataSeparatedOpt?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 42161) {
         setPair(poolDataSeparatedArb?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 250) {
         setPair(poolDataSeparatedFantom?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 8453) {
         setPair(poolDataSeparatedBase?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 43114) {
         setPair(poolDataSeparatedAvax?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 169) {
         setPair(poolDataSeparatedManta?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
      if (chainId === 137) {
         setPair(poolDataSeparatedPol?.find(i => i.token === id.split("-")[0] && i.index === Number(id.split("-")[1])))
      }
    }
  }, [id, chainId])

  useEffect(() => {
    apiCoin
      .getStat()
      .then(async rOther => {
        setTopTokens(rOther)
        if (id?.includes("ETH")) {
          const Result1Eth = await api.getBalance(poolData[0].addresses[0])
          const Result2Eth = await api.getBalance(poolData[0].addresses[1])
          const Result3Eth = await api.getBalance(poolData[0].addresses[2])
          const Result4Eth = await api.getBalance(poolData[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
            )
          }
        }
        if (id?.includes("OP")) {
          const Result1Op = await apiOpt.getBalance(poolDataOpt[0].addresses[0])
          const Result2Op = await apiOpt.getBalance(poolDataOpt[0].addresses[1])
          const Result3Op = await apiOpt.getBalance(poolDataOpt[0].addresses[2])
          const Result4Op = await apiOpt.getBalance(poolDataOpt[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Op.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataOpt[0].id)?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Op.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataOpt[0].id)?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Op.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataOpt[0].id)?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Op.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataOpt[0].id)?.current_price,
            )
          }
        }
        if (id?.includes("ARB")) {
          const Result1Arb = await apiArb.getBalance(poolDataArb[0].addresses[0])
          const Result2Arb = await apiArb.getBalance(poolDataArb[0].addresses[1])
          const Result3Arb = await apiArb.getBalance(poolDataArb[0].addresses[2])
          const Result4Arb = await apiArb.getBalance(poolDataArb[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Arb.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataArb[0].id)?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Arb.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataArb[0].id)?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Arb.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataArb[0].id)?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Arb.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataArb[0].id)?.current_price,
            )
          }
        }
        if (id?.includes("FTM")) {
          const Result1Ftm = await apiFantom.getBalance(poolDataFantom[0].addresses[0])
          const Result2Ftm = await apiFantom.getBalance(poolDataFantom[0].addresses[1])
          const Result3Ftm = await apiFantom.getBalance(poolDataFantom[0].addresses[2])
          const Result4Ftm = await apiFantom.getBalance(poolDataFantom[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Ftm.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataFantom[0].id)?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Ftm.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataFantom[0].id)?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Ftm.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataFantom[0].id)?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Ftm.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataFantom[0].id)?.current_price,
            )
          }
        }
        if (id?.includes("POL")) {
          const Result1Pol = await apiPol.getBalance(poolDataPol[0].addresses[0])
          const Result2Pol = await apiPol.getBalance(poolDataPol[0].addresses[1])
          const Result3Pol = await apiPol.getBalance(poolDataPol[0].addresses[2])
          const Result4Pol = await apiPol.getBalance(poolDataPol[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Pol.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataPol[0].id)?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Pol.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataPol[0].id)?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Pol.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataPol[0].id)?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Pol.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataPol[0].id)?.current_price,
            )
          }
        }
        if (id?.includes("ETH(Base)")) {
          const Result1Base = await apiBase.getBalance(poolDataBase[0].addresses[0])
          const Result2Base = await apiBase.getBalance(poolDataBase[0].addresses[1])
          const Result3Base = await apiBase.getBalance(poolDataBase[0].addresses[2])
          const Result4Base = await apiBase.getBalance(poolDataBase[0].addresses[3])
          if (!totalBalance1) {
            setTotalBalance1(
              (Number(Result1Base.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataBase[0].id)?.current_price,
            )
          }
          if (!totalBalance2) {
            setTotalBalance2(
              (Number(Result2Base.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataBase[0].id)?.current_price,
            )
          }
          if (!totalBalance3) {
            setTotalBalance3(
              (Number(Result3Base.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataBase[0].id)?.current_price,
            )
          }
          if (!totalBalance4) {
            setTotalBalance4(
              (Number(Result4Base.result) / busd) * rOther?.find(iOther => iOther.id ===poolDataBase[0].id)?.current_price,
            )
          }
        }
        if (id?.includes("BNB")) {
          const Result1Eth = await apiScan.getBalance(poolDataBsc[0].addresses[0])
          const Result2Eth = await apiScan.getBalance(poolDataBsc[0].addresses[1])
          const Result3Eth = await apiScan.getBalance(poolDataBsc[0].addresses[2])
          const Result4Eth = await apiScan.getBalance(poolDataBsc[0].addresses[3])
          const Result5Eth = await apiScan.getBalance(poolDataBsc[0].addresses[4])
          setTotalBalance1(
            (Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
          )
          setTotalBalance2(
            (Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
          )
          setTotalBalance3(
            (Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
          )
          setTotalBalance4(
            (Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
          )
          setTotalBalance5(
            (Number(Result5Eth.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
          )
        }
        {
          // @ts-ignore
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)

          if (id?.includes("USDT")) {
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
          if (id?.includes("BUSD")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressBusdApprove, abiBusdApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[1].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[1].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[1].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[1].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[1].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
          }
          if (id?.includes("CAKE")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressCakeApprove, abiCakeApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[2].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[2].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[2].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[2].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[2].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
          }
          if (id?.includes("USDC")) {
            const tokenContractUsdc = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)
            const Result1Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[0])
            const Result2Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[1])
            const Result3Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[2])
            const Result4Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[3])
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
          }
          if (id?.includes("BABYDOGE")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressBabyDogeApprove, abiBabyApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[3].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[3].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[3].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[3].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[3].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
          }
          if (id?.includes("UNI")) {
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
          if (id?.includes("TWT")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressTwtApprove, abiTwtApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[4].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[4].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[4].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[4].addresses[3])
            setTotalBalance1(
              (Number(Result1Usdt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
            )
          }
          if (id?.includes("LINK")) {
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
          if (id?.includes("GMT")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressGmtApprove, abiGmtApprove, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[5].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[5].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[5].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[5].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[5].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
          }
          if (id?.includes("WBTC")) {
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
          // if (id?.includes("WBTC2")) {
          //   const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)
          //   const Result1 = await tokenContract.balanceOf(poolData[6].addresses[0])
          //   const Result2 = await tokenContract.balanceOf(poolData[6].addresses[1])
          //   const Result3 = await tokenContract.balanceOf(poolData[6].addresses[2])
          //   const Result4 = await tokenContract.balanceOf(poolData[6].addresses[3])
          //   const Result5 = await tokenContract.balanceOf(poolData[6].addresses[4])
          //   setTotalBalance1(
          //     (Number(Result1) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
          //   )
          //   setTotalBalance2(
          //     (Number(Result2) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
          //   )
          //   setTotalBalance3(
          //     (Number(Result3) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
          //   )
          //   setTotalBalance4(
          //     (Number(Result4) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
          //   )
          //   setTotalBalance5(
          //     (Number(Result5) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
          //   )
          // }
          if (id?.includes("C98")) {
            const tokenContractUsdt = new ethers.Contract(contractAddressC98Approve, abiC98Approve, provider)
            const Result1Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[6].addresses[0])
            const Result2Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[6].addresses[1])
            const Result3Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[6].addresses[2])
            const Result4Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[6].addresses[3])
            const Result5Usdt = await tokenContractUsdt.balanceOf(poolDataBsc[6].addresses[4])
            setTotalBalance1(
              (Number(Result1Usdt) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Usdt) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Usdt) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Usdt) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price,
            )
            setTotalBalance5(
              (Number(Result5Usdt) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price,
            )
          }
          if (id?.includes("WSOL")) {
            const tokenContractSol = new ethers.Contract(contractAddressSolApprove, abiWbtcApprove, provider)
            const Result1Sol = await tokenContractSol.balanceOf(poolData[7].addresses[0])
            const Result2Sol = await tokenContractSol.balanceOf(poolData[7].addresses[1])
            const Result3Sol = await tokenContractSol.balanceOf(poolData[7].addresses[2])
            const Result4Sol = await tokenContractSol.balanceOf(poolData[7].addresses[3])

            setTotalBalance1(
              (Number(Result1Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance2(
              (Number(Result2Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance3(
              (Number(Result3Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
            )
            setTotalBalance4(
              (Number(Result4Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
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
                                                font-color="#ffffff"
                                                background-color="rgba(12, 14, 40, 0.32)"
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
            <button className="pool-content-header-tabs-item active">Pools</button>
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
                navigate(`${routes.swapInfo}?tab=pools&${search.toString()}`)
              }}
              className="swap-content-breadcrumbs-item"
            >
              Pools
            </button>
            <ArrowBread/>
            <button className="swap-content-breadcrumbs-item active">{`${token} - ${pair?.day}`}</button>
          </div>
          <SwapPair stat={topTokens} pair={pair} hardSetSecond={id?.split("-")[0] === 'WBTC2'}/>
          <div className="swap-content-flex">
            <TokenLocked
              pairTvl={getTvl(Number(indexGlobal))}
              totalLocked={totalBalance1 + totalBalance2 + totalBalance3 + totalBalance4 + totalBalance5}
              pair={pair}
            />
            <SwapChartPools isWbtcSecond={id?.split("-")[0] === 'WBTC2'} poolsTotalTvl={getTvl(Number(indexGlobal))}/>
          </div>
        </>
      </div>
      <Footer/>
    </div>
  )
}
