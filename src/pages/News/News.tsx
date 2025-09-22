import React, {useEffect, useState} from "react"
import {Header, Footer, Loading, NewsPreview, Input} from "components"

import "./News.scss"
import imgMainBgSrc from "assets/images/space-background.webp"
import {ReactComponent as Arrow} from "assets/icons/arrow-greybird-right.svg"
import {apiNews} from "../../service/api/apiNews";
import {INews} from "../../utils";
import useDebounce from "../../utils/useDebounce";

export const News = (): JSX.Element => {
  const [news, setNews] = useState<INews[]>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebounce(searchInput, 700)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setLoading(true)
    setNews([])
    apiNews.getGeneralNews(page+1, 24, debouncedSearchInput).then((r) => {
      setNews(r.data)
      setTotal(r.total_pages)
    }).finally(() => setLoading(false))
  }, [page, debouncedSearchInput])

  const onNextClick = () => {
    if (page === 4) {
      setPage(0)
    } else {
      setPage(page+1)
    }
  };

  const onPrevClick = () => {
    if (page === 0) {
      setPage(total > 4 ? 4 : total)
    } else {
      setPage(page-1)
    }
  };

  return (
    <div className="news" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      {loading && <Loading/>}
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>
      <div className="news-content">
        <h1 className="news-content-title">News</h1>
        <div className="news-content-filters">
          <Input onChange={v => setSearchInput(v)} value={searchInput} variant='search'
                 placeholder='Search for the article'/>
        </div>
        <div className="news-content-wrap">
          {news.map((item, index) => (
            <NewsPreview key={index} article={item}/>
          ))}
        </div>
        <div className='news-paginate'>
          <button className='news-paginate-btn' onClick={onPrevClick}>
            <Arrow />
          </button>
          <button className='news-paginate-btn' onClick={onNextClick}>
            <Arrow />
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
