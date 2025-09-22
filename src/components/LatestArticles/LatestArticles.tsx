import React from "react"
import "./LatestArticles.scss"
import { OurLatestArticles } from "./data"

export const LatestArticles = (): JSX.Element => {
  return (
    <div className="latest-articles">
      <h1 className="latest-articles-title">Our Latest Articles</h1>
      <p className="latest-articles-desc">Stay informed with Cryptomesh.io’s latest articles. Explore in-depth analyses, industry trends, and expert perspectives on blockchain technology, node management, staking, and more. Our articles aim to empower you with the knowledge needed to navigate the ever-evolving landscape of decentralised technologies.</p>

      <div className="latest-articles-line">
        {OurLatestArticles.map((article, index) => (
          <div className="latest-articles-item" key={index}>
            <img className="LeftArticleImage" src={article.image} alt='swap'/>
            <div className="RightArticleBlock">
              <h1 className="RightArticleTitle"> {article.title}</h1>
              <p className="RightArticleDesc"> {article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="OurArticleButton">View All</button>
    </div>
  )
}
