import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const AuthorProfileCard = () => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const { getUser, currentAccount } = useContext(NFTMarketplaceContext);
  const [userData, setUserData] = useState(null);

  const [creatorName, setCreatorName] = useState(null);
  const [creatorImage, setCreatorImage] = useState(null);
  const [creatorBanner, setCreatorBanner] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [ownerBio, setOwnerBio] = useState(null);
  const router = useRouter();
  console.log('Router query:', router.query);
  const { creator: creatorAddress } = router.query;

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
        };
        const creatorResponse = await fetch(`https://api.opensea.io/api/v2/accounts/${creatorAddress}`, options);
        const creatorData = await creatorResponse.json();
        console.log("Creator", creatorData)

        const fetchedCreatorAddress = creatorData.address;
        const fetchedCreatorName = creatorData.username;
        const fetchedCreatorImage = creatorData.profile_image_url;
        const fetchedCreatorBanner = creatorData.banner_image_url;
        const fetchedcreatorBio = creatorData.bio

        setCreatorName(fetchedCreatorName);
        setCreatorImage(fetchedCreatorImage);
        setCreatorBanner(fetchedCreatorBanner);
        setOwnerAddress(fetchedCreatorAddress);
        setOwnerBio(fetchedcreatorBio);
      } catch (error) {
        console.error('Error fetching collection details:', error);
      }
    };

    if (creatorAddress) {
      fetchCollectionDetails();
    }
  }, [creatorAddress]);

////////////////////////////////////////////////////
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the getUser function to fetch user data
        const fetchedUserData = await getUser(currentAccount);

        // Set the fetched user data to the state
        setUserData(fetchedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error or display a message to the user
      }
    };

    fetchUserData();
  }, [getUser, currentAccount]);

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };
  const defaultProfileUrl =
    "https://res.cloudinary.com/dmesqweam/image/upload/v1705602706/1995071-200_zolgnb.png";

    return (
      <div className={Style.AuthorProfileCard}>
        <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
        {creatorImage ? (
          <img
            src={creatorImage}
            className={Style.AuthorProfileCard_box_img_img}
            alt="Creator Profile Picture"
            width={220}
            height={220}
          />
              ) : (
                <img
                  src={defaultProfileUrl}
                  objectFit="cover"
                  alt="NFT IMAGES"
                  width={220}
                  height={220}
                />
            )}
          </div>
  
  
          <div className={Style.AuthorProfileCard_box_info}>
          <h2>
              {creatorName || 'Anonymous'}{" "}
              <span>
              <MdVerified />
              </span>{" "}
          </h2>
  
            <div className={Style.AuthorProfileCard_box_info_address}>
            <input
                type="text"
                value={ownerAddress}
                id="myInput"
                readOnly  // Make the input field read-only since it's an address
              />
              <FiCopy
                onClick={() => copyAddress()}
                className={Style.AuthorProfileCard_box_info_address_icon}
              />
            </div>
  
            <p>{ownerBio}</p>
  
            <div className={Style.AuthorProfileCard_box_info_social}>
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
                <TiSocialYoutube />
              </a>
            </div>
          </div>
  
          <div className={Style.AuthorProfileCard_box_share}>
            <Button btnName="Follow" handleClick={() => {}} />
            <MdCloudUpload
              onClick={() => openShare()}
              className={Style.AuthorProfileCard_box_share_icon}
            />
  
            {share && (
              <div className={Style.AuthorProfileCard_box_share_upload}>
                <p>
                  <span>
                    <TiSocialFacebook />
                  </span>{" "}
                  {""}
                  Facebook
                </p>
                <p>
                  <span>
                    <TiSocialInstagram />
                  </span>{" "}
                  {""}
                  Instragram
                </p>
                <p>
                  <span>
                    <TiSocialLinkedin />
                  </span>{" "}
                  {""}
                  LinkedIn
                </p>
                <p>
                  <span>
                    <TiSocialYoutube />
                  </span>{" "}
                  {""}
                  YouTube
                </p>
              </div>
            )}
  
            <BsThreeDots
              onClick={() => openReport()}
              className={Style.AuthorProfileCard_box_share_icon}
            />
  
            {report && (
              <p className={Style.AuthorProfileCard_box_share_report}>
                <span>
                  <MdOutlineReportProblem />
                </span>{" "}
                {""}
                Report abouse
              </p>
            )}
          </div>
        </div>
      </div>
    );
};

export default AuthorProfileCard;

