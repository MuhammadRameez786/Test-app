import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Style from "./Music.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';


const Music = () => {
  const router = useRouter();
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://testapi.thedaygalpuclub.com/api/v1/collection");

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
    <div>
      <Slider {...musicSliderSettings}>
        {music.map((collection) => (
          <div key={collection._id} className={Style.slider_item}>
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
              <img
                src={collection.collectionImage}
                alt={collection.name}
                className={Style.slider_image}
              />
              <div className={Style.slider_info}>
                <div className={Style.slider_name}>{collection.name}</div>
                <div className={Style.slider_description}>
                  {collection.collectionDescription || 'No Discription'}
                  <h4>Seller ID:</h4> 
                  <p>{collection.seller.slice(0, 18)}...</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default Music;