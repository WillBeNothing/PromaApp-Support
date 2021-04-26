import {
  createContext, ReactNode, useState,
} from 'react';
import cookies from 'js-cookie';
import api from '../services/api';

interface AuthenticationProviderProps {
    children: ReactNode,
}

interface AuthenticationContextData {
    loginPopUpClosed: boolean,
    // eslint-disable-next-line no-unused-vars
    Authenticating: (name: string, password: string) => void,
    needLogin: () => void,
    closeLoginPopUp: () => void

}

export const AuthenticationContext = createContext({} as AuthenticationContextData);

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [loginPopUpClosed, setLoginPopUpClosed] = useState(false);

  function needLogin() {
    setLoginPopUpClosed(true);
  }

  function closeLoginPopUp() {
    setLoginPopUpClosed(false);
  }

  async function Authenticating(name: string, password: string) {
    const response = await api.post('login', { name, password });
    cookies.set('token', `Bearer ${response.data}`);
    closeLoginPopUp();
    window.location.reload();
  }

  return (
    <AuthenticationContext.Provider value={{
      loginPopUpClosed,
      Authenticating,
      needLogin,
      closeLoginPopUp,
    }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
