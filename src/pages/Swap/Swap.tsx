import React from "react"
import { Header, Footer } from "components"
import "./Swap.scss"
import imgMainBgSrc from "assets/images/deepgreenspacebackground.webp"
import { LiFiWidget } from "@lifi/widget"
import type { WidgetConfig } from "@lifi/widget"

const widgetConfig: WidgetConfig = {
  integrator: "cryptomesh",
  appearance: "dark",
  walletConfig: {
    usePartialWalletManagement: true,
  },
  theme: {
    palette: {
      primary: { main: "#00C26F" },
      secondary: { main: "#00C26F" },
      background: { default: "#0a0a0a", paper: "#131313" },
      text: { primary: "#ffffff", secondary: "#9e9e9e" },
    },
    shape: {
      borderRadius: 12,
      borderRadiusSecondary: 6,
    },
  },
  // ETH, BSC, Polygon, Optimism, Arbitrum, Base, Avalanche, Fantom
  chains: {
    allow: [1, 56, 137, 10, 42161, 8453, 43114, 250],
  },
}

export const Swap = (): JSX.Element => {
  return (
    <div className="swap-other" style={{ backgroundImage: `url(${imgMainBgSrc})` }}>
      <Header />
      <div className="swap-other-content">
        <h3 className="swap-other-content-title">Lightning cryptocurrency exchange</h3>
        <div className="swap-other-content-data">
          <LiFiWidget config={widgetConfig} integrator="cryptomesh" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
