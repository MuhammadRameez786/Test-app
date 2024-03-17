import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import  { FaEthereum } from "react-icons/fa";


//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import Button2 from "../Button2.jsx";
import { NFTTabs } from "../NFTDetailsIndex";
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = () => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [ethPrice, setEthPrice] = useState(null);
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [matchingNft, setMatchingNft] = useState(null);
  const { chain, contract, identifier } = router.query;
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [currentPriceInEther, setCurrentPriceInEther] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const [collectionImage, setCollectionImage] = useState(null);
  const [creatorName, setCreatorName] = useState(null);
  const [creatorImage, setCreatorImage] = useState(null);
  const [creatorBanner, setCreatorBanner] = useState(null);
  const [creatorAddress, setCreatorAddress] = useState(null);
  
  creatorBanner
  const [countdown, setCountdown] = useState(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setEthPrice(data.ethereum.usd))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const nftResponse = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/contract/${contract}/nfts/${identifier}`, options);
        const nftData = await nftResponse.json();
        //console.log("nft detail:", nftData.nft.creator);
        
        const collectionResponse = await fetch(`https://api.opensea.io/api/v2/collections/${nftData.nft.collection}`, options);
        const collectionData = await collectionResponse.json();
        //console.log("collection details:", collectionData);

        const creatorResponse = await fetch(`https://api.opensea.io/api/v2/accounts/${nftData.nft.creator}`, options);
        const creatorData = await creatorResponse.json();
        
        const listingResponse = await fetch(`https://api.opensea.io//api/v2/orders/${chain}/seaport/listings?asset_contract_address=${contract}&token_ids=${identifier}`, options);
        const listingData = await listingResponse.json();
        //console.log("Collection", listingData);

        const creatorBanner = creatorData.banner_image_url;
        const creatorAddress = creatorData.address;
        const creatorImage = creatorData.profile_image_url;
        const creatorName = creatorData.username;
        const nftcontract = nftData.nft.contract;
        const description = nftData.nft.description;
        const image_url = nftData.nft.image_url;
        const name = nftData.nft.name;
        const updated_at = nftData.nft.updated_at;
        const opensea_url = nftData.nft.opensea_url;
        const collectionName = collectionData.name;
        const collectionImage = collectionData.image_url
        const currentPriceInWei = listingData.orders[0].current_price;
        const currentPriceInEther = currentPriceInWei / 10 ** 18;
        
        setCurrentPriceInEther(listingData.orders[0].current_price / 10 ** 18);
        setCollectionName(collectionData.name);
        setCollectionImage(collectionData.image_url);
        setCollectionDetails(nftData);
        setCreatorName(creatorData.username);
        setCreatorImage(creatorData.profile_image_url);
        setCreatorAddress(creatorData.address);
      } catch (error) {
        console.error('Error fetching collection details:', error);
      }
    };

    if (chain && contract && identifier) {
      fetchCollectionDetails();
    }
    if (typeof window !== 'undefined' && collectionDetails && collectionDetails.nft.updated_at) {
      const calculateCountdown = (timestamp) => {
        const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(timestamp).getTime() + sixMonthsInMilliseconds;
        const now = new Date().getTime();
        const remainingTime = expirationDate - now;
  
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
        return { days, hours, minutes, seconds };
      };
  
      const updateCountdown = () => {
        setCountdown(calculateCountdown(collectionDetails.nft.updated_at));
      };
  
      // Initial call to update countdown
      updateCountdown();
  
      // Set up interval to update countdown every second
      countdownRef.current = setInterval(updateCountdown, 1000);
    }
  
    return () => {
      // Clear interval on component unmount
      clearInterval(countdownRef.current);
    };
  }, [chain, contract, identifier, collectionDetails]);

  if (!collectionDetails) {
    return <div>Loading...</div>;
  }
  const { nft } = collectionDetails;

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  const nftPriceEth = currentPriceInEther;
  const nftPriceUsd = nftPriceEth && ethPrice ? (nftPriceEth * ethPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...';

  const handleCollectionClick = () => {
    window.open('https://opensea.io/TheDayGalpuClub', '_blank');
};
  
  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
        {/* {matchingNft && matchingNft.category && (
          <p>{matchingNft.category}</p>
        )} */}
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {collectionDetails.nft.name}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={creatorImage}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                {creatorName && (
                      <span onClick={() => handleCollectionClick(creatorAddress)}>
                        {creatorName} <MdVerified />
                      </span>
                )}
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={collectionImage}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  {collectionName}
                </span>
              </div>
            </div>
          </div>
          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>Sale ending in:</span>
              {countdown && (
                <span>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</span>
              )}
            </p>
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Price</small>
                <p>
                <FaEthereum />{currentPriceInEther  || 'Loading...'} = {currentPriceInEther ? nftPriceUsd : 'Loading...'} 
                </p>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
            <Button2
              icon={<FaWallet />}
              btnName="Buy NFT"
              handleClick={collectionDetails.nft.opensea_url}
              classStyle={Style.button}
            />
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
