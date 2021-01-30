import { IoIosRefresh } from 'react-icons/io';
import styles from './refresh-button.module.scss'

interface Props {
  reloadData: () => void
}

const Refresh: React.FC<Props> = (props) => {
  const { reloadData } = props;
  return (
    <button className={styles.button} onClick={reloadData}>
      <IoIosRefresh />
    </button>
  );
};

export default Refresh;