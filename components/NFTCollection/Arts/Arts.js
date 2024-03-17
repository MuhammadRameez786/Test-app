import React, { useState, useEffect } from "react";
// import Style from "../../myCollections/MyCollections.module.css"
import Style from "../Arts/Arts.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useData } from "../../../pages/DataContext";

SwiperCore.use([Pagination, Navigation]);

const Arts = () => {
  const router = useRouter();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const response = await fetch('https://api.opensea.io/api/v2/collections?chain=matic&creator_username=TheDayGalpuClub', options);
        const data = await response.json();
        setCollections(data.collections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCollectionClick = (collectionSlug) => {
    router.push(`/collection/${collectionSlug}`);
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{ clickable: true }}
      navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
      breakpoints={{
        500: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 20 },
      }}
      className={Style.slider_section}
    >
      {collections.map((collection) => (
        <SwiperSlide key={collection._id}>
          <div className={Style.slider_box} onClick={() => handleCollectionClick(collection.collection)}>
            <div className={Style.slider_box_img}>
              <img src={collection.image_url} alt={collection.name} className={Style.box_main_img} />
            </div>
            <div className={Style.slider_box_text}>
              <div className={Style.slider_name}>
                {collection.name.length > 25 ? `${collection.name.substring(0, 25)}...` : collection.name}
              </div>
              <div className={Style.highest_bid}>
                {collection.description ? `${collection.description.substring(0, 50)}...` : 'No Description'}
                <h4>Seller ID:</h4>
                <p>{collection.owner.slice(0, 18)}...</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Arts;