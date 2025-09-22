import { useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import {
  Header,
  Footer,
  Main,
  Features,
  Ecosystem,
  Loading,
  Partners,
  Investors,
  NewsHome,
  Leverage,
  Chains, Code
} from "components"

import "./Home.scss"
import { getFromLocalStorage, setToLocalStorage, useScrollPosition } from "../../utils"
import {preloadDataBsc} from "../SwapInfo/preloadDataBsc";
import {preloadData} from "../SwapInfo/preloadData";
import imgMainBgSrc from "../../assets/images/space-background.webp";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import videoSrc from "../../assets/video/video-cryptomesh.mp4";

export const Home = (): JSX.Element => {
  const [search] = useSearchParams()
  const [loaded, setLoaded] = useState(false)
  const [ourTvlData, setOurTvlData] = useState<any[]>([])
  const { address } = useAccount();
  const chainId = getChainId(config)
  const scroll = useScrollPosition()

  useEffect(() => {
    if (chainId) {
      if (localStorage.getItem("swapData") !== null && chainId === 1) {
        return setOurTvlData(getFromLocalStorage("swapData"))
      }
      if (localStorage.getItem("swapDataBsc") !== null && chainId === 56) {
        return setOurTvlData(getFromLocalStorage("swapDataBsc"))
      }

      if (chainId === 56) {
        setOurTvlData(preloadDataBsc)
      }
      if (chainId === 1 || !address) {
        setOurTvlData(preloadData)
      }
    }
  }, [chainId])

  useEffect(() => {
    if (search?.get('ref') === 'j372c') {
      setToLocalStorage('ref', 'j372c')
    }
  }, [search])

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="home" style={{ backgroundImage: `url(${imgMainBgSrc})` }}>
      {!loaded && <Loading />}
      <video className="home-video" playsInline muted autoPlay preload='auto'
             loop id="video">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className='roadmap-blur' />
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain,base,matic"
            currency="usd"
            dark-mode="true"
            locale="en" />)
        }
      </div>

      <Main />
      {scroll > 50 && <Leverage />}

      <Features />
      <Partners />
      <Investors />
      <Ecosystem />
      <Code />
      <Chains />
      <NewsHome/>
      <Footer />
    </div>
  )
}
