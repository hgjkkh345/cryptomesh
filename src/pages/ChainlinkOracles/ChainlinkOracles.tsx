import React from "react"
import { Footer, Header } from "../../components"
import "./ChainlinkOracles.scss"
import { ContactUs } from "../../components/ContactUs"
import { ServiceHeader } from "../../components/ServiceHeader"
import dataoracles from "../../assets/images/dataoracles.webp"
import { TailoredSolutions } from "../../components/TailoredSolutions"
import { tailoredsolutionsData } from "../../components/TailoredSolutions/data"
import { LatestArticles } from "../../components/LatestArticles"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import { StakingGuides } from "../../components/StakingGuides"



export const ChainlinkOracles = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="chainlink-oracles">
        <ServiceHeader
          title="Chainlink Oracles solutions for your Data Oracle needs"
          desc="Chainlink Oracles are at the heart of our services at Cryptomesh.io. We collaborate with Chainlink and other operators in Chainlink Decentralized Oracle Networks to provide tailored solutions for your Oracle needs. Whether it's creating a customized Oracle solution, acting as a maintainer, or offering consultation services, we leverage Chainlink’s industry-leading software to ensure secure and reliable data feeds for your network."
          image={dataoracles} />
        <TailoredSolutions title={"Tailored Solutions"} data={tailoredsolutionsData} />
        {/*<LatestArticles />*/}
        <WhiteLabelFAQ />
        {/*<StakingGuides />*/}
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}
