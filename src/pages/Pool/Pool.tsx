import { useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Header, Footer, PoolItem, PoolTable, Input, NetworkDropdown, PoolItemStaked } from "components"

import "./Pool.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import cn from "classnames"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { api } from "../../service/api/api"
import { ethers } from "ethers"
import {
  approveAddress,
  contractAddressLink,
  contractAddressLinkApprove,
  contractAddressUni,
  contractAddressUniApprove,
  contractAddressUsdc,
  contractAddressUsdcApprove,
  contractAddressWbtcApprove,
  contractAddressWbtc,
  contractAddressBusdApprove,
  contractAddressCakeApprove,
  contractAddressBabyDogeApprove,
  contractAddressTwtApprove,
  contractAddressGmtApprove,
  contractAddressC98Approve,
  contractAddressBnb,
  contractAddressBusd,
  contractAddressEthNew,
  contractAddressUsdtNew,
  contractAddressSolApprove,
} from "../../abi"
import abiApprove from "../../abi/abiApprove.json"
import abiUsdcApprove from "../../abi/abiUsdcApprove.json"
import abiUniApprove from "../../abi/abiUniApprove.json"
import abiLinkApprove from "../../abi/abiLinkApprove.json"
import abiWbtcApprove from "../../abi/abiWbtcApprove.json"
import abiBnb from "../../abi/abiBnb.json"
import abiBusd from "../../abi/abiBusd.json"
import { moneyFormatter } from "../../utils"
import useDebounce from "../../utils/useDebounce"
import abiEthNew from "../../abi/abiEthNew.json"
import abi from "../../abi/abiUsdtNew.json"
import abiUsdc from "../../abi/abiUsdc.json"
import abiUni from "../../abi/abiUni.json"
import abiLink from "../../abi/abiLink.json"
import abiWbtc from "../../abi/abiWbtc.json"
import abiBabyDogeApprove from "../../abi/abiBabyDogeApprove.json"
import abiBusdApprove from "../../abi/abiBusdApprove.json"
import abiC98Approve from "../../abi/abiC98Approve.json"
import abiCakeApprove from "../../abi/abiCakeApprove.json"
import abiGmtApprove from "../../abi/abiGmtApprove.json"
import abiTwtApprove from "../../abi/abiTwtApprove.json"

import { poolDataBsc } from "../../components/Table/dataBsc"
import { apiScan } from "../../service/api/apiScan"
import {poolData} from "../../components/Table/data";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import {poolDataOpt} from "../../components/Table/dataOpt";
import {poolDataArb} from "../../components/Table/dataArb";
import {poolDataFantom} from "../../components/Table/dataFantom";
import {poolDataBase} from "../../components/Table/dataBase";
import {poolDataPol} from "../../components/Table/dataPol";
import {poolDataManta} from "../../components/Table/dataManta";
import {apiOpt} from "../../service/api/apiOpt";
import {apiArb} from "../../service/api/apiArb";
import {apiFantom} from "../../service/api/apiFantom";
import {apiBase} from "../../service/api/apiBase";
import {apiPol} from "../../service/api/apiPol";
import {poolDataSeparatedOpt} from "../../components/Table/dataSeparatedOpt";
import {poolDataSeparatedArb} from "../../components/Table/dataSeparatedArb";
import {poolDataSeparatedFantom} from "../../components/Table/dataSeparatedFantom";
import {poolDataSeparatedBase} from "../../components/Table/dataSeparatedBase";
import {poolDataSeparatedAvax} from "../../components/Table/dataSeparatedAvax";
import {poolDataSeparatedManta} from "../../components/Table/dataSeparatedManta";
import {poolDataSeparatedPol} from "../../components/Table/dataSeparatedPol";
import {poolDataAvax} from "../../components/Table/dataAvax";

type ITab = "top" | "staked"
type ITabFilters = "all" | "staked"

