import React, {useEffect, useState} from "react"
import {Footer, Header, investors, Loading, SimpleButton} from "components"
import ReactPageScroller from 'react-page-scroller';

import "./Job.scss"
import {jobs} from "../Future/jobs";
import {Link} from "react-router-dom";
import {routes} from "../../utils";
export const Job = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [tabActive, setTabActive] = useState(0)

  const handlePageChange = (page: number) => {
    setTabActive(page);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="job">
      {loading && <Loading/>}
      <Header/>
      <div className="job-content">
        <ReactPageScroller pageOnChange={handlePageChange} containerHeight="82vh">
          <div className="job-content-block">
            <h1 className={tabActive === 0 && 'active'}>Jobs</h1>
            <div className='job-content-block-items'>
              <p>Open roles at Cryptomesh.io:</p>
              {jobs.map((item, index) => (
                <Link key={index} to={`${routes.careers}?job=${item.id}`} className='job-content-block-item'>
                  {item.title}, {item.place}
                </Link>
              ))}
            </div>
          </div>
          <div className="job-content-block">
            <h1 className={tabActive === 1 && 'active'}>Investors</h1>
            <div className='job-content-block-items'>
              <p>Investors in Cryptomesh.io:</p>
              <div className='job-content-block-investors'>
                {investors.map((item, index) => (
                  <div key={index} className='job-content-block-item'>
                    <p>{item.name}</p>
                    <img src={item.link} alt='investor'/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReactPageScroller>
      </div>
    </div>
  )
}
