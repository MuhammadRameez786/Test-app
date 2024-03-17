// import React, { useState } from "react";
// import Image from "next/image";
// import { BsImage } from "react-icons/bs";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { MdVerified, MdTimer } from "react-icons/md";
// import Link from "next/link";

// //INTERNAL IMPORT
// import Style from "./NFTCardTwo.module.css";
// import { LikeProfile } from "../../components/componentsindex";
// import images from "/img";

// const NFTCardTwo = ({ NFTData }) => {
//   if (!NFTData) {
//     return (
//       <div className="card-container">
//         <Image src={images.loader} className="loader-gif" alt="Loading..." />
//       </div>
//     );
//   }

//   const [like, setLike] = useState(false);
//   const [likeInc, setLikeInc] = useState(21);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [nftsPerPage, setNftsPerPage] = useState(6);

//   const likeNFT = () => {
//     if (!like) {
//       setLike(true);
//       setLikeInc(23);
//     } else {
//       setLike(false);
//       setLikeInc(23 + 1);
//     }
//   };
//   const indexOfLastNft = currentPage * nftsPerPage;
//   const indexOfFirstNft = indexOfLastNft - nftsPerPage;
//   const currentNfts = NFTData.slice(indexOfFirstNft, indexOfLastNft);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//     <div className={Style.pagination}>
//           <ul className={Style.pagination_list}>
//             {NFTData.length > nftsPerPage &&
//               Array(Math.ceil(NFTData.length / nftsPerPage))
//                 .fill()
//                 .map((_, i) => (
//                   <li key={i}>
//                     <button
//                       className={Style.pagination_btn}
//                       onClick={() => setCurrentPage(i+1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}
//           </ul>
//         </div>
//     <div className={Style.NFTCardTwo}>
//       {currentNfts.map((el, i) => (
//         <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
//           <div className={Style.NFTCardTwo_box} key={i + 1}>
//             <div className={Style.NFTCardTwo_box_like}>
//               <div className={Style.NFTCardTwo_box_like_box}>
//                 <div className={Style.NFTCardTwo_box_like_box_box}>
//                   <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
//                   <p onClick={() => likeNFT()}>
//                     {like ? <AiOutlineHeart /> : <AiFillHeart />}
//                     {""}
//                     <span>{likeInc + 1}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className={Style.NFTCardTwo_box_img}>
//               <Image
//                 src={el.image}
//                 alt="NFT"
//                 width={500}
//                 height={500}
//                 objectFit="cover"
//                 className={Style.NFTCardTwo_box_img_img}
//               />
//             </div>

//             <div className={Style.NFTCardTwo_box_info}>
//               <div className={Style.NFTCardTwo_box_info_left}>
//                 <LikeProfile />
//                 <p>{el.name}</p>
//               </div>
//               <small>4{i + 2}</small>
//             </div>

//             <div className={Style.NFTCardTwo_box_price}>
//               <div className={Style.NFTCardTwo_box_price_box}>
//                 <small>Current Bid</small>
//                 <p>{el.price || i + 4} ETH</p>
//               </div>
//               <p className={Style.NFTCardTwo_box_price_stock}>
//                 <MdTimer /> <span>{i + 1} hours left</span>
//               </p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default NFTCardTwo;
/////////////////////////////////////////////////

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from '../../components/NFTCard/CountDown/CountDown';
import Style from "../../components/NFTCard/NFTCard.module.css";
import { getCombinedData } from '../collectionProfile/collectionProfile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useData } from '../../pages/DataContext';

const getExpirationDate = (updatedAt) => {
  const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000; // Six months in milliseconds
  const expirationDateInMillis = new Date(updatedAt).getTime() + sixMonthsInMillis;
  return expirationDateInMillis;
};

