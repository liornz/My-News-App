import { useState } from 'react';
import {
  countryArr,
  countryNames,
  categoryArr,
  categoryNames,
} from '../../types/constants';
import { category, country } from '../../types/types';
import styles from './HeadlinesToolbar.module.scss';

interface Props {
  countryFilter: country | undefined;
  changeCountry: (code: country) => void;
  categoryFilter: category;
  changeCategory: (cat: category) => void;
  searchTermFilter: string;
  changeSearchTerm: (term: string) => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const {
    countryFilter,
    changeCountry,
    categoryFilter,
    changeCategory,
    searchTermFilter,
    changeSearchTerm,
  } = props;

  const countryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCountry(event.target.value as country);
  };

  const categoryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCategory(event.target.value as category);
  };

  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserSearchTerm(event.target.value);
    changeSearchTerm(event.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <div>Logo</div>
      <div className={styles.filter}>
        <input
          type="text"
          placeholder="Search..."
          value={userSearchTerm}
          onChange={searchTermChangeHandler}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category-filter"
          value={categoryFilter}
          onChange={categoryChangeHandler}
        >
          {categoryArr.map((item) => (
            <option key={item} value={item}>
              {categoryNames[item]}
            </option>
          ))}
        </select>
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
      </div>
    </div>
  );
};

export default Toolbar;
