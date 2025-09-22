import React, {useState} from "react"
import "./ServiceHeader.scss"
import {SimpleButton} from "../SimpleButton";
import {routes} from "../../utils";
import { ContactUsModal} from "../../modals";


type Props = {
  title: string
  desc: string
  image: string
}

export const ServiceHeader = ({ title, desc, image }: Props): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="service-header">
        <div className="service-header-top">
          <div className="service-header-top-left">
            <h1 className="heading-service" dangerouslySetInnerHTML={{__html: title}} />
            <p className="DescLine">
              {desc}
            </p>
            <SimpleButton text="Contact Us" variant="white" onClick={() => setModalOpen(true)} />
          </div>
          <img className="RightMainImage" src={image} alt='swap'/>
        </div>
        <div className="service-header-bottom">
          <div className="service-header-bottom-left">
            <h1 className="buttonTitle">Staking Made Simple</h1>
            <div className="service-header-bottom-left-btn">
              <SimpleButton text="Stake Now" variant="white" href={`${routes.farms}`} />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <ContactUsModal
          onClose={() => setModalOpen(false)}/>}
    </div>
  )
}
