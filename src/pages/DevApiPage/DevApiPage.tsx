import React from "react"
import {Footer, Header, Map} from "../../components"
import "./DevApiPage.scss"
import { ContactUs } from "../../components/ContactUs"
import { ServiceHeader } from "../../components/ServiceHeader"
import { TailoredSolutions } from "../../components/TailoredSolutions"
import { devapiData } from "../../components/TailoredSolutions/data"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import devapipagesix from "../../assets/images/devapipagesix.webp"
import { ValidatorServiceTable } from "../../components/ValidatorServiceTable"
import devapishield from "../../assets/images/devapishield.webp"

export const DevApiPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="dev-api-page">
        <ServiceHeader
          title="Unlock the Power of our Developer APIs"
          desc="At Cryptomesh.io, we specialise in high-performance, secure hardware handling over 4 billion monthly requests, ensuring seamless access to blockchain data."
          image={devapipagesix} />
        <div className="dev-api-page-titledesc">
          <h1 className="dev-api-page-title">Our Offering</h1>
          <p className="dev-api-page-desc">Our powerful, dedicated hardware delivers exceptional performance without sacrificing security.</p>
        </div>
        <ValidatorServiceTable variant="without-title" desc="Delegators benefit from our dedicated bare-metal infrastructure, housed in a privately operated data center in Wellington. This setup offers enhanced security and data privacy by keeping full control over the hardware environment. To ensure uninterrupted service and reliable disaster recovery, we also maintain multiple co-located servers that provide real-time backups and system redundancy." image= {devapishield}  />
        <TailoredSolutions variant="for-dev-api"  data={devapiData} />
        <h1 className="locations-bluemap-title">Locations</h1>
        <div className="bluemap-part">
          <Map />
        </div>


        {/*<LatestArticles />*/}
        <WhiteLabelFAQ />
        {/*<StakingGuides />*/}
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}
