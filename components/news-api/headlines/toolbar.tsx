import Search from '../../toolbar-elements/search';
import Refresh from '../../toolbar-elements/refresh-button';
import CountryFilter from '../../toolbar-elements/country-filter';
import CategoryFilter from '../../toolbar-elements/category-filter';
import styles from './toolbar.module.scss';

interface Props {
  countryFilter: string | undefined;
  changeCountry: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
  categoriesList: string[];
  countryList: string[];
  changeCategory: (cat: string) => void;
  changeSearchTerm: (term: string) => void;
  reloadData: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const {
    changeSearchTerm,
    categoryFilter,
    changeCategory,
    categoriesList,
    countryList,
    changeCountry,
    countryFilter,
    reloadData,
  } = props;
  return (
    <>
      <div className={styles.first_line}>
        <div>Logo</div>
        <div className={styles.filter}>
          <Search changeSearchTerm={changeSearchTerm} />
          <CountryFilter
            countryFilter={countryFilter}
            changeCountry={changeCountry}
            countryList={countryList}
          />
          <Refresh reloadData={reloadData} />
        </div>
      </div>
      <CategoryFilter
        categoryFilter={categoryFilter}
        changeCategory={changeCategory}
        categoriesList={categoriesList}
      />
    </>
  );
};

export default Toolbar;
