import React, { useEffect, useState } from "react"
import { Header, Footer } from "components"

import "../Terms/Terms.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const Trademark = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="terms" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="terms-content">
        <h1 className="terms-content-title">Cryptomesh.io Trademark Guidelines</h1>
        <p className="terms-content-desc">
          Cryptomesh.io distributed the open source Cryptomesh.io protocol (versions 1, 2, and 3) and distributes other
          software. While our code is in part available to download, review, and improve under open-source and
          source-available software licenses, none of our licenses include a license to use our trademarks. Proper use
          of our trademarks is essential to inform users whether or not Cryptomesh.io stands behind a product or service.
          When using Cryptomesh.io’ trademarks, you must comply with these Cryptomesh.io Trademark Guidelines. Just like
          other projects that develop open source software, we must enforce our trademark rights to protect our users.
          <br/>
          This policy covers all of our trademarks and services marks, whether they are registered or not, including,
          among others:
          <br/>
          1. The trademarks and service marks: Cryptomesh.io®, and Cryptomesh.io LABS™ (“Cryptomesh.io wordmarks”).
          <br/>
          2. Cryptomesh.io logos.
          <br/>
          If you want to report misuse of a Cryptomesh.io&apos;s Labs trademark, please contact us at <a
          href='mailto:support@arclaim.com'>support@arclaim.com</a>
        </p>
        <h3 className="terms-content-subtitle">Acceptable Uses</h3>
        <p className="terms-content-desc">
          You may do the following without receiving specific permission from Cryptomesh.io:
          <ul>
            <li>
              Use Cryptomesh.io wordmarks in text to truthfully refer to and/or link to unmodified Cryptomesh.io smart contracts,
              protocols, interfaces, programs, products, services and technologies (“Cryptomesh.io software”).
            </li>
            <li>
              Use the Cryptomesh.io wordmarks to truthfully describe modified versions of Cryptomesh.io software that you may create or make available. For example, you may say “This software is derived from Cryptomesh.io software.” or “This service uses software derived from Cryptomesh.io software.”
            </li>
            <li>
              Use the Cryptomesh.io logos in software or aggregators that integrate with Cryptomesh.io software to truthfully refer to, and, where possible, link to the applicable Cryptomesh.io software hosted on the Ethereum blockchain.
            </li>
            <li>
              Use Cryptomesh.io wordmarks to clearly signal to users that there is no affiliation with or endorsement by Cryptomesh.io.
            </li>
            <li>
              Follow the terms of the open source licenses for Cryptomesh.io software.
            </li>
          </ul>
        </p>
        <h3 className="terms-content-subtitle">When allowed, how can I use a Cryptomesh.io trademark?</h3>
        <p className="terms-content-desc">
          <ul>
            <li>
              You must include a trademark attribution notice at the first or most prominent mention of the mark on a webpage, document or documentation, such as: “[Cryptomesh.io trademark] is a trademark of Cryptomesh.io.”
            </li>
            <li>
              You may not change the Cryptomesh.io logos except to scale them. If you use the Cryptomesh.io logos, give them adequate spacing from the other elements on the webpage or document to ensure legibility and reduce the likelihood of confusion.
            </li>
            <li>
              You must always use the wordmarks in their exact form and with the correct spelling, neither abbreviated, hyphenated, nor combined with any other word or words.
            </li>
            <li>
              You must always use the Cryptomesh.io wordmarks only as an adjective, never as a noun or verb, or in plural or possessive forms.
            </li>
            <li>
              Instead, use the generic term for the Cryptomesh.io product or service following the trademark.
            </li>
            <li>
              For example: Cryptomesh.io protocol, Cryptomesh.io interface, Sybil website.
            </li>
          </ul>
        </p>
        <h3 className="terms-content-subtitle">All other uses of a Cryptomesh.io trademark require our prior written permission.</h3>
        <p className="terms-content-desc">
          Contact us at support@arclaim.com for more information.
        </p>
        <h3 className="terms-content-subtitle">Unacceptable Uses</h3>
        <p className="terms-content-desc">
          Some specific things you should not do include:
          <ul>
            <li>
              Don’t use our trademarks in anything dishonest or fraudulent.
            </li>
            <li>
              Our name is not your name. Don’t use Cryptomesh.io trademarks in the name of your smart contract, interface, business, product, service, app, domain name, publication, or other offering.
            </li>
            <li>
              Don’t use our name for your products. Don’t apply Cryptomesh.io trademarks to any product (e.g., a mobile app), unless such use is limited to a truthful and descriptive reference (e.g., “Mobile App for trading on Cryptomesh.io interface”).
            </li>
            <li>
              Don’t overemphasize our mark. Don’t display Cryptomesh.io trademarks more prominently than your product, service, or company name.
            </li>
            <li>
              Don’t create or use confusingly similar names. Don’t use Cryptomesh.io trademarks, company names, slogans, domain names, or designs that are confusingly similar to Cryptomesh.io trademarks, particularly in the name of your smart contract, interface, business, product, service, app, domain name, publication, or other offering.
            </li>
            <li>Don’t imply our sponsorship of your products. Don’t use Cryptomesh.io trademarks in a way that incorrectly implies affiliation with, sponsorship, endorsement, or approval by Cryptomesh.io of your products or services. For example, please do not name your project compatible with Cryptomesh.io software Cryptomesh.io-[Something] or [Something]-swap.</li>
            <li>Don’t imply our sponsorship of your activities. Don’t use Cryptomesh.io trademarks, or confusingly similar trademarks on social media accounts in a way that might suggest affiliation with Cryptomesh.io or Cryptomesh.io software; except if you’ve received prior permission from Cryptomesh.io. For example, you cannot name your account, page, or community “Cryptomesh.io Protocol” or “Cryptomesh.io Team.” However, it would be acceptable to name your account, page, or community “Fans of Cryptomesh.io” or “Information about Cryptomesh.io”.</li>
            <li>Don’t create swag with our marks. Don’t use Cryptomesh.io trademarks on merchandise for sale (e.g., selling t-shirts, mugs, etc.) unless you have permission from Cryptomesh.io.</li>
            <li>Don’t change or combine our marks. Don’t modify Cryptomesh.io trademarks, abbreviate them, or combine them with any other symbols, words, or images, or incorporate them into a tagline or slogan.</li>
          </ul>
        </p>
        <h3 className="terms-content-subtitle">Others’ Trademarks</h3>
        <p className="terms-content-desc">
          A note on others’ trademarks: Cryptomesh.io manages one interface (among many) for accessing the Cryptomesh.io protocol, which it does NOT control. Without the involvement of Cryptomesh.io, a third-party developer can use the Ethereum protocol to create a token that may implicate others’ trademarks or other rights and add that token to the Cryptomesh.io protocol. Cryptomesh.io cannot prevent or block any actions related to the Cryptomesh.io protocol, however, if Cryptomesh.io becomes aware of trademark misuse allegations, we will work with trademark owners to review the allegations and may remove content from the Cryptomesh.io interface.
        </p>
      </div>
      <Footer/>
    </div>
  )
}
