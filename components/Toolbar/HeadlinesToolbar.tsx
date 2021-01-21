import {
  countryArr,
  countryNames,
  categoryArr,
  categoryNames,
} from '../../types/constants';
import { category, country } from '../../types/types';
import styles from './HeadlinesToolbar.module.scss';

interface Props {
  countryFilter: country;
  changeCountry: (code: country) => void;
  categoryFilter: category;
  changeCategory: (cat: category) => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const { countryFilter, changeCountry, categoryFilter, changeCategory } = props;

  const countryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCountry(event.target.value as country);
  };

  const categoryChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeCategory(event.target.value as category);
  };

  return (
    <div className={styles.toolbar}>
      <div>Logo</div>
      <div className={styles.filter}>
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