const NFTCardTwo = () => {
  const { collectionData, setCollectionData } = useData();
  const { collectionName } = collectionData;
  const router = useRouter();
  const { collectionSlug } = router.query;
  //const [collectionName, setCollectionName] = useState("");
  const [price, setPrice] = useState(0);

  //console.log("Collection Name >>", collectionName);
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
  
        // Fetch NFTs data
        const nftsResponse = await fetch(`https://api.opensea.io/api/v2/collection/${collectionSlug}/nfts`, options);
        const nftsData = await nftsResponse.json();
        console.log("Nftdata", nftsData);
        // Fetch Collections data
        const listingsResponse = await fetch(`https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/all`, options);
        const listingsData = await listingsResponse.json();
        console.log("Collections", listingsData);
  
        if (nftsData && nftsData.nfts && nftsData.nfts.length > 0) {
          const identifierValues = nftsData.nfts.map(nft => nft.identifier);
        }
        if (listingsData && listingsData.listings) {
          const combinedData = listingsData.listings.map(listing => {
            const identifierOrCriteriaValues = listing.protocol_data.parameters.offer.map(offer => offer.identifierOrCriteria);
            const owner = listing.protocol_data.parameters.offerer;
            const chain = listing.chain;
            let price;
            if (listing.price.current.decimals === 18) {
              price = Number(listing.price.current.value) / 10 ** 18;
            } else {
              price = listing.price.current.value;
            }
            return {
              identifierOrCriteriaValues,
              price,
              owner,
              collectionName,
              chain,
            };
          });
        
          if (nftsData && nftsData.nfts && nftsData.nfts.length > 0) {
            const updatedNfts = nftsData.nfts.map(nft => {
              const matchingListing = combinedData.find(listing => listing.identifierOrCriteriaValues.includes(nft.identifier));
              if (matchingListing) {
                return {
                  ...nft,
                  price: matchingListing.price,
                  owner: matchingListing.owner, 
                  collectionName: matchingListing.collectionName,
                  chain: matchingListing.chain,
                };
              } else {
                return nft;
              }
            });
            console.log("Updated NFTs:", updatedNfts);
            setNfts(updatedNfts);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (collectionSlug) {
      fetchData();
    }
  }, [collectionSlug]);
  
  const handleCollectionClick = (chain, contract, identifier) => {
    const url = `/assets/${chain}/${contract}/${identifier}`;
    router.push(url);
  };

  const [like, setLike] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [nftsPerPage, setNftsPerPage] = useState(9);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  // const indexOfLastNft = currentPage * nftsPerPage;
  // const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  // const currentNfts = nfts.slice(indexOfFirstNft, indexOfLastNft);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  const getExpirationDate = (updatedAt) => {
    const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000; // Six months in milliseconds
    const expirationDateInMillis = new Date(updatedAt).getTime() + sixMonthsInMillis;
    return expirationDateInMillis;
  };

  const [remainingTime, setRemainingTime] = useState({});
  useEffect(() => {
    // Calculate remaining time for each NFT
    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      if (nfts) {
        const updatedTimes = nfts.map((nft) => ({
          id: nft.identifier,
          remainingTime: getExpirationDate(nft.updated_at) - now,
        }));
        setRemainingTime(updatedTimes);
      }
    };
  
    calculateRemainingTime();
  
    // Update remaining time every second
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);
  
    return () => clearInterval(interval);
  }, [nfts]);

  

  return (
    <div>
      {/* <div className={Style.pagination}>
            <ul className={Style.pagination_list}>
              {nfts.length > nftsPerPage &&
                Array(Math.ceil(nfts.length / nftsPerPage))
                  .fill()
                  .map((_, i) => (
                    <li key={i}>
                      <button
                        className={Style.pagination_btn}
                        onClick={() => setCurrentPage(i+1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
            </ul>
          </div> */}
      <div className={Style.NFTCard}>
        {nfts && nfts.map((el, i) => (
            <div className={Style.NFTCard_box} key={i + 1} onClick={() => handleCollectionClick(el.chain, el.contract, el.identifier, el.price)}>
              <div className={Style.NFTCard_box_img}>
                <Image
                  src={el.image_url}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                />
              </div>

              <div className={Style.NFTCard_box_update}>
                <div className={Style.NFTCard_box_update_left}>
                  <div
                    className={Style.NFTCard_box_update_left_like}
                    onClick={() => likeNft()}
                  >
                    {like ? (
                      <AiOutlineHeart />
                    ) : (
                      <AiFillHeart
                        className={Style.NFTCard_box_update_left_like_icon}
                      />
                    )}
                    {""} 22
                  </div>
                </div>

                {/* <div className={Style.NFTCard_box_update_right}>
                  <div className={Style.NFTCard_box_update_right_info}>
                    <small>Remaining time</small>
                    <CountdownTimer endTime={remainingTime.find((item) => item.id === el.identifier)?.remainingTime} />
                  </div>
                </div> */}
              </div>
              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h4>
                      {el.name}
                    </h4>
                    <div
                      className={Style.NFTCard_box_update_details_price_box_box}
                    >
                      <div
                        className={Style.NFTCard_box_update_details_price_box_bid}
                      >
                        <small>Current Price</small>
                        <p>{el.price}ETH</p>
                      </div>
                      {/* <div
                          className={
                            Style.NFTCard_box_update_details_price_box_stock
                          }
                        >
                          <small>61 in stock</small>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
export default NFTCardTwo;
 
