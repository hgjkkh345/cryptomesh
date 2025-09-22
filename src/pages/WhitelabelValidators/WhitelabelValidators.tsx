import React from "react"
import { Footer, Header } from "../../components"
import "./WhitelabelValidators.scss"

import { ServiceHeader } from "../../components/ServiceHeader"
import WhitelabelValidatorsImage from "../../assets/images/WhitelabelValidatorsImage.webp"
import { validatorServiceTable } from "../../components/ValidatorServiceTable/data"
import { ValidatorServiceTable } from "../../components/ValidatorServiceTable"
import { LatestArticles } from "../../components/LatestArticles"
import { WhiteLabelFAQ } from "../../components/WhiteLabelFAQ"
import {StakingGuides} from "../../components/StakingGuides"
import { ContactUs } from "../../components/ContactUs"



export const WhitelabelValidators = (): JSX.Element => {
  return (
    <div className="whitelabel-validators ">
      <Header/>
      <div className="whitelabel-validators-content">
        <ServiceHeader title="Unlock Tailored Staking Infrastructure With Our Whitelabel Validators" desc="We offer Whitelabel Validator services which can be tailored to your needs thanks to our customizable approach, allowing you to seamlessly make use of our robust, secure, and discrete infrastructure." image={WhitelabelValidatorsImage}  />
      </div>
      <h1 className="heading-title">Validator Service</h1>
      {validatorServiceTable.map((item, index) => (
        <ValidatorServiceTable key={index} title={item.title} desc={item.description} image={item.image}/>
      ))}
      {/*<LatestArticles />*/}
      <WhiteLabelFAQ />
      {/*<StakingGuides />*/}
      <ContactUs />

      <Footer/>
    </div>
  )
}
