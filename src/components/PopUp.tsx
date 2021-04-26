/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from 'react';
import Close from '@material-ui/icons/Close';
import { AuthenticationContext } from '../contexts/Authentication';
import styles from '../styles/components/popUP.module.css';

// eslint-disable-next-line no-undef
const PopUp = () => {
  const { Authenticating, closeLoginPopUp } = useContext(AuthenticationContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function throwDataToAuthentication() {
    Authenticating(name, password);
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <strong>Faça o login</strong>
        </header>
        <button type="button">
          <Close onClick={closeLoginPopUp} />
        </button>

        <div className={styles.loginContainer}>
          <label htmlFor="Usuário">Usuário</label>
          <input
            type="text"
            id="Usuário"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
          />
          <br />
          <label htmlFor="Senha">Senha</label>
          <input
            type="password"
            id="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <button
            type="button"
            onClick={throwDataToAuthentication}
          >
            Entrar

          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
