import cn from "classnames"
import { ReactChild, useState } from "react"

import "./Input.scss"
import { ReactComponent as SearchIcon } from "assets/icons/searchglass-icon.svg"
import { SimpleButton } from "../SimpleButton"

type Props = {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  className?: string
  append?: ReactChild
  label?: string | ReactChild
  type?: "text" | "number" | "email"
  required?: boolean
  variant?: "default" | "margin" | "search" | "dark"
  isError?: boolean
  withButton?: {
    onClick: () => void
    text: string
  }
}

export const Input = ({
  onChange,
  value,
  placeholder,
  className,
  append,
  type = "text",
  variant = "default",
  label,
  isError,
  withButton,
  required,
}: Props): JSX.Element => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={cn("custom-input-wrapper", className)}>
      {label && <div className="custom-input-label">{label}</div>}
      {variant === "search" && <SearchIcon className="custom-input-search" />}
      <input
        required={required}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChange={e => onChange(e.target.value)}
        value={value}
        type={type}
        placeholder={focused ? "" : placeholder}
        className={cn("custom-input", variant, {
          withAppend: append,
          isError: isError,
        })}
      />
      {withButton && (
        <SimpleButton
          text={withButton.text}
          onClick={withButton.onClick}
          disabled={!value?.length}
          className="custom-input-btn"
        />
      )}
      {append && <div className="custom-input-append">{append}</div>}
    </div>
  )
}
