/* eslint-disable jsx-a11y/anchor-is-valid */
import Expand from '@material-ui/icons/ExpandMore';
import styles from '../styles/components/header.module.css';

export default function Headers() {
  return (
    <div className={styles.headerContainer}>
      <header>
        <div className={styles.logo}>
          <a href="/">Support</a>
          <hr />
        </div>
        <nav className={styles.navigatorContainer}>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn} style={{ width: '8rem' }}>
              PRODUTOS
              <Expand style={{ marginLeft: '0.1rem' }} />
            </button>
            <div className={styles.dropDownContent}>
              <a href="http://localhost:3333">Comparar</a>
              <a href="http://localhost:3333/products/create">Criar</a>

            </div>
          </div>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn}>
              FORNECEDORES
              <Expand style={{ marginLeft: '0.1rem' }} />
            </button>
            <div className={styles.dropDownContent}>
              <a href="http://localhost:3333/providers">Buscar</a>
              <a href="http://localhost:3333/providers/create">Criar</a>
            </div>
          </div>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn}>
              CATEGORIAS DE PRODUTOS
              <Expand style={{ marginLeft: '0.1rem' }} />
            </button>
            <div className={styles.dropDownContent}>
              <a href="http://localhost:3333/group">Buscar</a>
              <a href="http://localhost:3333/group/create">Criar</a>
            </div>
          </div>
          <div className={styles.dropDown}>
            <a href="http://localhost:3333/users" className={`${styles.dropDownbtn} ${styles.accountbtn}`}>
              CONTAS
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
