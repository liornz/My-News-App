import Search from '../../toolbar-elements/search';
import CountryFilter from '../../toolbar-elements/country-filter';
import CategorySelect from '../../toolbar-elements/category-select-filter';
import Logo from '../../toolbar-elements/logo';
import MenuToggler from '../../toolbar-elements/menu-toggler';
import styles from './sidebar.module.scss';

interface Props {
  countryFilter: string | undefined;
  changeCountry: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
  categoriesList: string[];
  countryList: string[];
  changeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSearchTerm: (term: string) => void;
  show: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const {
    changeSearchTerm,
    categoryFilter,
    changeCategory,
    categoriesList,
    countryList,
    changeCountry,
    countryFilter,
    show,
    toggle
  } = props;

  const sidebarClassName = [styles.sidebar];
  if (show) {
    sidebarClassName.push(styles.sidebar_opened);
  } else {
    sidebarClassName.push(styles.sidebar_closed);
  }

  return (
    <>
      <div className={show ? styles.toggler : styles.toggler_closed}>
        <MenuToggler toggle={toggle} show={show} />
      </div>
      <div className={sidebarClassName.join(' ')}>
        <Logo imageUrl={''} />
        <CountryFilter
          countryList={countryList}
          countryFilter={countryFilter}
          changeCountry={changeCountry}
        />
        <CategorySelect
          categoriesList={categoriesList}
          categoryFilter={categoryFilter}
          changeCategory={changeCategory}
        />
        <Search changeSearchTerm={changeSearchTerm} />
      </div>
    </>
  );
};

export default Sidebar;
