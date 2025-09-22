import { useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import {Header, Footer, RefMain, RefBlocks, RefFAQ, RefTable, RefWorks, Loading, RefCode} from "components"

import "./Referral.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { apiOur, IRefUser } from "../../service/api/apiOur"
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";

export const Referral = (): JSX.Element => {
  const [search] = useSearchParams()
  const [loaded, setLoaded] = useState(false)
  const [connect, setConnect] = useState(false)
  const [ref, setRef] = useState(false)
  const [refUsers, setRefUsers] = useState<IRefUser[]>([])
  const { address } = useAccount();
  const chainId = getChainId(config)
  const busdValue = 1000000000000000000
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (!!address) {
      apiOur.getRefAddress(address).then(rOther => {
        if (chainId === 56) {
          setRefUsers(rOther.filter(i => i.user.includes('BNB')))
        } else {
          setRefUsers(rOther)
        }
      })
    }
  }, [address, chainId])

  return (
    <div className="referral-page" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {!loaded && <Loading/>}
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>
      {ref ? (
        <>
          <RefCode users={refUsers}/>
        </>
        ) : (
        <>
          <RefMain openModal={() => setRef(true)} onEndLoad={() => setLoaded(true)}/>
          <RefBlocks/>
          <RefWorks/>
          <RefTable/>
          <RefFAQ/>
        </>
      )}

      <Footer/>
    </div>
  )
}
