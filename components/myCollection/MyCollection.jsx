import React, { useState, useEffect, useContext } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

//Internal Import//

import Style from "./MyCollection.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
SwiperCore.use([Pagination]);

const MyCollections = () => {
  const { getUserCollections, currentAccount } = useContext(NFTMarketplaceContext);
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollections = await getUserCollections(currentAccount);
        setNftData(userCollections);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getUserCollections, currentAccount]);

  return (
    <div class={Style.slider_section}>
      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {/* Slides */}
        {nftData &&
          nftData.map((collection, index) => (
            <SwiperSlide key={index}>
              {/* Slider Box */}
              <div className={Style.slider_box}>
                {/* Image */}
                <div className={Style.slider_box_img}>
                  <img className={Style.box_main_img} src={collection.picture} alt={`NFT ${index}`} />
                </div>
                {/* Text */}
                <div className={Style.slider_box_text}>
                  <a href="#">{collection.name}</a>
                  <span className={Style.highest_bid}>{`Highest Bid ${index + 1}/10`}</span>
                  <div className={Style.price_like}>
                    {/* <span className="price">{`${collection.price} Eth`}</span> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MyCollections;