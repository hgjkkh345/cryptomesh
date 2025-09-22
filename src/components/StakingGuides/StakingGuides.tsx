import React from "react"
import "./StakingGuides.scss"
import { StakingGuidesData } from "./data"

export const StakingGuides = (): JSX.Element => {
  return (
    <div className="staking-guides">
      <h1 className="staking-guides-title">Staking Guides</h1>


      <div className="latest-guides-line">
        {StakingGuidesData.map((article, index) => (
          <div className="latest-guides-item" key={index}>
            <img className="LeftStakingGuidesImage" src={article.image} alt='swap'/>
            <div className="RightGuidesBlock">
              <h1 className="RightGuidesTitle"> {article.title}</h1>
              <p className="RightGuidesDesc"> {article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="OurGuidesButton">View All</button>
    </div>
  )
}
