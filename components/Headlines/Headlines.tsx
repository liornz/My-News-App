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
  const [countryFilter, setCountryFilter] = useState<country | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<category>('general');
  const [categoriesArray, setCategoriesArray] = useState<null | sourceTypes>(null);
  const [sourceFilter, setSourceFilter] = useState<null | string>(null);
  const [searchTermFilter, setSearchTermFilter] = useState<string>('');
  const [articleArray, setArticleArray] = useState<articles | null>();

  const countryFilterChangeHandler = (countryCode: country) => {
    setCountryFilter(countryCode);
  };

  const categoryFilterChangeHandler = (cat: category) => {
    setCategoryFilter(cat);
  }

  const searchTermFilterChangeHandler = debounce((term: string) => {
    setSearchTermFilter(term);
  }, 300);

  // useEffect(() => {
  //   // fetch available sources
  //   // setCagegoryArr()
  // }, []);

  useEffect(() => {
    const data = {
      country: countryFilter || '',
      category: categoryFilter,
      source: sourceFilter,
      searchTerm: searchTermFilter,
    };
    axios({
      method: 'post',
      url: '/api/headlines',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          setArticleArray(res.data);
        }
      })
      .catch((error) => {
        console.log('Error in response');
      });
  }, [countryFilter, categoryFilter, sourceFilter, searchTermFilter]);

  return (
    <>
      <Toolbar
        countryFilter={countryFilter}
        changeCountry={countryFilterChangeHandler}
        categoryFilter={categoryFilter}
        changeCategory={categoryFilterChangeHandler}
        searchTermFilter={searchTermFilter}
        changeSearchTerm={searchTermFilterChangeHandler}
      />
      <h1 className={styles.heading}>
        Headlines from{' '}
        {!countryFilter ? 'All Countries' : countryNames[countryFilter]}
      </h1>
      <div className={styles.headlines}>
        {articleArray?.map((item) => (
          <Article article={item} />
        ))}
      </div>
    </>
  );
};

export default Headlines;
