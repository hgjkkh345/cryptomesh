import React from "react"
import "./Chains.scss"
import img1Src from 'assets/icons/all-chains/first-1.svg'
import img2Src from 'assets/icons/all-chains/eth1.svg'
import img3Src from 'assets/icons/all-chains/op-1.svg'
import img4Src from 'assets/icons/all-chains/arb-1.svg'
import img5Src from 'assets/icons/all-chains/fantom-new.svg'
import img6Src from 'assets/icons/all-chains/aval-1.svg'
import img7Src from 'assets/icons/all-chains/base1.svg'
import img8Src from 'assets/icons/all-chains/matic-new.svg'
import img9Src from 'assets/icons/all-chains/aptos-new.svg'
import img10Src from 'assets/icons/all-chains/marta1.svg'
import logoSrc from 'assets/images/cryptomesh-circle.webp'
import cn from "classnames";

export const Chains = (): JSX.Element => {
  const blocks = [
    {
      icon: img1Src,
      link: "https://www.bnbchain.org/",
      name: 'BNB Chain'
    },
    {
      icon: img2Src,
      link: "https://ethereum.org/",
      name: "ETH",
    },
    {
      icon: img3Src,
      link: "https://www.optimism.io/",
      name: "Optimism"
    },
    {
      icon: img4Src,
      link: "https://arbitrum.io/",
      name: "Arbitrum"
    },
    {
      icon: img5Src,
      link: "https://fantom.foundation/",
      name: "Fantom"
    },
    {
      icon: img5Src,
      link: "https://fantom.foundation/",
      name: "Fantom"
    },
    {
      icon: img6Src,
      link: "https://www.avax.network/",
      name: "Avalance"
    },
    {
      icon: img7Src,
      link: "https://www.base.org/",
      name: "Base"
    },
    {
      icon: img8Src,
      link: "https://polygon.technology/",
      name: "Polygon"
    },
    {
      icon: img9Src,
      link: "https://aptosfoundation.org/",
      name: "Aptos"
    },
    {
      icon: img10Src,
      link: "https://manta.network/",
      name: "Manta"
    },
  ]
  return (
    <div className="chains" data-aos="fade-up">
      <h3>Pushing the frontier, together</h3>
      <div className="chains-content">
        {blocks.map((block, index) => index === 5 ? (
          <a  key={index} className="chains-logo">
            <img src={logoSrc} alt='logo' className='chains-logo'/>
            <div className='chains-content-item-text'>Cryptomesh.io</div>
          </a>
        ) : (
          <a href={block.link} target="_blank" rel='noreferrer noopener' key={index}
                               className={cn(`chains-content-item-wrapper chains-content-item-wrapper-${index + 1}`)}>
        <div className='chains-content-item'>
          <img src={block.icon} alt='chain'/>
        </div>
            <div className='chains-content-item-text'>{block.name}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
