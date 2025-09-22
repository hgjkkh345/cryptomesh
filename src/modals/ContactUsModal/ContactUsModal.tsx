import "./ContactUsModal.scss"
import {useClickOutside} from "utils";

import {useEffect, useRef} from "react"
import {ContactUs} from "../../components/ContactUs";
import { ReactComponent as Close } from "assets/icons/big-white-cross.svg"

type Props = {
  onClose: () => void
  text?: string
  neverRemind?: boolean
  header?: string
}

export const ContactUsModal = ({ onClose, text, header, neverRemind}: Props): JSX.Element => {
  const body = document.body
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  return (
    <div className="contact-modal-wrapper">
      <div
        ref={wrapperRef}
        className="contact-modal-content animate__animated animate__zoomIn animate__faster">
        <button onClick={handleClose} className="contact-modal-content-close">
          <Close />
        </button>
        <ContactUs />
      </div>
    </div>
  )
}
