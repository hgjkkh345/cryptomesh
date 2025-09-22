import React, {useEffect, useState} from "react"
import {Footer, Header, Loading, SimpleButton} from "components"

import "./Blog.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import featuredSrc from "assets/images/twitter-arclaim-logo.webp"
import logoSrc from "assets/images/mobile-logo-arclaim.webp"
import {Link, useParams} from "react-router-dom";
import {blogData} from "./data";
import {BlogPostComp} from "../../components/BlogPost";
import cn from "classnames";

export const Blog = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<any>(null)
  const {id} = useParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  useEffect(() => {
    if (id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setBlog(blogData.find(i => i.id === id))
    }
  }, [id])

  return (
    <div className="blog" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {loading && <Loading/>}
      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain"
            currency="usd"
            dark-mode="true"
            locale="en"/>)
        }
      </div>
      {!id && (
        <div className="blog-content">
          <h1>About Cryptomesh.io</h1>
          <div className='blog-featured'>
            <img src={featuredSrc} alt='featured' className='blog-featured-img'/>
            <div className='blog-featured-content'>
              <h4 className='blog-featured-content-title'>Cryptomesh.io: Revolutionizing Staking in DeFi</h4>
              <p className='blog-featured-content-desc'>
                Cryptomesh.io is a next-generation decentralized finance (DeFi) platform that empowers users to earn high
                returns by staking their digital assets across multiple blockchain networks. We’ve built a secure,
                user-friendly environment where both novice and experienced crypto holders can easily stake a variety of
                tokens and maximize their earnings without the need for intermediaries.
              </p>
              <SimpleButton text='Read more' href='about' variant='outlined'/>
            </div>
          </div>
          <h1>Latest Articles</h1>
          <div className='blog-posts'>
            {blogData.slice(1).map((i, index) => (
              <BlogPostComp article={i} key={index} />
            ))}
          </div>
        </div>
      )}
      {(id && blog) && (
        <div className="blog-content">
          <img src={blog.image} alt='blog' className='blog-image-main'/>
          <h1>{blog.title}</h1>
          <div className='blog-author'>
            <img src={logoSrc} alt='logo' width={48}/>
            <div>
              <span className='blog-author-name'>Cryptomesh.io</span>
              {blog.date && <span className='blog-author-date'>{blog.date}</span>}
            </div>
          </div>
          <div className={cn('blog-page', id)} dangerouslySetInnerHTML={{__html: blog.text}} />
          <div className='blog-posts'>
            {blogData.slice(3, 6).map((i, index) => (
              <BlogPostComp article={i} key={index}/>
            ))}
          </div>
        </div>
      )}
      <Footer/>
    </div>
  )
}
