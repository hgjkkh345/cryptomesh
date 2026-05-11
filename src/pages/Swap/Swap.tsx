import React, { useEffect } from "react"
import { Header, Footer } from "components"
import "./Swap.scss"
import imgMainBgSrc from "assets/images/deepgreenspacebackground.webp"

export const Swap = (): JSX.Element => {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js"

    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="swap-other" style={{ backgroundImage: `url(${imgMainBgSrc})` }}>
      <Header />

      <div className="swap-other-content">
        <h3 className="swap-other-content-title">Lightning cryptocurrency exchange</h3>

        <div className="swap-other-content-data">
          <iframe
            id="iframe-widget"
            src="https://changenow.io/embeds/exchange-widget/v2/widget.html?from=btc&to=eth&amount=0.1&darkMode=true&primaryColor=00C26F"
            width="100%"
            height="700"
            style={{ border: "none" }}
            allow="clipboard-write; fullscreen"
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
