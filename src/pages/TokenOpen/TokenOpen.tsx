import React, {useEffect, useState} from "react"
import {Header, Footer, SimpleButton, Loading} from "components"

import "./TokenOpen.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import { ReactComponent as ArrowBread } from "assets/icons/arrow-bird-right.svg"
import { ReactComponent as Copy } from "assets/icons/copy-text-icon.svg"
import { ReactComponent as ArrowOperator } from "assets/icons/arrow-slim-right.svg"
import {copyToClipboard, routes} from "../../utils";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {poolData} from "../../components/Table/data";
import {CollapseTableExpanded} from "../../components/CollapseTableExpanded";
import {poolDataSeparated} from "../../components/Table/dataSeparated";
import {apiCoin} from "../../service/api/apiCoinGecko";
import {AnnouncementModal, TransferModalUsdc} from "../../modals";
import {TransferModal} from "../../modals/TransferModal";
import {TransferModalWbtc} from "../../modals/TransferModalWbtc";
import toast from "react-hot-toast";
import {getChainId} from "@wagmi/core";
import {config} from "../../index";
import {poolDataSeparatedBsc} from "../../components/Table/dataSeparatedBsc";
import {poolDataSeparatedOpt} from "../../components/Table/dataSeparatedOpt";
import {poolDataSeparatedArb} from "../../components/Table/dataSeparatedArb";
import {poolDataSeparatedFantom} from "../../components/Table/dataSeparatedFantom";
import {poolDataSeparatedBase} from "../../components/Table/dataSeparatedBase";
import {poolDataSeparatedAvax} from "../../components/Table/dataSeparatedAvax";
import {poolDataSeparatedManta} from "../../components/Table/dataSeparatedManta";
import {poolDataSeparatedPol} from "../../components/Table/dataSeparatedPol";
import {TransferModalSol} from "../../modals/TransferModalSol";

