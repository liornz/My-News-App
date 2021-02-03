import styles from './category-select-filter.module.scss';

interface Props {
  categoriesList: string[];
  categoryFilter: string;
  changeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<Props> = (props) => {
const { categoriesList, categoryFilter, changeCategory } = props;
  return (
    <select
      name="category"
      id="category-filter"
      value={categoryFilter}
      onChange={changeCategory}
      className={styles.select}
    >
      {categoriesList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;