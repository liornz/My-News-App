import styles from './logo.module.scss';

interface Props {
  imageUrl: string;
}

const Logo: React.FC<Props> = (props) => {
  const { imageUrl } = props;
  return <div className={styles.logo}>Logo</div>;
};

export default Logo;