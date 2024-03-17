// _app.js
import "../styles/globals.css";
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import store from "../store";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { UserContextProvider } from "../Context/UserContext";
import { DataProvider } from "./DataContext";


const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <div>
      <Provider store={store}>
        <NFTMarketplaceProvider>
          <UserContextProvider>
          <DataProvider>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </DataProvider>
          </UserContextProvider>
        </NFTMarketplaceProvider>
      </Provider>
    </div>
  );
};

export default MyApp;


