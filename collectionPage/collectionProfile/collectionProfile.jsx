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

const collectionProfile = (collection) => {
  const router = useRouter();
  const { collectionName, collectionImage, collectionDescription } = router.query;
  const [nfts, setNfts] = useState({ description: "", image: "" });
  const [totalValue, setTotalValue] = useState(0); // Set initial value to 0
  const [totalNfts, setTotalNfts] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(`/api/v1/nfts?collectionName=${collectionName}`);
    eventSource.addEventListener("update", (event) => {
      const data = JSON.parse(event.data);
      setNfts(data);

      // Total NFTs
      let totalNfts = 0;
      data.forEach((nft) => {
        totalNfts++;
        if (nft.price && nft.price.value) {
          totalValue += parseFloat(nft.price.value);
        }
      });

      const formattedTotalNfts = totalNfts < 10 ? `0${totalNfts}` : totalNfts;
      setTotalNfts(formattedTotalNfts);

    
    // Total Price of all NFTs
      const totalValue = data.reduce((accumulator, nft) => {
        return accumulator + nft.price;
      }, 0);
      const customEvent = new CustomEvent('collectionTotalValue', { detail: { collectionName, totalValue } });
    window.dispatchEvent(customEvent);
    });
    return () => eventSource.close();
    
  }, [collectionName, collectionImage, collectionDescription]);

  useEffect(() => {
    if (nfts.length > 0) {
      let total = 0;
      nfts.forEach((nft) => {
        if (nft.price && nft.price) {
          total += nft.price;
        }
      });
      setTotalValue(total);
    }
  }, [nfts]);

  const cardArray = [1, 2, 3, 4];
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
          {collectionDescription}
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
              <div
                className={Style.collectionProfile_box_middle_box_item}
              >
                <small>Total Volume</small>
                <p>{totalValue}ETH</p>

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

