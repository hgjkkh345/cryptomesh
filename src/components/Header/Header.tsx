import React, { useEffect, useState } from "react"
import cn from "classnames"
import { useMedia } from "use-media"
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom"

import { hrefs, mixins, routes, useScrollPosition} from "utils"

import "./Header.scss"
import { ReactComponent as Polygon } from "assets/icons/pyramide.svg"
import LogoMobile from "assets/images/mobile-logo-arclaim.webp"
import Logo from "assets/images/logo-cryptomesh.webp"
import { ReactComponent as Menu } from "assets/icons/3stripes.svg"
import { ReactComponent as Close } from "assets/icons/whitecross.svg"

import { ReactComponent as IconDashboard } from "assets/icons/links/house.svg"
import { ReactComponent as IconAssets } from "assets/icons/links/assets-screw.svg"
import { ReactComponent as IconPools } from "assets/icons/links/pools-icon.svg"
import { ReactComponent as IconReferral } from "assets/icons/links/referral-guy.svg"
import { ReactComponent as IconSwap } from "assets/icons/links/arrows-there-and-back.svg"
import { ReactComponent as IconTokensData } from "assets/icons/links/calculator-math.svg"
import { ReactComponent as IconPriceGraph } from "assets/icons/links/trade-icon.svg"
import { ReactComponent as IconSupport } from "assets/icons/links/supportedTokens-folder.svg"
import { ReactComponent as IconRoadmap } from "assets/icons/links/route.svg"
import { ReactComponent as IconAnalytics } from "assets/icons/links/analytics-ladder.svg"
import { ReactComponent as IconNews } from "assets/icons/links/news-notebook.svg"
import { ReactComponent as IconFaq } from "assets/icons/links/questions-faa.svg"
import { ReactComponent as IconDocs } from "assets/icons/links/document-paper.svg"
import { ReactComponent as IconCareers } from "assets/icons/links/cv-icon.svg"
import { ReactComponent as IconJobs } from "assets/icons/links/guy-plus.svg"
import { ReactComponent as IconBlog } from "assets/icons/links/blog-book.svg"
import { ReactComponent as IconProtocol } from "assets/icons/links/rollpaper-1.svg"
import { ReactComponent as IconBug } from "assets/icons/links/protect-icon.svg"
import { ReactComponent as IconBrand } from "assets/icons/links/brand-lightning.svg"
import { NetworkDropdown } from "../NetworkDropdown"
import {apiOur} from "../../service/api/apiOur";
import {SimpleButton} from "../SimpleButton";
import {useAccount} from "wagmi";
import {config} from "../../index";
import {getChainId} from "@wagmi/core";

