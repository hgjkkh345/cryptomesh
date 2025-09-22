import React, {useEffect, useState} from "react"
import {Footer, Header, Loading, SimpleButton} from "components"

import "./Information.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import {ReactComponent as Icon1} from "assets/icons/information-icons/coins-small.svg"
import {ReactComponent as Icon2} from "assets/icons/information-icons/file-1.svg"
import {ReactComponent as Icon3} from "assets/icons/information-icons/user-icon.svg"
import {ReactComponent as Icon4} from "assets/icons/information-icons/block-new.svg"
import {Link} from "react-router-dom";
import {routes} from "../../utils";

export const Information = (): JSX.Element => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="information" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
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
      <div className="information-content">
        <div className='information-content-left'>
          <h2 className='information-content-left-title'>
            <Icon1/> Rewards by Threat Level
          </h2>
          <div className='information-content-contract'>
            Smart Contract
          </div>
          <div className='information-content-contract-blocks'>
            <div className='information-content-contract-blocks-item'>
              <p className='information-content-contract-blocks-item-title red'>Critical</p>
              <p className='information-content-contract-blocks-item-desc'>Up to USD $100,000</p>
            </div>
            <div className='information-content-contract-blocks-item'>
              <p className='information-content-contract-blocks-item-title orange'>High</p>
              <p className='information-content-contract-blocks-item-desc'>USD $5,000 to USD $20,000</p>
            </div>
            <div className='information-content-contract-blocks-item'>
              <p className='information-content-contract-blocks-item-title blue'>Medium</p>
              <p className='information-content-contract-blocks-item-desc'>USD $1,000 to USD $5,000</p>
            </div>
            <div className='information-content-contract-blocks-item'>
              <p className='information-content-contract-blocks-item-title green'>Low</p>
              <p className='information-content-contract-blocks-item-desc'>USD $1,000</p>
            </div>
          </div>

          <p className='information-content-contract-p'>
            Rewards are distributed according to the impact of the vulnerability based on the <a>Cryptomesh.io.com
            Vulnerability Severity Classification System V2.2</a>. This is a simplified 5-level scale, with separate
            scales for websites/apps and smart contracts/blockchains, encompassing everything from consequence of
            exploitation to privilege required to likelihood of a successful exploit.
            <br/>
            <br/>
            All bug reports must come with a PoC and a suggestion for a fix in order to be considered for a reward.
            <br/>
            <br/>
            All known issues previously highlighted in the past audit reports are considered to be out-of-scope
          </p>
          <SimpleButton icon='eye' text='View impacts in scope' href='/error'/>
          <h2 className='information-content-left-title'>
            <Icon2/> Program Overview
          </h2>
          <p className='information-content-contract-p'>
            Cryptomesh.io is an innovative decentralized finance (DeFi) staking platform designed to offer flexibility,
            security, and profitability for both novice and experienced investors.
            <br/>
            <br/>
            With a robust, user-friendly interface and support for over 10 blockchain networks, including popular
            protocols like Ethereum (ETH), Aptos (APT), and Optimism (OP), Cryptomesh.io is redefining the staking
            experience by making DeFi more accessible to everyone.
            <br/>
            <br/>
            What sets Cryptomesh.io apart is its multi-chain staking capabilities, allowing users to diversify their staking
            strategies across multiple networks, maximizing returns and reducing risk. Whether you&apos;re interested in
            fixed-term staking for steady, predictable yields or dynamic options that adapt to market fluctuations,
            Cryptomesh.io provides a tailored solution to fit your investment goals.
            <br/>
            <br/>
            Security and ease of use are at the heart of the Cryptomesh.io platform. With cutting-edge security protocols to
            protect user assets and a simple, intuitive interface, Cryptomesh.io ensures that even those new to DeFi can
            participate with confidence.
            <br/>
            <br/>
            Our bug bounty program focuses on our smart contracts and aims to prevent:
            <br/>
            <ul>
              <li>
                Thefts and freezing of principal of any amount
              </li>
              <li>
                Theft of governance funds
              </li>
              <li>
                Economic exploits
              </li>
            </ul>
          </p>
          <h2 className='information-content-left-title'>
            <Icon3/> KYC not required
          </h2>
          <p className='information-content-contract-p'>
            No KYC information is required for payout processing.
          </p>
          <h2 className='information-content-left-title'>
            <Icon4/> Prohibited Activities
          </h2>
          <p className='information-content-contract-p'>
            <div className='information-content-contract-dis'>Default prohibited activities</div>
            <ul>
              <li>Any testing on mainnet or public testnet deployed code; all testing should be done on local-forks of
                either public testnet or mainnet
              </li>
              <br/>

              <li>Any testing with pricing oracles or third-party smart contracts</li>
              <br/>

              <li>Attempting phishing or other social engineering attacks against our employees and/or customers</li>
              <br/>

              <li>Any testing with third-party systems and applications (e.g. browser extensions) as well as websites
                (e.g. SSO providers, advertising networks)
              </li>
              <br/>

              <li>Any denial of service attacks that are executed against project assets</li>
              <br/>

              <li>Automated testing of services that generates significant amounts of traffic</li>
              <br/>

              <li>Public disclosure of an unpatched vulnerability in an embargoed bounty</li>
              <br/>

              <li><Link to={routes.bugBountyTerms}>Any other actions prohibited by the Cryptomesh.io.com Rules</Link></li>
            </ul>
          </p>
          <SimpleButton text='Submit Bug' link="https://forms.gle/c175nkRLW4tCwn9C8"/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
