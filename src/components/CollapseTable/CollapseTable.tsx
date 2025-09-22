import { useEffect, useRef, useState } from "react"
import cn from "classnames"
import { Link, useSearchParams } from "react-router-dom"

import "./CollapseTable.scss"
import {
  approveAddress,
  contractAddressUsdc,
  contractAddressUsdcApprove,
  contractAddressUni,
  contractAddressUniApprove,
  contractAddressLink,
  contractAddressLinkApprove,
  contractAddressUsdtNew,
  contractAddressWbtcApprove,
  contractAddressBusdApprove,
  contractAddressCakeApprove,
  contractAddressBabyDogeApprove,
  contractAddressTwtApprove,
  contractAddressGmtApprove,
  contractAddressC98Approve, contractAddressBnb, contractAddressBusd,
  contractAddressUsdtSecond,
  contractAddressWbtcNew,
  contractAddressEthNew, contractAddressSol, contractAddressSolApprove
} from "../../abi"
import abiUsdtNew from "../../abi/abiUsdtNew.json"
import abiUsdtSecond from "../../abi/abiUsdtSecond.json"
import abiEthNew from "../../abi/abiEthNew.json"
import abiBnb from "../../abi/abiBnb.json"
import abiSol from "../../abi/abiSol.json"
import abiBusd from "../../abi/abiBusd.json"
import abiUsdc from "../../abi/abiUsdc.json"
import abiUsdcApprove from "../../abi/abiUsdcApprove.json"
import abiApprove from "../../abi/abiApprove.json"
import abiUni from "../../abi/abiUni.json"
import abiUniApprove from "../../abi/abiUniApprove.json"
import abiLink from "../../abi/abiLink.json"
import abiLinkApprove from "../../abi/abiLinkApprove.json"
import abiWbtcNew from "../../abi/abiWbtcNew.json"
import abiWbtcApprove from "../../abi/abiWbtcApprove.json"
import abiBabyDogeApprove from "../../abi/abiBabyDogeApprove.json"
import abiBusdApprove from "../../abi/abiBusdApprove.json"
import abiC98Approve from "../../abi/abiC98Approve.json"
import abiCakeApprove from "../../abi/abiCakeApprove.json"
import abiGmtApprove from "../../abi/abiGmtApprove.json"
import abiTwtApprove from "../../abi/abiTwtApprove.json"
import { ethers } from "ethers"
import { apiOur } from "../../service/api/apiOur"
import {getFromLocalStorage, mixins, moneyFormatter, routes, setToLocalStorage, walletClientToSigner} from "../../utils"
import { api } from "../../service/api/api"
import { apiScan } from "../../service/api/apiScan"
import {config} from "../../index";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {apiOpt} from "../../service/api/apiOpt";
import {apiArb} from "../../service/api/apiArb";
import {apiFantom} from "../../service/api/apiFantom";
import {apiPol} from "../../service/api/apiPol";
import {apiBase} from "../../service/api/apiBase";
import {apiOk} from "../../service/api/apiOk";

type Props = {
  height?: number
  opened?: boolean
  quantity: string
  plan: string
  checkAddress: string
  img: string
  token: string
  percent: string
  stakedDisplay: boolean
  stat: any
  id: string
  addAddress?: string
  day: string
  index: number
  isNew?: boolean
  accountRematch: string
}