export const Pool = (): JSX.Element => {
  const [search] = useSearchParams()
  const [connect, setConnect] = useState(false)
  const [input, setInput] = useState("")
  const [filteredPoolData, setFilteredPoolData] = useState<any>([])
  const debouncedSearchCountries = useDebounce(input, 500)
  const [tab, setTab] = useState<ITab>("top")
  const [tabFilters, setTabFilters] = useState<ITabFilters>("all")
  const [stat, setStat] = useState<any[]>([])
  const busd = 1000000000000000000
  const { address } = useAccount();
  const chainId = getChainId(config)
  // const address = '0x165D89125d3857ACF40C60d9cee03B8AA1c598e8'

  const [totalBalanceEth, setTotalBalanceEth] = useState(0)
  const [totalBalanceOpt, setTotalBalanceOpt] = useState(0)
  const [totalBalanceFantom, setTotalBalanceFantom] = useState(0)
  const [totalBalanceArb, setTotalBalanceArb] = useState(0)
  const [totalBalanceBase, setTotalBalanceBase] = useState(0)
  const [totalBalanceAvax, setTotalBalanceAvax] = useState(0)
  const [totalBalanceManta, setTotalBalanceManta] = useState(0)
  const [totalBalancePol, setTotalBalancePol] = useState(0)
  const [totalBalanceBnb, setTotalBalanceBnb] = useState(0)
  const [totalBalanceUsdt, setTotalBalanceUsdt] = useState(0)
  const [totalBalanceSol, setTotalBalanceSol] = useState(0)
  const [totalBalanceBusd, setTotalBalanceBusd] = useState(0)
  const [totalBalanceUsdc, setTotalBalanceUsdc] = useState(0)
  const [totalBalanceCake, setTotalBalanceCake] = useState(0)
  const [totalBalanceUni, setTotalBalanceUni] = useState(0)
  const [totalBalanceBaby, setTotalBalanceBaby] = useState(0)
  const [totalBalanceLink, setTotalBalanceLink] = useState(0)
  const [totalBalanceWbtc, setTotalBalanceWbtc] = useState(0)
  const [totalBalanceTwt, setTotalBalanceTwt] = useState(0)
  const [totalBalanceGmt, setTotalBalanceGmt] = useState(0)
  const [totalBalanceCoin, setTotalBalanceCoin] = useState(0)
  const [walletBalanceEth, setWalletBalanceEth] = useState(0)
  const [walletBalanceBnb, setWalletBalanceBnb] = useState(0)
  const [walletBalanceUsdt, setWalletBalanceUsdt] = useState(0)
  const [walletBalanceBusd, setWalletBalanceBusd] = useState(0)
  const [walletBalanceUsdc, setWalletBalanceUsdc] = useState(0)
  const [walletBalanceCake, setWalletBalanceCake] = useState(0)
  const [walletBalanceUni, setWalletBalanceUni] = useState(0)
  const [walletBalanceBaby, setWalletBalanceBaby] = useState(0)
  const [walletBalanceLink, setWalletBalanceLink] = useState(0)
  const [walletBalanceTwt, setWalletBalanceTwt] = useState(0)
  const [walletBalanceWbtc, setWalletBalanceWbtc] = useState(0)
  const [walletBalanceGmt, setWalletBalanceGmt] = useState(0)
  const [walletBalanceSol, setWalletBalanceSol] = useState(0)
  const [walletBalanceCoin, setWalletBalanceCoin] = useState(0)
  const [resultEth, setResultEth] = useState<any[]>([])
  const [resultBnb, setResultBnb] = useState<any[]>([])
  const [resultBusd, setResultBusd] = useState<any[]>([])
  const [resultUsdt, setResultUsdt] = useState<any[]>([])
  const [resultUsdc, setResultUsdc] = useState<any[]>([])
  const [resultSol, setResultSol] = useState<any[]>([])
  const [resultCake, setResultCake] = useState<any[]>([])
  const [resultUni, setResultUni] = useState<any[]>([])
  const [resultBaby, setResultBaby] = useState<any[]>([])
  const [resultTwt, setResultTwt] = useState<any[]>([])
  const [resultWbtc, setResultWbtc] = useState<any[]>([])
  const [resultGmt, setResultGmt] = useState<any[]>([])
  const [resultLink, setResultLink] = useState<any[]>([])
  const [resultCoin, setResultCoin] = useState<any[]>([])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (chainId === 1 || !address) {
      setFilteredPoolData(poolData)
      getAllInfo()
    }
    if (chainId === 56) {
      setFilteredPoolData(poolDataBsc)
      getAllInfoBnb()
    }
    if (chainId === 10) {
      setFilteredPoolData(poolDataOpt)
      getAllOpt()
    }
    if (chainId === 42161) {
      setFilteredPoolData(poolDataArb)
      getAllArb()
    }
    if (chainId === 250) {
      setFilteredPoolData(poolDataFantom)
      getAllFantom()
    }
    if (chainId === 8453) {
      setFilteredPoolData(poolDataBase)
      getAllBase()
    }
    if (chainId === 137) {
      setFilteredPoolData(poolDataPol)
      getAllPol()
    }
  }, [chainId])

  const getAllInfo = async () => {
    await apiCoin.getStat().then(async rOther => {
      setStat(rOther)
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const Result1Eth = await api.getBalance(poolData[0].addresses[0])
      const Result2Eth = await api.getBalance(poolData[0].addresses[1])
      const Result3Eth = await api.getBalance(poolData[0].addresses[2])
      const Result4Eth = await api.getBalance(poolData[0].addresses[3])
      setTotalBalanceEth(
        (Number(Result1Eth.result) / busd +
          Number(Result2Eth.result) / busd +
          Number(Result3Eth.result) / busd +
          Number(Result4Eth.result) / busd) *
        rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
      )
      if (address) {
        const nftContract = new ethers.Contract(contractAddressEthNew, abiEthNew, provider)
        if (address === '0x165D89125d3857ACF40C60d9cee03B8AA1c598e8' || address === '0x165D89125d3857ACF40C60d9cee03B8AA1c598e8') {
          setWalletBalanceEth(0)
        } else {
          const depositStatusDataLol = await nftContract.getDepositInfo(address)
          setResultEth(depositStatusDataLol.stakedAmounts)

          setTimeout(() => {
            api.getBalance(`${address}`).then(r => {
              setWalletBalanceEth(
                 (Number(r.result) / busd) * rOther?.find(iOther => iOther.id === "ethereum")?.current_price,
              )
            })
          }, 1500)

        }
      }
      {
        const tokenContractUsdt = new ethers.Contract(approveAddress, abiApprove, provider)
        if (address) {
          const nftContractUsdt = new ethers.Contract(contractAddressUsdtNew, abi, provider)
          const depositStatusDataLolUsdt = await nftContractUsdt.getDepositInfo(address)
          setResultUsdt(depositStatusDataLolUsdt.stakedAmounts)

          tokenContractUsdt.balanceOf(address).then(r => {
            setWalletBalanceUsdt((Number(r) / 1000000) * rOther?.find(iOther => iOther.id === "tether")?.current_price)
          })
        }

        const Result1Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[0])
        const Result2Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[1])
        const Result3Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[2])
        const Result4Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[3])
        const Result5Usdt = await tokenContractUsdt.balanceOf(poolData[1].addresses[4])
        setTotalBalanceUsdt(
          (Number(Result1Usdt) / 1000000 +
            Number(Result2Usdt) / 1000000 +
            Number(Result3Usdt) / 1000000 +
            Number(Result4Usdt) / 1000000 +
            Number(Result5Usdt) / 1000000) *
          rOther?.find(iOther => iOther.id === "tether")?.current_price,
        )

        const tokenContractUsdc = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)

        if (address) {
          const nftContractUsdc = new ethers.Contract(contractAddressUsdc, abiUsdc, provider)
          const depositStatusDataLolUsdc = await nftContractUsdc.getDepositInfo(address)
          setResultUsdc(depositStatusDataLolUsdc.stakedAmounts)

          tokenContractUsdc.balanceOf(address).then(r => {
            setWalletBalanceUsdc(
              (Number(r) / 1000000) * rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
            )
          })
        }

        const Result1Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[0])
        const Result2Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[1])
        const Result3Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[2])
        const Result4Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[3])
        const Result5Usdc = await tokenContractUsdc.balanceOf(poolData[2].addresses[4])
        setTotalBalanceUsdc(
          (Number(Result1Usdc) / 1000000 +
            Number(Result2Usdc) / 1000000 +
            Number(Result3Usdc) / 1000000 +
            Number(Result4Usdc) / 1000000 +
            Number(Result5Usdc) / 1000000) *
          rOther?.find(iOther => iOther.id === "usd-coin")?.current_price,
        )

        const tokenContractUni = new ethers.Contract(contractAddressUniApprove, abiUniApprove, provider)

        if (address) {
          const nftContractUni = new ethers.Contract(contractAddressUni, abiUni, provider)
          const depositStatusDataLolUni = await nftContractUni.getDepositInfo(address)
          setResultUni(depositStatusDataLolUni.stakedAmounts)

          tokenContractUni.balanceOf(address).then(r => {
            setWalletBalanceUni((Number(r) / busd) * rOther?.find(iOther => iOther.id === "uniswap")?.current_price)
          })
        }
        const Result1Uni = await tokenContractUni.balanceOf(poolData[3].addresses[0])
        const Result2Uni = await tokenContractUni.balanceOf(poolData[3].addresses[1])
        const Result3Uni = await tokenContractUni.balanceOf(poolData[3].addresses[2])
        const Result4Uni = await tokenContractUni.balanceOf(poolData[3].addresses[3])
        // const Result5Uni = await tokenContractUni.balanceOf(poolData[3].addresses[4])
        setTotalBalanceUni(
          (Number(Result1Uni) / busd +
            Number(Result2Uni) / busd +
            Number(Result3Uni) / busd +
            Number(Result4Uni) / busd) *
          rOther?.find(iOther => iOther.id === "uniswap")?.current_price,
        )

        const tokenContractLink = new ethers.Contract(contractAddressLinkApprove, abiLinkApprove, provider)

        if (address) {
          const nftContractLink = new ethers.Contract(contractAddressLink, abiLink, provider)
          const depositStatusDataLolLink = await nftContractLink.getDepositInfo(address)
          setResultLink(depositStatusDataLolLink.stakedAmounts)

          tokenContractLink.balanceOf(address).then(r => {
            setWalletBalanceLink((Number(r) / busd) * rOther?.find(iOther => iOther.id === "chainlink")?.current_price)
          })
        }

        const Result1Link = await tokenContractLink.balanceOf(poolData[4].addresses[0])
        const Result2Link = await tokenContractLink.balanceOf(poolData[4].addresses[1])
        const Result3Link = await tokenContractLink.balanceOf(poolData[4].addresses[2])
        const Result4Link = await tokenContractLink.balanceOf(poolData[4].addresses[3])
        setTotalBalanceLink(
          (Number(Result1Link) / busd +
            Number(Result2Link) / busd +
            Number(Result3Link) / busd +
            Number(Result4Link) / busd) *
          rOther?.find(iOther => iOther.id === "chainlink")?.current_price,
        )

        const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)

        // const Result1Avax = await api.getBalance(poolDataPol[0].addresses[0])
        // const Result2Avax = await apiPol.getBalance(poolDataPol[0].addresses[1])
        // const Result3Avax = await apiPol.getBalance(poolDataPol[0].addresses[2])
        // const Result4Avax = await apiPol.getBalance(poolDataPol[0].addresses[3])
        // setTotalBalanceAvax(
        //   (Number(Result4Avax.result) / busd +
        //     Number(Result4Avax.result) / busd +
        //     Number(Result4Avax.result) / busd +
        //     Number(Result4Avax.result) / busd) *
        //   rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
        // )
        // const Result1Manta = await api.getBalance(poolDataManta[0].addresses[0])
        // const Result2Manta = await api.getBalance(poolDataManta[0].addresses[1])
        // const Result3Manta = await api.getBalance(poolDataManta[0].addresses[2])
        // const Result4Manta = await api.getBalance(poolDataManta[0].addresses[3])
        // setTotalBalanceManta(
        //   (Number(Result1Manta.result) / busd +
        //     Number(Result2Manta.result) / busd +
        //     Number(Result3Manta.result) / busd +
        //     Number(Result4Manta.result) / busd) *
        //   rOther?.find(iOther => iOther.id === poolDataManta[0].id)?.current_price,
        // )

        if (address) {
          const nftContractWbtc = new ethers.Contract(contractAddressWbtc, abiWbtc, provider)

          const depositStatusDataLolWbtc = await nftContractWbtc.getDepositInfo(address)
          setResultWbtc(depositStatusDataLolWbtc?.stakedAmounts)

          tokenContract.balanceOf(address).then(r => {
            setWalletBalanceWbtc(
              (Number(r) / 100000000) * rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
            )
          })
        }
        const Result1 = await tokenContract.balanceOf(poolData[5].addresses[0])
        const Result2 = await tokenContract.balanceOf(poolData[5].addresses[1])
        const Result3 = await tokenContract.balanceOf(poolData[5].addresses[2])
        const Result4 = await tokenContract.balanceOf(poolData[5].addresses[3])
        setTotalBalanceWbtc(
          (Number(Result1) / 100000000 +
            Number(Result2) / 100000000 +
            Number(Result3) / 100000000 +
            Number(Result4) / 100000000) *
          rOther?.find(iOther => iOther.id === "wrapped-bitcoin")?.current_price,
        )
        const tokenContractSol = new ethers.Contract(contractAddressSolApprove, abiWbtcApprove, provider)

        if (address) {
          // const nftContractApe = new ethers.Contract(contractAddressApe, abiApe, provider)
          // const depositStatusDataLolApe = await nftContractApe.getDepositInfo(address)
          // setResultApe(depositStatusDataLolApe.stakedAmounts)

          tokenContractSol.balanceOf(address).then(r => {
            setWalletBalanceSol((Number(r) / 1000000000) * rOther?.find(iOther => iOther.id === "solana")?.current_price)
          })
        }
        const Result1Sol = await tokenContractSol.balanceOf(poolData[6].addresses[0])
        const Result2Sol = await tokenContractSol.balanceOf(poolData[6].addresses[1])
        const Result3Sol = await tokenContractSol.balanceOf(poolData[6].addresses[2])
        const Result4Sol = await tokenContractSol.balanceOf(poolData[6].addresses[3])
        setTotalBalanceSol(
          (Number(Result1Sol) / 1000000000 +
            Number(Result2Sol) / 1000000000 +
            Number(Result3Sol) / 1000000000 +
            Number(Result4Sol) / 1000000000) *
          rOther?.find(iOther => iOther.id === "solana")?.current_price,
        )
      }
    })
  }
  const getAllOpt = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Opt = await apiOpt.getBalance(poolDataOpt[0].addresses[0])
      const Result2Opt = await apiOpt.getBalance(poolDataOpt[0].addresses[1])
      const Result3Opt = await apiOpt.getBalance(poolDataOpt[0].addresses[2])
      const Result4Opt = await apiOpt.getBalance(poolDataOpt[0].addresses[3])
      setTotalBalanceOpt(
        (Number(Result1Opt.result) / busd +
          Number(Result2Opt.result) / busd +
          Number(Result3Opt.result) / busd +
          Number(Result4Opt.result) / busd) *
        rOther?.find(iOther => iOther.id === poolDataOpt[0].id)?.current_price,
      )
    })
  }
  const getAllArb = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Arb = await apiArb.getBalance(poolDataArb[0].addresses[0])
      const Result2Arb = await apiArb.getBalance(poolDataArb[0].addresses[1])
      const Result3Arb = await apiArb.getBalance(poolDataArb[0].addresses[2])
      const Result4Arb = await apiArb.getBalance(poolDataArb[0].addresses[3])
      setTotalBalanceArb(
        (Number(Result1Arb.result) / busd +
          Number(Result2Arb.result) / busd +
          Number(Result3Arb.result) / busd +
          Number(Result4Arb.result) / busd) *
        rOther?.find(iOther => iOther.id === poolDataArb[0].id)?.current_price,
      )
    })
  }
  const getAllFantom = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Fantom = await apiFantom.getBalance(poolDataFantom[0].addresses[0])
      const Result2Fantom = await apiFantom.getBalance(poolDataFantom[0].addresses[1])
      const Result3Fantom = await apiFantom.getBalance(poolDataFantom[0].addresses[2])
      const Result4Fantom = await apiFantom.getBalance(poolDataFantom[0].addresses[3])
      setTotalBalanceFantom(
        (Number(Result1Fantom.result) / busd +
          Number(Result2Fantom.result) / busd +
          Number(Result3Fantom.result) / busd +
          Number(Result4Fantom.result) / busd) *
        rOther?.find(iOther => iOther.id === poolDataFantom[0].id)?.current_price,
      )
    })
  }
  const getAllPol = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Pol = await apiPol.getBalance(poolDataPol[0].addresses[0])
      const Result2Pol = await apiPol.getBalance(poolDataPol[0].addresses[1])
      const Result3Pol = await apiPol.getBalance(poolDataPol[0].addresses[2])
      const Result4Pol = await apiPol.getBalance(poolDataPol[0].addresses[3])
      setTotalBalancePol(
        (Number(Result1Pol.result) / busd +
          Number(Result2Pol.result) / busd +
          Number(Result3Pol.result) / busd +
          Number(Result4Pol.result) / busd) *
        rOther?.find(iOther => iOther.id === poolDataPol[0].id)?.current_price,
      )
    })
  }
  const getAllBase = async () => {
    await apiCoin.getStat().then(async rOther => {
      const Result1Base = await apiBase.getBalance(poolDataBase[0].addresses[0])
      const Result2Base = await apiBase.getBalance(poolDataBase[0].addresses[1])
      const Result3Base = await apiBase.getBalance(poolDataBase[0].addresses[2])
      const Result4Base = await apiBase.getBalance(poolDataBase[0].addresses[3])
      setTotalBalanceBase(
        (Number(Result1Base.result) / busd +
          Number(Result2Base.result) / busd +
          Number(Result3Base.result) / busd +
          Number(Result4Base.result) / busd) *
        rOther?.find(iOther => iOther.id === poolDataBase[0].id)?.current_price,
      )
    })
  }
  const getAllInfoBnb = async () => {
    await apiCoin.getStat().then(async rOther => {
      setStat(rOther)
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const Result1Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[0])
      const Result2Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[1])
      const Result3Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[2])
      const Result4Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[3])
      const Result5Bnb = await apiScan.getBalance(poolDataBsc[0].addresses[4])
      setTotalBalanceBnb(
        (Number(Result1Bnb.result) / busd +
          Number(Result2Bnb.result) / busd +
          Number(Result3Bnb.result) / busd +
          Number(Result4Bnb.result) / busd +
          Number(Result5Bnb.result) / busd) *
        rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
      )
      if (address) {
        setTimeout(() => {
          apiScan.getBalance(`${address}`).then(r => {
            setWalletBalanceBnb(
              (Number(r.result) / busd) * rOther?.find(iOther => iOther.id === "binancecoin")?.current_price,
            )
          })
        }, 1500)

        const nftContract = new ethers.Contract(contractAddressBnb, abiBnb, provider)

        const depositStatusDataLol = await nftContract.getDepositInfo(address)
        setResultBnb(depositStatusDataLol.stakedAmounts)
      }
      {
        const tokenContractBusd = new ethers.Contract(contractAddressBusdApprove, abiBusdApprove, provider)
        if (address) {
          tokenContractBusd.balanceOf(address).then(r => {
            setWalletBalanceBusd(
              (Number(r) / busd) * rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
            )
          })

          const nftContractUsdt = new ethers.Contract(contractAddressBusd, abiBusd, provider)
          const depositStatusDataLolUsdt = await nftContractUsdt.getDepositInfo(address)
          setResultBusd(depositStatusDataLolUsdt.stakedAmounts)
        }

        const Result1Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[0])
        const Result2Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[1])
        const Result3Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[2])
        const Result4Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[3])
        const Result5Busd = await tokenContractBusd.balanceOf(poolDataBsc[1].addresses[4])
        setTotalBalanceBusd(
          (Number(Result1Busd) / busd +
            Number(Result2Busd) / busd +
            Number(Result3Busd) / busd +
            Number(Result4Busd) / busd +
            Number(Result5Busd) / busd) *
          rOther?.find(iOther => iOther.id === "binance-usd")?.current_price,
        )

        const tokenContractCake = new ethers.Contract(contractAddressCakeApprove, abiCakeApprove, provider)

        if (address) {
          // const nftContractUsdc = new ethers.Contract(contractAddressUsdc, abiUsdc, provider)
          // const depositStatusDataLolUsdc = await nftContractUsdc.getDepositInfo(address)
          // setResultUsdc(depositStatusDataLolUsdc.stakedAmounts)

          tokenContractCake.balanceOf(address).then(r => {
            setWalletBalanceCake(
              (Number(r) / busd) * rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
            )
          })
        }

        const Result1Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[0])
        const Result2Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[1])
        const Result3Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[2])
        const Result4Cake = await tokenContractCake.balanceOf(poolDataBsc[2].addresses[3])
        setTotalBalanceCake(
          (Number(Result1Cake) / busd +
            Number(Result2Cake) / busd +
            Number(Result3Cake) / busd +
            Number(Result4Cake) / busd) *
          rOther?.find(iOther => iOther.id === "pancakeswap-token")?.current_price,
        )

        const tokenContractBaby = new ethers.Contract(contractAddressBabyDogeApprove, abiBabyDogeApprove, provider)

        if (address) {
          // const nftContractUni = new ethers.Contract(contractAddressUni, abiUni, provider)
          // const depositStatusDataLolUni = await nftContractUni.getDepositInfo(address)
          // setResultUni(depositStatusDataLolUni.stakedAmounts)

          tokenContractBaby.balanceOf(address).then(r => {
            setWalletBalanceBaby(
              (Number(r) / 1000000000) * rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
            )
          })
        }
        const Result1Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[0])
        const Result2Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[1])
        const Result3Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[2])
        const Result4Baby = await tokenContractBaby.balanceOf(poolDataBsc[3].addresses[3])
        setTotalBalanceBaby(
          (Number(Result1Baby) / 1000000000 +
            Number(Result2Baby) / 1000000000 +
            Number(Result3Baby) / 1000000000 +
            Number(Result4Baby) / 1000000000) *
          rOther?.find(iOther => iOther.id === "baby-doge-coin")?.current_price,
        )

        const tokenContractTwt = new ethers.Contract(contractAddressTwtApprove, abiTwtApprove, provider)

        if (address) {
          // const nftContractLink = new ethers.Contract(contractAddressLink, abiLink, provider)
          // const depositStatusDataLolLink = await nftContractLink.getDepositInfo(address)
          // setResultLink(depositStatusDataLolLink.stakedAmounts)

          tokenContractTwt.balanceOf(address).then(r => {
            setWalletBalanceTwt(
              (Number(r) / busd) * rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
            )
          })
        }

        const Result1Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[0])
        const Result2Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[1])
        const Result3Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[2])
        const Result4Twt = await tokenContractTwt.balanceOf(poolDataBsc[4].addresses[3])
        setTotalBalanceTwt(
          (Number(Result1Twt) / busd +
            Number(Result2Twt) / busd +
            Number(Result3Twt) / busd +
            Number(Result4Twt) / busd) *
          rOther?.find(iOther => iOther.id === "trust-wallet-token")?.current_price,
        )

        const tokenContractGmt = new ethers.Contract(contractAddressGmtApprove, abiGmtApprove, provider)

        if (address) {
          // const nftContractWbtc = new ethers.Contract(contractAddressWbtc, abiWbtc, provider)
          //
          // const depositStatusDataLolWbtc = await nftContractWbtc.getDepositInfo(address)
          // setResultWbtc(depositStatusDataLolWbtc.stakedAmounts)

          tokenContractGmt.balanceOf(address).then(r => {
            setWalletBalanceGmt(
              (Number(r) / 100000000) * rOther?.find(iOther => iOther.id === "stepn")?.current_price,
            )
          })
        }
        const Result1 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[0])
        const Result2 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[1])
        const Result3 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[2])
        const Result4 = await tokenContractGmt.balanceOf(poolDataBsc[5].addresses[3])
        setTotalBalanceGmt(
          (Number(Result1) / 100000000 +
            Number(Result2) / 100000000 +
            Number(Result3) / 100000000 +
            Number(Result4) / 100000000) *
          rOther?.find(iOther => iOther.id === "stepn")?.current_price,
        )

        const tokenContractCoin = new ethers.Contract(contractAddressC98Approve, abiC98Approve, provider)

        if (address) {
          // const nftContractApe = new ethers.Contract(contractAddressApe, abiApe, provider)
          // const depositStatusDataLolApe = await nftContractApe.getDepositInfo(address)
          // setResultApe(depositStatusDataLolApe.stakedAmounts)

          tokenContractCoin.balanceOf(address).then(r => {
            setWalletBalanceCoin((Number(r) / busd) * rOther?.find(iOther => iOther.id === "coin98")?.current_price)
          })
        }
        const Result1Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[0])
        const Result2Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[1])
        const Result3Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[2])
        const Result4Coin = await tokenContractCoin.balanceOf(poolDataBsc[6].addresses[3])
        setTotalBalanceCoin(
          (Number(Result1Coin) / busd +
            Number(Result2Coin) / busd +
            Number(Result3Coin) / busd +
            Number(Result4Coin) / busd) *
          rOther?.find(iOther => iOther.id === "coin98")?.current_price,
        )
      }
    })
  }

  const getTotalBalance = (token: string) => {
    if (token === "ETH") {
      return totalBalanceEth
    }
    if (token === "OP") {
      return totalBalanceOpt
    }
    if (token === "BASE") {
      return totalBalanceBase
    }
    if (token === "ARB") {
      return totalBalanceArb
    }
    if (token === "WSOL") {
      return totalBalanceSol
    }
    if (token === "POL") {
      return totalBalancePol
    }
    if (token === "ETH(Base)") {
      return totalBalanceBase
    }
    if (token === "FTM") {
      return totalBalanceFantom
    }
    if (token === "USDT") {
      return totalBalanceUsdt
    }
    if (token === "USDC") {
      return totalBalanceUsdc
    }
    if (token === "UNI") {
      return totalBalanceUni
    }
    if (token === "LINK") {
      return totalBalanceLink
    }
    if (token === "WBTC") {
      return totalBalanceWbtc
    }
    if (token === "BNB") {
      return totalBalanceBnb
    }
    if (token === "BUSD") {
      return totalBalanceBusd
    }
    if (token === "CAKE") {
      return totalBalanceCake
    }
    if (token === "BABYDOGE") {
      return totalBalanceBaby
    }
    if (token === "TWT") {
      return totalBalanceTwt
    }
    if (token === "GMT") {
      return totalBalanceGmt
    }
    if (token === "C98") {
      return totalBalanceCoin
    }

    return 0
  }
  const getWalletBalance = (token: string) => {
    if (token === "ETH") {
      return walletBalanceEth
    }
    if (token === "USDT") {
      return walletBalanceUsdt
    }
    if (token === "USDC") {
      return walletBalanceUsdc
    }
    if (token === "WSOL") {
      return walletBalanceSol
    }
    if (token === "UNI") {
      return walletBalanceUni
    }
    if (token === "LINK") {
      return walletBalanceLink
    }
    if (token === "WBTC") {
      return walletBalanceWbtc
    }

    return 0
  }

  useEffect(() => {
    if (debouncedSearchCountries) {
      // setFilteredPoolData(
      //   ((chainId === 1 || !address) ? poolData : poolDataBsc).filter(i =>
      //       i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
      //       i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
      //   ),
      // )
    } else {
      if (chainId === 1 || !address) {
        setFilteredPoolData(poolData)
      }
      if (chainId === 56) {
        setFilteredPoolData(poolDataBsc)
      }
      if (chainId === 10) {
        setFilteredPoolData(poolDataOpt)
      }
      if (chainId === 42161) {
        setFilteredPoolData(poolDataArb)
      }
      if (chainId === 250) {
        setFilteredPoolData(poolDataFantom)
      }
      if (chainId === 8453) {
        setFilteredPoolData(poolDataBase)
      }
      if (chainId === 43114) {
        setFilteredPoolData(poolDataAvax)
      }
      if (chainId === 169) {
        setFilteredPoolData(poolDataManta)
      }
      if (chainId === 137) {
        setFilteredPoolData(poolDataPol)
      }

    }
  }, [debouncedSearchCountries])

  const isPoolStaked = (token: string) => {
    if (token === "ETH") {
      return resultEth
    }
    if (token === "USDT") {
      return resultUsdt
    }
    if (token === "WSOL") {
      return resultSol
    }
    if (token === "USDC") {
      return resultUsdc
    }
    if (token === "UNI") {
      return resultUni
    }
    if (token === "WBTC") {
      return resultWbtc
    }
    if (token === "LINK") {
      return resultLink
    }
    if (token === "BNB") {
      return resultBnb
    }
    if (token === "BUSD") {
      return resultBusd
    }
    if (token === "CAKE") {
      return resultCake
    }
    if (token === "BABYDOGE") {
      return resultBaby
    }
    if (token === "TWT") {
      return resultTwt
    }
    if (token === "GMT") {
      return resultGmt
    }
    if (token === "C98") {
      return resultCoin
    }
    return []
  }

  const returnData = () => {
    if (chainId === 1 || !address) {
      return poolData
    }
    if (chainId === 56) {
      return poolDataBsc
    }
    if (chainId === 10) {
      return poolDataOpt
    }
    if (chainId === 42161) {
      return poolDataArb
    }
    if (chainId === 250) {
      return poolDataFantom
    }
    if (chainId === 8453) {
      return poolDataBase
    }
    if (chainId === 43114) {
      return poolDataAvax
    }
    if (chainId === 169) {
      return poolDataManta
    }
    if (chainId === 137) {
      return poolDataPol
    }
  }

  return (
    <div className="pool" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="pool-content">
        <div className="pool-content-header">
          <div className="pool-content-header-tabs">
            <button
              onClick={() => setTab("top")}
              className={cn("pool-content-header-tabs-item", {
                active: tab === "top",
              })}
            >
              Top Pools
            </button>
            <button
              onClick={() => setTab("staked")}
              className={cn("pool-content-header-tabs-item", {
                active: tab === "staked",
              })}
            >
              Staked Pools
            </button>
          </div>
          <div/>
        </div>
        {tab === "top" && (
          <div className="pool-content-wrap">
            {(returnData()).map((pool, index) => (
              <PoolItem
                pool={pool}
                key={index}
                totalBalance={getTotalBalance(pool.token)}
                walletBalance={getWalletBalance(pool.token)}
              />
            ))}
          </div>
        )}
        {tab === "staked" && (
          <div className="pool-content-wrap">
            {(returnData()).map((pool, index) => (
              <PoolItemStaked
                pool={pool}
                key={index}
                staked={isPoolStaked(pool.token)?.reduce((accumulator, object) => {
                  return Number(object) / busd + Number(object) / busd
                }, 0)}
                notHide={Number(isPoolStaked(pool.token)[0]) > 0}
                walletBalance={getWalletBalance(pool.token)}
              />
            ))}
          </div>
        )}
        <div className="pool-content-filters">
          <div className="pool-content-filters-left">
            <button
              onClick={() => setTabFilters("all")}
              className={cn("pool-content-filters-left-tab", {
                active: tabFilters === "all",
              })}
            >
              All Pools
            </button>
            <button
              onClick={() => setTabFilters("staked")}
              className={cn("pool-content-filters-left-tab", {
                active: tabFilters === "staked",
              })}
            >
              Staked Pools
            </button>
            <div className="pool-content-filters-left-tvl">
              TVL:{" "}
              {(chainId === 1 || !address) &&
                moneyFormatter.format(
                  totalBalanceEth +
                  totalBalanceWbtc +
                  totalBalanceLink +
                  totalBalanceUsdt +
                  totalBalanceUsdc +
                  totalBalanceUni +
                  totalBalanceSol,
                )}
              {chainId === 56 &&
                moneyFormatter.format(
                  totalBalanceBnb +
                  totalBalanceBusd +
                  totalBalanceCake +
                  totalBalanceBaby +
                  totalBalanceTwt +
                  totalBalanceGmt +
                  totalBalanceCoin,
                )}
              {chainId ===10 &&
                moneyFormatter.format(
                  totalBalanceOpt
                )}
              {chainId ===42161 &&
                moneyFormatter.format(
                  totalBalanceArb
                )}
              {chainId ===8453 &&
                moneyFormatter.format(
                  totalBalanceBase
                )}
              {chainId ===250 &&
                moneyFormatter.format(
                  totalBalanceFantom
                )}
              {chainId ===169 &&
                moneyFormatter.format(
                  totalBalanceManta
                )}
              {chainId ===137 &&
                moneyFormatter.format(
                  totalBalancePol
                )}
              {chainId ===43114 &&
                moneyFormatter.format(
                  totalBalanceAvax
                )}
            </div>
          </div>
          <div className="pool-content-filters-right">
            <NetworkDropdown chainId={chainId} mobileRight account={""}/>
            <Input onChange={v => setInput(v)} value={input} variant="search" placeholder="Search"/>
          </div>
        </div>
        {tabFilters === "all" && <PoolTable poolData={filteredPoolData} getTvl={getTotalBalance}/>}
        {tabFilters === "staked" && (
          <PoolTable
            poolData={filteredPoolData.filter(i => Number(isPoolStaked(i.token)[0]) > 0)}
            getTvl={getTotalBalance}
          />
        )}
      </div>
      <Footer/>
    </div>
  )
}
