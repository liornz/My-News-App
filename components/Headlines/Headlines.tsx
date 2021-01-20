import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Headlines.module.scss';
import { country, category, articles } from '../../types/types';
import Article from '../Article/Article';

interface Props {

}

type sourceTypes = string[];

const  Headlines: React.FC<Props> = () => {
  const [countryFilter, setCountryFilter] = useState<null | country>('us');
  const [categoryFilter, setCategoryFilter] = useState<null | category>(null);
  const [categoryArr, setCategoryArr] = useState<null | sourceTypes>(null);
  const [sourceFilter, setSourceFilter] = useState<null | string>(null);
  const [searchTermFilter, setSearchTermFilter] = useState<null | string>(null);
  const [articleArr, setArticleArr] = useState<articles | null>();

  // useEffect(() => {
  //   // fetch available sources
  //   // setCagegoryArr()
  // }, []);

  useEffect(() => {
    const data = {
      country: countryFilter,
      category: categoryFilter,
      source: sourceFilter,
      serachTerm: searchTermFilter
    };
    axios({
      method: 'post',
      url: '/api/headlines',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }).then(res => {
      if (res.status === 200) {
        setArticleArr(res.data)
      }
    }).catch(error => {
      console.log('Error in response');
    });
  }, [countryFilter, categoryFilter, sourceFilter, searchTermFilter]);
  
  return (
    <div className={styles.headlines}>
      {articleArr?.map((item) => (
        <Article article={item} />
      ))}
    </div>
  );
};

export default  Headlines;