import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styles from './Headlines.module.scss';
import { country, category, articles } from '../../types/types';
import { countryNames } from '../../types/constants';
import Article from '../Article/Article';
import Toolbar from '../Toolbar/HeadlinesToolbar';

interface Props {}

type sourceTypes = string[];

const Headlines: React.FC<Props> = () => {
  const [countryFilter, setCountryFilter] = useState<country | undefined>(
    undefined
  );
  const [categoryFilter, setCategoryFilter] = useState<category>('general');
  // const [categoriesArray, setCategoriesArray] = useState<null | sourceTypes>(null);
  const [sourceFilter, setSourceFilter] = useState<null | string>(null);
  const [searchTermFilter, setSearchTermFilter] = useState<string>('');
  const [articleArray, setArticleArray] = useState<articles | null>();
  const [pageSize, setPageSize] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const countryFilterChangeHandler = (countryCode: country) => {
    setCountryFilter(countryCode);
  };
  const categoryFilterChangeHandler = (cat: category) => {
    setCategoryFilter(cat);
  };
  const searchTermFilterChangeHandler = debounce((term: string) => {
    setSearchTermFilter(term);
  }, 300);

  const getHeadlines = () => {
    const getDataFromServer = async () => {
      try {
        const data = {
          country: countryFilter || '',
          category: categoryFilter,
          source: sourceFilter,
          searchTerm: searchTermFilter,
          pageSize: pageSize,
        };
        setIsLoading(true);
        const res = await axios({
          method: 'post',
          url: '/api/headlines',
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

  useEffect(getHeadlines, [
    countryFilter,
    categoryFilter,
    sourceFilter,
    searchTermFilter,
  ]);

  const articleList = (
    <div className={styles.headlines}>
      {articleArray?.map((item) => (
        <Article article={item} />
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
      <Article article={undefined} />
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
      {articleDisplay()}
    </>
  );
};

export default Headlines;
