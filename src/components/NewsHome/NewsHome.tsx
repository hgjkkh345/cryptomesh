import React from "react"

import img1 from "assets/images/cryptomesh-kucoin.png"
import img2 from "assets/images/ccp-new.png"
import img3 from "assets/images/cryptomesh-binance.png"
import "./NewsHome.scss"
import {SimpleButton} from "../SimpleButton";
import {routes} from "../../utils";

export const NewsHome = (): JSX.Element => {
  const blocks = [
    {
      title: "Cryptomesh Completes $2.5M A-Round Funding to Advance DeFi Staking Transition; TVL Reaches $150M",
      desc: "In accordance with Biji.com, DeFi staking platform Cryptomesh has raised $2.5 million in its A-round funding, with undisclosed investors.",
      link: "https://www.kucoin.com/news/flash/cryptomesh-completes-2-5m-a-round-funding-to-advance-defi-staking-transition-tvl-reaches-150m?lang=en_US&",
      source: "Kukoin",
      icon: img1,
    },
    {
      title: "How Cryptomesh’s $2.5M Funding is Revolutionizing DeFi Staking",
      desc: "OKX - Discover how Cryptomesh's $2.5M funding is transforming DeFi staking with innovative solutions, enhancing rewards and reshaping the decentralized finance landscape.",
      icon: img2,
      link: "https://www.okx.com/learn/cryptomesh-funding-defi-staking",
      source: 'CoinMarketCap',
    },
    {
      title: "Cryptomesh Secures $2.5 Million in Seed Funding to Transform DeFi Staking and Drive Global Growth",
      desc: "Cryptomesh, an emerging leader in decentralized finance (DeFi), has successfully raised $2.5 million in seed funding, showcasing strong investor confidence in its mission to redefine the DeFi staking landscape. This funding will enable Cryptomesh to accelerate global expansion, enhance its platform, and introduce cutting-edge solutions for the DeFi ecosystem.",
      link: "https://www.binance.com/en/square/post/30914228790330?_ul=aHR0cHM6Ly9hcHAuYmluYW5jZS5jb20vdW5pLXFyL2NhcnQvMzA5MTQyMjg3OTAzMzA_dWNvPWNaZlJtVWZ2dlBNczliRTAtRUtST1EmdWM9YXBwX3NxdWFyZV9zaGFyZV9saW5rJnVzPWNvcHlsaW5rJnI9TWFjaCZsPWVu&ref=Mach&utm_campaign=app_square_share_link&utm_content=cZfRmUfvvPMs9bE0-EKROQ&utm_source=copylink",
      source: 'Binance',
      icon: img3,
    },
  ]
  return (
    <div className="news-home">
      <h3 data-aos="fade-up" className="news-home-title">Our News</h3>
      <div data-aos="fade-up" className="news-home-content">
        {blocks.map((block, index) => (
          <a href={block.link} target='_blank' rel='noreferrer noopener' key={index} className="news-home-content-item">
            <div className="news-home-content-item-icon">
              <img alt="news-home" src={block.icon}/>
            </div>
            <div className="news-home-content-item-title">{block.title}</div>
            <div className="news-home-content-item-desc">{block.desc}</div>
            <div className="news-home-content-item-footer">From <b>{block.source}</b></div>
          </a>
        ))}
      </div>
      <div className='news-home-btn'>
        <SimpleButton text='More News' href={routes.news} variant='colored'/>
      </div>
    </div>
  )
}
