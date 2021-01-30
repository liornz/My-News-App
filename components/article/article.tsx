import Image from 'next/image';
import styles from './article.module.scss';

interface Props {
  id: string | undefined;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl: string | null | undefined;
}

const Article: React.FC<Props> = (props) => {
  const { id, title, description, source, url, imageUrl } = props;

  const image = () => {
    if (imageUrl === null || imageUrl === undefined) {
      return <div className={styles.blank_image}>NO IMAGE</div>;
    } else return <img src={imageUrl} alt="Article Image" />;
  };

  const articleCard = (
    <div className={styles.article}>
      <a href={url}>
        {image()}
        <h3>{title}</h3>
      </a>
      <p>Source: {source}</p>
      <p>{description}</p>
    </div>
  );
  const emptyCard = (
    <div className={styles.blank_article}>
      <div className={styles.blank_image}></div>
      <h3>XXXXXXXXX XXXXXXXX XXXXX XXXX</h3>
      <p>XXXXX XXXXX XXXXX XXXXX</p>
      <p>
        XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX XXXXX
      </p>
    </div>
  );

  const articleDisplay = () => {
    if (id === undefined) {
      return emptyCard;
    } else return articleCard;
  };

  return articleDisplay();
};

export default Article;
