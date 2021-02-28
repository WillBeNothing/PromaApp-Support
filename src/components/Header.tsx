/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from '../styles/components/header.module.css';

export default function Headers() {
  return (
    <div className={styles.headerContainer}>
      <header>
        <div className={styles.logo}>
          <a href="/#">Support</a>
          <hr />
        </div>
        <nav className={styles.navigatorContainer}>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn}>
              FORNECEDORES
              <img src="icons/expand.svg" alt="" />
            </button>
            <div className={styles.dropDownContent}>
              <a href="providers">Listar fornecedores</a>
              <a href="providers/create">Criar fornecedores</a>
            </div>
          </div>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn} style={{ width: '8rem' }}>
              PRODUTOS
              <img src="icons/expand.svg" alt="" />
            </button>
            <div className={styles.dropDownContent}>
              <a href="#">Comparar produtos</a>
              <a href="#">Criar produtos</a>

            </div>
          </div>
          <div className={styles.dropDown}>
            <button type="button" className={styles.dropDownbtn}>
              GRUPOS PRODUTOS
              <img src="icons/expand.svg" alt="" />
            </button>
            <div className={styles.dropDownContent}>
              <a href="#">Listar grupos</a>
              <a href="#">Criar grupos</a>
            </div>
          </div>
          <div className={styles.dropDown}>
            <button type="button" className={`${styles.dropDownbtn} ${styles.accountbtn}`}>
              CONTAS
              <img src="icons/expand.svg" alt="" />
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
