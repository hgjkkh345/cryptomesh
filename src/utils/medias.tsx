import React from "react"
import { hrefs } from "./sources"
import { ReactComponent as Telegram } from "assets/icons/tg-boeing.svg"
import { ReactComponent as Twitter } from "assets/icons/twitterbird.svg"
import cn from "classnames"

type Props = {
  className?: string
}

export const Medias = ({ className }: Props): JSX.Element => {
  const links = [
    {
      icon: <Twitter />,
      href: hrefs.twitter,
    },
    {
      icon: <Telegram />,
      href: hrefs.telegram,
    },
  ]

  return (
    <div className={cn("medias", className)}>
      {links.map((link, index) => (
        <a className="medias-item" rel="noopener noreferrer" target="_blank" href={link.href} key={index}>
          {link.icon}
        </a>
      ))}
    </div>
  )
}
