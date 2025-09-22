import React, { useEffect, useState } from "react"
import { Header, Footer, Collapse } from "components"

import "./FAQ.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const FAQ = (): JSX.Element => {

  const faqData = [
    {
      title: "How does Staking work on Cryptomesh.io?",
      desc: "\n" +
        "Cryptomesh.io is a cutting-edge, decentralized staking platform that offers unique opportunities for users. Leveraging the power of well-designed smart contracts, Cryptomesh.io identifies innovative staking pools that offer high potential and attractive Annual Percentage Rates (APR) in the market, allowing users to earn through arbitrage.\n" +
        "\n" +
        "The smart contracts employed by Cryptomesh.io are not only robust and reliable, but they also provide a competitive edge. Thanks to the strength of these smart contract mechanisms, Cryptomesh.io is able to offer higher returns compared to other decentralized applications (dApps) in the market.\n" +
        "\n" +
        "In addition, 98% of the fees/profits generated from the platform are distributed to staking users, maximizing their potential earnings. Cryptomesh.io retains only 2%, ensuring that the majority of the benefits go directly to the users.\n" +
        "\n" +
        "In essence, Cryptomesh.io transforms how staking works by combining safety, reliability, and higher earning potential under one platform. With Cryptomesh.io, you're not just staking — you're optimizing your assets.",
    },
    {
      title: "How can I start staking on Cryptomesh.io?",
      desc: "To begin Staking, you need to have a compatible wallet for your chosen cryptocurrency. After connecting to the wallet , you can deposit your tokens into it. Choose the amount of tokens you wish to stake ,and follow the instruction provided to stake your tokens.",
    },
    {
      title: "Is there a minimum amount required to stake on Cryptomesh.io?",
      desc: "The minimum staking requirement on Cryptomesh.io may be different depending on the specific staking pool .As such ,it is advisable to check the staking pool details for accurate information regarding the minimum staking requirements.",
    },
    {
      title: "Can I withdraw my staked tokens at Cryptomesh.io at anytime?",
      desc: "Withdrawal policies on Cryptomesh.io may be different based on each staking pool.",
    },
    {
      title: "Is my principal investment safe while staking on Cryptomesh.io?",
      desc: "Cryptomesh.io has harnessed the power of smart contracts and blockchain technology to provide a secure environment for staking.However, it is important to acknowledge that all cryptocurrency investments carry a certain level of risk.",
    },
    {
      title: "How are the referral reward calculated on Cryptomesh.io?",
      desc: "Referral rewards on Cryptomesh.io are calculated as an additional 15% bonus on the staking interest earned by your referral friends. To maximize your referral earnings , you can share your unique referral link with friends.",
    },
    {
      title: "Do I have to stake on Cryptomesh.io to participate into the referral program?",
      desc: "To participate in the referral program on Cryptomesh.io ,it is necessary to actively stake any currency on the platform ,It is important to note that an invitation will only be considered valid if you are participating in staking activities,If you are not actively staking ,the invitation will be deemed invalid.",
    },
    {
      title: "Can I track the performance of my referrals on Cryptomesh.io?",
      desc: "Cryptomesh.io provides a user-friendly dashboard for tracking the performance of referrals,which includes details such as the number of successful referrals, and referral friend's staking activities on Cryptomesh.io.",
    },
    {
      title: "Is my personal information safe on Cryptomesh.io?",
      desc: "Cryptomesh.io prioritizes the privacy and security of it's users by implementing robust measures such as data encryption and secure authentication methods to safeguard their personal information ,It is recommended that users review the platform security features thoroughly to ensure their information is well protected.",
    },
    {
      title: "Do I need an referral code to access Cryptomesh.io?",
      desc: "As of our recent policy updates, you no longer need an referral code to join the Cryptomesh.io platform. This change is part of our ongoing commitment to make decentralized staking accessible to a wider audience.\n" +
         "\n" +
         "While the referral-only system helped us foster a secure and exclusive environment in the initial stages, we believe it's now time to open the gates to more individuals interested in decentralized staking. \n" +
         "\n" +
         "This doesn't mean we're compromising on our commitment to security and performance. Rest assured, we continue to implement rigorous checks and safeguards to ensure the platform remains secure and reliable for all users.\n" +
         "\n" +
         "Now, anyone with an interest in digital asset management and staking can enjoy the full features and benefits of Cryptomesh.io, joining a community of forward-thinking individuals united by a shared interest in the future of decentralized finance."
    },
    {
      title: "Is Cryptomesh.io audited?",
      desc: "The Cryptomesh.io smart contracts have been designed from the ground up with security in mind by using as many audited components as possible. \n"
    },
  ]
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="faq" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="faq-content">
        <h1 className="faq-content-title">FAQ</h1>
        {faqData.map((item, index) => (
          <Collapse desc={item.desc} title={item.title} key={index}/>
        ))}
      </div>
      <Footer/>
    </div>
  )
}
