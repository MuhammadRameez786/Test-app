import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const Banner = ({ bannerImage }) => {
  const { getUserCollections, currentAccount } = useContext(NFTMarketplaceContext);
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the getUser function to fetch user data
        const nftData = await getUserCollections(currentAccount);
        //console.log("userdata", userData);

        // Set the fetched user data to the state
        setNftData(nftData);
        console.log("nftdata1", nftData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error or display a message to the user
      }
    };
    
    fetchUserData();
  }, [getUserCollections, currentAccount]);
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
      {userData && userData.profilebanner && (
        <Image
          src={userData.profilebanner}
          objectFit="cover"
          alt="background"
          width={1600}
          height={300}
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
