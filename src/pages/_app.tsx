/* eslint-disable react/prop-types */
import Header from '../components/Header';
import { AuthenticationProvider } from '../contexts/Authentication';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Header />
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}

export default MyApp;
