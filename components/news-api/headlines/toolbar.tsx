import { useState } from 'react';
import Search from '../../toolbar-elements/search';
import Refresh from '../../toolbar-elements/refresh-button';
import CountryFilter from '../../toolbar-elements/country-filter';
import CategoryFilter from '../../toolbar-elements/category-filter';
import MenuToggler from '../../toolbar-elements/menu-toggler';
import Sidebar from './sidebar';
import Backdrop from '../../toolbar-elements/backdrop';
import Logo from '../../toolbar-elements/logo';
import styles from './toolbar.module.scss';

interface Props {
  countryFilter: string | undefined;
  changeCountry: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
  categoriesList: string[];
  countryList: string[];
  changeCategory: (cat: string) => void;
  changeCategorySelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSearchTerm: (term: string) => void;
  reloadData: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    changeSearchTerm,
    categoryFilter,
    changeCategory,
    changeCategorySelect,
    categoriesList,
    countryList,
    changeCountry,
    countryFilter,
    reloadData,
  } = props;

  const sidebarToggleHandler = () => {
    setShowSidebar((state) => !state);
  };

  return (
    <>
      <div className={styles.desktop}>
        <div className={styles.first_line}>
          <Logo imageUrl={''} />
          <div className={styles.filter}>
            <CountryFilter
              countryFilter={countryFilter}
              changeCountry={changeCountry}
              countryList={countryList}
            />
            <Search changeSearchTerm={changeSearchTerm} />
            <Refresh reloadData={reloadData} />
          </div>
        </div>
        <CategoryFilter
          categoryFilter={categoryFilter}
          changeCategory={changeCategory}
          categoriesList={categoriesList}
        />
      </div>
      <div className={styles.mobile}>
        <MenuToggler toggle={sidebarToggleHandler} show={showSidebar} />
        <Logo imageUrl={''} />
        <Refresh reloadData={reloadData} />
      </div>
      <Sidebar
        countryFilter={countryFilter}
        changeCountry={changeCountry}
        countryList={countryList}
        categoryFilter={categoryFilter}
        changeCategory={changeCategorySelect}
        categoriesList={categoriesList}
        changeSearchTerm={changeSearchTerm}
        show={showSidebar}
        toggle={sidebarToggleHandler}
      />
      <Backdrop show={showSidebar} toggle={sidebarToggleHandler} />
    </>
  );
};

export default Toolbar;
