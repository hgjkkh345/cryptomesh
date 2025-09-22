import React, {useEffect, useState} from "react"

import "./Leverage.scss"
import {LeverageItem} from "./LeverageItem";
import {getFromLocalStorage, useScrollPosition} from "../../utils";
import {preloadData} from "../../pages/SwapInfo/preloadData";

export const Leverage = (): JSX.Element => {
  const [ourTvlData, setOurTvlData] = useState<any[]>([])

  const blocks = [
    {
      title: 351659,
      desc: 'Profit Reward',
    },
    {
      title: 22664010,
      desc: 'Total Value Locked',
    },
    {
      title: 1758,
      desc: 'Users',
    },
    {
      title: 3,
      desc: 'Network',
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
      <h3 className="leverage-title">Empower Your Investments with Innovative
        Staking Platform</h3>
      <div className="leverage-content">
        {blocks.map((block, index) => (
          <LeverageItem title={block.title} desc={block.desc} key={index}/>
        ))}
      </div>
    </div>
  )
}
