import { useState } from 'react';
import styles from './search.module.scss';

interface Props {
  changeSearchTerm: (term: string) => void;
}

const Search: React.FC<Props> = (props) => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const { changeSearchTerm } = props;

  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserSearchTerm(event.target.value);
    changeSearchTerm(event.target.value);
  };

  return (
    <input
    className={styles.input}
      type="text"
      placeholder="search..."
      value={userSearchTerm}
      onChange={searchTermChangeHandler}
    />
  );
};

export default Search;