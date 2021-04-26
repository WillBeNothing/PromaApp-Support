/* eslint-disable no-shadow */
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';

import FiPlus from '@material-ui/icons/Add';
import ReactLoading from 'react-loading';

import CurrencyInput from 'react-currency-input-field';

import api from '../../services/api';
import { token } from '../../utils/checkIfIsNeededLogin';

import styles from '../../styles/pages/products/create.module.css';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Create() {
  const route = useRouter();

  const [providers, setProviders] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState(null);
  const [price, setPrice] = useState(0);
  const [provider, setProvider] = useState('');
  const [group, setGroup] = useState('');
  const [image, setImage] = useState<File>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isDollar, setIsDollar] = useState('false');

  async function HandleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('productCode', productCode);
    data.append('price', String(price));
    data.append('provider', provider);
    data.append('group', group);
    data.append('image', image);
    data.append('isDollar', isDollar);

    if (!name || !price || !provider || price === 0 || !group || !image || !isDollar) {
      return alert('Confira todas as informações passadas');
    }

    setLoading(true);

    const response = await api.post('/products', data, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data.error === 'Duplicating products') {
      alert('Produto ja foi cadastrado');
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

  async function getProvidersAndGroups() {
    const providersRes = await api.get('/providers', {
      headers: {
        Authorization: token,
      },
    });
    const groupsRes = await api.get('/groups', {
      headers: {
        Authorization: token,
      },
    });

    setProviders(providersRes.data);
    setGroups(groupsRes.data);

    setProvider(providersRes.data[0].name);
    setGroup(groupsRes.data[0].name);
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line no-useless-return
    if (!event.target.files) return;

    const selectedImages = event.target.files[0];
    setImage(selectedImages);

    const selectedImagesPreview = URL.createObjectURL(selectedImages);
    setPreviewImage(selectedImagesPreview);
  }

  useEffect(() => {
    getProvidersAndGroups();
  }, []);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <ReactLoading type="spin" color="#3128b6" width="5%" height="5%" />
        </div>
      )}
      <form onSubmit={HandleSubmit}>
        <div className={styles.textInformations}>
          <label htmlFor="name">Nome do produto: </label>
          <input
            type="text"
            maxLength={27}
            id="name"
            onChange={(e) => { setName(e.target.value); }}
          />
          <label htmlFor="price">Preço:</label>
          <div className={styles.money}>

            <CurrencyInput
              intlConfig={{ locale: 'pt-BR', currency: isDollar === 'false' ? 'BRL' : 'USD' }}
              id="price"
              decimalsLimit={2}
              value={price}
              onValueChange={(value) => {
                if (value !== undefined) {
                  setPrice(Number(value.replace(',', '.')));
                }
              }}
            />
          </div>
          <label htmlFor="ProductCode">Código do produto: </label>
          <input
            type="text"
            id="ProductCode"
            onChange={(e) => { setProductCode(e.target.value); }}
          />

          <label htmlFor="provider">Fornecedor: </label>
          <select
            id="provider"
            onChange={(e) => { setProvider(e.target.value); }}
          >
            {providers.map((provider) => (<option value={provider.name}>{provider.name}</option>))}
          </select>
          <label htmlFor="groups">Categoria: </label>
          <select
            id="groups"
            onChange={(e) => { setGroup(e.target.value); }}
          >
            {// eslint-disable-next-line no-shadow
            groups.map((group) => (
              <option value={group.name}>
                {group.name}
              </option>
            ))
}
          </select>

          <label htmlFor="currency">Moeda: </label>
          <select id="currency" onChange={(e) => { setIsDollar(e.target.value); }}>
            <option value="false">BRL</option>
            <option value="true">USD</option>
          </select>
        </div>
        <div className={styles.inputImage}>
          <div className={styles.imagesContainer}>
            {previewImage && (
              <div className={styles.imagePreview}>
                <img src={previewImage} alt={previewImage} />
                <label htmlFor="image" className={styles.newImage}>Trocar Imagem</label>
              </div>
            )}
            {image == null ? (
              <label htmlFor="image" className={styles.newImage}>
                <FiPlus style={{
                  color: '#3128b6',
                  fontSize: 96,
                }}
                />
              </label>
            ) : ''}
          </div>
          <input onChange={handleSelectImage} type="file" id="image" />
        </div>
        <button type="submit">Criar Produto</button>
      </form>
    </div>
  );
}
