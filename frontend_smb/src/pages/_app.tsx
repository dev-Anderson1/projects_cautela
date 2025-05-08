import type { AppProps } from 'next/app';
import { UserProvider } from '../contexts/UserContext';
import Layout from '@/components/layout/Layout'
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
    <Layout>
    
      <Component {...pageProps} />
   
    </Layout>
    </UserProvider>
  );
}

export default App;
