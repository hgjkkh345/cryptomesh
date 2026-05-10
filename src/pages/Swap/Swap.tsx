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
            src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=false&amount=0.1&backgroundColor=000000&darkMode=true&from=btc&horizontal=false&lang=en-US&locales=true&logo=false&primaryColor=00C26F&to=eth&toTheMoon=true"
            height="660px"
            width="100%"
          />
        </div></div>
      <Footer />
    </div>
  )
}
