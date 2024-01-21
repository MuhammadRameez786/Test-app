import React, { useState, useEffect } from "react";
import Style from "../../myCollections/MyCollections.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter } from 'next/router';

SwiperCore.use([Pagination, Navigation]);


const Arts = () => {
  const router = useRouter();
  const [arts, setArts] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://api.thedaygalpuclub.com/api/v1/collection");

    eventSource.addEventListener("nftCollection", (event) => {
      const data = JSON.parse(event.data);
      setArts(data.arts);
      console.log(data.arts);
    });

    return () => {
      eventSource.close();
    };
  }, []);


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
    {arts.map((collection) => (
      <SwiperSlide key={collection._id}>
        <div className={Style.slider_box}>
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
export default Arts;