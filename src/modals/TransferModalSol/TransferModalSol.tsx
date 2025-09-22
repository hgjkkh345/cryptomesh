import "./TransferModal.scss"
import {Input, SimpleButton} from "../../components"
import { useEffect, useState } from "react"
import cn from "classnames";
import {apiOur} from "../../service/api/apiOur";
import Web3 from "web3";
import toast from "react-hot-toast";
import abiSol from "../../abi/abiSol.json"
import {contractAddressSol} from "../../abi";
import {useAccount, useWalletClient} from "wagmi";
import {walletClientToSigner} from "../../utils";

type Props = {
  onClose: () => void
  currentPlan: string
  currentMoney: number
  interests: number
  totalLength: number
  addressConnect: string
}

export const TransferModalSol = ({ onClose, currentPlan, currentMoney,interests, totalLength }: Props): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedPoolAmountResult, setSelectedPoolAmountResult] = useState(0)
  const [error, setError] = useState('')
  const [input, setInput] = useState("")
  const body = document.body
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: 1 })
  const library = walletClient ? walletClientToSigner(walletClient)?.provider : null

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
    if (selectedPlan === '14' && (Number(input) + currentMoney + interests) < 10) {
      setError(`Minimum amount is ${10 - currentMoney - interests}`)
      return
    }
    if (selectedPlan === '30' && (Number(input) + currentMoney + interests) < 100) {
      setError(`Minimum amount is ${100 - currentMoney - interests}`)
      return
    }
    if (selectedPlan === '60' && (Number(input) + currentMoney + interests) < 150) {
      setError(`Minimum amount is ${150 - currentMoney - interests}`)
      return
    }
    if (selectedPlan === '90' && (Number(input) + currentMoney + interests) < 300) {
      setError(`Minimum amount is ${300 - currentMoney - interests}`)
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

  const onButtonCLick = async () => {
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
    // @ts-ignore
    const web3 = new Web3(library.provider)
    // @ts-ignore
    const web3ContractTransfer = new web3.eth.Contract(abiSol, contractAddressSol)

    {
      await toast.promise(
        web3ContractTransfer.methods
          .deposit('3', "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
          .send({
            value: (Number(input) * 1000000000).toString(),
            from: address,
          }).then(() => {
          if (selectedPlan === currentPlan) {
            apiOur
              .addWithdrawals({
                user: `${address}-TRANSFER-WSOL-to${selectedPlan}`,
                amount: `${(Number(input) + currentMoney + interests + selectedPoolAmountResult)},${((24 * 60 * 60 * Number(selectedPlan)) + (Date.now() / 1000))}`
              })
            apiOur
              .addWithdrawals({
                user: `${address}-TRANSFER-WSOL-fromLength${currentPlan}`,
                amount: `${totalLength}`
              })
              .then(() => {
                setInput("")
                onClose()
                body.style.overflow = "scroll"
                location.reload()
              })
          } else {
            apiOur
              .addWithdrawals({
                user: `${address}-TRANSFER-WSOL-from${currentPlan}`,
                amount: `newPlan=${selectedPlan}`
              })
            apiOur
              .addWithdrawals({
                user: `${address}-TRANSFER-WSOL-to${selectedPlan}`,
                amount: `${(Number(input) + currentMoney + interests + selectedPoolAmountResult)},${((24 * 60 * 60 * Number(selectedPlan)) + (Date.now() / 1000))}`
              })
            apiOur
              .addWithdrawals({
                user: `${address}-TRANSFER-WSOL-from${currentPlan}Length`,
                amount: `${totalLength}`
              })
              .then(() => {
                setInput("")
                onClose()
                body.style.overflow = "scroll"
                location.reload()
              })

          }
        }),
        {
          loading: 'Waiting for deposit transaction',
          success: () => {
            return <b>Deposited {Number(input)}! ✅</b>
          },
          error: e => <b>{e.message}</b>,
        },
      )
    }
  }

  const plans = ['14', '30', '60', '90']

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
                   placeholder="Add funds" /> {`+ ${interests}`} + {currentMoney} = {(currentMoney + (Number(input) || 0) + interests)}
          </div>
          {error && <div className="red">{error}</div>}
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
