import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";

const NFTDetailsImg = ({ nft }) => {
  const [description, setDescriptiond] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);
  const router = useRouter();
  const { chain, contract, identifier } = router.query;
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [currentPriceInEther, setCurrentPriceInEther] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const [collectionImage, setCollectionImage] = useState(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const nftResponse = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/contract/${contract}/nfts/${identifier}`, options);
        const nftData = await nftResponse.json();
        //console.log("nft detail:", nftData);
        
        const collectionResponse = await fetch(`https://api.opensea.io/api/v2/collections/${nftData.nft.collection}`, options);
        const collectionData = await collectionResponse.json();
        //console.log("collection details:", collectionData);

        const listingResponse = await fetch(`https://api.opensea.io//api/v2/orders/${chain}/seaport/listings?asset_contract_address=${contract}&token_ids=${identifier}`, options);
        const listingData = await listingResponse.json();
        //console.log("Collection", listingData);

        const nftcontract = nftData.nft.contract;
        const description = nftData.nft.description;
        const image_url = nftData.nft.image_url;
        const name = nftData.nft.name;
        const updated_at = nftData.nft.updated_at;
        const opensea_url = nftData.nft.opensea_url;
        const collectionName = collectionData.name;
        const collectionImage = collectionData.image_url
        const currentPriceInWei = listingData.orders[0].current_price;
        const currentPriceInEther = currentPriceInWei / 10 ** 18;
        
        setCurrentPriceInEther(listingData.orders[0].current_price / 10 ** 18);
        setCollectionName(collectionData.name);
        setCollectionImage(collectionData.image_url);
        setCollectionDetails(nftData);
      } catch (error) {
        console.error('Error fetching collection details:', error);
      }
    };

    if (chain && contract && identifier) {
      fetchCollectionDetails();
    }
  }, [chain, contract, identifier]);

  if (!collectionDetails) {
    return <div>Loading...</div>;
  }
  

  const openDescription = () => {
    if (!description) {
      setDescriptiond(true);
    } else {
      setDescriptiond(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiOutlineHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              ) : (
                <AiFillHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={collectionDetails.nft.image_url}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{collectionDetails.nft.description}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <p>
              <small>Contract Address</small>
              <br></br>
              {contract}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
