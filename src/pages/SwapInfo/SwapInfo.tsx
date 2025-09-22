import React, { useEffect, useState } from "react"
import { Header, Footer, SwapTable, SwapChartRight, SwapMover, SwapTablePairs } from "components"

import "./SwapInfo.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import cn from "classnames"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { useNavigate, useSearchParams } from "react-router-dom"
import { api } from "../../service/api/api"
import { poolData } from "../../components/Table/data"
import { ethers } from "ethers"
import {
  approveAddress,
  contractAddressBabyDogeApprove,
  contractAddressBusdApprove, contractAddressC98Approve,
  contractAddressCakeApprove,
  contractAddressGmtApprove,
  contractAddressLinkApprove, contractAddressSolApprove,
  contractAddressTwtApprove,
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
import {getFromLocalStorage, moneyFormatter, routes, setToLocalStorage} from "../../utils"
import { preloadData } from "./preloadData"
import {apiScan} from "../../service/api/apiScan";
import {poolDataBsc} from "../../components/Table/dataBsc";
import abiBusdApprove from "../../abi/abiBusdApprove.json";
import abiCakeApprove from "../../abi/abiCakeApprove.json";
import abiBabyDogeApprove from "../../abi/abiBabyDogeApprove.json";
import abiTwtApprove from "../../abi/abiTwtApprove.json";
import abiGmtApprove from "../../abi/abiGmtApprove.json";
import abiC98Approve from "../../abi/abiC98Approve.json";
import {poolDataSeparatedBsc} from "../../components/Table/dataSeparatedBsc";
import {preloadDataBsc} from "./preloadDataBsc";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import {apiOpt} from "../../service/api/apiOpt";
import {poolDataOpt} from "../../components/Table/dataOpt";
import {apiArb} from "../../service/api/apiArb";
import {poolDataArb} from "../../components/Table/dataArb";
import {poolDataPol} from "../../components/Table/dataPol";
import {apiPol} from "../../service/api/apiPol";
import {apiFantom} from "../../service/api/apiFantom";
import {poolDataFantom} from "../../components/Table/dataFantom";
import {apiBase} from "../../service/api/apiBase";
import {poolDataBase} from "../../components/Table/dataBase";
import {poolDataAvax} from "../../components/Table/dataAvax";
import {poolDataManta} from "../../components/Table/dataManta";
import {poolDataSeparatedOpt} from "../../components/Table/dataSeparatedOpt";
import {poolDataSeparatedArb} from "../../components/Table/dataSeparatedArb";
import {poolDataSeparatedFantom} from "../../components/Table/dataSeparatedFantom";
import {poolDataSeparatedBase} from "../../components/Table/dataSeparatedBase";
import {poolDataSeparatedPol} from "../../components/Table/dataSeparatedPol";
import {apiOk} from "../../service/api/apiOk";
import {poolDataSeparatedAvax} from "../../components/Table/dataSeparatedAvax";

export const SwapInfo = (): JSX.Element => {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const { address } = useAccount();
  const chainId = getChainId(config)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("overview")
  const [topTokens, setTopTokens] = useState<any[]>([])
  const [ourTvlData, setOurTvlData] = useState<any[]>([])
  const busd = 1000000000000000000
  const [totalBalanceEth1, setTotalBalanceEth1] = useState(0)
  const [totalBalanceEth2, setTotalBalanceEth2] = useState(0)
  const [totalBalanceEth3, setTotalBalanceEth3] = useState(0)
  const [totalBalanceEth4, setTotalBalanceEth4] = useState(0)
  const [totalBalanceOpt1, setTotalBalanceOpt1] = useState(0)
  const [totalBalanceOpt2, setTotalBalanceOpt2] = useState(0)
  const [totalBalanceOpt3, setTotalBalanceOpt3] = useState(0)
  const [totalBalanceOpt4, setTotalBalanceOpt4] = useState(0)
  const [totalBalanceArb1, setTotalBalanceArb1] = useState(0)
  const [totalBalanceArb2, setTotalBalanceArb2] = useState(0)
  const [totalBalanceArb3, setTotalBalanceArb3] = useState(0)
  const [totalBalanceArb4, setTotalBalanceArb4] = useState(0)
  const [totalBalanceAvax1, setTotalBalanceAvax1] = useState(0)
  const [totalBalanceAvax2, setTotalBalanceAvax2] = useState(0)
  const [totalBalanceAvax3, setTotalBalanceAvax3] = useState(0)
  const [totalBalanceAvax4, setTotalBalanceAvax4] = useState(0)
  const [totalBalancePol1, setTotalBalancePol1] = useState(0)
  const [totalBalancePol2, setTotalBalancePol2] = useState(0)
  const [totalBalancePol3, setTotalBalancePol3] = useState(0)
  const [totalBalancePol4, setTotalBalancePol4] = useState(0)
  const [totalBalanceFan1, setTotalBalanceFan1] = useState(0)
  const [totalBalanceFan2, setTotalBalanceFan2] = useState(0)
  const [totalBalanceFan3, setTotalBalanceFan3] = useState(0)
  const [totalBalanceFan4, setTotalBalanceFan4] = useState(0)
  const [totalBalanceBase1, setTotalBalanceBase1] = useState(0)
  const [totalBalanceBase2, setTotalBalanceBase2] = useState(0)
  const [totalBalanceBase3, setTotalBalanceBase3] = useState(0)
  const [totalBalanceBase4, setTotalBalanceBase4] = useState(0)
  const [totalBalanceBnb1, setTotalBalanceBnb1] = useState(0)
  const [totalBalanceBnb2, setTotalBalanceBnb2] = useState(0)
  const [totalBalanceBnb3, setTotalBalanceBnb3] = useState(0)
  const [totalBalanceBnb4, setTotalBalanceBnb4] = useState(0)
  const [totalBalanceBnb5, setTotalBalanceBnb5] = useState(0)
  const [totalBalanceUsdt1, setTotalBalanceUsdt1] = useState(0)
  const [totalBalanceUsdt2, setTotalBalanceUsdt2] = useState(0)
  const [totalBalanceUsdt3, setTotalBalanceUsdt3] = useState(0)
  const [totalBalanceUsdt4, setTotalBalanceUsdt4] = useState(0)
  const [totalBalanceBusd1, setTotalBalanceBusd1] = useState(0)
  const [totalBalanceBusd2, setTotalBalanceBusd2] = useState(0)
  const [totalBalanceBusd3, setTotalBalanceBusd3] = useState(0)
  const [totalBalanceBusd4, setTotalBalanceBusd4] = useState(0)
  const [totalBalanceBusd5, setTotalBalanceBusd5] = useState(0)
  const [totalBalanceUsdc1, setTotalBalanceUsdc1] = useState(0)
  const [totalBalanceUsdc2, setTotalBalanceUsdc2] = useState(0)
  const [totalBalanceUsdc3, setTotalBalanceUsdc3] = useState(0)
  const [totalBalanceUsdc4, setTotalBalanceUsdc4] = useState(0)
  const [totalBalanceCake1, setTotalBalanceCake1] = useState(0)
  const [totalBalanceCake2, setTotalBalanceCake2] = useState(0)
  const [totalBalanceCake3, setTotalBalanceCake3] = useState(0)
  const [totalBalanceCake4, setTotalBalanceCake4] = useState(0)
  const [totalBalanceCake5, setTotalBalanceCake5] = useState(0)
  const [totalBalanceUni1, setTotalBalanceUni1] = useState(0)
  const [totalBalanceUni2, setTotalBalanceUni2] = useState(0)
  const [totalBalanceUni3, setTotalBalanceUni3] = useState(0)
  const [totalBalanceUni4, setTotalBalanceUni4] = useState(0)
  const [totalBalanceUni5, setTotalBalanceUni5] = useState(0)
  const [totalBalanceBaby1, setTotalBalanceBaby1] = useState(0)
  const [totalBalanceBaby2, setTotalBalanceBaby2] = useState(0)
  const [totalBalanceBaby3, setTotalBalanceBaby3] = useState(0)
  const [totalBalanceBaby4, setTotalBalanceBaby4] = useState(0)
  const [totalBalanceBaby5, setTotalBalanceBaby5] = useState(0)
  const [totalBalanceLink1, setTotalBalanceLink1] = useState(0)
  const [totalBalanceLink2, setTotalBalanceLink2] = useState(0)
  const [totalBalanceLink3, setTotalBalanceLink3] = useState(0)
  const [totalBalanceLink4, setTotalBalanceLink4] = useState(0)
  const [totalBalanceTwt1, setTotalBalanceTwt1] = useState(0)
  const [totalBalanceTwt2, setTotalBalanceTwt2] = useState(0)
  const [totalBalanceTwt3, setTotalBalanceTwt3] = useState(0)
  const [totalBalanceTwt4, setTotalBalanceTwt4] = useState(0)
  const [totalBalanceTwt5, setTotalBalanceTwt5] = useState(0)
  const [totalBalanceWbtc1, setTotalBalanceWbtc1] = useState(0)
  const [totalBalanceWbtc2, setTotalBalanceWbtc2] = useState(0)
  const [totalBalanceWbtc3, setTotalBalanceWbtc3] = useState(0)
  const [totalBalanceWbtc4, setTotalBalanceWbtc4] = useState(0)
  const [totalBalanceGmt1, setTotalBalanceGmt1] = useState(0)
  const [totalBalanceGmt2, setTotalBalanceGmt2] = useState(0)
  const [totalBalanceGmt3, setTotalBalanceGmt3] = useState(0)
  const [totalBalanceGmt4, setTotalBalanceGmt4] = useState(0)
  const [totalBalanceGmt5, setTotalBalanceGmt5] = useState(0)
  const [totalBalanceSol1, setTotalBalanceSol1] = useState(0)
  const [totalBalanceSol2, setTotalBalanceSol2] = useState(0)
  const [totalBalanceSol3, setTotalBalanceSol3] = useState(0)
  const [totalBalanceSol4, setTotalBalanceSol4] = useState(0)
  const [totalBalanceCoin1, setTotalBalanceCoin1] = useState(0)
  const [totalBalanceCoin2, setTotalBalanceCoin2] = useState(0)
  const [totalBalanceCoin3, setTotalBalanceCoin3] = useState(0)
  const [totalBalanceCoin4, setTotalBalanceCoin4] = useState(0)
  const [totalBalanceCoin5, setTotalBalanceCoin5] = useState(0)

  useEffect(() => {
    apiCoin
      .getStat()
      .then(rOther => {
        setTopTokens(rOther)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!!search.get("tab")) {
      setTab(search.get("tab") as any)
    }
  }, [search])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const getAllInfoTvl = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await api.getBalance(poolData[0].addresses[0])
      const Result2Eth = await api.getBalance(poolData[0].addresses[1])
      const Result3Eth = await api.getBalance(poolData[0].addresses[2])
      const Result4Eth = await api.getBalance(poolData[0].addresses[3])
      setTotalBalanceEth1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
      )
      setTotalBalanceEth2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
      )
      setTotalBalanceEth3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
      )
      setTotalBalanceEth4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
      )
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const tokenContractUsdt = new ethers.Contract(approveAddress, abiApprove, provider)
        const Result1Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[0])
        const Result2Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[1])
        const Result3Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[2])
        const Result4Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[3])
        setTotalBalanceUsdt1(
          (Number(Result1Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
        )
        setTotalBalanceUsdt2(
          (Number(Result2Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
        )
        setTotalBalanceUsdt3(
          (Number(Result3Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
        )
        setTotalBalanceUsdt4(
          (Number(Result4Usdt) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price,
        )
        const tokenContractUsdc = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)
        const Result1Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[0])
        const Result2Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[1])
        const Result3Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[2])
        const Result4Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[3])
        setTotalBalanceUsdc1(
          (Number(Result1Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
        )
        setTotalBalanceUsdc2(
          (Number(Result2Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
        )
        setTotalBalanceUsdc3(
          (Number(Result3Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
        )
        setTotalBalanceUsdc4(
          (Number(Result4Usdc) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
        )

        const tokenContractUni = new ethers.Contract(contractAddressUniApprove, abiUniApprove, provider)
        const Result1Uni = await tokenContractUni.balanceOf(poolData[3].addresses[0])
        const Result2Uni = await tokenContractUni.balanceOf(poolData[3].addresses[1])
        const Result3Uni = await tokenContractUni.balanceOf(poolData[3].addresses[2])
        const Result4Uni = await tokenContractUni.balanceOf(poolData[3].addresses[3])
        setTotalBalanceUni1(
          (Number(Result1Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
        )
        setTotalBalanceUni2(
          (Number(Result2Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
        )
        setTotalBalanceUni3(
          (Number(Result3Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
        )
        setTotalBalanceUni4(
          (Number(Result4Uni) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
        )

        const tokenContractLink = new ethers.Contract(contractAddressLinkApprove, abiLinkApprove, provider)
        const Result1Link = await tokenContractLink.balanceOf(poolData[4].addresses[0])
        const Result2Link = await tokenContractLink.balanceOf(poolData[4].addresses[1])
        const Result3Link = await tokenContractLink.balanceOf(poolData[4].addresses[2])
        const Result4Link = await tokenContractLink.balanceOf(poolData[4].addresses[3])
        setTotalBalanceLink1(
          (Number(Result1Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
        )
        setTotalBalanceLink2(
          (Number(Result2Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
        )
        setTotalBalanceLink3(
          (Number(Result3Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
        )
        setTotalBalanceLink4(
          (Number(Result4Link) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
        )

        const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)
        const Result1 = await tokenContract.balanceOf(poolData[5].addresses[0])
        const Result2 = await tokenContract.balanceOf(poolData[5].addresses[1])
        const Result3 = await tokenContract.balanceOf(poolData[5].addresses[2])
        const Result4 = await tokenContract.balanceOf(poolData[5].addresses[3])
        setTotalBalanceWbtc1(
          (Number(Result1) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
        )
        setTotalBalanceWbtc2(
          (Number(Result2) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
        )
        setTotalBalanceWbtc3(
          (Number(Result3) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
        )
        setTotalBalanceWbtc4(
          (Number(Result4) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
        )

        const tokenContractSol = new ethers.Contract(contractAddressSolApprove, abiApprove, provider)
        const Result1Sol = await tokenContractSol.balanceOf(poolData[6].addresses[0])
        const Result2Sol = await tokenContractSol.balanceOf(poolData[6].addresses[1])
        const Result3Sol = await tokenContractSol.balanceOf(poolData[6].addresses[2])
        const Result4Sol = await tokenContractSol.balanceOf(poolData[6].addresses[3])

        setTotalBalanceSol1(
          (Number(Result1Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
        )
        setTotalBalanceSol2(
          (Number(Result2Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
        )
        setTotalBalanceSol3(
          (Number(Result3Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
        )
        setTotalBalanceSol4(
          (Number(Result4Sol) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price,
        )
      }
    })
  }
  const getAllInfoOpt = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiOpt.getBalance(poolDataOpt[0].addresses[0])
      const Result2Eth = await apiOpt.getBalance(poolDataOpt[0].addresses[1])
      const Result3Eth = await apiOpt.getBalance(poolDataOpt[0].addresses[2])
      const Result4Eth = await apiOpt.getBalance(poolDataOpt[0].addresses[3])
      setTotalBalanceOpt1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataOpt[0].id)?.current_price,
      )
      setTotalBalanceOpt2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataOpt[0].id)?.current_price,
      )
      setTotalBalanceOpt3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataOpt[0].id)?.current_price,
      )
      setTotalBalanceOpt4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataOpt[0].id)?.current_price,
      )
    })
  }
  const getAllInfoArb = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiArb.getBalance(poolDataArb[0].addresses[0])
      const Result2Eth = await apiArb.getBalance(poolDataArb[0].addresses[1])
      const Result3Eth = await apiArb.getBalance(poolDataArb[0].addresses[2])
      const Result4Eth = await apiArb.getBalance(poolDataArb[0].addresses[3])
      setTotalBalanceArb1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataArb[0].id)?.current_price,
      )
      setTotalBalanceArb2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataArb[0].id)?.current_price,
      )
      setTotalBalanceArb3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataArb[0].id)?.current_price,
      )
      setTotalBalanceArb4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataArb[0].id)?.current_price,
      )
    })
  }
  const getAllInfoAvax = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiOk.getBalance('AVAXC', poolDataAvax[0].addresses[0])
      const Result2Eth = await apiOk.getBalance('AVAXC', poolDataAvax[0].addresses[1])
      const Result3Eth = await apiOk.getBalance('AVAXC', poolDataAvax[0].addresses[2])
      const Result4Eth = await apiOk.getBalance('AVAXC', poolDataAvax[0].addresses[3])
      setTotalBalanceAvax1(
        (isNaN(Number(Result1Eth.data[0].balance)) ? 0 : Number(Result1Eth.data[0].balance)) * rOther?.find(iOther => iOther.id === poolDataAvax[0].id)?.current_price,
      )
      setTotalBalanceAvax2(
        (isNaN(Number(Result2Eth.data[0].balance)) ? 0 : Number(Result2Eth.data[0].balance)) * rOther?.find(iOther => iOther.id === poolDataAvax[0].id)?.current_price,
      )
      setTotalBalanceAvax3(
        (isNaN(Number(Result3Eth.data[0].balance)) ? 0 : Number(Result3Eth.data[0].balance)) * rOther?.find(iOther => iOther.id === poolDataAvax[0].id)?.current_price,
      )
      setTotalBalanceAvax4(
        (isNaN(Number(Result4Eth.data[0].balance)) ? 0 : Number(Result4Eth.data[0].balance)) * rOther?.find(iOther => iOther.id === poolDataAvax[0].id)?.current_price,
      )
    })
  }
  const getAllInfoPol = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiPol.getBalance(poolDataPol[0].addresses[0])
      const Result2Eth = await apiPol.getBalance(poolDataPol[0].addresses[1])
      const Result3Eth = await apiPol.getBalance(poolDataPol[0].addresses[2])
      const Result4Eth = await apiPol.getBalance(poolDataPol[0].addresses[3])
      setTotalBalancePol1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
      )
      setTotalBalancePol2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
      )
      setTotalBalancePol3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
      )
      setTotalBalancePol4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
      )
    })
  }
  const getAllInfoFan = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiFantom.getBalance(poolDataFantom[0].addresses[0])
      const Result2Eth = await apiFantom.getBalance(poolDataFantom[0].addresses[1])
      const Result3Eth = await apiFantom.getBalance(poolDataFantom[0].addresses[2])
      const Result4Eth = await apiFantom.getBalance(poolDataFantom[0].addresses[3])
      setTotalBalanceFan1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataFantom[0].id)?.current_price,
      )
      setTotalBalanceFan2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataFantom[0].id)?.current_price,
      )
      setTotalBalanceFan3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataFantom[0].id)?.current_price,
      )
      setTotalBalanceFan4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataFantom[0].id)?.current_price,
      )
    })
  }
  const getAllInfoBase = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Eth = await apiBase.getBalance(poolDataBase[0].addresses[0])
      const Result2Eth = await apiBase.getBalance(poolDataBase[0].addresses[1])
      const Result3Eth = await apiBase.getBalance(poolDataBase[0].addresses[2])
      const Result4Eth = await apiBase.getBalance(poolDataBase[0].addresses[3])
      setTotalBalanceBase1(
        (isNaN(Number(Result1Eth.result)) ? 0 : Number(Result1Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataBase[0].id)?.current_price,
      )
      setTotalBalanceBase2(
        (isNaN(Number(Result2Eth.result)) ? 0 : Number(Result2Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataBase[0].id)?.current_price,
      )
      setTotalBalanceBase3(
        (isNaN(Number(Result3Eth.result)) ? 0 : Number(Result3Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataBase[0].id)?.current_price,
      )
      setTotalBalanceBase4(
        (isNaN(Number(Result4Eth.result)) ? 0 : Number(Result4Eth.result) / busd) * rOther?.find(iOther => iOther.id === poolDataBase[0].id)?.current_price,
      )
    })
  }

  const getAllInfoBnb = async () => {
    await apiCoin.getStat().then(async rOther => {
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const Result1Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[0])
      const Result2Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[1])
      const Result3Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[2])
      const Result4Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[3])
      const Result5Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[4])
      setTotalBalanceBnb1((Number(Result1Bnb.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price)
      setTotalBalanceBnb2((Number(Result2Bnb.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price)
      setTotalBalanceBnb3((Number(Result3Bnb.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price)
      setTotalBalanceBnb4((Number(Result4Bnb.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price)
      setTotalBalanceBnb5((Number(Result5Bnb.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price)
      {
        const tokenContractBusd = new ethers.Contract(contractAddressBusdApprove, abiBusdApprove, provider)
        const Result1Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[0])
        const Result2Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[1])
        const Result3Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[2])
        const Result4Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[3])
        const Result5Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[4])
        setTotalBalanceBusd1((Number(Result1Busd) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price)
        setTotalBalanceBusd2((Number(Result2Busd) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price)
        setTotalBalanceBusd3((Number(Result3Busd) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price)
        setTotalBalanceBusd4((Number(Result4Busd) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price)
        setTotalBalanceBusd5((Number(Result5Busd) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price)

        const tokenContractCake = new ethers.Contract(contractAddressCakeApprove, abiCakeApprove, provider)

        const Result1Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[0])
        const Result2Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[1])
        const Result3Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[2])
        const Result4Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[3])
        setTotalBalanceCake1((Number(Result1Cake) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price)
        setTotalBalanceCake2((Number(Result2Cake) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price)
        setTotalBalanceCake3((Number(Result3Cake) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price)
        setTotalBalanceCake4((Number(Result4Cake) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price)

        const tokenContractBaby = new ethers.Contract(contractAddressBabyDogeApprove, abiBabyDogeApprove, provider)
        const Result1Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[0])
        const Result2Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[1])
        const Result3Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[2])
        const Result4Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[3])
        setTotalBalanceBaby1((Number(Result1Baby) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price)
        setTotalBalanceBaby2((Number(Result2Baby) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price)
        setTotalBalanceBaby3((Number(Result3Baby) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price)
        setTotalBalanceBaby4((Number(Result4Baby) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price)

        const tokenContractTwt = new ethers.Contract(contractAddressTwtApprove, abiTwtApprove, provider)
        const Result1Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[0])
        const Result2Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[1])
        const Result3Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[2])
        const Result4Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[3])
        setTotalBalanceTwt1((Number(Result1Twt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price)
        setTotalBalanceTwt2((Number(Result2Twt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price)
        setTotalBalanceTwt3((Number(Result3Twt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price)
        setTotalBalanceTwt4((Number(Result4Twt) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price)

        const tokenContractGmt = new ethers.Contract(contractAddressGmtApprove, abiGmtApprove, provider)
        const Result1 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[0])
        const Result2 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[1])
        const Result3 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[2])
        const Result4 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[3])
        setTotalBalanceGmt1((Number(Result1) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price)
        setTotalBalanceGmt2((Number(Result2) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price)
        setTotalBalanceGmt3((Number(Result3) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price)
        setTotalBalanceGmt4((Number(Result4) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price)

        const tokenContractCoin = new ethers.Contract(contractAddressC98Approve, abiC98Approve, provider)
        const Result1Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[0])
        const Result2Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[1])
        const Result3Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[2])
        const Result4Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[3])
        setTotalBalanceCoin1((Number(Result1Coin) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price)
        setTotalBalanceCoin2((Number(Result2Coin) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price)
        setTotalBalanceCoin3((Number(Result3Coin) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price)
        setTotalBalanceCoin4((Number(Result4Coin) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price)
      }
    })
  }

  const getTvlMoney = (token: string, index: number) => {
    if (token === "ETH" && index === 1) {
      return totalBalanceEth1
    }
    if (token === "ETH" && index === 2) {
      return totalBalanceEth2
    }
    if (token === "ETH" && index === 3) {
      return totalBalanceEth3
    }
    if (token === "ETH" && index === 4) {
      return totalBalanceEth4
    }
    if (token === "OP" && index === 1) {
      return totalBalanceOpt1
    }
    if (token === "OP" && index === 2) {
      return totalBalanceOpt2
    }
    if (token === "OP" && index === 3) {
      return totalBalanceOpt3
    }
    if (token === "OP" && index === 4) {
      return totalBalanceOpt4
    }
    if (token === "ARB" && index === 1) {
      return totalBalanceArb1
    }
    if (token === "ARB" && index === 2) {
      return totalBalanceArb2
    }
    if (token === "ARB" && index === 3) {
      return totalBalanceArb3
    }
    if (token === "ARB" && index === 4) {
      return totalBalanceArb4
    }
    if (token === "AVAX" && index === 1) {
      return totalBalanceAvax1
    }
    if (token === "AVAX" && index === 2) {
      return totalBalanceAvax2
    }
    if (token === "AVAX" && index === 3) {
      return totalBalanceAvax3
    }
    if (token === "AVAX" && index === 4) {
      return totalBalanceAvax4
    }
    if (token === "POL" && index === 1) {
      return totalBalancePol1
    }
    if (token === "POL" && index === 2) {
      return totalBalancePol2
    }
    if (token === "POL" && index === 3) {
      return totalBalancePol3
    }
    if (token === "POL" && index === 4) {
      return totalBalancePol4
    }
    if (token === "FTM" && index === 1) {
      return totalBalanceFan1
    }
    if (token === "FTM" && index === 2) {
      return totalBalanceFan2
    }
    if (token === "FTM" && index === 3) {
      return totalBalanceFan3
    }
    if (token === "FTM" && index === 4) {
      return totalBalanceFan4
    }
    if (token === "ETH(Base)" && index === 1) {
      return totalBalanceBase1
    }
    if (token === "ETH(Base)" && index === 2) {
      return totalBalanceBase2
    }
    if (token === "ETH(Base)" && index === 3) {
      return totalBalanceBase3
    }
    if (token === "ETH(Base)" && index === 4) {
      return totalBalanceBase4
    }
    if (token === "BNB" && index === 1) {
      return totalBalanceBnb1
    }
    if (token === "BNB" && index === 2) {
      return totalBalanceBnb2
    }
    if (token === "BNB" && index === 3) {
      return totalBalanceBnb3
    }
    if (token === "BNB" && index === 4) {
      return totalBalanceBnb4
    }
    if (token === "BNB" && index === 5) {
      return totalBalanceBnb5
    }
    if (token === "USDT" && index === 1) {
      return totalBalanceUsdt1
    }
    if (token === "USDT" && index === 2) {
      return totalBalanceUsdt2
    }
    if (token === "USDT" && index === 3) {
      return totalBalanceUsdt3
    }
    if (token === "USDT" && index === 4) {
      return totalBalanceUsdt4
    }
    if (token === "BUSD" && index === 1) {
      return totalBalanceBusd1
    }
    if (token === "BUSD" && index === 2) {
      return totalBalanceBusd2
    }
    if (token === "BUSD" && index === 3) {
      return totalBalanceBusd3
    }
    if (token === "BUSD" && index === 4) {
      return totalBalanceBusd4
    }
    if (token === "BUSD" && index === 5) {
      return totalBalanceBusd5
    }
    if (token === "USDC" && index === 1) {
      return totalBalanceUsdc1
    }
    if (token === "USDC" && index === 2) {
      return totalBalanceUsdc2
    }
    if (token === "USDC" && index === 3) {
      return totalBalanceUsdc3
    }
    if (token === "USDC" && index === 4) {
      return totalBalanceUsdc4
    }
    if (token === "CAKE" && index === 1) {
      return totalBalanceCake1
    }
    if (token === "CAKE" && index === 2) {
      return totalBalanceCake2
    }
    if (token === "CAKE" && index === 3) {
      return totalBalanceCake3
    }
    if (token === "CAKE" && index === 4) {
      return totalBalanceCake4
    }
    if (token === "CAKE" && index === 5) {
      return totalBalanceCake5
    }
    if (token === "UNI" && index === 1) {
      return totalBalanceUni1
    }
    if (token === "UNI" && index === 2) {
      return totalBalanceUni2
    }
    if (token === "UNI" && index === 3) {
      return totalBalanceUni3
    }
    if (token === "UNI" && index === 4) {
      return totalBalanceUni4
    }
    if (token === "BABYDOGE" && index === 1) {
      return totalBalanceBaby1
    }
    if (token === "BABYDOGE" && index === 2) {
      return totalBalanceBaby2
    }
    if (token === "BABYDOGE" && index === 3) {
      return totalBalanceBaby3
    }
    if (token === "BABYDOGE" && index === 4) {
      return totalBalanceBaby4
    }
    if (token === "BABYDOGE" && index === 5) {
      return totalBalanceBaby5
    }
    if (token === "WBTC" && index === 1) {
      return totalBalanceWbtc1
    }
    if (token === "WBTC" && index === 2) {
      return totalBalanceWbtc2
    }
    if (token === "WBTC" && index === 3) {
      return totalBalanceWbtc3
    }
    if (token === "WBTC" && index === 4) {
      return totalBalanceWbtc4
    }
    if (token === "TWT" && index === 1) {
      return totalBalanceTwt1
    }
    if (token === "TWT" && index === 2) {
      return totalBalanceTwt2
    }
    if (token === "TWT" && index === 3) {
      return totalBalanceTwt3
    }
    if (token === "TWT" && index === 4) {
      return totalBalanceTwt4
    }
    if (token === "TWT" && index === 5) {
      return totalBalanceTwt5
    }
    if (token === "WSOL" && index === 1) {
      return totalBalanceSol1
    }
    if (token === "WSOL" && index === 2) {
      return totalBalanceSol2
    }
    if (token === "WSOL" && index === 3) {
      return totalBalanceSol3
    }
    if (token === "WSOL" && index === 4) {
      return totalBalanceSol4
    }
    if (token === "GMT" && index === 1) {
      return totalBalanceGmt1
    }
    if (token === "GMT" && index === 2) {
      return totalBalanceGmt2
    }
    if (token === "GMT" && index === 3) {
      return totalBalanceGmt3
    }
    if (token === "GMT" && index === 4) {
      return totalBalanceGmt4
    }
    if (token === "GMT" && index === 5) {
      return totalBalanceGmt5
    }
    if (token === "LINK" && index === 1) {
      return totalBalanceLink1
    }
    if (token === "LINK" && index === 2) {
      return totalBalanceLink2
    }
    if (token === "LINK" && index === 3) {
      return totalBalanceLink3
    }
    if (token === "LINK" && index === 4) {
      return totalBalanceLink4
    }
    if (token === "C98" && index === 1) {
      return totalBalanceCoin1
    }
    if (token === "C98" && index === 2) {
      return totalBalanceCoin2
    }
    if (token === "C98" && index === 3) {
      return totalBalanceCoin3
    }
    if (token === "C98" && index === 4) {
      return totalBalanceCoin4
    }
    if (token === "C98" && index === 5) {
      return totalBalanceCoin5
    }
    return 0
  }
  const getAllInfo = () => {
    setOurTvlData(
      poolDataSeparated.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }

  const getAllInfoBnbFirst = () => {
    setOurTvlData(
      poolDataSeparatedBsc.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }

  const getAllInfoOptFirst = () => {
    setOurTvlData(
      poolDataSeparatedOpt.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }

  const getAllInfoArbFirst = () => {
    setOurTvlData(
      poolDataSeparatedArb.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }
  const getAllInfoFanFirst = () => {
    setOurTvlData(
      poolDataSeparatedFantom.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }
  const getAllInfoBaseFirst = () => {
    setOurTvlData(
      poolDataSeparatedBase.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }
  const getAllInfoAvaxFirst = () => {
    setOurTvlData(
      poolDataSeparatedAvax.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }
  const getAllInfoPolFirst = () => {
    setOurTvlData(
      poolDataSeparatedPol.map(poolItem => ({
        tvl: getTvlMoney(poolItem.token, poolItem.index),
        ...poolItem,
      })),
    )
  }

  useEffect(() => {
    // const data = JSON.stringify(ourTvlData)
    // const link = document.createElement('a')
    //
    // link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
    // link.setAttribute('download', 'filename' || 'data.json')
    // link.style.display = 'none'
    //
    // document.body.appendChild(link)
    //
    // link.click()
    //
    // document.body.removeChild(link)

    if (localStorage.getItem("swapData") !== null && chainId === 1) {
      return setOurTvlData(getFromLocalStorage("swapData"))
    }
    if (localStorage.getItem("swapDataBsc") !== null && chainId === 56) {
      return setOurTvlData(getFromLocalStorage("swapDataBsc"))
    }
    if (localStorage.getItem("swapDataOpt") !== null && chainId === 10) {
      return setOurTvlData(getFromLocalStorage("swapDataOpt"))
    }

    if (localStorage.getItem("swapDataFan") !== null && chainId === 250) {
      return setOurTvlData(getFromLocalStorage("swapDataFan"))
    }
    if (localStorage.getItem("swapDataArb") !== null && chainId === 42161) {
      return setOurTvlData(getFromLocalStorage("swapDataArb"))
    }
    if (localStorage.getItem("swapDataPol") !== null && chainId === 137) {
      return setOurTvlData(getFromLocalStorage("swapDataPol"))
    }
    if (localStorage.getItem("swapDataBase") !== null && chainId === 8453) {
      return setOurTvlData(getFromLocalStorage("swapDataBase"))
    }
    if (localStorage.getItem("swapDataAvax") !== null && chainId === 43114) {
      return setOurTvlData(getFromLocalStorage("swapDataAvax"))
    }

    if (chainId === 56) {
      setOurTvlData(preloadDataBsc)
    }
    if (chainId === 1 || !address) {
      setOurTvlData(preloadData)
    }
  }, [chainId])
  useEffect(() => {
    if (chainId === 1 || !address) {
      getAllInfoTvl()
    }
    if (chainId === 56) {
      getAllInfoBnb()
    }
    if (chainId === 10) {
      getAllInfoOpt()
    }
    if (chainId === 42161) {
      getAllInfoArb()
    }
    if (chainId === 250) {
      getAllInfoFan()
    }
    if (chainId === 137) {
      getAllInfoPol()
    }
    if (chainId === 8453) {
      getAllInfoBase()
    }
    if (chainId === 43114) {
      getAllInfoAvax()
    }
    // if (chainId === 169) {
    //   setFilteredPoolData(poolDataManta)
    // }

  }, [chainId])
  useEffect(() => {
    if ((chainId === 1 || !address) && totalBalanceSol4 > 0) {
      getAllInfo()
    }
    if (chainId === 56 && totalBalanceCoin5 > 0) {
      getAllInfoBnbFirst()
    }
    if (chainId === 10 && totalBalanceOpt4 > 0) {
      getAllInfoOptFirst()
    }
    if (chainId === 42161 && totalBalanceArb4 > 0) {
      getAllInfoArbFirst()
    }
    if (chainId === 250 && totalBalanceFan4 > 0) {
      getAllInfoFanFirst()
    }
    if (chainId === 137 && totalBalancePol4 > 0) {
      getAllInfoPolFirst()
    }
    if (chainId === 8453 && totalBalanceBase4 > 0) {
      getAllInfoBaseFirst()
    }
    if (chainId === 43114&& totalBalanceAvax4 > 0) {
      getAllInfoAvaxFirst()
    }

  }, [chainId, totalBalanceCoin5, totalBalanceOpt4, totalBalanceArb4, totalBalanceFan4, totalBalancePol4, totalBalanceBase4])
  useEffect(() => {
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && (chainId === 1 || !address)) {
      setToLocalStorage("swapData", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 56) {
      setToLocalStorage("swapDataBsc", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 10) {
      setToLocalStorage("swapDataOpt", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 250) {
      setToLocalStorage("swapDataFan", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 42161) {
      setToLocalStorage("swapDataArb", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 137) {
      setToLocalStorage("swapDataPol", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 8453) {
      setToLocalStorage("swapDataBase", ourTvlData)
    }
    if (!!ourTvlData.length && ourTvlData?.[0]?.tvl > 0 && chainId === 43114) {
      setToLocalStorage("swapDataAvax", ourTvlData)
    }
  }, [ourTvlData, chainId])

  return (
    <div className="swap" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header />
      <div className="swap-content swap-info">
        <div className="swap-content-header">
          <h3 className="swap-content-title">Protocol Stats
            {(chainId === 1 || !address) && ' Ethereum'}
            {chainId === 56 && ' Binance Smart Chain'}
            {chainId === 10 && ' Optimism'}
            {chainId === 250 && ' Fantom'}
            {chainId === 42161 && ' Arbitrum One'}
            {chainId === 137 && ' Polygon'}
            {chainId === 8453 && ' Base'}
            {chainId === 169 && 'Manta '}
            {chainId === 43114 && ' Avalanche'}
          </h3>
          <div className="pool-content-header-tabs">
            <button
              onClick={() => setTab("overview")}
              className={cn("pool-content-header-tabs-item", {
                active: tab === "overview",
              })}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("pools")}
              className={cn("pool-content-header-tabs-item", {
                active: tab === "pools",
              })}
            >
              Pools
            </button>
          </div>
        </div>
        {tab === "overview" && (
          <>
            <div className="swap-content-head">
              <div className='swap-content-head-block'>
                <div className='swap-content-head-block-title'>
                  {(chainId === 1 || !address) && 'Ethereum '}
                  {chainId === 56 && 'Binance Smart Chain '}
                  {chainId === 10 && 'Optimism '}
                  {chainId === 250 && 'Fantom '}
                  {chainId === 42161 && 'Arbitrum One '}
                  {chainId === 137 && 'Polygon '}
                  {chainId === 8453 && 'Base '}
                  {chainId === 169 && 'Manta '}
                  {chainId === 43114 && 'Avalanche '}Total Value Locked
                </div>
                <div className='swap-content-head-block-value'>
                  {moneyFormatter.format(ourTvlData.reduce((partialSum, a) => partialSum + Number(a.tvl), 0))}
                </div>
              </div>
              <div className='swap-content-head-block'>
                <div className='swap-content-head-block-title'>
                  The Highest Pool
                </div>
                <div className='swap-content-head-block-value'>
                  {moneyFormatter.format(ourTvlData.sort((a, b) => Number(b.tvl) - Number(a.tvl))?.[0]?.tvl)}
                </div>
              </div>
            </div>
            <div className="swap-content-charts">
              <SwapChartRight
                total={ourTvlData.reduce((partialSum, a) => partialSum + Number(a.tvl), 0)}
              />
              {/*<TradeChart />*/}
            </div>
            <SwapTable tokens={topTokens.map(token => ({
              ...token,
              market_cap: token?.symbol === 'weth' ? topTokens?.find(token => token.symbol === 'eth')?.market_cap : token?.market_cap,
            }))} onClick={v => navigate(`${routes.token}/${v}?${search.toString()}`)}/>
            <div className="swap-content-subtitle">Top Pools</div>
            <SwapTablePairs
              onClick={res => navigate(`${routes.poolInfo}/${res}?${search.toString()}`)}
              stat={ourTvlData.sort((a, b) => Number(b.tvl) - Number(a.tvl))}
            />
          </>
        )}
        {tab === "pools" && (
          <>
            <div className="swap-content-subtitle">All Pools</div>
            <SwapTablePairs onClick={res => navigate(`${routes.poolInfo}/${res}?${search.toString()}`)}
                            stat={ourTvlData}/>
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}
