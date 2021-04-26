/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, FormEvent } from 'react';
import CurrencyInput from 'react-currency-input-field';
import Switch from 'react-switch';
import { GetServerSideProps } from 'next';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import api from '../../services/api';
import styles from '../../styles/pages/products/index.module.css';

export interface ItemProps {
    image: string,
    id: number,
    name: string,
    price: string,
    provider: {
        id: number,
        name: string,
    },
    actived: boolean,
    group: {
        id: number,
        name: string
    },
    isDollar: boolean,
    productCode: string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  // eslint-disable-next-line no-shadow
  const { token } = context.req.cookies;

  const response = await api.get(`/products/${Number(id)}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.data) {
    return {
      props: {
        notFound: true,
        products: null,
      },
    };
  }

  return {
    props: {
      products: response.data,
      token,
    },
  };
};

export default function Edit(props) {
  const route = useRouter();

  const { products, token } = props;

  const [loading, setLoading] = useState(false);
  const [product] = useState<ItemProps>(products || null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [productCode, setProductCode] = useState(product.productCode);
  const [actived, setActived] = useState(product.actived);
  // eslint-disable-next-line no-shadow
  function handleChangeSwitch(isEditing) {
    setIsEditing(isEditing);
  }

  async function onHandleUpdateProduct(event: FormEvent) {
    event.preventDefault();
    const data = {
      name,
      price,
      productCode,
      actived,
    };
    setLoading(true);

    const update = await api.put(`/products/${product.id}`, data, {
      headers: {
        Authorization: token,
      },
    });

    if (update.status === 401) {
      alert('Você precisa estar logado');
      setLoading(false);
    } else if (update.status === 400) {
      alert('Confira todas as informações passadas');
      setLoading(false);
    } else {
      route.push('/');
      setLoading(false);
    }
  }

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setProductCode(product.productCode);

    console.log({
      name,
      price,
      productCode,
      actived,
    });
  }, [isEditing]);
  return (
    <>
      {loading && (
      <div className={styles.loading}>
        <ReactLoading type="spin" color="#3128b6" width="5%" height="5%" />
      </div>
      )}
      {!product
        ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem',
          }}
          >
            <p>Sem produtos Encontrados</p>
          </div>
        ) : (
          <div className={styles.container}>
            <form onSubmit={onHandleUpdateProduct}>
              <div className={styles.textInformations}>
                <label htmlFor="name">Nome do produto: </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? name : product.name}
                  onChange={(e) => { setName(e.target.value); }}
                  maxLength={27}
                  id="name"
                />
                <label htmlFor="price">Preço:</label>
                <div>
                  <CurrencyInput
                    intlConfig={{ locale: 'pt-BR', currency: product.isDollar === false ? 'BRL' : 'USD' }}
                    disabled={!isEditing}
                    value={isEditing ? price : product.price}
                    maxLength={27}
                    id="name"
                    onValueChange={(value) => {
                      if (value !== undefined) {
                        setPrice(value.replace(',', '.'));
                      }
                    }}
                  />
                </div>
                <label htmlFor="ProductCode">Código do produto: </label>
                <input
                  type="text"
                  id="ProductCode"
                  disabled={!isEditing}
                  onChange={(e) => { setProductCode(e.target.value); }}
                  value={isEditing ? productCode : product.productCode}
                />
                <label htmlFor="provider">Fornecedor: </label>
                <strong>{product.provider.name}</strong>
                <label htmlFor="groups">Categoria: </label>
                <strong>{product.group.name}</strong>
                <div className={styles.disable}>
                  <label htmlFor="disable">Ativado </label>
                  <input
                    checked={actived}
                    disabled={!isEditing}
                    // eslint-disable-next-line max-len
                    onChange={(e) => { setActived(e.target.checked); }}
                    type="checkbox"
                    id="disable"
                  />
                </div>
                <div className={styles.buttons}>
                  <div>
                    <Switch onChange={handleChangeSwitch} checked={isEditing} id="editSwitch" height={20} />
                  </div>
                  <div>
                    {isEditing ? <button type="submit" className={styles.abledButton}>Salvar</button> : <button type="submit" className={styles.disabledButton}>Salvar</button>}
                  </div>
                </div>
              </div>
              <div className={styles.showImage}>
                <div className={styles.imagesContainer}>
                  <div className={styles.image}>
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
              </div>
            </form>
          </div>

        )}
    </>
  );
}
