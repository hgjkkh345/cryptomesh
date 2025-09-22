import React from "react"
import "./Features.scss"
import { routes } from "../../utils"
import { useSearchParams } from "react-router-dom"
import img1 from "assets/icons/feature/percent-icon.svg"
import img2 from "assets/icons/feature/dollar-coins.svg"
import img3 from "assets/icons/feature/locker.svg"
import img4 from "assets/icons/feature/stat-ladder.svg"

export const Features = (): JSX.Element => {
  const [search] = useSearchParams()

  const blocks = [
    {
      img: img1,
      title: "Multi-Chain \nLiquidity Provision",
      desc: "Contribute to the growth of the crypto\n" +
        "ecosystem by providing liquidity across\n" +
        "multiple blockchains and earning attractive interest on your supplied assets.",
      btnText: "View Supported Chains & Assets",
      route: `${routes.farms}?${search.toString()}`,
    },
    {
      img: img2,
      title: "Flexible Staking \nOptions",
      desc: "Tailor your staking experience with a wide\n" +
        "variety of supported cryptocurrencies,\n" +
        "allowing you to maximize your earnings\n" +
        "potential based on your unique preferences and risk tolerance.",
      btnText: "Discover Staking Opportunities",
      route: `${routes.pool}?${search.toString()}`,
    },
    {
      img: img3,
      title: "Discover Staking\n" +
        "Opportunities",
      desc: "Experience peace of mind with our safe\n" +
        "and reliable decentralized smart contracts, designed to ensure the security and autonomy of your staking transactions",
      btnText: "Browse Contract List",
      route: `${routes.pool}?${search.toString()}`,
    },
    {
      img: img4,
      title: "Rewarding\n" +
        "Referral Program",
      desc: "Share the benefits of Bitstaker.io with\n" +
        "friends and earn valuable rewards! Invite\n" +
        "your network to join our platform and\n" +
        "receive generous referal bonuses as they\n" +
        "stake and grow their crypto assets.",
      btnText: "View Referral Program Details",
      route: `${routes.referral}?${search.toString()}`,
    },
  ]
  return (
    <div className="features">
      <div data-aos="fade-right">
        <h3 className="features-title">Empowering
          Features</h3>
        <p className="features-desc">Enhance Your Multi-Chain Staking
          Experience with Cryptomesh.io</p>
      </div>
      <div className="features-content" data-aos="fade-left">
        {blocks.map((block, index) => (
          <div key={index} className="features-content-item">
            <div className='features-content-item-header'>
              <div className='features-content-item-header-icon'>
                <img src={block.img} alt='feature' />
              </div>
              <div className="features-content-item-title">{block.title}</div>
            </div>
            <div className='features-content-item-right'>
              <div className="features-content-item-desc">{block.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
