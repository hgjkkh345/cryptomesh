import React from "react"

import imgSrc from "assets/images/referral-speaker-image.webp"
import "./RefMain.scss"
import { SimpleButton } from "../SimpleButton"
import { scrollToElement } from "../../utils"

type Props = {
  onEndLoad: () => void
  openModal: () => void
}

export const RefMain = ({ onEndLoad, openModal }: Props): JSX.Element => {
  const onClick = () => {
    scrollToElement("work")
  }

  return (
    <div className="ref-main">
      <div className="ref-main-left">
        <h1 className="ref-main-left-title">Invite friends, earn rewards</h1>
        <p className="ref-main-left-desc">
          Simply invite your friends with your referral link and earn up to 15% Cryptomesh.io commission from the referral.
          It&apos;s as easy as that!
        </p>
        <div className="ref-main-left-buttons">
          <SimpleButton
            className="ref-main-left-buttons-item"
            variant="colored"
            text="Get My Referral Link"
            onClick={openModal}
          />
          <SimpleButton onClick={onClick} text="How Does It Work" variant="outlined" />
        </div>
      </div>
      <img onLoad={onEndLoad} src={imgSrc} alt="ref-main" className="ref-main-right" />
    </div>
  )
}
