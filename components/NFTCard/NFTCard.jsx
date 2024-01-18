import React, { useEffect, useState, useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./CountDown/CountDown";


//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTCard = () => {

  const { fetchNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNFTs] = useState([]);
  const [itemsListed, setItemsListed] = useState([]);

  useEffect(() => {
    const fetchNFTsListed = async () => {
      try {
        if (currentAccount) {
          const itemsListed = await fetchNFTs("fetchItemsListed");
          console.log('All NFTs2:', itemsListed);
          setItemsListed(itemsListed);
        }
      } catch (error) {
        console.error('Error fetching listed NFTs:', error);
      }
    };
    fetchNFTsListed();

  }, [currentAccount, fetchNFTs]);
  const [like, setLike] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [nftsPerPage, setNftsPerPage] = useState(9);

  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = itemsListed.slice(indexOfFirstNft, indexOfLastNft);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  // console.log(NFTData);
  return (
    <div>
      {/* <div className={Style.pagination}>
          <ul className={Style.pagination_list}>
            {itemsListed.length > nftsPerPage &&
              Array(Math.ceil(itemsListed.length / nftsPerPage))
                .fill()
                .map((_, i) => (
                  <li key={i}>
                    <button
                      className={Style.pagination_btn}
                      onClick={() => setCurrentPage(i+1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
          </ul>
        </div> */}
      <div className={Style.NFTCard}>
        {itemsListed.map((el, i) => (
          <Link href={{ pathname: "/NFT-details", query: el }}>
            <div className={Style.NFTCard_box} key={i + 1}>
              <div className={Style.NFTCard_box_img}>
                <Image
                  src={el.image}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                />
              </div>

              <div className={Style.NFTCard_box_update}>
                <div className={Style.NFTCard_box_update_left}>
                  <div
                    className={Style.NFTCard_box_update_left_like}
                    onClick={() => likeNft()}
                  >
                    {like ? (
                      <AiOutlineHeart />
                    ) : (
                      <AiFillHeart
                        className={Style.NFTCard_box_update_left_like_icon}
                      />
                    )}
                    {""} 22
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h4>
                      {el.name}
                    </h4>

                    <div
                      className={Style.NFTCard_box_update_details_price_box_box}
                    >
                      <div
                        className={Style.NFTCard_box_update_details_price_box_bid}
                      >
                        <small>Price</small>
                        <p>{el.price}ETH</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Style.NFTCard_box_update_details_category}>
                  <BsImages />
                </div>
              </div>
            </div>
          </Link>
          
        ))}
        
      </div>
    </div>
  );
};

export default NFTCard;