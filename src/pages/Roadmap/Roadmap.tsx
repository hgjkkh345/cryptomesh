import React, { useEffect, useState } from "react"
import {
  Header,
  Footer,
  Loading,
} from "components"

import "./Roadmap.scss"
import img1Src from "assets/icons/roadmap-icons/icon.svg"
import img2Src from "assets/icons/roadmap-icons/circle.svg"
import img3Src from "assets/icons/roadmap-icons/star.svg"
import img4Src from "assets/icons/roadmap-icons/star-2.svg"
import img5Src from "assets/icons/roadmap-icons/scroll.svg"
import img6Src from "assets/icons/roadmap-icons/figures.svg"
import imgDoneSrc from "assets/icons/roadmap-icons/complete.svg"
import imgUndoneSrc from "assets/icons/roadmap-icons/nodone.svg"
import imgMainBgSrc from "../../assets/images/space-background.webp";
import cn from "classnames";

export const Roadmap = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const journeyItems = [
    {
      title: "Cryptomesh.io Platform Launch and Multichain Staking Integration Completed on BSC and Ethereum",
      end: "COMPLETED",
      icon: img1Src,
      items: [
        {
          title: 'Launch of Cryptomesh.io platform supporting staking on multiple chains.',
          end: 'COMPLETED'
        },
        {
          title: 'Initial integration with BSC and Ethereum chains.',
          end: 'COMPLETED'
        },
        {
          title: 'Implementation of secure staking mechanisms and smart contract audits.',
          end: 'COMPLETED'
        },
        {
          title: 'User feedback collection and continuous improvement of the platform based on community input.',
          end: 'COMPLETED'
        },
      ]
    },
    {
      title: "Enhances Platform with Advanced Staking Features, DeFi Collaborations, and Security Upgrades",
      end: "COMPLETED",
      icon: img2Src,
      items: [
        {
          title: 'Optimization of staking algorithms to maximize rewards and efficiency.',
          end: 'COMPLETED'
        },
        {
          title: 'Introduction of advanced features such as liquidity mining, yield farming, and governance.',
          end: 'in progress'
        },
        {
          title: 'Collaboration with other DeFi projects and platforms to enhance interoperability and ecosystem growth.',
          end: 'COMPLETED'
        },
        {
          title: 'Launch of educational resources and tutorials to onboard new users and increase adoption.',
          end: 'in progress'
        },
        {
          title: 'Implementation of security upgrades and regular audits to ensure the safety of user funds.',
          end: 'COMPLETED'
        },
      ]
    },
    {
      title: "Expands Staking Capabilities with Layer 2 Integrations and R&D of Innovative DeFi Solutions",
      end: "in progress",
      icon: img3Src,
      items: [
        {
          title: "Research and development of novel staking mechanisms and DeFi products to stay ahead of the curve.",
          end: 'in progress'
        },
        {
          title: 'Integration with emerging blockchain technologies and layer 2 solutions to improve scalability and reduce transaction costs.',
          end: 'COMPLETED'
        },
        {
          title: 'Initial integration with Optimism, Polygon, Avalanche, Fantom, and Arbitrum chains.',
          end: 'COMPLETED'
        },
        {
          title: 'Expansion into new markets and regions to reach a broader user base and promote financial inclusion.',
          end: 'in progress'
        },
      ]
    },
    {
      title: "Cryptomesh.io Plans for Compliance, Governance, and Expansion with New Chain Integrations and Community-Driven Improvements",
      end: "not started",
      icon: img6Src,
      items: [
        {
          title: "Collaboration with regulatory bodies and compliance experts to ensure legal compliance and regulatory clarity.",
          end: 'not started'
        },
        {
          title: "Initial integration with Aptos, Manta and Base chains.",
          end: 'completed'
        },
        {
          title: "Continued community engagement and governance participation to empower users and decentralize decision-making.",
          end: 'not started'
        },
        {
          title: "Continuous iteration and improvement based on market trends, technological advancements, and community feedback.",
          end: 'not started'
        },
        {
          title: "Governance and DAO",
          end: 'in progress'
        },
      ]
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  return (
    <div className="roadmap" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {!loaded && <Loading/>}
      <div className='roadmap-blur'/>
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
      <section className='roadmap-main'>
        <h3 data-aos="fade-up">Cryptomesh.io.com - guarded launch</h3>
        <h1 data-aos="fade-up">Autopilot&apos;s roadmap to launch</h1>
        <p data-aos="fade-up">
          Follow the progress of the guarded launch as we test the integrity of Autopilot&apos;s
          rebalancing mechanics, in preparation for public deposits.
        </p>
      </section>
      <section className='roadmap-journey'>
        <div className='roadmap-journey-content'>
          <div className='roadmap-journey-content-items'>
            {journeyItems.map((item, index) => (
              <div data-aos="fade-up" key={index} className='roadmap-journey-content-item'>
                <div className='roadmap-journey-content-item-line'/>
                <img src={item.icon} alt='icon' className='roadmap-journey-content-item-icon' />
                <div className='roadmap-journey-content-item-data'>
                  <div className='roadmap-journey-content-item-data-header'>
                    <p>PHASE {index + 1}</p>
                    <p
                      className={cn('roadmap-journey-content-item-data-header-end', {
                        'progress': item.end === 'in progress',
                        'notStarted': item.end === 'not started',
                      })}
                    >
                      {item.end}
                    </p>
                  </div>
                  <h2>
                    {item.title}
                  </h2>
                  {item.items.map((itemDesc, indexDesc) => (
                    <div key={indexDesc} className='roadmap-journey-content-item-block'>
                      <img src={itemDesc.end === 'not started' ? imgUndoneSrc : imgDoneSrc} alt='done'/>
                      <div className='roadmap-journey-content-item-block-text'>
                        <h5>{itemDesc.title}</h5>
                        {/*{itemDesc.desc && <p> {itemDesc.desc}</p>}*/}
                        <p
                          className={cn('roadmap-journey-content-item-data-header-end', {
                            'progress': itemDesc.end === 'in progress',
                            'notStarted': itemDesc.end === 'not started',
                          })}
                        >
                          {itemDesc.end}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      <Footer/>
    </div>
  )
}
