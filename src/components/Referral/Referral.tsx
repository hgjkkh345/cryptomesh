import React from "react"
import toast from "react-hot-toast"

import "./Referral.scss"
import { SimpleButton } from "../SimpleButton"
import { copyToClipboard } from "../../utils"
import {useAccount} from "wagmi";

type Props = {
  refBonus: number
}

export const Referral = ({ refBonus }: Props): JSX.Element => {
  const { address } = useAccount();

  const copy = () => {
    copyToClipboard(`${window.location.origin}?ref=${address}`)
    toast.success("Link is copied!")
  }

  return (
    <div className="referral">
      <div className="referral-left">
        <div className="referral-left-title">Referral Earnings</div>
        <p className="referral-left-value">
          {refBonus.toFixed(2)} <span>BUSD</span>
        </p>
      </div>
      <div className="referral-right">
        <div className="referral-right-value">
          <div className="referral-right-value-text">
            {address ? `${window.location.origin}?ref=${address}` : "Connect your address first"}
          </div>
          <SimpleButton text="Copy" onClick={copy} />
        </div>
        <p className="referral-right-desc">
          Share your referral link and you&apos;ll receive 8% of your friend&apos;s investment in YieldRobot.
        </p>
      </div>
    </div>
  )
}
