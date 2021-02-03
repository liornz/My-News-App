import styles from './language-filter.module.scss';

interface Props {
  languageList: string[];
  languageFilter: string;
  changeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Language: React.FC<Props> = (props) => {
  const { languageFilter, languageList, changeLanguage } = props;
  return (
    <select
      name="language"
      id="language-filter"
      value={languageFilter}
      onChange={changeLanguage}
      className={styles.select}
    >
      {languageList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Language;