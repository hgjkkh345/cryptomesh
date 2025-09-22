import React, {useEffect, useState} from "react"
import {Footer, Header, Loading, SimpleButton} from "components"

import "./Brand.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { brandData } from "./data"
import { BrandModal } from "../../modals"

export const Brand = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="brand" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {loading && <Loading/>}
      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain"
            currency="usd"
            dark-mode="true"
            locale="en"/>)
        }
      </div>
      <div className='brand-content'>
        <h1 className='brand-content-title'>Brand</h1>
        <p className='brand-content-desc'>Our logo and other brand assets.</p>
        <div className='brand-content-data'>
          {brandData.map(((item, index) => (
            <div key={index} className='brand-content-data-item' onClick={() => setActiveBrand(item.image)}>
              <img
                src={item.image}
                alt='brand image'
              />
            </div>
          )))}
        </div>
      </div>
      {activeBrand && (
        <BrandModal image={activeBrand} onClose={() => setActiveBrand(null)} />
      )}
      <Footer/>
    </div>
  )
}
