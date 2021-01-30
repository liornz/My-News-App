import styles from './country-filter.module.scss';

interface Props {
  countryFilter: string | undefined;
  countryList: string[];
  changeCountry: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryFilter: React.FC<Props> = (props) => {
  const { countryFilter, countryList, changeCountry } = props;
  return (
    <select
      name="country"
      id="country-filter"
      value={countryFilter}
      onChange={changeCountry}
      className={styles.select}
    >
      <option value={''}>All Countries</option>
      {countryList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CountryFilter;