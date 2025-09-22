import React, {useEffect, useState} from "react"
import {Footer, Header, Loading, SimpleButton} from "components"
import imgMainSrc from "assets/images/smart-guys.webp"
import imgFutureBgSrc from "assets/images/future-back-dots.webp"
import img1Src from "assets/icons/careers/heart1.svg"
import img2Src from "assets/icons/careers/cola-burger.svg"
import img3Src from "assets/icons/careers/boeing.svg"
import img4Src from "assets/icons/careers/ladder.svg"
import img5Src from "assets/icons/careers/health-shield.svg"
import img6Src from "assets/icons/careers/meditation.svg"
import imgBgSrc from "assets/icons/careers/back-plaid.svg"

import "./Future.scss"
import cn from "classnames";
import {jobs} from "./jobs";
import {FutureCollapse} from "./FutureCollapse";
import {useSearchParams} from "react-router-dom";
import {scrollToElement} from "../../utils";

const tabs = ['All', 'Design', 'Engineering']

export const Future = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('All')
  const [localJobs, setLocalJobs] = useState(jobs)
  const [currentOpen, setCurrentOpen] = useState('')
  const [search] = useSearchParams()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!!search.get("job")?.length) {
      scrollToElement('jobs')
      console.log(search.get("job"))
      setCurrentOpen(search.get("job"))
    }
  }, [search])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (tab === 'All') {
      setLocalJobs(jobs)
    }
    if (tab === 'Engineering') {
      setLocalJobs(jobs.filter(i => i.type === 'Engineering'))
    }
    if (tab === 'Design') {
      setLocalJobs(jobs.filter(i => i.type === 'Design'))
    }
  }, [tab])


  const onClickAbout = () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    })
  }
  const onClickBottom = () => {
    scrollToElement('jobs')
  }

  const options = [
    {
      title: 'Health',
      icon: img1Src,
      desc: 'We offer top-tier health, dental, and\n' +
        'vision insurance.',
    },
    {
      title: 'Food',
      icon: img2Src,
      desc: 'Enjoy fully catered lunch and snacks\n' +
        'every day each week.',
    },
    {
      title: 'Vacation',
      icon: img3Src,
      desc: 'Take as much time off as you need to be productive.',
    },
    {
      title: 'Ownership',
      icon: img4Src,
      desc: 'Meaningful equity and competitive\n' +
        'compensation.',
    },
    {
      title: 'Wellness',
      icon: img5Src,
      desc: 'Monthly fitness, wellness, and gym\n' +
        'reimbursements.',
    },
    {
      title: 'Relaxation',
      icon: img6Src,
      desc: 'Events, offsites, and board game\n' +
        'nights with the team!',
    },
  ]

  return (
    <div className="future">
      {loading && <Loading/>}
      <Header/>
      <div className="future-content">
        <div className='future-content-main'>
          <div className='future-content-main-left'>
            <h1>Build for the future</h1>
            <p>
              We’re one of the world’s leading decentralized staking platform.<br/>
              Join us on our mission to democratize access to financial opportunity.
            </p>
            <div className='future-content-main-left-btns'>
              <SimpleButton text="View open roles" onClick={onClickBottom}/>
              <SimpleButton text="About us" variant='outlined' onClick={onClickAbout}/>
            </div>
          </div>
          <img src={imgMainSrc} alt="family" className='future-content-main-right-img'/>
        </div>
        <div className='future-content-blocks'>
          <div className='future-content-blocks-item' style={{backgroundImage: `url(${imgFutureBgSrc})`}}>
            <h3>Immediate Impact</h3>
            <p>
              We want to build technology that is
              impactful and useful today. We are part of
              the first generation of decentralized
              financial tools, accessible to everyone.
            </p>
          </div>
          <div className='future-content-blocks-item' style={{backgroundImage: `url(${imgFutureBgSrc})`}}>
            <h3>Incredible people</h3>
            <p>
              We do our best work when we are happy.
              You will join a team of optimistic thinkers,
              who are equipped with the talent and
              capabilities to change the world.
            </p>
          </div>
          <div className='future-content-blocks-item' style={{backgroundImage: `url(${imgFutureBgSrc})`}}>
            <h3>Cutting-edge tech</h3>
            <p>
              We are implementing first-of-its-kind ideas
              at every layer of the product stack, from
              frontend engineering to smart contract
              design. Learn with us!
            </p>
          </div>
        </div>
        <div className='future-content-blocks-2'>
          {options.map((i, index) => (
            <div key={index} className='future-content-blocks-2-item'>
              <div className='future-content-blocks-2-item-icon'>
                <img src={i.icon} alt={i.title}/>
              </div>
              <div>
                <h5>{i.title}</h5>
                <p>{i.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/*<h2>*/}
        {/*  Press*/}
        {/*</h2>*/}
        {/*<p className='future-desc'>*/}
        {/*  Recent highlights from mainstream news outlets.*/}
        {/*</p>*/}
        {/*<div className='future-content-blocks-3'>*/}
        {/*  <div className='future-content-blocks-3-item' style={{backgroundImage: `url(${imgBgSrc})`}}>*/}
        {/*    <h3>Digital Journal</h3>*/}
        {/*    <p>*/}
        {/*      Cryptomesh.io secured $4 million in seed funding, marking a key moment as it gains investor trust and drives DeFi innovation.*/}
        {/*    </p>*/}
        {/*    <a href='https://www.digitaljournal.com/pr/news/revupmarketer/bitstaker-secures-4-million-seed-1740095196.html' target='_blank' rel='nofollow noreferrer'>Read article →</a>*/}
        {/*  </div>*/}
        {/*  <div className='future-content-blocks-3-item' style={{backgroundImage: `url(${imgBgSrc})`}}>*/}
        {/*    <h3>Binance</h3>*/}
        {/*    <p>*/}
        {/*      Cryptomesh.io secured seed funding, boosting its growth and innovation in the DeFi staking market.*/}
        {/*    </p>*/}
        {/*    <a href='https://www.binance.com/en/square/post/13511364826689' target='_blank' rel='nofollow noreferrer'>Read article →</a>*/}
        {/*  </div>*/}
        {/*  <div className='future-content-blocks-3-item' style={{backgroundImage: `url(${imgBgSrc})`}}>*/}
        {/*    <h3>CoinMarketCap</h3>*/}
        {/*    <p>*/}
        {/*      In three weeks, Cryptomesh.io reached over $165 million in TVL, solidifying its place as a top DeFi staking platform with innovative tech.*/}
        {/*    </p>*/}
        {/*    <a href='https://coinmarketcap.com/community/articles/66def904ef79387705a9d114/' target='_blank' rel='nofollow noreferrer'>Read article →</a>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <h2>
          Open Roles
        </h2>
        <p className='future-desc'>
          Ready to make the jump? Join our team!
        </p>
        <div className="future-content-tabs">
          {tabs.map((i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={cn("future-content-tabs-item", {
                active: tab === i,
              })}
            >
              {i}
            </button>
          ))}
        </div>
        <div id="jobs">
          {localJobs.map((i, index) => (
            <FutureCollapse job={i} key={index} opened={i.id === currentOpen}/>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
