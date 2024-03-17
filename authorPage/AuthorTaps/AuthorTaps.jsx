import React, { useState, useEffect, useContext} from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";
import { useRouter } from 'next/router';
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

//INTERNAL IMPORT
import Style1 from "./AuthorTaps.module.css";
import { NFTCard } from "../../components/componentsindex";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "../../components/NFTCard/NFTCard.module.css";


const AuthorTaps = ({
  currentAccount,
  setCollectiables,
  setCreated,
  setLike,
  setFollower,
  setFollowing,
}) => {

  const { fetchMyNFTsOrListedNFTs } = useContext(
    NFTMarketplaceContext
  );
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsListed, setItemsListed] = useState([]);
  
  

  useEffect(() => {
    const fetchNFTsListed = async () => {
      try {
        if (currentAccount) {
          const itemsListed = await fetchMyNFTsOrListedNFTs("fetchItemsListed");
          //console.log('Listed NFTs:', itemsListed);
          setItemsListed(itemsListed);
        }
      } catch (error) {
        console.error('Error fetching listed NFTs:', error);
      }
    };
    fetchNFTsListed();

    

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    };

    const likeNft = () => {
      if (!like1) {
        setLike(true);
      } else {
        setLike(false);
      }
    };
  }, [currentAccount, fetchMyNFTsOrListedNFTs]);

  const [currentPage, setCurrentPage] = useState(0);
  const [nftsPerPage, setNftsPerPage] = useState(9);
  const [like1, setLike1] = useState(true);

  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = itemsListed.slice(indexOfFirstNft, indexOfLastNft);

  const openDropDownList = () => {
    if (!openList) {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText == "Listed NFTs") {
      setCollectiables(true);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFT") {
      setCollectiables(false);
      setCreated(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(2);
    } else if (btnText == "Liked") {
      setCollectiables(false);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setActiveBtn(3);
    } else if (btnText == "Following") {
      setCollectiables(false);
      setCreated(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setActiveBtn(4);
    } else if (btnText == "Followers") {
      setCollectiables(false);
      setCreated(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setActiveBtn(5);
    }
  };

  return (
    <div className={Style1.AuthorTaps}>
      <div className={Style1.AuthorTaps_box}>
        <div className={Style1.AuthorTaps_box_left}>
          <div className={Style1.AuthorTaps_box_left_btn}>
          <button
            className={`${activeBtn === 1 ? Style1.active : ""}`}
            onClick={(e) => openTab(e, itemsListed)} // Pass filtered data when button is clicked
          >
            Listed NFTs
          </button>
            <button
              className={`${activeBtn == 2 ? Style1.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Own NFT
            </button>
            <button
              className={`${activeBtn == 3 ? Style1.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
            <button
              className={`${activeBtn == 4 ? Style1.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Following
            </button>
            <button
              className={`${activeBtn == 5 ? Style1.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Followers
            </button>
          </div>
        </div>
      </div>
      {/* Conditionally render content based on the active button */}
    {activeBtn === 1 && (
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
                    {like1 ? (
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
      
      
    )}
    {/* ... Other content for different tabs ... */}
    </div>
  );
};

export default AuthorTaps;
