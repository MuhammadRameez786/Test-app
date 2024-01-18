//import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// //INTERNAL IMPORT
// import Style from "./SliderCard.module.css";
// import images from "../../../img";
// import LikeProfile from "../../LikeProfile/LikeProfile";

// const SliderCard = ({ el, i }) => {
//   const [arts, setArts] = useState([]);

//   useEffect(() => {
//     const eventSource = new EventSource("https://testapi.thedaygalpuclub.com/api/v1/collection");

//     eventSource.addEventListener("nftCollection", (event) => {
//       const data = JSON.parse(event.data);
//       setArts(data.arts);
//     });

//     return () => {
//       eventSource.close();
//     };
//   }, []);
//   return (

//       <div>
//           {arts.map((collection) => (
//             <motion.div key={collection._id} className={Style.sliderCard}>
//               <div className={Style.sliderCard_box}>
//                 <motion.div className={Style.sliderCard_box_img}>
//                   <Image
//                     src={collection.collectionImage}
//                     className={Style.sliderCard_box_img_img}
//                     alt={collection.name}
//                     width={500}
//                     height={300}
//                     objectFit="cover"
//                   />
//                 </motion.div>
//                 <div className={Style.sliderCard_box_title}>
//                   <p>{collection.name}</p>
//                   <div className={Style.sliderCard_box_title_like}>
//                     {/* You can add your LikeProfile component here */}
//                     <small>{/* Your like count logic */}</small>
//                   </div>
//                 </div>
    
//                 <div className={Style.sliderCard_box_price}>
//                   <div className={Style.sliderCard_box_price_box}>
//                     <small>Seller ID</small>
//                     <p>{collection.seller.slice(0, 18)}...</p>
//                   </div>
    
//                   <div className={Style.sliderCard_box_price_time}>
//                     <small>Description</small>
//                     <p>{collection.collectionDescription || 'No Description'}</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//       </div>
    
//     // <motion.div className={Style.sliderCard}>
//     //   <div className={Style.sliderCard_box}>
//     //     <motion.div className={Style.sliderCard_box_img}>
//     //       <Image
//     //         src={el.background}
//     //         className={Style.sliderCard_box_img_img}
//     //         alt="slider profile"
//     //         width={500}
//     //         height={300}
//     //         objectFit="cover"
//     //       />
//     //     </motion.div>
//     //     <div className={Style.sliderCard_box_title}>
//     //       <p>NFT Video #1245</p>
//     //       <div className={Style.sliderCard_box_title_like}>
//     //         {/* <LikeProfile /> */}
//     //         <small>{i + 4} 0f 100</small>
//     //       </div>
//     //     </div>

//     //     <div className={Style.sliderCard_box_price}>
//     //       <div className={Style.sliderCard_box_price_box}>
//     //         <small>Seller ID</small>
//     //         <p>1.000 ETH</p>
//     //       </div>

//     //       <div className={Style.sliderCard_box_price_time}>
//     //         <small>Description</small>
//     //         <p>
//     //         3h : 15m : 20s
//     //         </p>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </motion.div>
//   );
// };

// export default SliderCard;

////////////////////////////////////////

// SliderCard.jsx

import React, { useState, useEffect } from "react";
import Style from "./SliderCard.module.css";
import axios from "axios";

const SliderCard = () => {
  const [arts, setArts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://testapi.thedaygalpuclub.com/api/v1/collection");
        const data = response.data;
        setArts(data.arts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % arts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + arts.length) % arts.length);
  };

  return (
    <div className={Style.sliderContainer}>
      {arts.map((collection, index) => (
        <div
          key={collection._id}
          className={`${Style.collectionCard} ${index === currentIndex ? Style.active : ""}`}
        >
          <div className={Style.collectionCardImage}>
            <img
              src={collection.collectionImage}
              className={Style.collectionCardImageImg}
              alt={collection.name}
            />
          </div>
          <div className={Style.collectionCardBody}>
            <h3 className={Style.collectionCardTitle}>{collection.name}</h3>
            <div className={Style.collectionCardMeta}>
              <p className={Style.collectionCardMetaItem}>Seller ID: {collection.seller.slice(0, 18)}...</p>
            </div>
            <p className={Style.collectionCardDescription}>{collection.collectionDescription || 'No Description'}</p>
          </div>
        </div>
      ))}
      <button className={Style.prevButton} onClick={prevSlide}>
        Prev
      </button>
      <button className={Style.nextButton} onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default SliderCard;

