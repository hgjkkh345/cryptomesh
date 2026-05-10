import React from "react"
import { Header, Footer } from "components"
import "./Swap.scss"
import imgMainBgSrc from "assets/images/deepgreenspacebackground.webp"

export const Swap = (): JSX.Element => {

  return (
    <div className="swap-other" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className="swap-other-content">
        <h3 className="swap-other-content-title">Lightning cryptocurrency exchange</h3>
        <div className="swap-other-content-data">
          <iframe
            src="https://simpleswap.io/?from=btc&to=eth&amount=1"
            height="660px"
            width="100%"
          />
        </div></div>
      <Footer />
    </div>
  )
}
