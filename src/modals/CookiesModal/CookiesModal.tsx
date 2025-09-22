import "./CookiesModal.scss"
import { SimpleButton } from "../../components"
import { Link, useSearchParams } from "react-router-dom"
import { routes } from "../../utils"

type Props = {
  onClose: () => void
}

export const CookiesModal = ({ onClose }: Props): JSX.Element => {
  const [search] = useSearchParams()

  return (
    <div className="cookies-modal animate__animated animate__fadeIn animate__faster">
      <div className="cookies-modal-info">
        <dt className="cookies-modal-info-title">Cookies from the Chefs</dt>
        <dd className="cookies-modal-info-desc">
          This website uses{" "}
          <Link className="cookies-modal-info-desc-link" to={`${routes.cookies}?${search.toString()}`}>
            cookies
          </Link>{" "}
          to help analyze and enhance your experience.
        </dd>
      </div>
      <div className="cookies-modal-right">
        <SimpleButton text="Decline" variant="outlined" className="cookies-modal-right-btn" />
        <SimpleButton text="Accept" onClick={onClose} variant="colored" />
      </div>
    </div>
  )
}
