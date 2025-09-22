import React, {useEffect, useState} from "react"

import "./Leverage.scss"
import {animateNumber} from "../../utils/countToFunction";
import { useScrollPosition } from "../../utils"

type Props ={
  title: number
  desc: string
}

export const LeverageItem = ({title, desc}:Props): JSX.Element => {
  const scroll = useScrollPosition()
  const [displayNumber, setDisplayNumber] = useState(0)
  useEffect(() => {
      animateNumber(value => {
        setDisplayNumber(Math.floor(value))
      }, 0, title, 5000);
  }, [])

  return (
    <div className="leverage-content-item">
      <div className='leverage-content-item-right'>
        <div className="leverage-content-item-title">{displayNumber}+</div>
        <div className="leverage-content-item-desc">{desc}</div>
      </div>
    </div>
  )
}
