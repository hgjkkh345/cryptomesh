import React, {useEffect, useState} from "react"

import "./Leverage.scss"
import {LeverageItem} from "./LeverageItem";
import {getFromLocalStorage, useScrollPosition} from "../../utils";
import {preloadData} from "../../pages/SwapInfo/preloadData";

export const Leverage = (): JSX.Element => {
  const [ourTvlData, setOurTvlData] = useState<any[]>([])

  const blocks = [
    {
      title: 203197543,
      desc: 'Total Value Locked',
    },
    {
      title: 14000,
      desc: 'Users',
    },
    {
      title: 10,
      desc: 'Network',
    },
    {
      title: 5905951,
      desc: 'Profit Reward',
    },

  ]

  useEffect(() => {
    if (localStorage.getItem("swapData") !== null) {
      return setOurTvlData(getFromLocalStorage("swapData"))
    }

    setOurTvlData(preloadData)
  }, [])


  return (
    <div data-aos="fade-up" className="leverage">
      <h3 className="leverage-title">Take Control of Your Assets with an Innovative Staking Platform</h3>
      <div className="leverage-content">
        {blocks.map((block, index) => (
          <LeverageItem title={block.title} desc={block.desc} key={index}/>
        ))}
      </div>
    </div>
  )
}
