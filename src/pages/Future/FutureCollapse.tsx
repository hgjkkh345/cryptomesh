import React, {ReactChild, useEffect, useRef, useState} from "react"
import cn from "classnames"

import { useClickOutside } from "utils"
import imgArrowSrc from "../../assets/icons/arrow-grey.svg";

type Props = {
  job: any
  height?: number
  opened?: boolean
}

export const FutureCollapse = ({ height = 60, job, opened }: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(opened)
  }, [opened])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside(wrapperRef, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  return (
    <div
      ref={wrapperRef}
      style={{ minHeight: height }}
      className={cn("future-collapse-wrapper", {
        open: isOpen,
      })}
    >
      <button ref={titleRef} type="button" onClick={toggleOpen} className="future-job">
        <div className='future-job-left'>
          <h5>{job.title}</h5>
          <p>{job.place}</p>
        </div>
        <img src={imgArrowSrc} alt='arrow'/>
      </button>
      <div className="future-collapse-content">
        <div className="future-collapse-content-desc" dangerouslySetInnerHTML={{ __html: job.desc }} />
      </div>
    </div>
  )
}
