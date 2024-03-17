// import React, { useEffect, useState, useContext } from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { BsImages } from "react-icons/bs";
// import Image from "next/image";
// import Link from "next/link";
// import CountdownTimer from "./CountDown/CountDown";


// //INTERNAL IMPORT
// import Style from "./NFTCard.module.css";
// import images from "../../img";
// import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

// const NFTCard = () => {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const options = {
//           method: 'GET',
//           headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
//         };
//         const response = await fetch('https://api.opensea.io/api/v2/chain/matic/account/0x92ACEbA4aA807b587Cd07AB5Cf601e0DC5a2C9Ea/nfts', options);
//         const data = await response.json();
//         console.log("NFTs", data);
//         setCollections(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [like, setLike] = useState(true);
//   // const [currentPage, setCurrentPage] = useState(0);
//   // const [nftsPerPage, setNftsPerPage] = useState(9);

//   // const indexOfLastNft = currentPage * nftsPerPage;
//   // const indexOfFirstNft = indexOfLastNft - nftsPerPage;
//   // const currentNfts = itemsListed.slice(indexOfFirstNft, indexOfLastNft);

//   // const paginate = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   //   window.scrollTo(0, 0);
//   // };

//   const likeNft = () => {
//     if (!like) {
//       setLike(true);
//     } else {
//       setLike(false);
//     }
//   };

//   // console.log(NFTData);
//   return (
//     <div>
//       {/* <div className={Style.pagination}>
//           <ul className={Style.pagination_list}>
//             {itemsListed.length > nftsPerPage &&
//               Array(Math.ceil(itemsListed.length / nftsPerPage))
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
//         </div> */}
//       <div className={Style.NFTCard}>
//         {collections.map((el, i) => (
//           <Link href={{ pathname: "/NFT-details", query: el }}>
//             <div className={Style.NFTCard_box} key={i + 1}>
//               <div className={Style.NFTCard_box_img}>
//                 <Image
//                   src={el.image}
//                   alt="NFT images"
//                   width={600}
//                   height={600}
//                   className={Style.NFTCard_box_img_img}
//                 />
//               </div>

//               <div className={Style.NFTCard_box_update}>
//                 <div className={Style.NFTCard_box_update_left}>
//                   <div
//                     className={Style.NFTCard_box_update_left_like}
//                     onClick={() => likeNft()}
//                   >
//                     {like ? (
//                       <AiOutlineHeart />
//                     ) : (
//                       <AiFillHeart
//                         className={Style.NFTCard_box_update_left_like_icon}
//                       />
//                     )}
//                     {""} 22
//                   </div>
//                 </div>
//               </div>

//               <div className={Style.NFTCard_box_update_details}>
//                 <div className={Style.NFTCard_box_update_details_price}>
//                   <div className={Style.NFTCard_box_update_details_price_box}>
//                     <h4>
//                       {el.name}
//                     </h4>

//                     <div
//                       className={Style.NFTCard_box_update_details_price_box_box}
//                     >
//                       <div
//                         className={Style.NFTCard_box_update_details_price_box_bid}
//                       >
//                         <small>Price</small>
//                         <p>{el.price}ETH</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={Style.NFTCard_box_update_details_category}>
//                   <BsImages />
//                 </div>
//               </div>
//             </div>
//           </Link>
          
//         ))}
        
//       </div>
//     </div>
//   );
// };
// // import { useRouter } from 'next/router';
// // import { useState, useEffect } from 'react';
// // import Slider from 'react-slick';
// // import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// // import { BsImages } from "react-icons/bs";
// // import Image from "next/image";
// // import Link from "next/link";
// // import CountdownTimer from '../../components/NFTCard/CountDown/CountDown';
// // //import Style from "../../components/NFTCard/NFTCard.module.css";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import axios from 'axios';
// // import { useData } from '../../pages/DataContext';
// // const NFTCard = () => {
// //   const { collectionData, setCollectionData } = useData();
// //   const { collectionName } = collectionData;
// //   const router = useRouter();
// //   const { collectionSlug } = router.query;
// //   //const [collectionName, setCollectionName] = useState("");
// //   const [price, setPrice] = useState(0);

