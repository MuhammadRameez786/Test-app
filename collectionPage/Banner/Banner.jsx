import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import Style from "./Banner.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import images from "../../img";

const Banner = ({ bannerImage }) => {
  const router = useRouter();
  const { collectionSlug } = router.query;
  const { getUser, currentAccount } = useContext(NFTMarketplaceContext);
  const [userData, setUserData] = useState(null);
  const [collectionDetails, setCollectionDetails] = useState(null);
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const response = await fetch(`https://api.opensea.io/api/v2/collections/${collectionSlug}`, options);
        const data = await response.json();
        setCollectionDetails(data);
      } catch (error) {
        console.error('Error fetching collection details:', error);
      }
    };

    if (collectionSlug) {
      fetchCollectionDetails();
    }
  }, [collectionSlug]);
  if (!collectionDetails) {
    return <div>Loading...</div>;
  }

  const defaultBannerUrl =
    "https://res.cloudinary.com/dmesqweam/image/upload/v1705605183/default-banner_btnhjc.jpg";
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
      {collectionDetails && collectionDetails.banner_image_url ? (
          <img
            src={collectionDetails.banner_image_url}
            objectFit="cover"
            alt="background"
            height={300}
            className={Style.banner_image}
          />
        ) : (
          <img
            src={defaultBannerUrl}
            objectFit="cover"
            alt="background"
            height={300} 
            className={Style.banner_image}
          />
        )}
      </div>

      <div className={Style.banner_img_mobile}>
      {collectionDetails && collectionDetails.banner_image_url && (
        <Image
          src={collectionDetails.banner_image_url}
          objectFit="cover"
          alt="background"
          width={1600}
          height={500}
        />
        )}
      </div>
    </div>
  );
};

export default Banner;
