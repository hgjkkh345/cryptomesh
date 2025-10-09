import React from "react"
import {Footer, Header, Map} from "../../components"
import "./DevApiPage.scss"
import { ContactUs } from "../../components/ContactUs"
import { ServiceHeader } from "../../components/ServiceHeader"
import { TailoredSolutions } from "../../components/TailoredSolutions"
import { devapiData } from "../../components/TailoredSolutions/data"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import devapipagesix from "../../assets/images/3biggears.webp"
import { ValidatorServiceTable } from "../../components/ValidatorServiceTable"
import devapishield from "../../assets/images/defense.webp"

export const DevApiPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="dev-api-page">
        <ServiceHeader
          title="Unlock the Power of Our Developer APIs"
          desc="At Cryptomesh, we provide high-performance, secure infrastructure capable of handling over 4 billion requests per month, giving developers seamless access to blockchain data."
          image={devapipagesix} />
        <div className="dev-api-page-titledesc">
          <h1 className="dev-api-page-title">Our Offering</h1>
          <p className="dev-api-page-desc">Our powerful, dedicated hardware delivers exceptional performance without sacrificing security.</p>
        </div>
        <ValidatorServiceTable variant="without-title" desc="Delegators enjoy the advantages of our dedicated bare-metal infrastructure, hosted in a privately operated data center in Melbourne. This setup enhances security and data privacy by maintaining full control over the hardware environment. For uninterrupted service and reliable disaster recovery, we also operate multiple co-located servers with real-time backups and system redundancy." image= {devapishield}  />
        <TailoredSolutions variant="for-dev-api"  data={devapiData} />
        <h1 className="locations-bluemap-title">Locations</h1>
        <div className="bluemap-part">
          <Map />
        </div>


        <WhiteLabelFAQ />
        {/*<StakingGuides />*/}
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}
