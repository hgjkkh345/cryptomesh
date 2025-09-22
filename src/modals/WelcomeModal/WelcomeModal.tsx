import "./WelcomeModal.scss"
import { SimpleButton } from "../../components"
import { Link, useSearchParams } from "react-router-dom"
import { routes } from "../../utils"
import { useEffect } from "react"

type Props = {
  onClose: () => void
}

export const WelcomeModal = ({ onClose }: Props): JSX.Element => {
  const [search] = useSearchParams()
  const body = document.body

  useEffect(() => {
    body.style.overflow = "hidden"
  }, [body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
  }

  return (
    <div className="welcome-modal-wrapper">
      <div className="welcome-modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="welcome-modal-content-title">Welcome to site!</h2>
        <p className="welcome-modal-content-desc">
          By using or accessing this website, the Cryptomesh.io and/or other informational materials on this website, you will
          ne deemed to have (i) accepted the{" "}
          <Link className="welcome-modal-content-desc-link" to={`${routes.terms}?${search.toString()}`}>
            terms of use and conditions
          </Link>
          , and (ii) reveiwed and accepted certain terms therein, including confirmations that you are not based in
          jurisdiction where such access would prohibited or restricted in any manner.
        </p>
        <div className="welcome-modal-content-footer">
          <SimpleButton text="Leave the app" variant="outlined" className="welcome-modal-content-footer-btn" />
          <SimpleButton text="Agree" onClick={handleClose} variant="colored" />
        </div>
      </div>
    </div>
  )
}
