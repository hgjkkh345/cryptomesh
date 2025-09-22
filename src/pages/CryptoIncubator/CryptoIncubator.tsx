import React from "react"
import { Footer, Header } from "../../components"
import "./CryptoIncubator.scss"
import { ContactUs } from "../../components/ContactUs"
import { ServiceHeader } from "../../components/ServiceHeader"
import cryptoincubatorrocket from "../../assets/images/cryptoincubatorrocket.webp"
import { TailoredSolutions } from "../../components/TailoredSolutions"
import { projectIncubatorData } from "../../components/TailoredSolutions/data"
import { LatestArticles } from "../../components/LatestArticles"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import { StakingGuides } from "../../components/StakingGuides"
import { OurApproach } from "../../components/OurApproach"



export const CryptoIncubator = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="crypto-incubator">
        <ServiceHeader
          title={`Blockchain Innovations from <span>Concept</span> to <span>Execution</span>`}
          desc="At Cryptomesh.io, we specialise in project incubation services, dedicated to nurturing blockchain initiatives and fostering their growth into successful ventures. With our expertise and resources, we provide the support needed to transform your blockchain ideas into reality."
          image={cryptoincubatorrocket} />
        <OurApproach />
        <TailoredSolutions variant="for-crypto-incubator" title={`Why Choose <span>Cryptomesh.io?</span>`} data={projectIncubatorData} />
        {/*<LatestArticles />*/}
        <WhiteLabelFAQ />
        {/*<StakingGuides />*/}
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}
