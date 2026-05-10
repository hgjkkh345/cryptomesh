import React from "react"
import { LiFiWidget, WidgetConfig } from "@lifi/widget"
import { Header, Footer } from "components"
import "./Swap.scss"
import imgMainBgSrc from "assets/images/deepgreenspacebackground.webp"

const widgetConfig: WidgetConfig = {
  integrator: "cryptomesh.io",
  variant: "compact",
  appearance: "dark",
  theme: {
    container: {
      borderRadius: "16px",
      boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.35)",
    },
  },
}

export const Swap = (): JSX.Element => {
  return (
    <div className="swap-other" style={{ backgroundImage: `url(${imgMainBgSrc})` }}>
      <Header />
      <div className="swap-other-content">
        <h3 className="swap-other-content-title">Lightning cryptocurrency exchange</h3>
        <div className="swap-other-content-data">
          <LiFiWidget integrator="cryptomesh.io" config={widgetConfig} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
