/* eslint-disable no-shadow */
import {
  FormEvent, useState,
} from 'react';
import { useRouter } from 'next/router';
import Telephone from 'react-phone-input-2';

import ReactLoading from 'react-loading';

import api from '../../services/api';
import { token } from '../../utils/checkIfIsNeededLogin';

import styles from '../../styles/pages/providers/create.module.css';
import 'react-phone-input-2/lib/style.css';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Create() {
  const route = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [website, setWebSite] = useState(null);

  const [telephoneItens, setTelephoneItens] = useState(['']);
  const [emailItems, setEmailItems] = useState(['']);

  function addNewTelephone() {
    setTelephoneItens([
      ...telephoneItens,
      '',
    ]);
  }

  function addNewEmail() {
    setEmailItems([
      ...emailItems,
      '',
    ]);
  }

  async function HandleSubmit(event: FormEvent) {
    event.preventDefault();

    let telefone = telephoneItens;
    let email = emailItems;

    if (telephoneItens === ['']) {
      telefone = null;
    }

    if (emailItems === ['']) {
      email = null;
    }

    const data = {
      name,
      telefone,
      email,
      website,
    };
    if (!name) {
      return alert('Confira todas as informações passadas');
    }

    setLoading(true);

    const response = await api.post('/providers', data, {
      headers: {
        Authorization: token,
      },
    });

    console.log(response);

    if (response.status === 400) {
      alert(`Fornecedor ${name} ja foi cadastrado`);
      setLoading(false);
    } else if (response.status === 401) {
      alert('Você precisa estar logado');
      setLoading(false);
    } else if (response.status === 400) {
      alert('Confira todas as informações passadas');
      setLoading(false);
    } else {
      route.push('/#');
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <ReactLoading type="spin" color="#3128b6" width="5%" height="5%" />
        </div>
      )}
      <form onSubmit={HandleSubmit}>
        <div className={styles.textInformations}>
          <label htmlFor="name">Fornecedor: </label>
          <input
            type="text"
            maxLength={27}
            id="name"
            onChange={(e) => { setName(e.target.value); }}
          />
          <button type="button" onClick={addNewTelephone} className={styles.newFieldButton}>
            + Novo Telefone
          </button>
          <label htmlFor="">Telefone(s): </label>
          {telephoneItens.map((telephoneItem, index) => (
            <div>
              <Telephone
                country="br"
                value={telephoneItem}
                onChange={(e) => {
                  const items = [...telephoneItens];
                  let item = telephoneItens[index];
                  item = `+${e}`;
                  items[index] = item;
                  setTelephoneItens(items);
                }}
                inputStyle={{
                  width: '80%',
                  height: '3rem',
                }}
              />
            </div>
          ))}

          <button type="button" onClick={addNewEmail} className={styles.newFieldButton}>
            + Novo Email
          </button>
          <label htmlFor="">Email(s): </label>
          {emailItems.map((emailItem, index) => (
            <div>
              <input
                type="email"
                value={emailItem}
                onChange={(e) => {
                  const items = [...emailItems];
                  let item = emailItems[index];
                  item = e.target.value;
                  items[index] = item;
                  setEmailItems(items);
                }}
              />
            </div>
          ))}

          <label htmlFor="ProductCode">WebSite: </label>
          <input
            type="text"
            id="ProductCode"
            onChange={(e) => { setWebSite(e.target.value); }}
          />
        </div>

        <button type="submit">Criar Novo Fornecedor</button>
      </form>
    </div>
  );
}
