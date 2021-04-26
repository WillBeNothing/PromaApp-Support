import { InputHTMLAttributes } from 'react';
import styles from '../styles/components/search.module.css';

// eslint-disable-next-line no-undef
const Search: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => (
  <div className={styles.inputBlock}>
    <input type="text" id={styles.search} {...rest} />
  </div>
);

export default Search;
