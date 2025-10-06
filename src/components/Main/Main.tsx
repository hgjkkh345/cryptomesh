import React from "react"

import "./Main.scss"
import {  useSearchParams } from "react-router-dom"
import { routes } from "../../utils"
import { useMedia } from "use-media"
import srcPath from "assets/pdfs/cryptomesh-pdf2.pdf"
import {SimpleButton} from "../SimpleButton";
import { TypeAnimation } from 'react-type-animation';

export const Main = (): JSX.Element => {
  const [search] = useSearchParams()
  const isM = useMedia({ maxWidth: 1200 })

  return (
    <main className="main animate__animated animate__fadeInLeft">
      <h1 className="main-left-title">
        Discover Endless Possibilities with Cryptomesh: Your Trusted Gateway to Decentralized Staking, Powered by
        {" "}
        <div className="main-left-title-animate">
          <TypeAnimation
            sequence={["Secure", 2000, "Intelligent", 2000]}
            wrapper="span"
            speed={30}
            className="type"
            repeat={Infinity}
          />
        </div>{" "}
        Smart Contracts.
      </h1>
      <p className="main-left-desc">
        Powered by our robust smart contracts.
        Stake, Earn, Soar with Cryptomesh
      </p>
      <div className="main-left-buttons">
        <SimpleButton text="Stake Now" href={`${routes.farms}?${search.toString()}`} />
        {isM ? (
          <a download href={srcPath} className="main-left-buttons-item right">
            Read docs
          </a>
        ) : (
          <SimpleButton variant='outlined' text='Litepaper' href={`${routes.docs}?${search.toString()}`} />
        )}
      </div>
    </main>
  )
}
