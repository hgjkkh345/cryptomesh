import React from "react"

import "./Loading.scss"
import imgLogo from "../../assets/images/mobile-logo-arclaim.webp";

export const Loading = (): JSX.Element => (
  <div className="loading" >
    <div className="loading-backdrop" />
    <div className='loading-content'>
      <img src={imgLogo} alt='logo' className='loading-content-logo'/>
    </div>
  </div>
)
