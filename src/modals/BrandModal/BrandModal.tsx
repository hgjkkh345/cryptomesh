import "./BrandModal.scss"
import { SimpleButton } from "../../components"
import { useEffect, useRef } from "react"
import { useClickOutside } from "../../utils"
import { ReactComponent as Close } from "assets/icons/big-white-cross.svg"
import axios from "axios"

type Props = {
  onClose: () => void
  image: string
}

export const BrandModal = ({ onClose, image }: Props): JSX.Element => {
  const body = document.body
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    body.style.overflow = "hidden"
  }, [body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  const toDataURL = async (url) => {
    /* Using Fetch */
    // const response = await fetch(url)
    // const blobData = await response.blob()
    // const imageDataUrl = URL.createObjectURL(blobData);

    /* Using Axios */
    const response = await axios.get(url, { responseType: "blob" });
    const imageDataUrl = URL.createObjectURL(response.data);

    return imageDataUrl;
  };

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.href = await toDataURL(image);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose()
  };

  return (
    <div className="brand-modal-wrapper">
      <div ref={wrapperRef} className="brand-modal-content animate__animated animate__zoomIn animate__faster">
        <button onClick={handleClose} className="code-modal-content-close">
          <Close />
        </button>
        <p className="brand-modal-content-desc">
          You can also download this image
        </p>
        <img src={image} alt='brand image' className='brand-modal-image' />
        <div className="brand-modal-content-footer">
          <SimpleButton text="Download" variant="outlined" className="brand-modal-content-footer-btn"
                        onClick={handleDownload} />
        </div>
      </div>
    </div>
  )
}
