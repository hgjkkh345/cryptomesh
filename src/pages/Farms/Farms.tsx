import React, { useEffect, useState } from "react"
import { Header, Footer, Table } from "components"
import { CancelModal } from "../../modals"

import "./Farms.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import cn from "classnames"

const tabs = ["All Pools", "Staked Pools"]

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const Farms = (): JSX.Element => {
  const [tab, setTab] = useState("All Pools")
  const [cancel, setCancel] = useState(false)
  const [codeString, setCodeString] = useState<string | undefined>(undefined)

  useEffect(() => {
    const code = getCookie('code')
    setCodeString(code || '')
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="farms" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="farms-content">
        <div className="farms-content-header">
          <div className="farms-content-header-tabs">
            {tabs.map((item, index) => (
              <button
                key={index}
                className={cn("farms-content-header-tabs-item", {
                  active: tab === item,
                })}
                onClick={() => {
                  setTab(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="right-ll"/>
        </div>
        {codeString !== undefined && (
          <Table stakedDisplay={tab === "Staked Pools"}/>
        )}
      </div>
      {cancel && <CancelModal onClose={() => setCancel(false)}/>}
      <Footer/>
    </div>
  )
}
