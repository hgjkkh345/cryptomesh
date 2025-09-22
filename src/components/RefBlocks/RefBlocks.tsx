import React from "react"

import { ReactComponent as Block1 } from "assets/icons/referral-program/dollarcoin-ref.svg"
import { ReactComponent as Block2 } from "assets/icons/referral-program/closed-wallet-ref.svg"
import { ReactComponent as Block3 } from "assets/icons/referral-program/stat-ladder-ref.svg"
import "./RefBlocks.scss"

export const RefBlocks = (): JSX.Element => {
  const data = [
    {
      icon: <Block1 />,
      title: "Earn 15% Extra Rewards through Referrals",
      desc: "Refer friends to Cryptomesh.io and earn an extra 15% reward on Cryptomesh.io(2%*15%). Share your referral link, and when your friend start staking, you'll receive bonus. Start earning more with the Cryptomesh.io Referral Program!",
    },
    {
      icon: <Block2 />,
      title: "Unlimited Payments per Hour",
      desc: "At Cryptomesh.io, we leverage the power of smart contracts and blockchain technology to enable a decentralized and trustless environment for transactions. This approach allows for a large number of transactions to be completed autonomously and securely and enjoy the convenience of unlimited payment processing every hour. Experience a new level of efficiency, transparency, and control with Cryptomesh.io!",
    },
    {
      icon: <Block3 />,
      title: "Track Your Referrals with Ease",
      desc: "Stay informed and up-to-date with your referral progress on Cryptomesh.io. Our user-friendly dashboard allows you to easily track the number of successful referrals, the rewards you've earned, and your referred friends' staking activities. Monitor your referral performance and optimize your earnings with Cryptomesh.io's intuitive referral tracking system!",
    },
  ]

  return (
    <div className="ref-blocks">
      <h2 className="ref-blocks-title">Highlights</h2>
      <div className="ref-blocks-content">
        {data.map((item, index) => (
          <div className="ref-blocks-content-item" key={index}>
            <div className="ref-blocks-content-item-icon">{item.icon}</div>
            <dt className="ref-blocks-content-item-title">{item.title}</dt>
            <dd className="ref-blocks-content-item-desc">{item.desc}</dd>
          </div>
        ))}
      </div>
    </div>
  )
}
