import { ReactChild, useRef, useState } from "react"
import cn from "classnames"

import { ReactComponent as ArrowIcon } from "assets/icons/collapse-bird-down.svg"
import "./Collapse.scss"
import { useClickOutside } from "utils"

type Props = {
  desc: string | ReactChild
  title: string | ReactChild
  height?: number
  opened?: boolean
}

export const Collapse = ({ desc, title, opened = false, height = 60 }: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(opened)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside(wrapperRef, () => {
    if (!opened) {
      setIsOpen(false)
    }
  })

  return (
    <div
      ref={wrapperRef}
      style={{ minHeight: height }}
      className={cn("collapse-wrapper", {
        open: isOpen,
      })}
    >
      <button ref={titleRef} type="button" onClick={toggleOpen} className="collapse-title">
        {title}
        <ArrowIcon className="collapse-arrow" />
      </button>
      <div className="collapse-content">
        <div className="collapse-content-desc">{desc}</div>
      </div>
    </div>
  )
}
