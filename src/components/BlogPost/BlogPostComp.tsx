import "./BlogPostComp.scss"
import {SimpleButton} from "../SimpleButton";
import {Link} from "react-router-dom";

type Props = {
  article: any
}

export const BlogPostComp = ({article}:Props): JSX.Element => {
  return (
    <div className="blog-post">
      <Link to={article.id}>
        <img src={article.image} alt='blog'/>
      </Link>
      <dl>
        <dt>{article.title}</dt>
        <dd dangerouslySetInnerHTML={{__html: article.text}} />
      </dl>
      <div className='blog-post-footer'>
        <div className='blog-post-footer-date'>{article.date}</div>
      </div>
      <SimpleButton text="Read more" href={article.id} variant='outlined' />
    </div>
  )
}
