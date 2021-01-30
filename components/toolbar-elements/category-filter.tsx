import styles from './category-filter.module.scss';

interface Props {
  categoriesList: string[];
  categoryFilter: string;
  changeCategory: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = (props) => {
  const { categoriesList, categoryFilter, changeCategory } = props;

  const categoryChangeHandler = (cat: string) => {
    changeCategory(cat);
  };

  return (
    <div className={styles.categories}>
      <ul>
        {categoriesList.map((item) => (
          <li
            key={item}
            onClick={() => categoryChangeHandler(item)}
            className={
              item === categoryFilter ? styles.active_category : styles.category
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
