import Search from '../../toolbar-elements/search';
import Refresh from '../../toolbar-elements/refresh-button';
import Language from '../../toolbar-elements/language-filter';
import SearchInTitle from '../../toolbar-elements/search-in-title';
import Logo from '../../toolbar-elements/logo';
import styles from './toolbar.module.scss';

interface Props {
  languageFilter: string;
  languageList: string[];
  changeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSearchTerm: (term: string) => void;
  changeSearchInTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reloadData: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const {
    changeSearchTerm,
    changeSearchInTitle,
    languageList,
    languageFilter,
    changeLanguage,
    reloadData,
  } = props;
  return (
    <>
      <div className={styles.first_line}>
        <Logo imageUrl={''} />
        <div className={styles.filter}>
          <Language
            languageList={languageList}
            languageFilter={languageFilter}
            changeLanguage={changeLanguage}
          />
          <SearchInTitle changeSearchInTitle={changeSearchInTitle} />
          <Search changeSearchTerm={changeSearchTerm} />
          <Refresh reloadData={reloadData} />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