export const TokenOpen = (): JSX.Element => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const { id, pool } = useParams()
  const [currentData, setCurrentData] = useState<any>(null)
  const [stat, setStat] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [transferModal, setTransferModal] = useState<any | undefined>(undefined)
  const [transferModalUsdc, setTransferModalUsdc] = useState<any | undefined>(undefined)
  const [transferModalWbtc, setTransferModalWbtc] = useState<any | undefined>(undefined)
  const [transferModalSol, setTransferModalSol] = useState<any | undefined>(undefined)
  const [claimAnn, setClaimAnn] = useState(false)
  const chainId = getChainId(config);

  useEffect(() => {
    apiCoin
      .getStat()
      .then(rOther => {
        setStat(rOther)
      })
      .finally(() => setLoaded(true))
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (id) {
      if (!chainId || chainId === 1) {
        setCurrentData(poolDataSeparated.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 56) {
        setCurrentData(poolDataSeparatedBsc.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 10) {
        setCurrentData(poolDataSeparatedOpt.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 42161) {
        setCurrentData(poolDataSeparatedArb.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 250) {
        setCurrentData(poolDataSeparatedFantom.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 8453) {
        setCurrentData(poolDataSeparatedBase.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 43114) {
        setCurrentData(poolDataSeparatedAvax.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 169) {
        setCurrentData(poolDataSeparatedManta.find(i => i.token === id && i.day === pool))
      }
      if (chainId === 137) {
        setCurrentData(poolDataSeparatedPol.find(i => i.token === id && i.day === pool))
      }
    }
  }, [id])

  const copy = (address: string) => {
    copyToClipboard(address)
    toast.success("Address is copied!")
  }

  return (
    <div className="page-token" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {!loaded && <Loading />}

      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>
      {!!currentData && (
        <div className="page-token-content">
          <div className="page-token-content-breadcrumbs">
            <button
              onClick={() => {
                navigate(`${routes.farms}?${search.toString()}`)
              }}
              className="page-token-content-breadcrumbs-item"
            >
              Pool
            </button>
            <ArrowBread/>
            <div
              className="page-token-content-breadcrumbs-item"
            >
              {id}
            </div>
            {/*{currentData.mainAddress && (*/}
            {/*  <button className='page-token-content-breadcrumbs-copy'>*/}
            {/*    {`${currentData.mainAddress.slice(0, 6)}...${currentData.mainAddress.slice(currentData.mainAddress.length - 4, currentData.mainAddress.length)}`}*/}
            {/*    <Copy/>*/}
            {/*  </button>*/}
            {/*)}*/}
          </div>
          <div className='page-token-content-header'>
            <div className='page-token-content-header-left'>
              <img src={currentData.icon} alt={id} className='page-token-content-header-left-img'/>
              <h1>
                {pool} {id} Pool
              </h1>
              <div className='page-token-content-header-left-network'>
                {currentData.network}
              </div>
            </div>
            {/*<div className='page-token-content-header-right'>*/}
            {/*  <SimpleButton text='Restake'/>*/}
            {/*</div>*/}
          </div>
          <div className='page-token-content-data'>
            <CollapseTableExpanded addAddress={currentData.addAddress} quantity={currentData.quantity} plan={currentData.day}
                                   checkAddress={currentData.address} token={id} percent={currentData.percent}
                                   stakedDisplay={false} stat={stat} id={currentData.id} day={pool} index={1}
                                   accountRematch={''}
                                   openTransferSol={(current, money, interests, length) => {
                                     window.scrollTo({
                                       top: 0,
                                       behavior: "smooth",
                                     })

                                     setTransferModalSol({
                                       plan: current,
                                       money,
                                       interests,
                                       totalLength: length,
                                     })
                                   }}
                                   openTransferWbtc={(current, money, interests, length) => {
                                     window.scrollTo({
                                       top: 0,
                                       behavior: "smooth",
                                     })

                                     setTransferModalWbtc({
                                       plan: current,
                                       money,
                                       interests,
                                       totalLength: length,
                                     })
                                   }} openClaimAnn={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
              setClaimAnn(true)
            }} openTransfer={(current, money, interests, length) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
              setTransferModal({
                plan: current,
                money,
                interests,
                totalLength: length,
              })
            }}
                                   openTransferUsdc={(current, money, interests, length) => {
                                     window.scrollTo({
                                       top: 0,
                                       behavior: "smooth",
                                     })
                                     setTransferModalUsdc({
                                       plan: current,
                                       money,
                                       interests,
                                       totalLength: length,
                                     })
                                   }}/>
            <div className='page-token-content-data-text'>
              <h4 className='page-token-content-data-text-title'>About {id}</h4>
              <p className='page-token-content-data-text-p'>
                {currentData.text.tokenDesc}
              </p>
              {currentData.text.ca && (
                <>
                  <h4 className='page-token-content-data-text-title'>Token Address</h4>
                  <div className='page-token-content-data-text-block'>
                    {`${currentData.text.ca.slice(0, 6)}...${currentData.text.ca.slice(currentData.text.ca.length - 4, currentData.text.ca.length)}`}
                    <Copy className='pointer' onClick={() => copy(currentData.text.ca)}/>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      )}
      {claimAnn && <AnnouncementModal
          text='Due to current high levels of congestion on the Ethereum network, transaction times may be longer than usual. All transactions should be confirmed within the next 12 hours.'
          onClose={() => setClaimAnn(false)}/>}
      {!!transferModal && <TransferModal addressConnect={''} onClose={() => {
        setTransferModal(undefined)
        location.reload()
      }}
                                         currentPlan={transferModal.plan} totalLength={transferModal.totalLength}
                                         currentMoney={transferModal.money}
                                         interests={transferModal.interests}/>}
      {!!transferModalUsdc && <TransferModalUsdc addressConnect={''} onClose={() => {
        setTransferModalUsdc(undefined)
        location.reload()
      }}
                                                 currentPlan={transferModalUsdc.plan} totalLength={transferModalUsdc.totalLength} currentMoney={transferModalUsdc.money}
                                                 interests={transferModalUsdc.interests}/>}
      {!!transferModalSol && <TransferModalSol addressConnect={''} onClose={() => {
        setTransferModalUsdc(undefined)
        location.reload()
      }}
                                                 currentPlan={transferModalSol.plan} totalLength={transferModalSol.totalLength} currentMoney={transferModalSol.money}
                                                 interests={transferModalSol.interests}/>}
      {!!transferModalWbtc && <TransferModalWbtc addressConnect={''} onClose={() => {
        setTransferModalWbtc(undefined)
        location.reload()
      }}
                                                 currentPlan={transferModalWbtc.plan} totalLength={transferModalWbtc.totalLength} currentMoney={transferModalWbtc.money}
                                                 interests={transferModalWbtc.interests}/>}

      <Footer/>
    </div>
  )
}
