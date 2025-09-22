import React from "react"
import "./TailoredSolutions.scss"
import cn from "classnames"

type Props = {
  title?: string
  data: {
    desc: string
    image: string
    titledesc?: string
  }[]
  variant?: 'for-dev-api'| 'for-crypto-incubator'
}

export const TailoredSolutions = ({ title, data, variant }: Props): JSX.Element => {
  return (
      <div className={cn("tailored-solutions", {
        "tailored-solutions-for-dev-api": variant === 'for-dev-api',
        "tailored-solutions-for-crypto-incubator": variant === 'for-crypto-incubator',
      })}>
      {title && <h1 dangerouslySetInnerHTML={{__html: title}} className="tailored-solutions-title" />}
      <div className="tailored-solutions-content">
        {data.map((item, index) => (
          <div key={index} className="tailored-solutions-content-item">
            <img className="tailored-solutions-image" src={item.image} alt='swap'/>
            {item.titledesc && <h2 className="tailored-solutions-titledesc">{item.titledesc}</h2>}
            <p className="tailored-solutions-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
