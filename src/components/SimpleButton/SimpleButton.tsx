import cn from "classnames"

import "./SimpleButton.scss"
import { Link } from "react-router-dom"
import {ReactComponent as IconEye} from "assets/icons/white-eye.svg"

type Props = {
  variant?: "default" | "colored" | "outlined" | "border" | "yellow" | "danger" | "white"
  icon?: "default" | "eye"
  onClick?: () => void
  href?: string
  link?: string
  disabled?: boolean
  text: string
  className?: string
  type?: "button" | "submit"
  isLeft?: boolean
  withEffect?: boolean
}

export const SimpleButton = ({
  variant = "default",
  text,
  onClick,
  href,
  type = "button",
  disabled,
  className,
  isLeft,
  withEffect,
  link,
  icon
}: Props): JSX.Element => {

  const getIcon = () => {
    switch (icon) {
      case "eye":
        return <IconEye />
    }
  }

  if (!!link?.length) {
    return (
      <a
        href={link}
        rel="noreferrer"
        target='_blank'
        className={cn("simple-button", variant, className, {
          left: isLeft,
          effect: withEffect,
        })}
      >
        <div className='simple-button-overflow'>
          <div className='simple-button-first'>
            {text}
          </div>
          <div className='simple-button-end'>
            {text}
          </div>
        </div>
        {withEffect && <span className="auth-btn-flare"/>}
      </a>
    )
  }
  if (!!href?.length) {
    return (
      <Link
        to={href}
        className={cn("simple-button", variant, className, {
          left: isLeft,
          effect: withEffect,
        })}
      >
        <div className='simple-button-overflow'>
          <div className='simple-button-first'>
            {text}
          </div>
          <div className='simple-button-end'>
            {text}
          </div>
        </div>
        {withEffect && <span className="auth-btn-flare"/>}
      </Link>
    )
  }

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn("simple-button", variant, className, {
        left: isLeft,
        effect: withEffect,
      })}
    >
      { icon && getIcon() }
      <div className='simple-button-overflow'>
        <div className='simple-button-first'>
          {text}
        </div>
        <div className='simple-button-end'>
          {text}
        </div>
      </div>
      {withEffect && <span className="auth-btn-flare"/>}
    </button>
  )
}
