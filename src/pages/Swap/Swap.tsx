import React from "react"
import { Header, Footer } from "components"
import "./Swap.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const Swap = (): JSX.Element => {

  return (
    <div className="swap-other" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className="swap-other-content">
        <h3 className="swap-other-content-title">Lightning cryptocurrency exchange</h3>
        <div className="swap-other-content-data">
          <iframe
            src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
            height="660px"
            width="100%"
          />
        </div></div>
      <Footer />
    </div>
  )
}
