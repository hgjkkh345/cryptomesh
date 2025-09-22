import React from "react"

import img1 from "assets/icons/investors-logos/shima-full.svg"
import img2 from "assets/icons/investors-logos/mapleblack-full.svg"
import img3 from "assets/icons/investors-logos/mirana-full.svg"
import img4 from "assets/icons/investors-logos/bixin-full.svg"
import img5 from "assets/icons/investors-logos/spartan-full.svg"
import img6 from "assets/icons/investors-logos/ld-capital-full.svg"
import img7 from "assets/icons/investors-logos/jsquare-full.svg"
import img8 from "assets/icons/investors-logos/dfg-full.svg"
import img9 from "assets/icons/investors-logos/via-btc-full.svg"
import img10 from "assets/icons/investors-logos/binance-full.svg"
import "./Investors.scss"
import {InfinityScroll} from "../InfinityScroll";

export const investors = [
  {
    link: img1,
    height: 60,
    width: 302,
    name: 'Shima Capital'
  },
  {
    link: img2,
    height: 60,
    width: 387,
    name: 'Mapleblock'
  },
  {
    link: img3,
    height: 60,
    width: 402,
    name: 'Mirana'
  },
  {
    link: img4,
    height: 60,
    width: 330,
    name: 'Bixin Ventures'
  },
  {
    link: img5,
    height: 60,
    width: 240,
    name: 'Spartan'
  },
  {
    link: img6,
    height: 60,
    width: 302,
    name: 'LD Capital'
  },
  {
    link: img7,
    height: 60,
    width: 232,
    name: 'Jsquare'
  },
  {
    link: img8,
    height: 60,
    width: 160,
    name: 'DFG'
  },
  {
    link: img9,
    height: 60,
    width: 150,
    name: 'ViaBTC Capital'
  },
]

export const Investors = (): JSX.Element => {
  return (
    <div className="investors">
      <h3 data-aos="fade-up" className="investors-title">Our Investors</h3>
      <div data-aos="fade-up-right" className="investors-content">
        <InfinityScroll items={investors}/>
      </div>
    </div>
  )
}
