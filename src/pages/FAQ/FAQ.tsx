import React, { useEffect, useState } from "react"
import { Header, Footer, Collapse } from "components"

import "./FAQ.scss"
import imgMainBgSrc from "assets/images/image.webp"

export const FAQ = (): JSX.Element => {

  const faqData = [
    {
      title: "How does Staking work on Cryptomesh.io?",
      desc: "\n" +
        "Cryptomesh.io is a next-generation decentralized staking platform designed to unlock greater opportunities for users. By leveraging advanced smart contracts, the platform identifies innovative staking pools with strong potential and competitive Annual Percentage Rates (APR), enabling users to maximize earnings through strategic arbitrage.\n" +
        "\n" +
        "The smart contracts powering Cryptomesh.io are built for both security and efficiency, giving the platform an edge over traditional dApps. This strength allows Cryptomesh.io to consistently deliver higher returns compared to many alternatives in the market.\n" +
        "\n" +
        "What sets Cryptomesh.io apart is its commitment to users: 98% of all platform fees and profits are redistributed to stakers, while only 2% is retained. This ensures that the vast majority of rewards flow directly back to the community.\n" +
        "\n" +
        "In short, Cryptomesh.io redefines staking by combining safety, reliability, and exceptional earning potential — turning your assets into optimized opportunities.",
    },
    {
      title: "How can I start staking on Cryptomesh.io?",
      desc: "To start staking, first ensure you have a wallet that supports your chosen cryptocurrency. Connect your wallet to Cryptomesh.io, then deposit the tokens you want to stake. Next, select the amount you wish to stake and follow the on-screen instructions to complete the process.",
    },
    {
      title: "Is there a minimum amount required to stake on Cryptomesh.io?",
      desc: "The minimum staking amount on Cryptomesh.io varies depending on the specific staking pool. Be sure to check the details of the pool you’re interested in to find the exact minimum requirement.",
    },
    {
      title: "Can I withdraw my staked tokens at Cryptomesh.io at anytime?",
      desc: "Withdrawal rules on Cryptomesh.io vary depending on the staking pool. Check the specific pool’s terms for details on when and how you can withdraw your tokens.",
    },
    {
      title: "Is my principal investment safe while staking on Cryptomesh.io?",
      desc: "Cryptomesh.io uses robust smart contracts and blockchain technology to create a secure staking environment. However, it’s important to remember that all cryptocurrency investments carry inherent risks.",
    },
    {
      title: "How are the referral reward calculated on Cryptomesh.io?",
      desc: "On Cryptomesh.io, referral rewards are calculated as a 15% bonus on the staking interest earned by your referred friends. To maximize your rewards, simply share your unique referral link with others.",
    },
    {
      title: "Do I have to stake on Cryptomesh.io to participate into the referral program?",
      desc: "Yes, to participate in Cryptomesh.io’s referral program, you must actively stake a cryptocurrency on the platform. Invitations are only considered valid if you are staking; without active staking, referrals will not qualify.",
    },
    {
      title: "Can I track the performance of my referrals on Cryptomesh.io?",
      desc: "Yes, Cryptomesh.io offers a user-friendly dashboard where you can monitor your referrals’ performance, including the number of successful referrals and your friends’ staking activities.",
    },
    {
      title: "Is my personal information safe on Cryptomesh.io?",
      desc: "Cryptomesh.io prioritizes user privacy and security by using strong measures like data encryption and secure authentication to protect personal information. Users are encouraged to review the platform’s security features to ensure their data remains safe.",
    },
    {
      title: "Do I need an referral code to access Cryptomesh.io?",
      desc: "No, you no longer need a referral code to join Cryptomesh.io. While the referral system initially helped maintain a secure and exclusive environment, the platform is now open to anyone interested in decentralized staking.\n" +
         "\n" +
        "Rest assured, Cryptomesh.io continues to prioritize security and performance, implementing rigorous safeguards to ensure a safe and reliable experience. Everyone can now access the full features of the platform and join a community focused on the future of decentralized finance."
    },
    {
      title: "Is Cryptomesh.io audited?",
      desc: "Cryptomesh.io smart contracts are built with security as a top priority, incorporating as many audited components as possible to ensure reliability and safety. \n"
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
