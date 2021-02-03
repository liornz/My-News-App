import styles from './backdrop.module.scss';

interface Props {
  show: boolean;
  toggle: () => void;
}

const Backdrop: React.FC<Props> = (props) => {
  const { show, toggle } = props;

  return (
    <div
      className={show ? styles.backdrop_open : styles.backdrop_closed}
      onClick={toggle}
    ></div>
  );
};

export default Backdrop;
