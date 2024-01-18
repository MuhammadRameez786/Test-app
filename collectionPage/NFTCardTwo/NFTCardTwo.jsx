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
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from '../../components/NFTCard/CountDown/CountDown';
import Style from "../../components/NFTCard/NFTCard.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NFTCardTwo = () => {

    const router = useRouter();
  const { collectionName } = router.query;
  
  //console.log("Collection Name >>", collectionName);

  const [nfts, setNfts] = useState([]);
    useEffect(() => {
      const eventSource = new EventSource(`https://testapi.thedaygalpuclub.com/api/v1/nfts?collectionName=${collectionName}`);
      eventSource.addEventListener("update", (event) => {
        const data = JSON.parse(event.data);
        setNfts(data);
      });
      return () => eventSource.close();
    }, [collectionName]);
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
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().getTime());
      }, 1000);
    
      return () => clearInterval(interval);
    }, []);
  
    const remainingTime = nfts.createAt - currentTime;
    const formatTime = (time) => {
      const days = Math.floor(time / (24 * 60 * 60 * 1000));
      const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
      let output = '';
      if (days > 0) {
        output += `${days} day${days > 1 ? 's' : ''} `;
      }
      if (hours > 0) {
        output += `${hours} hour${hours > 1 ? 's' : ''} `;
      }
      if (minutes > 0) {
        output += `${minutes} minute${minutes > 1 ? 's' : ''} `;
      }
      return output.trim();
    };
    
    
    
    const remainingTimeStr = formatTime(remainingTime);
  
    // console.log(NFTData);
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
            <Link href={{ pathname: "/NFT-details", query: el }}>
              <div className={Style.NFTCard_box} key={i + 1}>
                <div className={Style.NFTCard_box_img}>
                  <Image
                    src={el.image[0]}
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
  
                  <div className={Style.NFTCard_box_update_right}>
                    <div className={Style.NFTCard_box_update_right_info}>
                      <small>Remaining time</small>
                      <p> <CountdownTimer endTime={el.createAt} remainingTime={remainingTimeStr} /> </p>
                      {nfts.createAt}
                    </div>
                  </div>
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
                  <div className={Style.NFTCard_box_update_details_category}>
                    <BsImages />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  export default NFTCardTwo;
