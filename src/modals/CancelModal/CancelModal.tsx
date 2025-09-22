import "./CancelModal.scss"
import {useClickOutside} from "utils";

import { SimpleButton } from "components"
import {useEffect, useRef} from "react"

type Props = {
  onClose: () => void
}

export const CancelModal = ({ onClose}: Props): JSX.Element => {
  const body = document.body
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    body.style.overflow = "hidden"
    window.scrollTo({
      top: 0,
    })

    body.style.overflow = "hidden"
  }, [body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
    body.style.overflow = "scroll"
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  return (
    <div className="cancel-modal-wrapper">
      <div
        ref={wrapperRef}
        className="cancel-modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="cancel-modal-content-title">Cancel Staking
        </h2>
        <p className="cancel-modal-content-desc">
          Please be aware that canceling your staking commitment is subject to various factors, including the number of participants and the speed of the blockchain network. The time required to process your cancellation request may vary depending on these factors.
          <br />
          <br />
          We recommend carefully reviewing your staking details before initiating a cancellation. If you choose to cancel your staking commitment in advance, please note that a fee of 0.5% of the staked amount will be charged. This fee helps cover administrative costs associated with processing the cancellation and ensures the smooth functioning of our platform.
          <br />
          <br />
          We understand that circumstances may change, and you may need to cancel your staking commitment. However, we encourage you to consider your decision thoughtfully, as canceling in advance incurs a fee and may impact the staking experience for both yourself and other participants.
          <br />
          <br />
          Please exercise patience during the cancellation process, as the speed of the blockchain network and other factors can influence the time required to finalize the cancellation.
        </p>
        <div className="announcement-modal-content-footer">
          <SimpleButton text="Okay" onClick={handleClose} variant="colored" />
        </div>
      </div>
    </div>
  )
}
