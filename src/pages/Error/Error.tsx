import React, { useState } from "react"
import {Header, Footer, SimpleButton} from "components"

import "./Error.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import imgSrc from "assets/images/error-page-image.webp"
import Logo from "assets/images/logo-main-arclaim.webp"
import {routes} from "../../utils";
import {Link} from "react-router-dom";

export const Error = (): JSX.Element => {

  return (
    <div className="error" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Link to={routes.index}>
        <img alt='logo' src={Logo} className="error-logo"/>
      </Link>
      <Header/>
      <div className="error-content">
        <img src={imgSrc} alt='computer' />
        <h1 className="error-content-title">We’ll be back shortly!</h1>
        <p>
          We’re down for maintenance. Sorry for the inconvenience.
        </p>
        <SimpleButton text='Go to the Homepage' href={routes.index} />
      </div>
      <Footer/>
    </div>
  )
}
