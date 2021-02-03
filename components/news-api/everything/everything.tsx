import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styles from './everything.module.scss';
import { articles, sortBy } from '../../../types/types';
import { languageList, languageCode } from '../news-api-constants/constants';
import Article from '../../article/article';
import Toolbar from './toolbar';
import SearchInTitle from '../../toolbar-elements/search-in-title';

interface Props {}

const Everything: React.FC<Props> = () => {
  const [sourceFilter, setSourceFilter] = useState<undefined | string>(
    undefined
  );
  const [searchTermFilter, setSearchTermFilter] = useState<string>('something');
  const [searchInTitle, setSearchInTitle] = useState(false);
  const [domainsFilter, setDomainsFilter] = useState<string[] | undefined>(
    undefined
  );
  const [excludeDomainsFilter, setExcludeDomainsFilter] = useState<
    string[] | undefined
  >(undefined);
  const [fromToFilter, setFromToFilter] = useState<
    { from: string; to: string } | undefined
  >(undefined);
  const [language, setLanguage] = useState<string>('English');
  const [sortByFilter, setSortByFilter] = useState<sortBy>('relevancy');
  const [articleArray, setArticleArray] = useState<articles | undefined>(
    undefined
  );
  const [pageSize, setPageSize] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const searchTermFilterChangeHandler = debounce((term: string) => {
    setSearchTermFilter(term);
  }, 300);

  const languageFilterChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const searchInTitleChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked === true) {
      setSearchInTitle(true);
    } else {
      setSearchInTitle(false);
    }
  };

  const getEverything = () => {
    const getDataFromServer = async () => {
      try {
        const data = {
          source: sourceFilter,
          searchTerm: searchTermFilter,
          searchInTitle: searchInTitle,
          domains: domainsFilter?.toString(),
          language: languageCode[languageList.indexOf(language)],
          pageSize: pageSize,
        };
        setIsLoading(true);
        const res = await axios({
          method: 'post',
          url: '/api/newsapi-everything',
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        });
        if (res.status === 200) {
          setArticleArray(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error retrieving news data from server!');
        setIsLoading(false);
      }
    };
    getDataFromServer();
  };

  useEffect(getEverything, [sourceFilter, searchTermFilter, language, searchInTitle]);

  let rtl = false;
  if (language === 'Hebrew' || language === 'Arabic') {
    rtl = true;
  }

  const articleList = (
    <div className={styles.headlines}>
      {articleArray?.map((item) => (
        <Article
          key={Math.random()}
          id={item.title}
          title={item.title}
          description={item.description}
          source={item.source.name}
          url={item.url}
          imageUrl={item.urlToImage}
          rtl={rtl}
        />
      ))}
    </div>
  );

  const emptyAtricleList = (
    <div className={styles.epmty_headlines}>
      <h1>No results for your search criterias</h1>
    </div>
  );

  const loadingCard = (
    <div className={styles.headlines}>
      <Article
        id={undefined}
        title=""
        description=""
        source=""
        url=""
        imageUrl=""
        rtl={false}
      />
    </div>
  );

  const articleDisplay = () => {
    if (isLoading) {
      return loadingCard;
    } else if (articleArray?.length === 0) {
      return emptyAtricleList;
    } else return articleList;
  };

  return (
    <>
      <Toolbar
        languageList={languageList}
        languageFilter={language}
        changeLanguage={languageFilterChangeHandler}
        changeSearchTerm={searchTermFilterChangeHandler}
        changeSearchInTitle={searchInTitleChangeHandler}
        reloadData={getEverything}
      />
      {articleDisplay()}
    </>
  );
};

export default Everything;
