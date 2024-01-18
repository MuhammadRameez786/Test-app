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

  const { fetchNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {
    const fetchNFTsListed = async () => {
      try {
        if (currentAccount) {
          const itemsListed = await fetchNFTs("fetchItemsListed");
          //console.log('All NFTs:', itemsListed);
          setItemsListed(itemsListed);
        }
      } catch (error) {
        console.error('Error fetching listed NFTs:', error);
      }
    };
    fetchNFTsListed();

  }, [currentAccount, fetchNFTs]);


    useEffect(() => {
      if (itemsListed.length > 0) {
        
        const newSliderData = itemsListed.map((itemsListed) => {
          return {
            title: itemsListed.name,
            nftImage: itemsListed.image, //NFTimage
            name: itemsListed.seller,
            price: itemsListed.price,
            collection: "Glow Worm World",
            id: itemsListed._id,
            like: 243,
            image: images.user1,
          };
        });
    
        setSliderData1(newSliderData);
        console.log("new slider", newSliderData);
      }

    }, [itemsListed]);

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
    router.push('/NFT-details')
  }

  return (
    <div className={Style.bigNFTSlider}>
            <div className={Style.bigNFTSlider_box}>
              <div className={Style.bigNFTSlider_box_left}>
                <h2>{sliderData1[idNumber]?.title || 'Loading...'}</h2>
                <div className={Style.bigNFTSlider_box_left_creator}>
                  <div className={Style.bigNFTSlider_box_left_creator_profile}>
                    <Image
                      src={sliderData[idNumber].image}
                      alt="profile image"
                      width={50}
                      height={50}
                      className={Style.bigNFTSlider_box_left_creator_profile_img}
                    />
                    <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                      <p>Creator</p>
                      <h4>
                        {sliderData1[idNumber]?.name.slice(0, 15) + "..." || 'Loading...'}{" "}
                        <span>
                          <MdVerified />
                        </span>
                      </h4>
                    </div>
                  </div>
  
                  <div className={Style.bigNFTSlider_box_left_creator_collection}>
                    <AiFillFire
                      className={Style.bigNFTSlider_box_left_creator_collection_icon}
                    />
  
                    <div
                      className={Style.bigNFTSlider_box_left_creator_collection_info}
                    >
                      <p>Collection</p>
                      <h4>{sliderData[idNumber].collection}</h4>
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
  
                  {/* <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                    <MdTimer
                      className={Style.bigNFTSlider_box_left_bidding_box_icon}
                    />
                    <span>Auction ending in</span>
                  </p> */}
                  {/* {sliderData1[idNumber] && (
                    <CountdownTimer endTime={new Date(sliderData1[idNumber].time).getTime() + 30 * 24 * 60 * 60 * 1000} />
                  )} */}
                    <Link href={{ pathname: "/NFT-details", query: el }}>
                    <div className={Style.bigNFTSlider_box_left_button}>
                      <Button btnName="Place" handleClick={handleClick} />
                      <Button btnName="View" handleClick={() => { }} />
                    </div>
                    </Link>
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
                      src={sliderData1[idNumber]?.nftImage}
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
