import React, { useEffect, useRef, useState } from "react"
import cn from "classnames"

import { ReactComponent as Arrow } from "assets/icons/arrow-bird-down.svg"
import "./ExpiresDropdown.scss"
import { useClickOutside } from "../../utils"

type Props = {
  activeValue: string
  setActiveValue: (value: string) => void
  mobileRight?: boolean
}

const options = [
  {
    label: "1 Minute",
    value: "1 minute",
  },
  {
    label: "10 Minutes",
    value: "10 minutes",
  },
  {
    label: "1 Hour",
    value: "1 hour",
  },
  {
    label: "1 Day",
    value: "1 day",
  },
  {
    label: "3 Days",
    value: "3 days",
  },
  {
    label: "7 Days",
    value: "7 days",
  },
  {
    label: "15 Days",
    value: "15 days",
  },
  {
    label: "30 Days",
    value: "30 days",
  },
  {
    label: "60 Days",
    value: "60 days",
  },
]

export const ExpiresDropdown = ({ activeValue, mobileRight, setActiveValue }: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const toggleDropdown = () => setOpen(!open)

  return (
    <div
      className={cn("expires-dropdown", {
        active: open,
        mobileRight: mobileRight,
      })}
    >
      <button onClick={toggleDropdown} className="expires-dropdown-trigger">
        <div className="expires-dropdown-trigger-desc">Expires in</div>
        <div className="expires-dropdown-trigger-name">{options.find(i => i.value === activeValue)?.label}</div>
        <Arrow />
      </button>
      <div className="expires-dropdown-content">
        {options.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveValue(item.value)
              toggleDropdown()
            }}
            className={cn("expires-dropdown-content-item", {
              active: item.value === activeValue,
            })}
          >
            <div className="expires-dropdown-content-item-name">{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
