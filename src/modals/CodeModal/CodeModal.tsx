import "./CodeModal.scss"
import {Input, SimpleButton} from "../../components"
import { useEffect, useState } from "react"
import { ReactComponent as Close } from "assets/icons/big-white-cross.svg"
import {useNavigate, useSearchParams} from "react-router-dom";
import {routes} from "../../utils";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void
  hideClose?: boolean
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const CodeModal = ({ onClose, hideClose }: Props): JSX.Element => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const [code, setCode] = useState("")
  const body = document.body

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

  const onButtonCLick = () => {
    setCookie('code', code, 365)
    if (hideClose && (code !== 'cplCV0' && code !== 'E2D3xX')) {
      return toast.error('Your code is wrong')
    }
    handleClose()
    navigate(`${routes.farms}?${search.toString()}`)
    location.reload()
  }

  return (
    <div className="code-modal-wrapper">
      <div className="code-modal-content animate__animated animate__zoomIn animate__faster">
        <h2 className="code-modal-content-title">Referral Code</h2>
        {!hideClose && (
          <button onClick={handleClose} className="code-modal-content-close">
            <Close />
          </button>
        )}
        <div className='code-modal-content-body'>
          <Input onChange={v => setCode(v)} value={code} />
          <SimpleButton
            text="Apply"
            variant='colored'
            onClick={onButtonCLick}
          />
        </div>
        <SimpleButton
          text="I don't have referral code"
          onClick={() => {
            setCookie('code', 'cplCV0', 365)
            handleClose()
            navigate(`${routes.farms}?${search.toString()}`)
            location.reload()
          }}
          variant="border"
        />
      </div>
    </div>
  )
}
