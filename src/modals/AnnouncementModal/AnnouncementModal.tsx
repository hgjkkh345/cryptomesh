import "./AnnouncementModal.scss"
import {useClickOutside} from "utils";

import { SimpleButton } from "components"
import {useEffect, useRef} from "react"
import { apiOur } from "../../service/api/apiOur"
import { useAccount } from "wagmi"

type Props = {
  onClose: () => void
  text?: string
  neverRemind?: boolean
  header?: string
}

export const AnnouncementModal = ({ onClose, text, header, neverRemind}: Props): JSX.Element => {
  const body = document.body
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { address } = useAccount();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
    body.style.overflow = "hidden"
    body.style.overflow = "hidden"
  }, [body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
    body.style.overflow = "scroll"
  }

  const dontRemind = () => {
    apiOur
      .addWithdrawals({
        user: `CLOSE_ANN_${address}`,
        amount: address || '',
      })
    handleClose()
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  return (
    <div className="announcement-modal-wrapper">
      <div
        ref={wrapperRef}
        className="announcement-modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="announcement-modal-content-title">{header || 'ATTENTION!'}</h2>
        <p className="announcement-modal-content-desc">
          {text || (<p>
            A new round of referral rewards has been distributed, and users can withdraw rewards from the staking pool!
          </p>)}
        </p>
        <div className="announcement-modal-content-footer">
          {neverRemind && <SimpleButton text="Don't remind me again" onClick={dontRemind} variant="outlined" />}
          <SimpleButton text="Okay" onClick={handleClose} variant="colored" />
        </div>
      </div>
    </div>
  )
}
