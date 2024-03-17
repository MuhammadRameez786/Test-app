import React, { useState, useEffect } from "react";
import Style from "../../myCollections/MyCollections.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from 'axios';

SwiperCore.use([Pagination]);


const Music = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const response = await fetch('https://api.opensea.io/api/v2/chain/matic/contract/0x2953399124f0cbb46d2cbacd8a89cf0599974963/nfts/66343199938077467940702464459184054508393291914884951213859369473506709340161', options);
        const data = await response.json();
        console.log("arts", data);
        setCollections(data.collections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once on component moun

  ///////////////////////////
  const router = useRouter();
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://api.thedaygalpuclub.com/api/v1/collection");

    eventSource.addEventListener("nftCollection", (event) => {
      const data = JSON.parse(event.data);
      
      setMusic(data.music);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const musicSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
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
    {music.map((collection) => (
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

export default Music;