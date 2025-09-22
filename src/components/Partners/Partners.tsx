import React from "react"

import img1 from "assets/icons/partnersLogos/polygon-partner.svg"
import img2 from "assets/icons/partnersLogos/chainLink-partner.svg"
import img3 from "assets/icons/partnersLogos/fantom-partner.svg"
import img4 from "assets/icons/partnersLogos/dydx-partner.svg"
import img5 from "assets/icons/partnersLogos/debank-partner.svg"
import img6 from "assets/icons/partnersLogos/thompson-partner.svg"
import img7 from "assets/icons/partnersLogos/coingecko-partner.svg"
import img9 from "assets/icons/partnersLogos/opt-partner.svg"
import img10 from "assets/icons/partnersLogos/manta-partner.svg"
import img11 from "assets/icons/partnersLogos/arb-partner.svg"
import img12 from "assets/icons/partnersLogos/base-partner.svg"
import img13 from "assets/icons/partnersLogos/bnb-partner.svg"
import img14 from "assets/icons/partnersLogos/coinmarket-partner.svg"
import img15 from "assets/icons/partnersLogos/binance-partner.svg"
import "./Partners.scss"
import {InfinityScroll} from "../InfinityScroll";

export const Partners = (): JSX.Element => {
  const partners = [
    {
      link: img1,
      width: 241,
      height: 60,
    },
    {
      link: img2,
      width: 215,
      height: 60,

    },
    {
      link: img3,
      width: 280,
      height: 60,

    },
    {
      link: img4,
      width: 170,
      height: 60,

    },
    {
      link: img5,
      width: 200,
      height: 60,

    },
    {
      link: img6,
      width: 187,
      height: 60,

    },
    {
      link: img7,
      width: 198,
      height: 60,

    },
    {
      link: img9,
      width: 220,
      height: 60,
    },
    {
      link: img10,
      width: 210,
      height: 60,
    },
    {
      link: img11,
      width: 240,
      height: 60,
    },
    {
      link: img12,
      width: 210,
      height: 60,
    },
    {
      link: img13,
      width: 210,
      height: 60,
    },
    {
      link: img14,
      width: 300,
      height: 60,
    },
  ]
  return (
    <div className="partners">
      <div data-aos="fade-up" className="partners-header">
        <h3 className="partners-title">Working together<br/>
          with partners</h3>
        <p className="partners-desc">
          Partners from various industries trust us and help us to create a
          reliable ecosystem that benefits both individuals and businesses
        </p>
      </div>
      <div data-aos="fade-up-left" className="partners-content">
        <InfinityScroll items={partners}/>
      </div>
    </div>
  )
}
