import React, { useState } from "react"

import imgBusdSrc from "assets/images/busd-logo.webp"
import "./Form.scss"
import { SimpleButton } from "../SimpleButton"
import { Input } from "../Input"

export const Form = (): JSX.Element => {
  const [amount, setAmount] = useState("")

  return (
    <div className="form">
      <h3 className="form-title">
        <div className="form-title-busd">
          <img alt="busd" src={imgBusdSrc} />
        </div>
        BUSD
      </h3>
      <div className="form-item">
        <div className="form-item-label">Deposited Amount</div>
        <div className="form-item-value">0.000</div>
      </div>
      <div className="form-item">
        <div className="form-item-label">Balance</div>
        <div className="form-item-value">0</div>
      </div>
      <div className="form-border" />
      <Input onChange={v => setAmount(v)} value={amount} placeholder="0" label="Deposit amount" />
      <div className="form-buttons">
        <SimpleButton variant="outlined" text="Withdraw Reward" />
        <SimpleButton text="Approve" />
      </div>
      <div className="form-item bold">
        <div className="form-item-label">Claimable Reward</div>
        <div className="form-item-value">0 BUSD</div>
      </div>
      <div className="form-item blue">
        <div className="form-item-label">Your Rewards</div>
        <div className="form-item-value">0.000 BUSD</div>
      </div>
      <div className="form-border" />
      <div className="form-item blue">
        <div className="form-item-label">BUSD per Day</div>
        <div className="form-item-value">0.000 BUSD</div>
      </div>
      <div className="form-item blue">
        <div className="form-item-label">BUSD per Hour</div>
        <div className="form-item-value">0.000 BUSD</div>
      </div>
    </div>
  )
}
