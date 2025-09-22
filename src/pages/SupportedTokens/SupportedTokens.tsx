import React, { useEffect, useState } from "react"
import {Header, Footer, SwapTable, SwapChartRight, SwapMover, SwapTablePairs, Loading} from "components"

import "./SupportedTokens.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { ReactComponent as Arrow } from "assets/icons/arrow-greybird-right.svg"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { useNavigate, useSearchParams } from "react-router-dom"
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import {routes} from "../../utils";

export const SupportedTokens = (): JSX.Element => {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const { address } = useAccount();
  const chainId = getChainId(config)
  const [loading, setLoading] = useState(true)
  const [translateX, setTranslateX] = useState(0)
  const [topTokens, setTopTokens] = useState<any[]>([])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const onNextClick = () => {
    if (translateX === -5000) {
      setTranslateX(0)
    } else {
      setTranslateX(translateX - 500)
    }
  }

  const onPrevClick = () => {
    if (translateX === 0) {
      setTranslateX(-1000)
    } else {
      setTranslateX(translateX + 500)
    }
  }

  useEffect(() => {
    const id = setInterval(onNextClick, 2500)
    return () => clearInterval(id)
  }, [onNextClick, translateX])

  useEffect(() => {
    apiCoin
      .getStat()
      .then(rOther => {
        setTopTokens(rOther)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="swap" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {loading && <Loading />}
      <Header />
      <div className="swap-content swap-info">
        <div className="swap-content-header">
          <h3 className="swap-content-title">Protocol Stats
            {(chainId === 1 || !address) && ' Ethereum'}
            {chainId === 56 && ' Binance Smart Chain'}
            {chainId === 10 && ' Optimism'}
            {chainId === 250 && ' Fantom'}
            {chainId === 42161 && ' Arbitrum One'}
            {chainId === 137 && ' Polygon'}
            {chainId === 169 && 'Manta '}
            {chainId === 8453 && ' Base'}
            {chainId === 43114 && ' Avalanche'}
          </h3>
        </div>
          <>
            <div className="swap-content-header second">
              <div className="swap-content-subtitle">Top Movers</div>
              <div className="swap-content-buttons">
                <button onClick={onPrevClick} disabled={translateX === 0} className="swap-content-buttons-item">
                  <Arrow/>
                </button>
                <button onClick={onNextClick} className="swap-content-buttons-item">
                  <Arrow/>
                </button>
              </div>
            </div>
            <div className="swap-content-scroll">
              <div className="swap-content-scroll-content" style={{transform: `translateX(${translateX}px)`}}>
                {topTokens.filter(i => i.symbol.toUpperCase() !== 'BUSD')
                  .sort((a, b) => Number(b?.price_change_percentage_24h) - Number(a?.price_change_percentage_24h))
                  ?.map((mover, index) => (
                    <SwapMover
                      onClick={() => navigate(`${routes.token}/${mover.id}?${search.toString()}`)}
                      name={mover?.symbol.toUpperCase()}
                      key={index}
                      pricePercents={mover?.price_change_percentage_24h}
                      priceNow={mover?.current_price}
                      img={mover?.image}
                    />
                  ))}
              </div>
            </div>
            <div className="swap-content-subtitle">All Tokens</div>
            <SwapTable tokens={topTokens} onClick={v => navigate(`${routes.token}/${v}?${search.toString()}`)}/>
          </>
      </div>
      <Footer/>
    </div>
  )
}
