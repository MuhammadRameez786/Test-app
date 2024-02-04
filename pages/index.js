import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Arts,
  Music,
  Photography,
  Top3,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  // const { checkIfWalletConnected, currentAccount } = useContext(
  //   NFTMarketplaceContext
  // );
  // useEffect(() => {
  //   checkIfWalletConnected();
  // }, []);

  // const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // useEffect(() => {
  //   if (currentAccount) {
  //     fetchNFTs().then((items) => {
  //       if (items) {
  //         setNfts(items.reverse());
  //         setNftsCopy(items);
  //         console.log(nfts);
  //       }
  //     });
  //   }
  // }, []);
  

  //CREATOR LIST

  const creators = getTopCreators(nfts);
  // console.log(creators);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Trending in Art"
      />
      <Arts />
      <Title
        heading="Trending in Music"
      />
      <Music />
      <Title
        heading="Trending in Photography"
      />
      <Photography />
      <Title
        heading="Our Top Sellers"
        paragraph="Discover the most outstanding Sellers."
      />
      {/* <Top3 /> */}
      {/* <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      /> */}
      {/* <Filter /> */}
      {/* <NFTCard /> */}
      {/* {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />} */}
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Slider />
      <Subscribe />
      <Brand />
      <Video /> */}
    </div>
  );
};

export default Home;
