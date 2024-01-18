import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title, MyCollections } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";


//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "7d64gf748849j47fy488444",
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  //IMPORT SMART CONTRACT DATA
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );


  //const [nfts, setNfts] = useState([]);
  const [nftsListed, setNFTsListed] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    const fetchMyNFTs = async () => {
      try {
        if (currentAccount) {
          const myItems = await fetchMyNFTsOrListedNFTs("fetchMyNFTs");
          //console.log('My NFTs:', myItems);
          setMyNFTs(myItems);
        }
      } catch (error) {
        console.error('Error fetching my NFTs:', error);
      }
    };
    fetchMyNFTs();
  }, [currentAccount, fetchMyNFTsOrListedNFTs]);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentAccount} />
      <div className={Style.title}>
        <div className={Style.title_box}>
          <h2>My NFT Collections</h2>
        </div>
      </div>
      <MyCollections />
      <AuthorTaps
        currentAccount={currentAccount}
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        
        ))}
      </div>
      <Brand />
      <myCollections />
    </div>
  );
};

export default author;