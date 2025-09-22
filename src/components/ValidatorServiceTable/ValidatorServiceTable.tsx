import React from "react"
import "./ValidatorServiceTable.scss"
import cn from "classnames"

type Props = {
  title?: string
  desc: string
  image: string
  variant?: 'without-title'
}

export const ValidatorServiceTable = ({ title, desc, image, variant }: Props): JSX.Element => {
  return (
    <div className={cn("ValidatorServiceTable", {
      "ValidatorServiceTable-without-title": variant === 'without-title'
    })}>
      <img className="RightTableImage" src={image} alt='swap'/>
      <div className="validator-service-table-right">
        {title && <h1 className="TitleValidator">{title}</h1>}
        <p className="DescValidator">
          {desc}
        </p>
      </div>
    </div>
  )
}
