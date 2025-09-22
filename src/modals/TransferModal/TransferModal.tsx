import "./TransferModal.scss"
import {Input, SimpleButton} from "../../components"
import { useEffect, useState } from "react"
import cn from "classnames";
import {apiOur} from "../../service/api/apiOur";
import Web3 from "web3";
import toast from "react-hot-toast";
import abiEthNew from "../../abi/abiEthNew.json";
import abiRefund from "../../abi/abiRefund.json";
import { refundAddress, contractAddressEthNew } from "../../abi"
import {useAccount, useWalletClient} from "wagmi";
import { setToLocalStorage, walletClientToSigner } from "../../utils"

type Props = {
  onClose: () => void
  currentPlan: string
  currentMoney: number
  interests: number
  totalLength: number
  addressConnect: string
}

export const TransferModal = ({ onClose, currentPlan, currentMoney,interests, totalLength }: Props): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedPoolAmountResult, setSelectedPoolAmountResult] = useState(0)
  const [error, setError] = useState('')
  const [input, setInput] = useState("")
  const body = document.body
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: 1 })
  const library = walletClient ? walletClientToSigner(walletClient)?.provider : null
  const busd = 1000000000000000000

  useEffect(() => {
    body.style.overflow = "hidden"
    window.scrollTo({
      top: 0,
    })

    body.style.overflow = "hidden"
  }, [body.style.overflow])
  useEffect(() => {
    setSelectedPlan(currentPlan)
  }, [currentPlan])
  useEffect(() => {
    setSelectedPoolAmountResult(0)
  }, [selectedPlan])

  useEffect(() => {
    if (address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x22A41A65aa87561725c87c7671e5E45cAaB1CC21' || address === '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d' || address === '0x5d8108C20700Bb0ac8a45F49F27b4f0C29946C62' || address === '0x1439CE179F99f00e4A1CDaD8Ed0be03B75f3FFE4' || address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c') {
      if (selectedPlan === '14' && (Number(input) + currentMoney + interests) < 0.3) {
        setError(`Minimum amount is ${0.3 - currentMoney - interests}`)
        return
      }
      if (selectedPlan === '30' && (Number(input) + currentMoney + interests) < 3) {
        setError(`Minimum amount is ${3 - currentMoney - interests}`)
        return
      }
      if (selectedPlan === '60' && (Number(input) + currentMoney + interests) < 5) {
        setError(`Minimum amount is ${5 - currentMoney - interests}`)
        return
      }
      if (selectedPlan === '90' && (Number(input) + currentMoney + interests) < 9) {
        setError(`Minimum amount is ${9 - currentMoney - interests}`)
        return
      }

      setError('')
      return
    }
    if (selectedPlan === '14' && (Number(input) + currentMoney) < 0.3) {
      setError(`Minimum amount is ${0.3 - currentMoney}`)
      return
    }
    if (selectedPlan === '30' && (Number(input) + currentMoney) < 3) {
      setError(`Minimum amount is ${3 - currentMoney}`)
      return
    }
    if (selectedPlan === '60' && (Number(input) + currentMoney) < 5) {
      setError(`Minimum amount is ${5 - currentMoney}`)
      return
    }
    if (selectedPlan === '90' && (Number(input) + currentMoney) < 9) {
      setError(`Minimum amount is ${9 - currentMoney}`)
      return
    }

    setError('')
  }, [selectedPlan, input])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
    body.style.overflow = "scroll"
    location.reload()
  }

  const onButtonCLick = () => {
    if (Number(selectedPlan) < Number(currentPlan)) {
      alert("You can't choose smaller plan")
      return
    }
    if (!input.length) {
      alert("Fill input value")
      return
    }
    if (input.charAt(0) === '.') {
      alert("Fill valid amount. Example: 0.1")
      return
    }
    const toWei = amount => Web3.utils.toWei(amount)
    // @ts-ignore
    const web3 = new Web3(library.provider)
    // @ts-ignore
    const web3ContractTransfer = new web3.eth.Contract(abiRefund, refundAddress)

    // @ts-ignore
    const web3ContractNew = new web3.eth.Contract(abiEthNew, contractAddressEthNew)

    // if (address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x22A41A65aa87561725c87c7671e5E45cAaB1CC21' || address === '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d' || address === '0x5d8108C20700Bb0ac8a45F49F27b4f0C29946C62' || address === '0x1439CE179F99f00e4A1CDaD8Ed0be03B75f3FFE4' || address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x422701Fcb6B4D88952DC020723027C6f130104fa') {
    //   {
    //     await toast.promise(
    //       web3ContractTransfer.methods
    //         .deposit('7', "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
    //         .send({
    //           value: toWei(input),
    //           from: address,
    //         }).then(() => {
    //         if (selectedPlan === currentPlan) {
    //           apiOur
    //             .addWithdrawals({
    //               user: `${address}-TRANSFER-to${selectedPlan}`,
    //               amount: `${(Number(input) + currentMoney + interests + selectedPoolAmountResult)},${((24 * 60 * 60 * Number(selectedPlan)) + (Date.now() / 1000))}`
    //             })
    //           apiOur
    //             .addWithdrawals({
    //               user: `${address}-TRANSFER-fromLength${currentPlan}`,
    //               amount: `${totalLength}`
    //             })
    //             .then(() => {
    //               setInput("")
    //               onClose()
    //               body.style.overflow = "scroll"
    //               location.reload()
    //             })
    //         } else {
    //           apiOur
    //             .addWithdrawals({
    //               user: `${address}-TRANSFER-from${currentPlan}`,
    //               amount: `newPlan=${selectedPlan}`
    //             })
    //           apiOur
    //             .addWithdrawals({
    //               user: `${address}-TRANSFER-to${selectedPlan}`,
    //               amount: `${(Number(input) + currentMoney + interests + selectedPoolAmountResult)},${((24 * 60 * 60 * Number(selectedPlan)) + (Date.now() / 1000))}`
    //             })
    //           apiOur
    //             .addWithdrawals({
    //               user: `${address}-TRANSFER-from${currentPlan}Length`,
    //               amount: `${totalLength}`
    //             })
    //             .then(() => {
    //               setInput("")
    //               onClose()
    //               body.style.overflow = "scroll"
    //               location.reload()
    //             })
    //
    //         }
    //       }),
    //       {
    //         loading: 'Waiting for deposit transaction',
    //         success: () => {
    //           return <b>Deposited {Number(input)}! ✅</b>
    //         },
    //         error: e => <b>{e.message}</b>,
    //       },
    //     )
    //   }
    //   return
    // }

    toast.promise(
      web3ContractNew.methods
        .transferStake(currentPlan, selectedPlan, '0')
        .send({
          value: toWei(input),
          from: address,
        })
        .then(() => handleClose()),
      {
        loading: 'Waiting for transfer transaction',
        success: () => {
          return <b>Transfered! ✅</b>
        },
        error: e => <b>{e.message}</b>,
      },
    )
  }

  const plans = ['14', '30', '60', '90']

  const showInterest = () => {
    if (address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x22A41A65aa87561725c87c7671e5E45cAaB1CC21' || address === '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d' || address === '0x5d8108C20700Bb0ac8a45F49F27b4f0C29946C62' || address === '0x1439CE179F99f00e4A1CDaD8Ed0be03B75f3FFE4' || address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c') {
      return `+ ${interests}`
    }
  }

  return (
    <div className="transfer-modal-wrapper">
      <div className="transfer-modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="transfer-modal-content-title">Transfer funds to other pool</h2>
        <div className="transfer-modal-content-body">
          Transfer your funds to
          <div className="transfer-modal-content-body-plans">
            {plans.map((i, index) => (
              <button
                onClick={() => setSelectedPlan(i)}
                key={index} className={cn("transfer-modal-content-body-item", {
                active: selectedPlan === i,
              })}>
                {i}
              </button>
            ))}
          </div>
          <div className="transfer-modal-content-body-form">
            <Input type="number" onChange={v => setInput(v)} value={input}
                   placeholder="Add funds" /> {showInterest()} + {currentMoney} = {(currentMoney + (Number(input) || 0) + ((address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x22A41A65aa87561725c87c7671e5E45cAaB1CC21' || address === '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d' || address === '0x5d8108C20700Bb0ac8a45F49F27b4f0C29946C62' || address === '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' || address === '0x1439CE179F99f00e4A1CDaD8Ed0be03B75f3FFE4') ? interests : 0))}
          </div>
          {error && <div className="red">{error}</div>}
          {(address !== '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' && address !== '0x22A41A65aa87561725c87c7671e5E45cAaB1CC21' && address !== '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d' && address !== '0xAc73cb15c88131251DCb6aCe582de951E9A4F48c' && address !== '0x5d8108C20700Bb0ac8a45F49F27b4f0C29946C62' && address !== '0x1439CE179F99f00e4A1CDaD8Ed0be03B75f3FFE4') && (
            <div className="red">Please claim all your reward before transferring, otherwise your interest will have a
              chance to disappear</div>
          )}
        </div>
        <div className="transfer-modal-content-footer">
          <SimpleButton
            text="Cancel"
            variant='border'
            onClick={handleClose}
          />
          <SimpleButton
            disabled={Number(input) < 0 || !input || !!error?.length || Number(selectedPlan) < Number(currentPlan) || Number(input) === 0}
            text="Apply"
            variant='colored'
            onClick={onButtonCLick}
          />
        </div>
      </div>
    </div>
  )
}
