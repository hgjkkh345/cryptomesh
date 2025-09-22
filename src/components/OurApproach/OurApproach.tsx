import React from "react"
import "./OurApproach.scss"
import { OurApproachdata } from "./data"




export const OurApproach = (): JSX.Element => {
  return (
    <div className="our-approach">
      <h1 className="our-approach-title">Our <span>Approach</span></h1>
      <div className="our-approach-line">
        {OurApproachdata.map((item, index) => (
          <div className="our-approach-item" key={index}>
            <div className="our-approach-item-title-image">
              <h1 className="approach-title"> {item.title}</h1>
              <img className="approach-image" src={item.image} alt='swap'/>
            </div>
            <div className="approach-decs-block">
              <p className="approach-decs"> {item.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
