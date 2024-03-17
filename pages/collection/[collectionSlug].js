import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import {
  Banner,
  NFTCardTwo,
} from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/componentsindex";

import Style from "../../collectionPage/collectionProfile/collectionProfile.module.css";
import images from "../../img";

const CollectionPage = () => {
  const router = useRouter();
  const { collectionSlug } = router.query;
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [nfts, setNfts] = useState({ description: "", image: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNfts, setTotalNfts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collection details
        const collectionDetailsResponse = await fetch(`https://api.opensea.io/api/v2/collections/${collectionSlug}`, {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        });
        const collectionDetailsData = await collectionDetailsResponse.json();
        setCollectionDetails(collectionDetailsData);
  
        // Fetch NFT listings
        const listingsResponse = await fetch(`https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/all`, {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        });
        const listingsData = await listingsResponse.json();
  
        if (listingsData && listingsData.listings) {
          let totalPrice = 0;
          const combinedData = listingsData.listings.map(listing => {
            const identifierOrCriteriaValues = listing.protocol_data.parameters.offer.map(offer => offer.identifierOrCriteria);
  
            let price;
            if (listing.price.current.decimals === 18) {
              price = Number(listing.price.current.value) / 10 ** 18;
            } else {
              price = listing.price.current.value;
            }
            totalPrice += price;
  
            return {
              identifierOrCriteriaValues,
              price
            };
          });
  
          setNfts(combinedData);
          setTotalPrice(totalPrice);
          setTotalNfts(listingsData.listings.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (collectionSlug) {
      fetchData();
    }
  }, [collectionSlug, setCollectionDetails, setNfts, setTotalPrice, setTotalNfts]);
  if (!collectionDetails) {
    return <div>Loading...</div>;
  }

  return (
      <div className={Style.collectionProfile}>
        <Banner bannerImage={images.creatorbackground1} />
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={collectionDetails.image_url || images.nft_image_1}
            alt="nft image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>{collectionDetails.name}</h1>
          <p>
          {collectionDetails.description ? `${collectionDetails.description.substring(0, 100)}...` : 'No Description'}
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
              <div
                className={Style.collectionProfile_box_middle_box_item}
              >
                <small>Total Volume</small>
                <p>{totalPrice.toFixed(2)} ETH</p>
              </div>
              <div
                className={Style.collectionProfile_box_middle_box_item}
              >
                <small>Listed Items</small>
                <p>{collectionDetails.total_supply}</p>
              </div>
          </div>
        </div>
      </div>
      <NFTCardTwo />
      <Slider />
      <Brand />
    </div>
    
  );
};

export default CollectionPage;
