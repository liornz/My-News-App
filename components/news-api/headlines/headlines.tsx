import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styles from './headlines.module.scss';
import { articles } from '../../../types/types';
import Article from '../../article/article';
import Toolbar from './toolbar';
import {
  categoriesList,
  countryList,
  countryCode,
  categoryCode,
} from '../news-api-constants/constants';

interface Props {}

const Headlines: React.FC<Props> = () => {
  const [countryFilter, setCountryFilter] = useState<string | undefined>(
    undefined
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('General');
  const [sourceFilter, setSourceFilter] = useState<undefined | string>(
    undefined
  );
  const [searchTermFilter, setSearchTermFilter] = useState<string>('');
  const [articleArray, setArticleArray] = useState<articles | undefined>(
    undefined
  );
  const [pageSize, setPageSize] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const countryFilterChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCountryFilter(event.target.value);
  };
  const categoryFilterChangeHandler = (cat: string) => {
    setCategoryFilter(cat);
  };
  const categorySelectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };
  const searchTermFilterChangeHandler = debounce((term: string) => {
    setSearchTermFilter(term);
  }, 300);

  const getHeadlines = () => {
    const getDataFromServer = async () => {
      const categoryApi = categoryCode[categoriesList.indexOf(categoryFilter)];
      const countryApi =
        countryFilter !== undefined
          ? countryCode[countryList.indexOf(countryFilter)]
          : '';
      try {
        const data = {
          country: countryApi,
          category: categoryApi,
          source: sourceFilter,
          searchTerm: searchTermFilter,
          pageSize: pageSize,
        };
        setIsLoading(true);
        const res = await axios({
          method: 'post',
          url: '/api/newsapi-headlines',
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

  useEffect(getHeadlines, [
    countryFilter,
    categoryFilter,
    sourceFilter,
    searchTermFilter,
  ]);

  let rtl = false;
  if (countryFilter === 'Israel' || countryFilter === 'Egypt') {
    rtl = true;
  }

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
        reloadData={getHeadlines}
        categoryFilter={categoryFilter}
        changeCategory={categoryFilterChangeHandler}
        changeCategorySelect={categorySelectChangeHandler}
        categoriesList={categoriesList}
        countryList={countryList}
        changeCountry={countryFilterChangeHandler}
        countryFilter={countryFilter}
        changeSearchTerm={searchTermFilterChangeHandler}
      />
      <h1 className={styles.heading}>
        Headlines from {!countryFilter ? 'All Countries' : countryFilter}
      </h1>
      {articleDisplay()}
    </>
  );
};

export default Headlines;
