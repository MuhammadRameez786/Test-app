import React, { useState, useEffect, useCallback, useContext } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import  { FaEthereum } from "react-icons/fa";
import { useRouter } from 'next/router'
import Link from "next/link";


//INTERNAL IMPORT
import Style from "./BigNFTSilder.module.css";
import images from "../../img";
import Button from "../Button/Button";
import CountdownTimer from "./CountdownTimer/CountdownTimer";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const BigNFTSilder = ({ el }) => {
  const router = useRouter()
  const [idNumber, setIdNumber] = useState(0);
  const [nfts, setNFTs] = useState([]);
  const [sliderData1, setSliderData1] = useState([]);
  const [ethPrice, setEthPrice] = useState(null);
  const [itemsListed, setItemsListed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        
        // Fetching NFTs
        const assetContractAddress = '0x2953399124f0cbb46d2cbacd8a89cf0599974963';
        const tokenIds = [
          '66343199938077467940702464459184054508393291914884951213859369476805244223489', 
          '66343199938077467940702464459184054508393291914884951213859369461412081434625',
          '66343199938077467940702464459184054508393291914884951213859369417431616323585',
          '66343199938077467940702464459184054508393291914884951213859369475705732595713',
          '66343199938077467940702464459184054508393291914884951213859369460312569806849',
          '66343199938077467940702464459184054508393291914884951213859369430625755856897'
        ];
  
        const baseUrl = 'https://api.opensea.io/api/v2/orders/matic/seaport/listings';
        const tokenIdsParam = tokenIds.map(id => `token_ids=${id}`).join('&');
        const assetContractParam = `asset_contract_address=${assetContractAddress}`;
        const nftUrl = `${baseUrl}?${assetContractParam}&${tokenIdsParam}`;
  
        const nftResponse = await fetch(nftUrl, options);
        const nftData = await nftResponse.json();
        //console.log("Top5", nftData)
  
        if (nftData && nftData.orders) {
          const combinedData = nftData.orders.map(order => {
            const nftName = order.maker_asset_bundle.assets.map(assets => assets.name);
            const nftDescription = order.maker_asset_bundle.assets.map(assets => assets.description);
            const nftContract = order.maker_asset_bundle.assets.map(assets => assets.asset_contract.address);
            const nftImage = order.maker_asset_bundle.assets.map(assets => assets.image_url);
            const nftUrl = order.maker_asset_bundle.assets.map(assets => assets.permalink);
            const nftOwner = order.maker.address;
            const nftCreated = order.created_date;
            const nftCollection = order.maker_asset_bundle.assets.map(assets => assets.collection.name);
            const collectionImage = order.maker_asset_bundle.assets.map(assets => assets.collection.image_url);
            const nftPriceWei = order.current_price;
            const nftPriceEth = nftPriceWei / 10**18;
            
            return {
              nftName,
              nftDescription,
              nftContract,
              nftImage,
              nftUrl,
              nftOwner,
              nftCreated,
              nftCollection,
              collectionImage,
              nftPriceEth,
            };
          });
        
          //console.log("Combined NFT Data:", combinedData);
  
          // Fetching owner data
          const ownerResponse = await fetch('https://api.opensea.io/api/v2/accounts/0x92ACEbA4aA807b587Cd07AB5Cf601e0DC5a2C9Ea', options);
          const ownerData = await ownerResponse.json();
          //console.log("Owner Data:", ownerData);
  
          if (ownerData) {
            const { username, profile_image_url } = ownerData;
            //console.log("Username:", username);
            //console.log("Profile Image URL:", profile_image_url);
  
            // Combine data and set state
            const newSliderData = combinedData.map((data) => {
              const nftImage = Array.isArray(data.nftImage) ? data.nftImage[0] : data.nftImage;
              const nftUrl = Array.isArray(data.nftUrl) ? data.nftUrl[0] : data.nftUrl;
              const nftDescription = Array.isArray(data.nftDescription) ? data.nftDescription[0] : data.nftDescription;
              const nftContract = Array.isArray(data.nftContract) ? data.nftContract[0] : data.nftContract;
              //const nftName = Array.isArray(data.nftName) ? data.nftName[0] : data.nftName;
              const collectionImage = Array.isArray(data.collectionImage) ? data.collectionImage[0] : data.collectionImage;
              return {
                name: data.nftName,
                image_url: nftImage,
                opensea_url: nftUrl,
                nftOwner: username, // Replace 'name' with 'username' from ownerData
                profileImage: profile_image_url, // Add 'profileImage' field with 'profile_image_url' from ownerData
                price: data.nftPriceEth,
                collectionName: data.nftCollection,
                collectionImage: collectionImage,
                updated_at: data.nftCreated,
                contract: nftContract,
                nftdescription: nftDescription,
                id: data.nftId,
                like: 243,
                image: images.user1,
              };
            });
  
            setSliderData1(newSliderData);
            //console.log("New Slider Data:", newSliderData);
          } 
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

    const sliderData = [
      {
        title: "Hello NFT",
        id: 1,
        name: "Daulat Hussain",
        collection: "GYm",
        price: "00664 ETH",
        like: 243,
        image: images.user1,
        nftImage: images.nft_image_1,
        time: {
          days: 21,
          hours: 40,
          minutes: 81,
          seconds: 15,
        },
      },
      {
        title: "Buddy NFT",
        id: 2,
        name: "Shoaib Hussain",
        collection: "Home",
        price: "0000004 ETH",
        like: 243,
        image: images.user2,
        nftImage: images.nft_image_2,
        time: {
          days: 77,
          hours: 11,
          minutes: 21,
          seconds: 45,
        },
      },
      {
        title: "Gym NFT",
        id: 3,
        name: "Raayan Hussain",
        collection: "GYm",
        price: "0000064 ETH",
        like: 243,
        image: images.user3,
        nftImage: images.nft_image_3,
        time: {
          days: 37,
          hours: 20,
          minutes: 11,
          seconds: 55,
        },
      },
      {
        title: "Home NFT",
        id: 4,
        name: "Raayan Hussain",
        collection: "GYm",
        price: "4664 ETH",
        like: 243,
        image: images.user4,
        nftImage: images.nft_image_1,
        time: {
          days: 87,
          hours: 29,
          minutes: 10,
          seconds: 15,
        },
      },
      {
        title: "Home NFT",
        id: 5,
        name: "Raayan Hussain",
        collection: "GYm",
        price: "4664 ETH",
        like: 243,
        image: images.user4,
        nftImage: images.nft_image_1,
        time: {
          days: 87,
          hours: 29,
          minutes: 10,
          seconds: 15,
        },
      },
      {
        title: "Home NFT",
        id: 6,
        name: "Nasir Hussain",
        collection: "GYm",
        price: "4664 ETH",
        like: 243,
        image: images.user4,
        nftImage: images.nft_image_1,
        time: {
          days: 87,
          hours: 29,
          minutes: 10,
          seconds: 15,
        },
      },
    ];

    useEffect(() => {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => setEthPrice(data.ethereum.usd))
        .catch(error => console.log(error));
    }, []);

    const nftPriceEth = sliderData1[idNumber]?.price;
    const nftPriceUsd = nftPriceEth && ethPrice ? (nftPriceEth * ethPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...';
    //console.log("SliderData", sliderData1);


  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData1.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData1.length]);
  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  function handleClick() {
    const queryObject = {
      name: sliderData1[idNumber]?.name,
      image_url: sliderData1[idNumber]?.image_url,
      nftOwner: sliderData1[idNumber]?.nftOwner,
      profileImage: sliderData1[idNumber]?.profileImage,
      price: sliderData1[idNumber]?.price,
      collectionName: sliderData1[idNumber]?.collectionName,
      collectionImage: sliderData1[idNumber]?.collectionImage,
      updated_at: sliderData1[idNumber]?.updated_at,
      contract: sliderData1[idNumber]?.contract,
      nftdescription: sliderData1[idNumber]?.nftdescription,
      opensea_url: sliderData1[idNumber]?.opensea_url,
    };
    router.push({
      pathname: '/NFT-details',
      query: queryObject,
    });
  }


  return (
    <div className={Style.bigNFTSlider}>
            <div className={Style.bigNFTSlider_box}>
              <div className={Style.bigNFTSlider_box_left}>
                <h2>{sliderData1[idNumber]?.name || 'Loading...'}</h2>
                <div className={Style.bigNFTSlider_box_left_creator}>
                  <div className={Style.bigNFTSlider_box_left_creator_profile}>
                  {sliderData1[idNumber] && sliderData1[idNumber].profileImage && (
                    <Image
                      src={sliderData1[idNumber].profileImage}
                      alt="profile image"
                      width={50}
                      height={50}
                      className={Style.bigNFTSlider_box_right_box_img}
                    />
                  )}
                    <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                      <p>Creator</p>
                      <h4>
                        {sliderData1[idNumber]?.nftOwner.slice(0, 15) + "..." || 'Loading...'}{" "}
                        <span>
                          <MdVerified />
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className={Style.bigNFTSlider_box_left_creator_collection}>
                  {sliderData1[idNumber] && sliderData1[idNumber].profileImage && (
                    <Image
                      src={sliderData1[idNumber].collectionImage}
                      alt="profile image"
                      width={50}
                      height={50}
                      className={Style.bigNFTSlider_box_right_box_img}
                    />
                  )}
                    <div
                      className={Style.bigNFTSlider_box_left_creator_collection_info}
                    >
                      <p>Collection</p>
                      {sliderData1[idNumber] && sliderData1[idNumber].collectionName && (
                        <h4>{sliderData1[idNumber].collectionName}</h4>
                      )}
                    </div>
                  </div>
                </div>
  
                <div className={Style.bigNFTSlider_box_left_bidding}>
                  <div className={Style.bigNFTSlider_box_left_bidding_box}>
                    <small>Price</small>
                    {/* <p>
                      {sliderData1[idNumber]?.price  || 'Loading...'} 
                    </p> */}
                    <p>
                    <FaEthereum />{sliderData1[idNumber]?.price  || 'Loading...'} = {sliderData1[idNumber]?.price ? nftPriceUsd : 'Loading...'} 
                    </p>
                  </div>
                    <div className={Style.bigNFTSlider_box_left_button}>
                      <div className={Style.bigNFTSlider_box_left_button}>
                        <Button btnName="Place" handleClick={handleClick} />
                        <Button btnName="View" handleClick={handleClick } />
                      </div>
                    </div>
                </div>
  
                <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                  <TbArrowBigLeftLines
                    className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                    onClick={() => dec()}
                  />
                  <TbArrowBigRightLine
                    className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                    onClick={() => inc()}
                  />
                </div>
              </div>
  
              <div className={Style.bigNFTSlider_box_right}>
                <div className={Style.bigNFTSlider_box_right_box}>
                <Image
                      src={sliderData1[idNumber]?.image_url}
                      alt="NFT IMAGE"
                      width={1000}
                      height={1000}
                      className={Style.bigNFTSlider_box_right_box_img}
                    />

                  <div className={Style.bigNFTSlider_box_right_box_like}>
                    <AiFillHeart />
                    <span>{sliderData[idNumber].like}</span>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
    
};

export default BigNFTSilder;
