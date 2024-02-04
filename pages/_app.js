// _app.js
import "../styles/globals.css";
import { useRouter } from 'next/router';

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";


const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <div>
        <NFTMarketplaceProvider>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
        </NFTMarketplaceProvider>
    </div>
  );
};

export default MyApp;


