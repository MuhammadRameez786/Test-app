import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import images from "../../img";

const collectionProfile = () => {
  const router = useRouter();
  const { collectionName, collectionImage, collectionDescription, collectionSlug } = router.query;
  const [nfts, setNfts] = useState({ description: "", image: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNfts, setTotalNfts] = useState(0);
  const [collection, setCollection] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const response = await fetch(`https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/all`, options);
        const data = await response.json();
        if (data && data.listings) {
          let totalPrice = 0;
          data.listings.forEach(listing => {
            if (listing.price && listing.price.current) {
              let price;
              if (listing.price.current.decimals === 18) {
                price = Number(listing.price.current.value) / 10 ** 18;
              } else {
                price = Number(listing.price.current.value);
              }
              totalPrice += price;
            }
          });
          setTotalPrice(totalPrice);
          setTotalNfts(data.listings.length);
        }

        if (data && data.listings) {
          const combinedData = data.listings.map(listing => {
            const identifierOrCriteriaValues = listing.protocol_data.parameters.offer.map(offer => offer.identifierOrCriteria);

            let price;
            if (listing.price.current.decimals === 18) {
              price = Number(listing.price.current.value) / 10 ** 18;
            } else {
              price = listing.price.current.value;
            }

            return {
              identifierOrCriteriaValues,
              price
            };
          });

          setNfts(combinedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (collectionSlug) {
      fetchData();
    }
  }, [collectionSlug]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const options = {
  //         method: 'GET',
  //         headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
  //       };
  //       const response = await fetch(`https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/all`, options);
  //       const data = await response.json();
  //       //console.log("Collections", data);

  //       if (data && data.listings) {
  //         let totalPrice = 0;
  //         data.listings.forEach(listing => {
  //           if (listing.price && listing.price.current) {
  //             // Convert price to Ether if decimals are 18
  //             let price;
  //             if (listing.price.current.decimals === 18) {
  //               // Convert value from wei to Ether
  //               price = Number(listing.price.current.value) / 10 ** 18;
  //             } else {
  //               // If decimals are not 18, return the value as is
  //               price = Number(listing.price.current.value);
  //             }
  //             totalPrice += price;
  //           }
  //         });
  //         setTotalPrice(totalPrice);
  //         setTotalNfts(data.listings.length);
  //       }

  //       if (data && data.listings) {
  //         const combinedData = data.listings.map(listing => {
  //           // Extract identifierOrCriteria values
  //           const identifierOrCriteriaValues = listing.protocol_data.parameters.offer.map(offer => offer.identifierOrCriteria);
        
  //           // Convert price to Ether if decimals are 18
  //           let price;
  //           if (listing.price.current.decimals === 18) {
  //             // Convert value from wei to Ether
  //             price = Number(listing.price.current.value) / 10 ** 18;
  //           } else {
  //             // If decimals are not 18, return the value as is
  //             price = listing.price.current.value;
  //           }
        
  //           // Return combined data
  //           return {
  //             identifierOrCriteriaValues,
  //             price
  //           };
  //         });
        
  //         //console.log("Combined Data:", combinedData);
  //         return combinedData;
  //       }
  //       setNfts(data.collections);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   if (collectionSlug) {
  //     fetchData();
  //   }
  // }, [collectionSlug]);
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={collectionImage || images.nft_image_1}
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
          <h1>{collectionName}</h1>
          <p>
          {collectionDescription ? `${collectionDescription.substring(0, 100)}...` : 'No Description'}
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
                <p>{totalNfts}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default collectionProfile;
//export { collectionProfile, combinedData };

