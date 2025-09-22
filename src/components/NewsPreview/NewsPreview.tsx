import "./NewsPreview.scss"
import {INews} from "../../utils";

type Props = {
  article: INews
}

export const NewsPreview = ({article}:Props): JSX.Element => {
  return (
    <a href={article.news_url} target="_blank" rel='noopener noreferrer' className="article">
      <img src={article.image_url} alt='news' />
      <dl>
        <dt>{article.title}</dt>
        <dd>{article.text}</dd>
      </dl>
      <div className='article-footer'>
        <div className='article-footer-source'>From &quot;{article.source_name}&quot;</div>
        <div className='article-footer-date'>{new Date(article.date).toDateString()}</div>
      </div>
    </a>
  )
}
