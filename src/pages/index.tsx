/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import PopUp from '../components/PopUp';
import Products from '../components/Products';
import Search from '../components/Search';
import { AuthenticationContext } from '../contexts/Authentication';
import api from '../services/api';

export default function Home(props) {
  const {
    loginPopUpClosed, needLogin,
  } = useContext(AuthenticationContext);
  const [products, setProducts] = useState([]);

  const { token } = props;

  async function getAllProducts() {
    const response = await api.get('/products', {
      headers: {
        Authorization: token,
      },
    });
    setProducts(response.data);
  }

  async function getProductsByName(name: string) {
    const response = await api.get('/products', {
      headers: {
        Authorization: token,
      },
      params: {
        name,
      },
    });

    setProducts(response.data);
  }

  useEffect(() => {
    if (!token) needLogin();
    if (token !== undefined) getAllProducts();
  }, [token]);
  return (
    <>
      {loginPopUpClosed ? <PopUp /> : (
        <Search onChange={(e) => { getProductsByName(e.target.value); }} />
      )}
      {products.length === 0 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem',
        }}
        >
          <p>Sem produtos Encontrados</p>
        </div>
      ) : (
        <>
          {products.map((product) => (<Products product={product} key={product.id} />))}
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  return {
    props: {
      token,
    },
  };
};