export const CollapseTable = ({
                                height = 48,
                                quantity,
                                plan,
                                checkAddress,
                                img,
                                token,
                                percent,
                                stakedDisplay,
                                stat,
                                id,
                                day,
                                index,
                                isNew = true,
                              }: Props): JSX.Element => {
  const [search] = useSearchParams()
  const titleRef = useRef<any>(null)
  const [totalBalance, setTotalBalance] = useState(0)
  const [resultArray, setResultArray] = useState<any[]>([])
  const busd = 1000000000000000000
  const {  address } = useAccount();
  const chainId = getChainId(config);

  // const address = '0x9041fa2b75Bf0f556A726c6EEDaE2049cdE01864'

  useEffect(() => {
    getAllInfo()
  }, [address, token])

  const getPlan = () => {
    if (token === "ETH" || token === "USDT"|| token === "USDC" || token === 'BNB' || token === 'WBTC' || token === 'UNI' || token === 'WSOL') {
      if (plan === "7") {
        return 604800
      }
      if (plan === "14") {
        return 1209600
      }
      if (plan === "30") {
        return 2592000
      }
      if (plan === "60") {
        return 5184000
      }
      if (plan === "90") {
        return 7776000
      }
    }
    if (plan === "1") {
      return 86400
    }
    if (plan === "2") {
      return 172800
    }
    if (plan === "3") {
      return 259200
    }
    if (plan === "4") {
      return 345600
    }
    if (plan === "5") {
      return 432000
    }
  }

  const getAllInfo = async () => {
    if (token === 'ETH' && isNew && (chainId === 1 || !chainId)) {
      if (localStorage.getItem(`ethBalance${plan}SECOND`) !== null) {
        setTotalBalance(getFromLocalStorage(`ethBalance${plan}SECOND`))
      }

      api.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`ethBalance${plan}SECOND`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }
    if (token === 'OP' && chainId === 10) {
      // if (localStorage.getItem(`optBalance${plan}`) !== null) {
      //   setTotalBalance(getFromLocalStorage(`optBalance${plan}`))
      // }

      apiOpt.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`optBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
      return
    }
    if (token === 'ARB' && chainId === 42161) {
      // if (localStorage.getItem(`arbBalance${plan}`) !== null) {
      //   setTotalBalance(getFromLocalStorage(`arbBalance${plan}`))
      // }

      apiArb.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`arbBalance${plan}`), (Number(r.result) / busd))
          setTotalBalance(Number(r.result) / busd)
        }
      })

      return
    }
    if (token === 'FTM' && chainId === 250) {
      // if (localStorage.getItem(`ftmBalance${plan}`) !== null) {
      //   setTotalBalance(getFromLocalStorage(`ftmBalance${plan}`))
      // }

      apiFantom.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`ftmBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
      return
    }
    if (token === 'POL' && chainId === 137) {
      // if (localStorage.getItem(`polBalance${plan}`) !== null) {
      //   setTotalBalance(getFromLocalStorage(`polBalance${plan}`))
      // }

      apiPol.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`polBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
      return
    }
    if (token === 'AVAX' && chainId === 43114) {
      apiOk.getBalance('AVAXC', checkAddress).then(r => {
        if (!isNaN(Number(r.data[0].balance))) {
          setToLocalStorage((`avaxBalance${plan}`), Number(r.data[0].balance))
          setTotalBalance(Number(r.data[0].balance))
        }
      })
      return
    }
    if (token === 'MANTA' && chainId === 169) {
      apiOk.getBalance('MANTA', checkAddress).then(r => {
        if (!isNaN(Number(r.data[0].balance))) {
          setToLocalStorage((`mantaBalance${plan}`), Number(r.data[0].balance))
          setTotalBalance(Number(r.data[0].balance))
        }
      })
      return
    }
    if (token === 'ETH(Base)' && chainId === 8453) {
      // if (localStorage.getItem(`baseBalance${plan}`) !== null) {
      //   setTotalBalance(getFromLocalStorage(`baseBalance${plan}`))
      // }

      apiBase.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`baseBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
      return
    }
    if (token === "ETH" && isNew && address !== undefined) {
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const nftContractNew = new ethers.Contract(contractAddressEthNew, abiEthNew, provider)

      if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
        setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
      }

      const depositStatusDataLol = await nftContractNew.getDepositInfo(address)
      if (address === '0x2b66FB6fB178D4aD0625c2dD1662db9cEAC085E3' && plan === '60') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 5184000,
            stakedAmounts: 8 * busd,
            unlockTimes: 1739491308,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        return
      }
      if (address === '0x2b66FB6fB178D4aD0625c2dD1662db9cEAC085E3' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1742000000,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1742031111,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1742040033,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 41 * busd,
            unlockTimes: 1742057055,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        return
      }
      if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749410510,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749445084,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749490901,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749528076,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749528076,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749604994,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1749652529,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1752702481,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 30 * busd,
            unlockTimes: 1752711132,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        return
      }

      if (address === '0x74A7E7422f592F7Fa205AA1ab38029e025eee069' && plan === '30') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 2592000,
            stakedAmounts: 9.88 * busd,
            unlockTimes: 1741691111,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 2592000,
            stakedAmounts: 9.62 * busd,
            unlockTimes: 1741704444,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 2592000,
            stakedAmounts: 9.78 * busd,
            unlockTimes: 1741705601,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        return
      }
      if (address === '0x28916C38989591c380F19025C67128edCfFc1468' && plan === '14') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).slice(1)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        return
      }
      if (address === '0x287D88A9164acB467a78844B7099d19397000000' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1751201121,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1751822222,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 15 * busd,
            unlockTimes: 1752000000,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        return
      }
      if (address === '0x74A7E7422f592F7Fa205AA1ab38029e025eee069' && plan === '60') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 5184000,
            stakedAmounts: 24.89 * busd,
            unlockTimes: 1744544600,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 5184000,
            stakedAmounts: 18.72 * busd,
            unlockTimes: 1744599858,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        return
      }
      if (address === '0x74A7E7422f592F7Fa205AA1ab38029e025eee069' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 49.82 * busd,
            unlockTimes: 1745446933,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 49.78 * busd,
            unlockTimes: 1746700000,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 48.21 * busd,
            unlockTimes: 1746708346,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).concat(mockArray)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        return
      }

      const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
        depositIndices: Number(depositStatusDataLol.depositIndices[index]),
        stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
        lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
        unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
        id: index,
      }))
      setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

      setToLocalStorage(`ethResult${plan}SECOND`, result.filter(i => i.lockupPeriods === getPlan()) || [])

      const indexResult = result
        .filter(i => i.lockupPeriods === getPlan())
      let resultFinal = 0;
      indexResult.every(async (iResult) => {
        const depositStatusOtherData = await nftContractNew.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
        resultFinal = resultFinal + (Number(depositStatusOtherData) / busd)
      })
    }
    if (token === "USDT" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const nftContractNew = new ethers.Contract(contractAddressUsdtNew, abiUsdtNew, provider)
        const nftContractSecond = new ethers.Contract(contractAddressUsdtSecond, abiUsdtSecond, provider)

        const tokenContract = new ethers.Contract(approveAddress, abiApprove, provider)
        if (isNew) {
          // if (localStorage.getItem("usdtBalanceNew") !== null) {
          //   setTotalBalance(getFromLocalStorage("usdtBalanceNew"))
          // }
          const balanceData = await tokenContract.balanceOf(checkAddress)
          console.log(Number(balanceData))
          setTotalBalance(Number(balanceData) / 1000000)
          setToLocalStorage("usdtBalanceNew", Number(balanceData) / 1000000)


          if (localStorage.getItem(`usdtResultNew${plan}`) !== null) {
            setResultArray(getFromLocalStorage(`usdtResultNew${plan}`))
          }
          const depositStatusDataLol = await nftContractNew.getDepositInfo(address)
          if (address === '0x60D78f9d6886D0025bAf6df1F0F2D1c3D1A38503' && plan ==='14') {
            const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
              (i, index) => ({
                depositIndices: Number(depositStatusDataLol.depositIndices[index]),
                stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
                lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
                unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
                id: index,
              }),
            )
            setResultArray(result.filter(i => i.lockupPeriods === getPlan()).slice(1) || [])
            setToLocalStorage(`usdtResultNew${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])
            const indexResult = result
              .filter(i => i.lockupPeriods === getPlan())
            let resultFinal = 0;
            indexResult.every(async (iResult) => {
              const depositStatusOtherData = await nftContractNew.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
              resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000)

            })
            return

          }
          if (address === '0xF3431362dC21dad6082903701177c7936f024325' && plan === '90') {
            if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
              setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
            }
            const mockArray = [
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 45 * busd,
                unlockTimes: 1735203340,
              },
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 40 * busd,
                unlockTimes: 1735474210,
              },
            ]
            const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            })).filter(i => i.id > 0).concat(mockArray)
            setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
            return
          }
          if (address === '0xA112cd87840A2ccd9989E2e1fefD0508035618E3' && plan === '90') {
            if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
              setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
            }
            const mockArray = [
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 45 * busd,
                unlockTimes: 1735203340,
              },
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 40 * busd,
                unlockTimes: 1735474210,
              },
            ]
            const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            })).filter(i => i.id > 0).concat(mockArray)
            setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
            return
          }

          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
            (i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            }),
          )
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          setToLocalStorage(`usdtResultNew${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])
          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          indexResult.every(async (iResult) => {
            const depositStatusOtherData = await nftContractNew.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
            resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000)

          })
          return
        }
        if (localStorage.getItem("usdtBalance") !== null) {
          setTotalBalance(getFromLocalStorage("usdtBalance"))
        }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000)
        setToLocalStorage("usdtBalance", Number(balanceData) / 1000000)

        if (localStorage.getItem(`usdtResult${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`usdtResult${plan}`))
        }

        {

          const depositStatusDataLol = await nftContractSecond.getDepositInfo(address)
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
            (i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            }),
          )
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          setToLocalStorage(`usdtResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])
          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          indexResult.every(async (iResult) => {
            const depositStatusOtherData = await nftContractSecond.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
            resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000)

          })
        }
      }
    }

    if (token === "BNB") {
      apiScan.getBalance(checkAddress).then(r => {
        setTotalBalance(Number(r.result) / busd)
        setToLocalStorage((`bnbBalance${plan}`), Number(r.result) / busd)
      })
      // @ts-ignore
      const { ethereum } = window
      const provider = ((ethereum != null) ? new ethers.providers.Web3Provider(ethereum) : ethers.providers.getDefaultProvider());
      // @ts-ignore
      const signer = await provider?.getSigner();

      const nftContract = new ethers.Contract(contractAddressBnb, abiBnb, signer)
      if (localStorage.getItem("bnbResult") !== null) {
        setResultArray(getFromLocalStorage("bnbResult"))
      }
      const depositStatusDataLol = await nftContract.getDepositInfo(address)
      const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
        depositIndices: Number(depositStatusDataLol.depositIndices[index]),
        stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
        lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
        unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
        id: index,
      }))
      setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
      setToLocalStorage("bnbResult", result.filter(i => i.lockupPeriods === getPlan()) || [])

      const indexResult = result
        .filter(i => i.lockupPeriods === getPlan())
      let resultFinal = 0;
      indexResult.every(async (iResult) => {
        const depositStatusOtherData = await nftContract.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
        resultFinal = resultFinal + (Number(depositStatusOtherData) / busd)

      })
    }

    if (token === "WSOL" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const nftContractNew = new ethers.Contract(contractAddressSol, abiSol, provider)

        const tokenContract = new ethers.Contract(contractAddressSolApprove, abiApprove, provider)
          if (localStorage.getItem("solBalance") !== null) {
            setTotalBalance(getFromLocalStorage("solBalance"))
          }
          const balanceData = await tokenContract.balanceOf(checkAddress)
          setTotalBalance(Number(balanceData) / 1000000000)
          setToLocalStorage("solBalance", Number(balanceData) / 1000000000)


          if (localStorage.getItem(`solResult${plan}`) !== null) {
            setResultArray(getFromLocalStorage(`solResult${plan}`))
          }
          const depositStatusDataLol = await nftContractNew.getDepositInfo(address)
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
            (i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            }),
          )
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          setToLocalStorage(`solResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])
          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          indexResult.every(async (iResult) => {
            const depositStatusOtherData = await nftContractNew.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
            resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000000)

          })
          return
      }
    }
    if (token === "USDC" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const nftContract = new ethers.Contract(contractAddressUsdc, abiUsdc, provider)
        const tokenContract = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)
        if (localStorage.getItem("usdcBalance") !== null) {
          setTotalBalance(getFromLocalStorage("usdcBalance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000)
        setToLocalStorage("usdcBalance", Number(balanceData) / 1000000)
        if (localStorage.getItem("usdcResult") !== null) {
          setResultArray(getFromLocalStorage("usdcResult"))
        }

        const depositStatusDataLol = await nftContract.getDepositInfo(address)

        const transferFunds1 = await  apiOur.getWithdrawals(`${address}-TRANSFER-USDC-from${plan}`)
        const transferFunds2 = await  apiOur.getWithdrawals(`${address}-TRANSFER-USDC-to${plan}`)
        const transferFunds4 = await  apiOur.getWithdrawals(`${address}-TRANSFER-USDC-from${plan}Length`)
        const transferFunds5 = await  apiOur.getWithdrawals(`${address}-TRANSFER-USDC-fromLength${plan}`)

        if (!!transferFunds1?.length) {
          if (!!transferFunds4?.length) {
            const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
              depositIndices: Number(depositStatusDataLol.depositIndices[index]),
              stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
              lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
              unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
              id: index,
            }))
            setResultArray(result.filter(i => i.lockupPeriods === getPlan()).slice((Number(transferFunds4[0].amount) || 0), result.length))
            setToLocalStorage(`ethResult${plan}SECOND`, [])

            return
          }
          setResultArray([])
          setToLocalStorage(`ethResult${plan}SECOND`, [])
          return
        }

        if (!!transferFunds2?.length) {
          const resultMock = transferFunds2.map(i => ({
            depositIndices: 1,
            stakedAmounts: Number(i.amount.split(',')[0]) * 1000000,
            lockupPeriods: getPlan(),
            unlockTimes: Number(i.amount.split(',')[1]),
            id: index,
          }))

          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          }))

          if (!!transferFunds5?.length) {
            setResultArray(result.filter(i => i.lockupPeriods === getPlan()).concat(resultMock as any).slice((Number(transferFunds5[0].amount) || 0)))
            setToLocalStorage(`ethResult${plan}SECOND`, [])

            return
          }


          setResultArray(resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          setToLocalStorage(`ethResult${plan}SECOND`, resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          return
        }

        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        }))

        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        setToLocalStorage(`ethResult${plan}SECOND`, result.filter(i => i.lockupPeriods === getPlan()) || [])
        return
      }
    }
    if (token === "UNI" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const nftContract = new ethers.Contract(contractAddressUni, abiUni, provider)

        const tokenContract = new ethers.Contract(contractAddressUniApprove, abiUniApprove, provider)
        if (localStorage.getItem(`uniBalance${plan}`) !== null) {
          setTotalBalance(getFromLocalStorage(`uniBalance${plan}`))
        }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage(`uniBalance${plan}`, Number(balanceData) / busd)

        const depositStatusDataLol = await nftContract.getDepositInfo(address)
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        }))

        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        setToLocalStorage(`uniResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])

      }
    }
    if (token === "LINK" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const nftContract = new ethers.Contract(contractAddressLink, abiLink, provider)

        const tokenContract = new ethers.Contract(contractAddressLinkApprove, abiLinkApprove, provider)
        if (localStorage.getItem(`linkBalance${plan}`) !== null) {
          setTotalBalance(getFromLocalStorage(`linkBalance${plan}`))
        }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage(`linkBalance${plan}`, Number(balanceData) / busd)
        if (localStorage.getItem(`linkResult${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`linkResult${plan}`))
        }

        const depositStatusDataLol = await nftContract.getDepositInfo(address)
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
          (i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          }),
        )
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        setToLocalStorage(`linkResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])
      }
    }
    if (token === "WBTC" && (chainId === 1 || !chainId)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const nftContractNew = new ethers.Contract(contractAddressWbtcNew, abiWbtcNew, provider)
        const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)
        // if (localStorage.getItem(`wbtcBalanceNew${plan}`) !== null) {
        //   setTotalBalance(getFromLocalStorage(`wbtcBalanceNew${plan}`))
        // }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 100000000)
        setToLocalStorage(`wbtcBalanceNew${plan}`, Number(balanceData) / 100000000)

        if (localStorage.getItem(`wbtcResultNew${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`wbtcResultNew${plan}`))
        }

        const depositStatusDataLol = await nftContractNew.getDepositInfo(address)

        if (address === '0x74A7E7422f592F7Fa205AA1ab38029e025eee069' && plan === '30') {
          const mockArray = [
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 2592000,
              stakedAmounts: 0.24 * 100000000,
              unlockTimes: 1741274136,
            },
          ]
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          })).filter(i => i.id > 0).concat(mockArray)
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

          return
        }
        if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044' && plan === '90') {
          const mockArray = [
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 7776000,
              stakedAmounts: 50 * 100000000,
              unlockTimes: 1752575873,
            },
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 7776000,
              stakedAmounts: 30 * 100000000,
              unlockTimes: 1752700301,
            },
          ]
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          })).filter(i => i.id > 0).concat(mockArray)
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          return
        }

        if (address === '0x74A7E7422f592F7Fa205AA1ab38029e025eee069' && plan === '90') {
          const mockArray = [
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 7776000,
              stakedAmounts: 4.13 * 100000000,
              unlockTimes: 1746268143,
            },
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 7776000,
              stakedAmounts: 5.27 * 100000000,
              unlockTimes: 1746423647,
            },
          ]
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          })).filter(i => i.id > 0).concat(mockArray)
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          return
        }
        if (address === '0x287D88A9164acB467a78844B7099d19397000000' && plan === '90') {
          const mockArray = [
            {
              depositIndices: 4,
              id: 4,
              lockupPeriods: 7776000,
              stakedAmounts: 2 * 100000000,
              unlockTimes: 1751843221,
            },
          ]
          const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          })).filter(i => i.id > 0).concat(mockArray)
          setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
          return
        }


        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        }))

        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        setToLocalStorage(`wbtcResultNew${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        indexResult.every(async (iResult) => {
          const depositStatusOtherData = await nftContractNew.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
          resultFinal = resultFinal + (Number(depositStatusOtherData) / 100000000)

        })
        return
      }
    }
    if (token === "BUSD") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        const nftContract = new ethers.Contract(contractAddressBusd, abiBusd, provider)

        const tokenContract = new ethers.Contract(contractAddressBusdApprove, abiBusdApprove, provider)
        if (localStorage.getItem(`busdBalance${plan}`) !== null) {
          setTotalBalance(getFromLocalStorage(`busdBalance${plan}`))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage(`busdBalance${plan}`, Number(balanceData) / busd)

        if (localStorage.getItem(`busdResult${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`busdResult${plan}`))
        }

        const depositStatusDataLol = await nftContract.getDepositInfo(address)
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map(
          (i, index) => ({
            depositIndices: Number(depositStatusDataLol.depositIndices[index]),
            stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
            lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
            unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
            id: index,
          }),
        )
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])
        setToLocalStorage(`busdResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        indexResult.every(async (iResult) => {
          const depositStatusOtherData = await nftContract.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
          resultFinal = resultFinal + (Number(depositStatusOtherData) / busd)

        })
      }
    }
    if (token === "CAKE") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        // const nftContract = new ethers.Contract(contractAddressApe, abiApe, provider)

        const tokenContract = new ethers.Contract(contractAddressCakeApprove, abiCakeApprove, provider)
        if (localStorage.getItem("cakeBalance") !== null) {
          setTotalBalance(getFromLocalStorage("cakeBalance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage("cakeBalance", Number(balanceData) / busd)
      }
    }
    if (token === "BABYDOGE") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        // const nftContract = new ethers.Contract(contractAddressApe, abiApe, provider)

        const tokenContract = new ethers.Contract(contractAddressBabyDogeApprove, abiBabyDogeApprove, provider)
        if (localStorage.getItem("babyBalance") !== null) {
          setTotalBalance(getFromLocalStorage("babyBalance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000000)
        setToLocalStorage("babyBalance", Number(balanceData) / 1000000000)

      }
    }
    if (token === "TWT") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        // const nftContract = new ethers.Contract(contractAddressApe, abiApe, provider)

        const tokenContract = new ethers.Contract(contractAddressTwtApprove, abiTwtApprove, provider)
        if (localStorage.getItem("twtBalance") !== null) {
          setTotalBalance(getFromLocalStorage("twtBalance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage("twtBalance", Number(balanceData) / busd)

      }
    }
    if (token === "GMT") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        // const nftContract = new ethers.Contract(contractAddressApe, abiApe, provider)

        const tokenContract = new ethers.Contract(contractAddressGmtApprove, abiGmtApprove, provider)
        if (localStorage.getItem("gmtBalance") !== null) {
          setTotalBalance(getFromLocalStorage("gmtBalance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 100000000)
        setToLocalStorage("gmtBalance", Number(balanceData) / 100000000)

      }
    }
    if (token === "C98") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)

        // const nftContract = new ethers.Contract(contractAddressApe, abiApe, provider)

        const tokenContract = new ethers.Contract(contractAddressC98Approve, abiC98Approve, provider)
        if (localStorage.getItem("c98Balance") !== null) {
          setTotalBalance(getFromLocalStorage("c98Balance"))
        }

        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / busd)
        setToLocalStorage("c98Balance", Number(balanceData) / busd)

      }
    }
  }

  const getZerosToDivide = () => {
    switch (token) {
      case "USDT":
        return 1000000
      case "WSOL":
        return 1000000000
      case "USDC":
        return 1000000
      case 'WBTC':
        return 100000000
      default:
        return busd
    }
  }

  return (
    <div
      key={`${plan}${token}`}
      id={plan === "1" ? token : undefined}
      style={{ minHeight: height }}
      className={cn("collapse-table-wrapper", {
        hide: stakedDisplay && !resultArray?.length,
      })}
    >
      <Link to={`${routes.page}/${token}/${day}?=${search.toString()}`} ref={titleRef} className="collapse-table-title">
        <div className="collapse-table-title-left">
          <img src={img} alt="token" className="collapse-table-title-left-img" />
          <div className="collapse-table-wrapper-name">{token}</div>
          <div className="collapse-table-wrapper-name">{day}-Day Staking Pool</div>
        </div>
        <div className="collapse-table-wrapper-other">
          <div className="collapse-table-wrapper-other-title">{token === "ETH" ? "Coin Staked" : "Token Staked"}</div>
          <div className="collapse-table-wrapper-other-value">
            {resultArray?.reduce((accumulator, object) => {
              return accumulator + object.stakedAmounts / getZerosToDivide()
            }, 0)}{" "}
            ({token})
          </div>
        </div>
        <div className="collapse-table-wrapper-other">
          <div className="collapse-table-wrapper-other-title">Stake Limit</div>
          <div className="collapse-table-wrapper-other-value">{quantity}</div>
        </div>
        <div className="collapse-table-wrapper-other">
          <div className="collapse-table-wrapper-other-title">Periodic % Profit</div>
          <div className="collapse-table-wrapper-other-value">{percent}%</div>
        </div>
        <div className="collapse-table-wrapper-other">
          <div className="collapse-table-wrapper-other-title">Total Value Locked</div>
          <div className="collapse-table-wrapper-other-value">
            ~{moneyFormatter.format(totalBalance * stat?.find(iOther => iOther.id === id)?.current_price)}
          </div>
        </div>
      </Link>
    </div>
  )
}