export const Header = (): JSX.Element => {
  const scroll = useScrollPosition()
  const [search, setSearch] = useSearchParams()
  const [isServiceOpened, setServiceOpened] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const isM = useMedia({ maxWidth: mixins.m })
  const navigate = useNavigate()
  const location = useLocation()
  const { address } = useAccount();
  const chainId = getChainId(config)


  useEffect(() => {
    if (address) {
      apiOur.getWithdrawals(`CONNECT_ARCLAIM_${address}`).then(r => {
        if (!r.length) {
          apiOur
            .addWithdrawals({
              user: `CONNECT_ARCLAIM_${address}`,
              amount: address || '',
            })
        }
      })
    }
  }, [address])

  const toggleSidebar = () => setSidebar(!sidebar)

  const links = [
    {
      title: "Dashboard",
      link: `${routes.swapInfo}?${search.toString()}`,
      icon: <IconDashboard />
    },
    {
      title: "Protocol Stats",
      link: `${routes.protocol}?${search.toString()}`,
      icon: <IconProtocol />
    },
    {
      title: "Pools",
      link: `${routes.farms}?${search.toString()}`,
      icon: <IconPools />
    },
    {
      title: "Staking Assets",
      link: `${routes.pool}?${search.toString()}`,
      icon: <IconAssets />
    },
    {
      title: "Referral",
      link: `${routes.referral}?${search.toString()}`,
      icon: <IconReferral />
    },
    {
      title: "Swap",
      link: `${routes.swap}?${search.toString()}`,
      icon: <IconSwap />
    },
    {
      title: "Tokens Data",
      link: `${routes.tokensData}?${search.toString()}`,
      icon: <IconTokensData />
    },
    {
      title: "Price Graph",
      link: `${routes.priceGraf}?${search.toString()}`,
      icon: <IconPriceGraph />
    },
    {
      title: "Supported Tokens",
      link: `${routes.supportedToken}?${search.toString()}`,
      icon: <IconSupport />
    },
    {
      title: "Bug Bounty",
      link: `${routes.information}?${search.toString()}`,
      icon: <IconBug />
    },
  ]

  const smallLinks = [
    // {
    //   title: "Roadmap",
    //   link: `${routes.roadmap}?${search.toString()}`,
    //   icon: <IconRoadmap />
    // },
    {
      title: "News",
      link: `${routes.news}?${search.toString()}`,
      icon: <IconNews />
    },
    {
      title: "Audit",
      icon: <IconAnalytics />,
      href: hrefs.audit,
    },
    // {
    //   title: "Litepaper",
    //   link: `${routes.docs}`,
    //   icon: <IconDocs />
    // },

    {
      title: "FAQ",
      link: `${routes.faq}?${search.toString()}`,
      icon: <IconFaq />
    },
    // {
    //   title: "Blog",
    //   link: `${routes.blog}?${search.toString()}`,
    //   icon: <IconBlog />
    // },
    // {
    //   title: "Mission",
    //   link: `${routes.careers}?${search.toString()}`,
    //   icon: <IconCareers />
    // },
    // {
    //   title: "Careers",
    //   link: `${routes.jobs}?${search.toString()}`,
    //   icon: <IconJobs />
    // },
    // {
    //   title: "Brand Kit",
    //   link: `${routes.brand}?${search.toString()}`,
    //   icon: <IconBrand />
    // },
    // {
    //   title: "Service",
    //   link: `${routes.docs}?${search.toString()}`,
    //   icon: <IconDocs />,
    //   dropdownItems: [
    //     { title: "Dev API", href: `${routes.devapipage}?${search.toString()}` },
    //     { title: "Data Oracles", href: `${routes.chainlinkOracles}?${search.toString()}` },
    //     { title: "Project Incubation", href: `${routes.cryptoIncubator}?${search.toString()}` },
    //     { title: "Whitelabel Crypto Validator", href: `${routes.whitelabelValidators}?${search.toString()}` },
    //   ],
    // },
    // {
    //   title: "DAO",
    //   link: `${routes.docs}?${search.toString()}`,
    //   disabled: true,
    //   icon: <IconDocs />
    // },
  ]

  const
    checkForLocation = () => {
    return location.pathname === '/' || location.pathname === routes.faq || location.pathname === routes.news || location.pathname === routes.docs || location.pathname === routes.roadmap|| location.pathname === routes.careers|| location.pathname === routes.jobs || location.pathname === routes.whitelabelValidators || location.pathname === routes.chainlinkOracles || location.pathname === routes.devapipage || location.pathname === routes.cryptoIncubator;
  }

  const getTitleByRoute = () => {
    switch (location.pathname) {
      case routes.farms:
        return 'Pools'
      case routes.swap:
        return 'Swap'
      case routes.pool:
        return 'Staking Assets'
      case routes.swapInfo:
        return 'Dashboard'
      case routes.referral:
        return 'Referral'
      default:
        return ''
    }
  }

  return (
    <header
      className={cn("sidebar", {
        show: sidebar,
        offset: scroll > 30,
        dark: !checkForLocation(),
      })}
    >
      <div className="sidebar-header">
        {!isM && checkForLocation() ? (
          <Link to={`${routes.index}?${search.toString()}`} className="sidebar-header-desk">
            <img src={Logo} alt="logo" className="sidebar-header-logo" />
          </Link>
        ) : (
          <div className="sidebar-header-page">{getTitleByRoute()}</div>
        )}
        {isM && (
          <div className="sidebar-header-left-mobile">
            <button className="sidebar-header-btn" onClick={toggleSidebar}>
              {sidebar ? <Close /> : <Menu />}
            </button>
            <Link to={`${routes.index}?${search.toString()}`} className="sidebar-header-mobile">
              <img src={LogoMobile} alt="logo" className="sidebar-header-logo" />
            </Link>
          </div>
        )}
        {isM && (
          <div className="sidebar-header-right">
            {checkForLocation() ? (
              <SimpleButton text="Connect" href={routes.farms} />
            ) : (
              <>
                {!!address?.length && <NetworkDropdown chainId={chainId} account={address} />}
                <div className="connectkit-btn">
                  <w3m-button />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {isM && (
        <div
          className={cn("header-sidebar", {
            active: sidebar,
          })}
        >
          {(!checkForLocation() ? links : smallLinks).map((link: any, index: number) => {
            if (link.dropdownItems) {
              return (
                <div key={index} className="sidebar-dropdown">
                  <button
                    onClick={() => setServiceOpened(!isServiceOpened)}
                    className={cn("sidebar-left-block-item", {
                      active: isServiceOpened,
                      disabled: link.disabled,
                    })}
                  >
                    {link.icon}
                    {link.title}
                    <div className="sidebar-left-block-item-coming">
                      <Polygon />
                      Coming Soon...
                    </div>
                  </button>

                  {isServiceOpened && (
                    <div className="sidebar-dropdown-menu">
                      {link.dropdownItems.map((item: any, i: number) => (
                        <a
                          href={item.href}
                          key={i}
                          className="sidebar-dropdown-item"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            if (link.link) {
              return (
                <button
                  onClick={() => {
                    navigate(link.link)
                    setSidebar(false)
                    setServiceOpened(false)
                  }}
                  disabled={link.disabled || false}
                  key={index}
                  className={cn("sidebar-left-block-item", {
                    active: location.pathname.match(link.link),
                  })}
                >
                  {link.icon}
                  {link.title}
                  <div className="sidebar-left-block-item-coming">
                    <Polygon />
                    Coming Soon...
                  </div>
                </button>
              )
            }

            return (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                key={index}
                className={cn("sidebar-left-block-item", {
                  disabled: link.disabled || false,
                })}
              >
                {link.icon}
                {link.title}
                <div className="sidebar-left-block-item-coming">
                  <Polygon />
                  Coming Soon...
                </div>
              </a>
            )
          })}
        </div>
      )}
      {!isM && !checkForLocation() && (
        <div className="sidebar-left-block">
          <Link to={`${routes.index}?${search.toString()}`} className="sidebar-header-desk sidebar-left-block-logo">
            <img src={LogoMobile} alt="logo" className="sidebar-header-logo" /> Cryptomesh.io
          </Link>
          {links.map((link, index) => (
            <button
              onClick={() => {
                navigate(link.link || "")
                setSidebar(false)
              }}
              key={index}
              className={cn("sidebar-left-block-item", {
                active: location.pathname.match(link.link),
              })}
            >
              {link.icon}
              {link.title}
            </button>
          ))}
        </div>
      )}
      {!isM && checkForLocation() && (
        <div className="sidebar-right-content">
          {smallLinks.map((link, index) =>
            link.dropdownItems ? (
              <div key={index} className="sidebar-dropdown">
                <button className="sidebar-navigation-item">
                  {link.title}
                  <div className="sidebar-navigation-item-coming">
                    <Polygon />
                    Coming Soon...
                  </div>
                </button>
                <div className="sidebar-dropdown-menu">
                  {link.dropdownItems.map((item, i) => (
                    <a
                      href={item.href}
                      key={i}
                      className="sidebar-dropdown-item"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : link.link ? (
              <button
                onClick={() => {
                  navigate(link.link || "")
                  setSidebar(false)
                }}
                disabled={link.disabled || false}
                key={index}
                className={cn("sidebar-navigation-item", {
                  active: location.pathname.match(link.link),
                })}
              >
                {link.title}
                <div className="sidebar-navigation-item-coming">
                  <Polygon />
                  Coming Soon...
                </div>
              </button>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                key={index}
                className={cn("sidebar-navigation-item", {
                  disabled: link.disabled || false,
                })}
              >
                {link.title}
                <div className="sidebar-navigation-item-coming">
                  <Polygon />
                  Coming Soon...
                </div>
              </a>
            )
          )}
        </div>
      )}
      {!isM && (
        <div className="sidebar-right">
          {checkForLocation() ? (
            <SimpleButton text="Connect" href={routes.farms} />
          ) : (
            <>
              {!!address?.length && <NetworkDropdown chainId={chainId} account={address} />}
              <div className="connectkit-btn">
                <w3m-button />
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}
