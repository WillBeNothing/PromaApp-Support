/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ConvertDolarToReal from '../services/ExchangeDollarContation';
import styles from '../styles/components/products.module.css';

export interface ItemProps {
    product: {
      id: number,
      image: string,
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
    },
  }

// eslint-disable-next-line no-undef
const Products: React.FC<ItemProps> = ({ product }, props) => {
  const [price, setPrice] = useState('');

  console.log(props);

  async function convertingUSDToBRL() {
    if (product.isDollar) {
      const priceInBRL = await ConvertDolarToReal(product.price);
      setPrice(priceInBRL);
    } else {
      setPrice(Number(product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    }
  }

  useEffect(() => {
    convertingUSDToBRL();
  }, []);

  return (
    <div className={styles.productsContainer}>
      <section>
        <img src={product.image} alt={`${product.name}:${product.provider}`} />
        <div className={styles.informations}>
          <div className={styles.name}>
            <p>Produto: </p>
            <Link
              href={{
                pathname: '/products/[id]',
                query: { id: product.id },
              }}
            >
              {product.name}

            </Link>
          </div>
          <div className={styles.price}>
            <p>Preço: </p>
            <strong>{price}</strong>
            <p>Moeda: </p>
            <strong>{product.isDollar ? 'Dolar' : 'Real'}</strong>
          </div>
          <div className={styles.addtionalInformations}>
            <div>
              <p>Fornecedor: </p>
              <strong>{product.provider.name}</strong>
            </div>
            <div>
              <p>Grupo: </p>
              <strong>{product.group.name}</strong>
            </div>
          </div>
          <div>
            <p>Código do Produto: </p>
            <strong>{product.productCode === '' ? 'Código do produto não definido' : product.productCode}</strong>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          {product.actived ? (
            <button type="button" className={styles.activedSituation}>Ativo</button>
          ) : (
            <button type="button" className={styles.disabledSituation}>Desativo</button>
          )}
        </div>
      </section>
    </div>
  );
};
export default Products;
