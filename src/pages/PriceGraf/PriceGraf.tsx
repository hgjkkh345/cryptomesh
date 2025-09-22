import React, { useEffect } from "react"
import { Header, Footer } from "components"
import "./TokensData.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const PriceGraf = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="tokens-data" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className="tokens-data-content">
        <div className="tokens-data-content-data">
          {
            // @ts-ignore
            (<gecko-coin-heatmap-widget outlined="true" locale="en" dark-mode="true" height="700" coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain"></gecko-coin-heatmap-widget>)
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}