// //   //console.log("Collection Name >>", collectionName);
// //   const [nfts, setNfts] = useState([]);
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const options = {
// //           method: 'GET',
// //           headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
// //         };
  
// //         // Fetch NFTs data
// //         const nftsResponse = await fetch(`https://api.opensea.io/api/v2/chain/matic/account/0x92ACEbA4aA807b587Cd07AB5Cf601e0DC5a2C9Ea/nfts`, options);
// //         const nftsData = await nftsResponse.json();
// //         console.log("NFTsDAta", nftsData);
// //         // Fetch Collections data
// //         const listingsResponse = await fetch(`https://api.opensea.io/api/v2/listings/collection/${nftsData.nfts.collection}/all`, options);
// //         const listingsData = await listingsResponse.json();
// //         console.log("Collections", listingsData);
  
// //         if (nftsData && nftsData.nfts && nftsData.nfts.length > 0) {
// //           const identifierValues = nftsData.nfts.map(nft => nft.identifier);
// //         }
// //         if (listingsData && listingsData.listings) {
// //           const combinedData = listingsData.listings.map(listing => {
// //             const identifierOrCriteriaValues = listing.protocol_data.parameters.offer.map(offer => offer.identifierOrCriteria);
// //             const owner = listing.protocol_data.parameters.offerer;
// //             const chain = listing.chain;
// //             let price;
// //             if (listing.price.current.decimals === 18) {
// //               price = Number(listing.price.current.value) / 10 ** 18;
// //             } else {
// //               price = listing.price.current.value;
// //             }
// //             return {
// //               identifierOrCriteriaValues,
// //               price,
// //               owner,
// //               collectionName,
// //               chain,
// //             };
// //           });
        
// //           if (nftsData && nftsData.nfts && nftsData.nfts.length > 0) {
// //             const updatedNfts = nftsData.nfts.map(nft => {
// //               const matchingListing = combinedData.find(listing => listing.identifierOrCriteriaValues.includes(nft.identifier));
// //               if (matchingListing) {
// //                 return {
// //                   ...nft,
// //                   price: matchingListing.price,
// //                   owner: matchingListing.owner, 
// //                   collectionName: matchingListing.collectionName,
// //                   chain: matchingListing.chain,
// //                 };
// //               } else {
// //                 return nft;
// //               }
// //             });
// //             console.log("Updated NFTs:", updatedNfts);
// //             setNfts(updatedNfts);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };
  
// //     if (collectionSlug) {
// //       fetchData();
// //     }
// //   }, [collectionSlug]);
  
// //   const handleCollectionClick = (chain, contract, identifier) => {
// //     const url = `/assets/${chain}/${contract}/${identifier}`;
// //     router.push(url);
// //   };

// //   const [like, setLike] = useState(true);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [nftsPerPage, setNftsPerPage] = useState(9);
// //   const [currentTime, setCurrentTime] = useState(new Date().getTime());

// //   // const indexOfLastNft = currentPage * nftsPerPage;
// //   // const indexOfFirstNft = indexOfLastNft - nftsPerPage;
// //   // const currentNfts = nfts.slice(indexOfFirstNft, indexOfLastNft);

// //   const paginate = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //     window.scrollTo(0, 0);
// //   };

// //   const likeNft = () => {
// //     if (!like) {
// //       setLike(true);
// //     } else {
// //       setLike(false);
// //     }
// //   };
// //   const getExpirationDate = (updatedAt) => {
// //     const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000; // Six months in milliseconds
// //     const expirationDateInMillis = new Date(updatedAt).getTime() + sixMonthsInMillis;
// //     return expirationDateInMillis;
// //   };

// //   const [remainingTime, setRemainingTime] = useState({});
// //   useEffect(() => {
// //     // Calculate remaining time for each NFT
// //     const calculateRemainingTime = () => {
// //       const now = new Date().getTime();
// //       if (nfts) {
// //         const updatedTimes = nfts.map((nft) => ({
// //           id: nft.identifier,
// //           remainingTime: getExpirationDate(nft.updated_at) - now,
// //         }));
// //         setRemainingTime(updatedTimes);
// //       }
// //     };
  
// //     calculateRemainingTime();
  
// //     // Update remaining time every second
// //     const interval = setInterval(() => {
// //       calculateRemainingTime();
// //     }, 1000);
  
// //     return () => clearInterval(interval);
// //   }, [nfts]);

  

// //   return (
// //     <div>
// //       {/* <div className={Style.pagination}>
// //             <ul className={Style.pagination_list}>
// //               {nfts.length > nftsPerPage &&
// //                 Array(Math.ceil(nfts.length / nftsPerPage))
// //                   .fill()
// //                   .map((_, i) => (
// //                     <li key={i}>
// //                       <button
// //                         className={Style.pagination_btn}
// //                         onClick={() => setCurrentPage(i+1)}
// //                       >
// //                         {i + 1}
// //                       </button>
// //                     </li>
// //                   ))}
// //             </ul>
// //           </div> */}
// //       <div className={Style.NFTCard}>
// //         {nfts && nfts.map((el, i) => (
// //             <div className={Style.NFTCard_box} key={i + 1} onClick={() => handleCollectionClick(el.chain, el.contract, el.identifier, el.price)}>
// //               <div className={Style.NFTCard_box_img}>
// //                 <Image
// //                   src={el.image_url}
// //                   alt="NFT images"
// //                   width={600}
// //                   height={600}
// //                   className={Style.NFTCard_box_img_img}
// //                 />
// //               </div>

// //               <div className={Style.NFTCard_box_update}>
// //                 <div className={Style.NFTCard_box_update_left}>
// //                   <div
// //                     className={Style.NFTCard_box_update_left_like}
// //                     onClick={() => likeNft()}
// //                   >
// //                     {like ? (
// //                       <AiOutlineHeart />
// //                     ) : (
// //                       <AiFillHeart
// //                         className={Style.NFTCard_box_update_left_like_icon}
// //                       />
// //                     )}
// //                     {""} 22
// //                   </div>
// //                 </div>

// //                 {/* <div className={Style.NFTCard_box_update_right}>
// //                   <div className={Style.NFTCard_box_update_right_info}>
// //                     <small>Remaining time</small>
// //                     <CountdownTimer endTime={remainingTime.find((item) => item.id === el.identifier)?.remainingTime} />
// //                   </div>
// //                 </div> */}
// //               </div>
// //               <div className={Style.NFTCard_box_update_details}>
// //                 <div className={Style.NFTCard_box_update_details_price}>
// //                   <div className={Style.NFTCard_box_update_details_price_box}>
// //                     <h4>
// //                       {el.name}
// //                     </h4>
// //                     <div
// //                       className={Style.NFTCard_box_update_details_price_box_box}
// //                     >
// //                       <div
// //                         className={Style.NFTCard_box_update_details_price_box_bid}
// //                       >
// //                         <small>Current Price</small>
// //                         <p>{el.price}ETH</p>
// //                       </div>
// //                       {/* <div
// //                           className={
// //                             Style.NFTCard_box_update_details_price_box_stock
// //                           }
// //                         >
// //                           <small>61 in stock</small>
// //                         </div> */}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// export default NFTCard;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import Style from './NFTCard.module.css';
import { useRouter } from 'next/router';

const NFTCard = () => {
  const [collections, setCollections] = useState([]);
  const [like, setLike] = useState(true);
  const router = useRouter();
  function chain() {
    return 'matic';
  }
  function contract() {
    return '0x2953399124f0cbb46d2cbacd8a89cf0599974963'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const responseOne = await fetch('https://api.opensea.io/api/v2/collection/feather-baret-brigade/nfts?limit=200', options);
        const dataOne = await responseOne.json();

        const responseTwo = await fetch('https://api.opensea.io/api/v2/collection/king-kanga-gang1/nfts?limit=200', options);
        const dataTwo = await responseTwo.json();

        const responseThree = await fetch('https://api.opensea.io/api/v2/collection/rise-of-ninja-turtlez/nfts?limit=200', options);
        const dataThree = await responseThree.json();

        const combinedNfts = [
          ...dataOne.nfts,
          ...dataTwo.nfts,
          ...dataThree.nfts
        ];
        setCollections(combinedNfts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 

  const handleCollectionClick = (identifier) => {
    const chainName = chain(); // Assuming chainName is always 'matic'
    const contractName = contract();
    console.log(chainName, contractName, identifier);
    const url = `/assets/${chainName}/${contractName}/${identifier}`;
    router.push(url);
  };

  const likeNft = () => {
        if (!like) {
          setLike(true);
        } else {
          setLike(false);
        }
      };

  return (
    <div>
      <div className={Style.NFTCard}>
      {collections && collections.map((el, i) => (
          <div className={Style.NFTCard_box} key={i + 1} onClick={() => handleCollectionClick(el.identifier)}>
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
            {/* <div className={Style.NFTCard_box_update_left}>
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
            </div> */}

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
                <p>
                  {el.description ? `${el.description.substring(0, 50)}...` : 'No Description'}
                </p>
                <div
                  className={Style.NFTCard_box_update_details_price_box_box}
                >
                  <div
                    className={Style.NFTCard_box_update_details_price_box_bid}
                  >
                    <small>Current Price</small>
                    <p>See NFT Detail</p>
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

export default NFTCard;
