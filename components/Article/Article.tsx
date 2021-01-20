import { article } from '../../types/types';
import styles from './Article.module.scss';

interface Props {
  article: article;
}

const Article: React.FC<Props> = (props) => {
  const { article } = props;
  return (
    <div className={styles.article}>
      <h3>{article.title}</h3>
      <p>Source: {article.source.name}</p>
      <p>{article.description}</p>
    </div>
  );
};

export default Article;
