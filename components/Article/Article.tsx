import { url } from 'inspector';
import { article } from '../../types/types';
import styles from './Article.module.scss';

interface Props {
  article: article;
}

const Article: React.FC<Props> = (props) => {
  const { article } = props;
  return (
    <div className={styles.article}>
      <a href={article.url}>
        <div
          className={styles.article_image}
          style={{ backgroundImage: `url(${article.urlToImage})` }}
        ></div>
      </a>
      <h3>{article.title}</h3>
      <p>Source: {article.source.name}</p>
      <p>Author: {article.author}</p>
      <p>{article.description}</p>
    </div>
  );
};

export default Article;
