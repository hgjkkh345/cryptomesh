import React from "react"
import { Footer, Header } from "../../components"
import "./ChainlinkOracles.scss"
import { ContactUs } from "../../components/ContactUs"
import { ServiceHeader } from "../../components/ServiceHeader"
import dataoracles from "../../assets/images/veryimportantfolder.webp"
import { TailoredSolutions } from "../../components/TailoredSolutions"
import { tailoredsolutionsData } from "../../components/TailoredSolutions/data"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import { StakingGuides } from "../../components/StakingGuides"



export const ChainlinkOracles = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="chainlink-oracles">
        <ServiceHeader
          title="Chainlink Oracles solutions for your Data Oracle needs"
          desc="At Cryptomesh, Chainlink Oracles form the core of our services. We work with Chainlink and other operators in Decentralized Oracle Networks to deliver tailored solutions for your Oracle requirements. Whether it’s building a custom Oracle solution, serving as a maintainer, or providing consultation, we use Chainlink’s industry-leading technology to ensure secure and reliable data feeds for your network."
          image={dataoracles} />
        <TailoredSolutions title={"Tailored Solutions"} data={tailoredsolutionsData} />
        <WhiteLabelFAQ />
        {/*<StakingGuides />*/}
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}
