import React, { useEffect, useState } from "react"
import { Header, Footer } from "components"

import "../Terms/Terms.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const Cookies = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="terms privacy" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>
      <div className="terms-content">
        <h1 className="terms-content-title">Cookie Policy</h1>
        <p className="terms-content-desc">
          The Cryptomesh.io Finance (&quot;Cryptomesh.io&quot;) is committed to protecting and respecting your privacy. This
          Cookie
          Policy describes what information is collected using cookies and how that information is used in connection
          with <a href="https://Cryptomesh.io.com/">https://Cryptomesh.io.com/</a> (the &quot;Site&quot;). This
          Cookie
          Policy may be modified from time to time which will be indicated by changing the date at the top of this page.
          This policy should be read together with the Privacy Policy. Your use of the Site is at all times subject to
          the Terms of Service.
        </p>
        <h3 className="terms-content-subtitle">1. What are cookies?</h3>
        <p className="terms-content-desc">
          Cookies are text files, containing small amounts of information, which are downloaded to your browsing device
          (such as a computer or smartphone) when you visit a website. Cookies can be recognized by the website that
          downloaded them — or other websites that use the same cookies. Cookies enable websites to know if the browsing
          device has visited the website before.
        </p>
        <h3 className="terms-content-subtitle">2. What are cookies used for?</h3>
        <p className="terms-content-desc">
          Broadly speaking, cookies can be used for a variety of purposes, such as helping a website operator to
          understand how their website is being used, remembering user preferences, serving marketing and advertising,
          and measuring the performance of a website among other things. Generally, cookies can categorized as follows:
          strictly necessary; analytics; functionality; advertising; and social media.
        </p>
        <h3 className="terms-content-subtitle">3. First and third-party cookies</h3>
        <p className="terms-content-desc">
          &quot;First party cookies&quot; are cookies that belong to us and that we place on your device.
          &quot;Third-party cookies&quot; are cookies that another party places on your browsing device when you visit
          our site. Third parties setting cookies from the Site will be providing a service to us or a function of the
          site, but we do not always control how third-party cookies are used. You should check the third party&apos;s
          website for more information about how they use cookies.
        </p>
        <h3 className="terms-content-subtitle">4. What types of cookies are used VIA the SITE?</h3>
        <p className="terms-content-desc">
          Cryptomesh.io restricts its use of cookies. Cryptomesh.io does not collect cookies via the Site.
        </p>
        <h3 className="terms-content-subtitle">5. How long will cookies stay on my browsing Device?</h3>
        <p className="terms-content-desc">
          In general, the length of time a cookie will stay on your browsing device depends on whether it is a
          &quot;persistent&quot; or &quot;session&quot; cookie. Session cookies will only stay on your device until you
          stop browsing. Persistent cookies stay on your browsing device after you have finished browsing until they
          expire or are deleted. As no first-party cookies are collected, your browsing device will not have Cryptomesh.io
          cookies.
        </p>
        <h3 className="terms-content-subtitle">6. How to manage cookies from the site?</h3>
        <p className="terms-content-desc">
          You can usually use the browser that you are viewing the Site through to enable, disable or delete cookies. To
          do this, follow the instructions provided by your browser (usually located within the &quot;Help&quot;,
          &quot;Tools&quot; or &quot;Edit&quot; settings). Please note that if you set your browser to disable cookies,
          you may not be able to use all features of the Site. You can find out more information about how to change
          your browser cookie settings at [www.allaboutcookies.org](https://www.allaboutcookies.org/). Some third
          parties may use Advertising Cookies to help gather information about your browsing activity so that they can
          deliver website advertising to you that is relevant to your interests. The advertising industries in the
          European Union (EU) have developed schemes to help you opt-out of receiving cookies used for these purposes.
          You can find out more about the EU scheme from [www.youronlinechoices.eu](http://www.youronlinechoices.eu/).
        </p>
        <h3 className="terms-content-subtitle">7. Changes</h3>
        <p className="terms-content-desc">
          Information about the cookies used by us may be updated from time to time, so please check back on a regular
          basis for any changes. The last modification date of this document is shown at the beginning of this document.
        </p>
        <h3 className="terms-content-subtitle">8. Questions</h3>
        <p className="terms-content-desc">
          If you have any questions about this cookie policy, please contact us by email at{" "}
          <a target="_blank" rel="noreferrer noopener" href="mailto:support@arclaim.com">
            support@arclaim.com
          </a>
          .
        </p>
      </div>
      <Footer/>
    </div>
  )
}
