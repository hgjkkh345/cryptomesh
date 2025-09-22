import React from "react"

import img1 from "assets/images/article-1.png"
import img2 from "assets/images/article-2.png"
import img3 from "assets/images/article-3.png"
import "./NewsHome.scss"
import {SimpleButton} from "../SimpleButton";
import {routes} from "../../utils";

export const NewsHome = (): JSX.Element => {
  const blocks = [
    {
      title: "Cryptomesh.io Secures $3 Million in Seed Funding to Advance DeFi Staking Innovations and Global Growth",
      desc: "Cryptomesh.io, a rising leader in decentralized finance (DeFi), has successfully raised $3 million in seed funding, reflecting growing investor confidence in its potential to revolutionize the DeFi staking landscape. This investment will support Cryptomesh.io's plans for global expansion, platform enhancements, and the introduction of innovative solutions for the DeFi ecosystem.",
      link: "https://www.binance.com/en/square/post/26401282888306",
      source: "Binance",
      icon: img2,
    },
    {
      title: "Cryptomesh.io: Transforming DeFi Staking",
      desc: "Cryptomesh.io is at the forefront of decentralized finance (DeFi) staking, emerging as a top choice for secure and high-yield staking solutions globally. By integrating multi-chain support, cutting-edge technology, and a seamless user experience, Cryptomesh.io is setting a new standard for staking platforms.",
      icon: img1,
      link: "https://coinmarketcap.com/community/articles/68651f6abaae432cd57dc958/",
      source: 'CoinMarketCap',
    },
    {
      title: "Cryptomesh.io Surpasses $215 Million in TVL, Redefining DeFi Staking Innovation",
      desc: "Wellington, New Zealand - July 3, 2025. Cryptomesh.io, a leading multi-chain staking platform built primarily on Ethereum, achieves a monumental milestone, surpassing $215 million in Total Value Locked (TVL). This landmark accomplishment solidifies Cryptomesh.io's role as a trailblazer in the decentralized finance (DeFi) ecosystem, underscoring its rapid growth and transformative approach to staking solutions. By blending cutting-edge technology with user-centric design, Cryptomesh.io sets a new standard for interoperability, security, and accessibility in DeFi staking.",
      link: "https://www.barchart.com/story/news/33231776/arclaim-surpasses-215-million-in-tvl-redefining-defi-staking-innovation",
      source: 'Barchart',
      icon: img3,
    },
  ]
  return (
    <div className="news-home">
      <h3 data-aos="fade-up" className="news-home-title">Our News</h3>
      {/*<div data-aos="fade-up" className="news-home-content">*/}
      {/*  {blocks.map((block, index) => (*/}
      {/*    <a href={block.link} target='_blank' rel='noreferrer noopener' key={index} className="news-home-content-item">*/}
      {/*      <div className="news-home-content-item-icon">*/}
      {/*        <img alt="news-home" src={block.icon}/>*/}
      {/*      </div>*/}
      {/*      <div className="news-home-content-item-title">{block.title}</div>*/}
      {/*      <div className="news-home-content-item-desc">{block.desc}</div>*/}
      {/*      <div className="news-home-content-item-footer">From <b>{block.source}</b></div>*/}
      {/*    </a>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className='news-home-btn'>
        <SimpleButton text='More News' href={routes.news} variant='colored'/>
      </div>
    </div>
  )
}
