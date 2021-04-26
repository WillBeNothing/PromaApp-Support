import { useContext, useEffect, useState } from 'react';
import PopUp from '../../components/PopUp';
import ProviderItem from '../../components/ProviderItem';
import Search from '../../components/Search';
import { AuthenticationContext } from '../../contexts/Authentication';
import api from '../../services/api';

import { token } from '../../utils/checkIfIsNeededLogin';

export default function Home() {
  const {
    loginPopUpClosed, needLogin,
  } = useContext(AuthenticationContext);
  const [providers, setProviders] = useState([]);

  async function getAllProviders() {
    const response = await api.get('/providers', {
      headers: {
        Authorization: token,
      },
    });
    setProviders(response.data);
  }

  async function getProductsByName(name: string) {
    const response = await api.get('/providers', {
      headers: {
        Authorization: token,
      },
      params: {
        name,
      },
    });

    setProviders(response.data);
  }

  useEffect(() => {
    if (!token) needLogin();
    if (token !== undefined) getAllProviders();
  }, [token]);
  return (
    <>
      {loginPopUpClosed ? <PopUp /> : (
        <Search onChange={(e) => { getProductsByName(e.target.value); }} />
      )}
      {providers.length === 0 || providers === undefined ? (
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
          {providers.map((provider) => (<ProviderItem provider={provider} />))}
        </>
      )}
    </>
  );
}
