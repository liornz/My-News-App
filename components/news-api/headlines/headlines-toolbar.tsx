import { useState } from 'react';
import {
  countryArr,
  countryNames,
  categoryArr,
  categoryNames,
} from '../../../types/constants';
import { category, country } from '../../../types/types';
import styles from './headlines-toolbar.module.scss';
import { IoIosRefresh } from 'react-icons/io';

interface Props {
  countryFilter: country | undefined;
  changeCountry: (code: country) => void;
  categoryFilter: category;
  changeCategory: (cat: category) => void;
  searchTermFilter: string;
  changeSearchTerm: (term: string) => void;
  reloadHeadlines: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const {
    countryFilter,
    changeCountry,
    categoryFilter,
    changeCategory,
    changeSearchTerm,
    reloadHeadlines,
  } = props;

  const countryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCountry(event.target.value as country);
  };
  const categoryChangeHandler = (cat: category) => {
    changeCategory(cat);
  };
  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserSearchTerm(event.target.value);
    changeSearchTerm(event.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar_line1}>
        <div>Logo</div>
        <div className={styles.filter}>
          <input
            type="text"
            placeholder="Search..."
            value={userSearchTerm}
            onChange={searchTermChangeHandler}
          />

          <select
            name="country"
            id="country-filter"
            value={countryFilter}
            onChange={countryChangeHandler}
          >
            <option value={''}>All Countries</option>
            {countryArr.map((item) => (
              <option key={item} value={item}>
                {countryNames[item]}
              </option>
            ))}
          </select>
          <button onClick={reloadHeadlines}>
            <IoIosRefresh />
          </button>
        </div>
      </div>
      <div className={styles.toolbar_line2}>
        <ul>
          {categoryArr.map((item) => (
            <li
              key={item}
              onClick={() => categoryChangeHandler(item)}
              className={item === categoryFilter ? styles.active_category : styles.category}
            >
              {categoryNames[item]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
