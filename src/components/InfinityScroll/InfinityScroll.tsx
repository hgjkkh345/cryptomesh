import React from "react"
import cn from "classnames"
import { useMedia } from "use-media"

import "./InfinityScroll.scss"
import { mixins } from "../../utils"

type Props = {
  items: {
    link: string
    width: number
    height: number
  }[]
  className?: string
  revert?: boolean
}

export const InfinityScroll = ({ className, items, revert = true }: Props): JSX.Element => {
  const isL = useMedia({ maxWidth: mixins.l })
  const isM = useMedia({ maxWidth: mixins.m })

  const getValue = (value: number) => {
    if (isM) {
      return `${value / 1.5}px`
    }
    if (isL) {
      return `${value / 2}px`
    }

    return `${value}px`
  }

  return (
    <div
      className={cn("carousel__wrapper", className, {
        revert: revert,
      })}
    >
      <div className="carousel__wrapper-ticker">
        <div className="carousel__wrapper-content">
          {items.map((item, index) => (
            <div
              style={{
                minWidth: item.width,
                height: item.height,
              }}
              key={index}
              className="slide"
            >
              <img src={item.link} alt="highlight" className="slide-img"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
