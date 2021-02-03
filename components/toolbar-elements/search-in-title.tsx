import styles from './search-in-title.module.scss';

interface Props {
  changeSearchInTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInTitle: React.FC<Props> = (props) => {
  const { changeSearchInTitle } = props;
  return (
    <>
      <label htmlFor="SearchInTitle">Title Only</label>
      <input
        type="checkbox"
        name="SearchInTitle"
        onChange={changeSearchInTitle}
        className={styles.input}
      />
    </>
  );
};

export default SearchInTitle;
