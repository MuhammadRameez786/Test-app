import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import images from "../../img";

const Banner = ({ bannerImage }) => {
  const { getUser, currentAccount } = useContext(NFTMarketplaceContext);
  const [userData, setUserData] = useState(null);

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

  const defaultBannerUrl =
    "https://res.cloudinary.com/dmesqweam/image/upload/v1705605183/default-banner_btnhjc.jpg";
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
      {userData && userData.profilebanner ? (
          <img
            src={userData.profilebanner}
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
      {userData && userData.profilebanner && (
        <Image
          src={userData.profilebanner}
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
