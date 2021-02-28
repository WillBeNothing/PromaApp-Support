/* eslint-disable react/prop-types */
import Header from '../components/Header';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
