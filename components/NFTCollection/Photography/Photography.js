import React, { useState, useEffect } from "react";
import Style from "../../myCollections/MyCollections.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import Link from "next/link";
import { useRouter } from 'next/router';

SwiperCore.use([Pagination]);

const Photography = () => {
  const router = useRouter();
  const [photography, setPhotography] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://testapi.thedaygalpuclub.com/api/v1/collection");

    eventSource.addEventListener("nftCollection", (event) => {
      const data = JSON.parse(event.data);
      setPhotography(data.photography);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const photographySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false
  };

  return (
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
    className={Style.slider_section}
  >
    {photography.map((collection) => (
      <SwiperSlide key={collection._id}>
        <div className={`${Style.slider_box} swiper-slide`}>
          <Link
            href={{
              pathname: `/collection`,
              query: {
                collectionName: collection.name,
                collectionImage: collection.collectionImage,
                collectionDescription: collection.collectionDescription,
              },
            }}
          >
            <a>
              <div className={Style.slider_box_img}>
              <img 
                src={collection.collectionImage}
                alt={collection.name}
                className={Style.box_main_img}
              />
              </div>
              <div className={Style.slider_box_text}>
                <div className={Style.slider_name}>{collection.name}</div>
                <div className={Style.highest_bid}>
                  {collection.collectionDescription || 'No Description'}
                  <h4>Seller ID:</h4> 
                  <p>{collection.seller.slice(0, 18)}...</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
};

export default Photography;