import React from "react"
import { Footer, Header } from "../../components"
import "./WhitelabelValidators.scss"

import { ServiceHeader } from "../../components/ServiceHeader"
import WhitelabelValidatorsImage from "../../assets/images/bitcoinethshieldprotect.webp"
import { validatorServiceTable } from "../../components/ValidatorServiceTable/data"
import { ValidatorServiceTable } from "../../components/ValidatorServiceTable"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import {StakingGuides} from "../../components/StakingGuides"
import { ContactUs } from "../../components/ContactUs"



export const WhitelabelValidators = (): JSX.Element => {
  return (
    <div className="whitelabel-validators ">
      <Header/>
      <div className="whitelabel-validators-content">
        <ServiceHeader title="Unlock Tailored Staking Infrastructure With Our Whitelabel Validators" desc="We provide Whitelabel Validator services that can be customized to your needs, enabling seamless use of our robust, secure, and discreet infrastructure." image={WhitelabelValidatorsImage}  />
      </div>
      <h1 className="heading-title">Validator Service</h1>
      {validatorServiceTable.map((item, index) => (
        <ValidatorServiceTable key={index} title={item.title} desc={item.description} image={item.image}/>
      ))}
      <WhiteLabelFAQ />
      {/*<StakingGuides />*/}
      <ContactUs />

      <Footer/>
    </div>
  )
}
