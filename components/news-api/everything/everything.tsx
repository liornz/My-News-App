import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styles from './headlines.module.scss';
import { articles, language, sortBy } from '../../../types/types';
import Article from '../../article/article';
import Toolbar from './everything-toolbar';

interface Props {}


const Everything: React.FC<Props> = () => {
  const [sourceFilter, setSourceFilter] = useState<undefined | string>(
    undefined
  );
  const [searchTermFilter, setSearchTermFilter] = useState<string>('');
  const [searchInTitle, setSearchInTitle] = useState(false);
  const [domainsFilter, setDomainsFilter] = useState<string[] | undefined>(undefined);
  const [excludeDomainsFilter, setExcludeDomainsFilter] = useState<string[] | undefined>(undefined);
  const [fromToFilter, setFromToFilter] = useState<{from: string, to: string} | undefined>(undefined);
  const [language, setLanguage] = useState<language>('en');
  const [sortByFilter, setSortByFilter] = useState<sortBy>('relevancy');
  const [articleArray, setArticleArray] = useState<articles | undefined>(undefined);
  const [pageSize, setPageSize] = useState(30);
  const [isLoading, setIsLoading] = useState(true);


  const searchTermFilterChangeHandler = debounce((term: string) => {
    setSearchTermFilter(term);
  }, 300);

  const getEverything = () => {
    const getDataFromServer = async () => {
      try {
        const data = {
          source: sourceFilter,
          searchTerm: searchTermFilter,
          searchInTitle: searchInTitle,
          domains: domainsFilter?.toString(),
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
          console.log('NEWS API DATA', res.data);
        }
      } catch (error) {
        console.log('Error retrieving news data from server!');
        setIsLoading(false);
      }
    };
    getDataFromServer();
  };

  useEffect(getEverything, [

    sourceFilter,
    searchTermFilter,
  ]);

  const articleList = (
    <div className={styles.headlines}>
      {articleArray?.map((item) => (
        <Article
          key={item.title}
          id={item.title}
          title={item.title}
          description={item.description}
          source={item.source.name}
          url={item.url}
          imageUrl={item.urlToImage}
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
        title=''
        description=''
        source=''
        url=''
        imageUrl=''
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
      {/* <Toolbar
        countryFilter={countryFilter}
        changeCountry={countryFilterChangeHandler}
        categoryFilter={categoryFilter}
        changeCategory={categoryFilterChangeHandler}
        searchTermFilter={searchTermFilter}
        changeSearchTerm={searchTermFilterChangeHandler}
        reloadHeadlines={getHeadlines}
      />
      <h1 className={styles.heading}>
        Headlines from{' '}
        {!countryFilter ? 'All Countries' : countryNames[countryFilter]}
      </h1>
      {articleDisplay()} */}
    </>
  );
};

export default Everything;