import Image from 'next/image';
import { article } from '../../types/types';
import styles from './Article.module.scss';

interface Props {
  article: article | undefined;
}

const Article: React.FC<Props> = (props) => {
  const { article } = props;
  const articleCard = (
    <div className={styles.article}>
      <a href={article?.url}>
        {/* <div
          className={styles.article_image}
          // style={{ backgroundImage: `url(${article?.urlToImage})` }}
        > */}
          <img src={article?.urlToImage!} alt='Article Image'/>
        {/* </div> */}
        <h3>{article?.title}</h3>
      </a>
      <p>Source: {article?.source.name}</p>
      <p>Author: {article?.author}</p>
      <p>{article?.description}</p>
    </div>
  );
  const emptyCard = (
    <div className={styles.blank_article}>
      <div className={styles.blank_image}></div>
      <h3>XXXXXXXXX XXXXXXXX XXXXX XXXX</h3>
      <p>XXXXX XXXXX XXXXX XXXXX</p>
      <p>XXXXX XXXXX XXXXX XXXXX</p>
      <p>
        XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX
      </p>
    </div>
  );

  const articleDisplay = () => {
    if (article === undefined) {
      return emptyCard;
    } else return articleCard;
  };

  return articleDisplay();
};

export default Article;
