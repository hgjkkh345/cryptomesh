import React from "react"
import "./Code.scss"
import srcCodeImage from 'assets/images/code-screen.webp'
import img1Src from "../../assets/images/cryptomesh-swap-screen.webp";
import {SimpleButton} from "../SimpleButton";
import {hrefs, routes} from "../../utils";

export const Code = (): JSX.Element => {
  return (
    <div className="code">
      <div data-aos="fade-right" className='code-left'>
        <h3>Apply algorithms for best Rewards.</h3>
        <p>
          Cryptomesh utilizes sophisticated algorithms to maximize staking rewards by analyzing market conditions and optimizing staking strategies in real-time
        </p>
        <img src={img1Src} alt='swap'/>
      </div>
      <div data-aos="fade-left" className='code-right'>
        <img src={srcCodeImage} alt='code'/>
        <h3>Secure</h3>
        <p data-aos="fade-up-right" className="swap-home-desc">
          Security is paramount for DeFi and embedded in Cryptomesh DNA. Securely execute interchain strategies with noncustodial vaults - your keys, your crypto. Cryptomesh software is audited by InterFi Network.
          <br/>
          <br/>
          Securely execute interchain strategies with noncustodial vaults - your keys, your crypto.
          <br/>
        </p>
        <div className="button-line">
          {/*<SimpleButton text='Github' href={hrefs.audit}/>*/}
          <SimpleButton className='simple-button-first' text='Audit' href={hrefs.audit}/> </div>
      </div>
    </div>
  )
}
