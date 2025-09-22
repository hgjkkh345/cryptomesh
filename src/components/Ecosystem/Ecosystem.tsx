import React, {useEffect} from "react"

import img1 from "assets/icons/our-ecosystem/ipfs-eco.svg"
import img2 from "assets/icons/our-ecosystem/pent-icon.svg"
import img3 from "assets/icons/our-ecosystem/closed-lock.svg"
import "./Ecosystem.scss"

export const Ecosystem = (): JSX.Element => {
  const blocks = [
    {
      title: "IPFS Integration",
      desc: "By utilizing the InterPlanetary File System (IPFS), Lounge Finance ensures a decentralized and resilient storage solution for important data, enhancing the overall stability and reliability of our platform.",
      icon: img1,
    },
    {
      title: "Chainlink Oracles",
      desc: "Our collaboration with Chainlink provides secure and accurate price feeds through decentralized oracle networks, ensuring the integrity of our staking platform and safeguarding users' assets.",
      icon: img2,
    },
    {
      title: "Regular Security Audits",
      desc: "To maintain the highest security standards, Cryptomesh.io undergoes routine security audits conducted by industry-leading experts. These audits help us identify and address potential vulnerabilities, ensuring the ongoing safety and reliability of our platform.",
      icon: img3,
    },
  ]

  return (
    <div className="ecosystem">
      <div data-aos="fade-up" className="ecosystem-header">
        <h3 className="ecosystem-title">A Reliable Platform <br/>You Can Trust</h3>
        <p data-aos="fade-up" className="ecosystem-desc">
          At Cryptomesh.io, we understand the importance of trust and reliability in the crypto space.
        </p>
      </div>
      <div data-aos="zoom-in-down" className="ecosystem-content">
        {blocks.map((block, index) => (
          <div key={index} className="ecosystem-content-item">
            <div className="ecosystem-content-item-header">
              <div className="ecosystem-content-item-icon">
                <img alt="ecosystem" src={block.icon}/>
              </div>
              <div className="ecosystem-content-item-title">{block.title}</div>
            </div>
            <div className="ecosystem-content-item-desc">{block.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
