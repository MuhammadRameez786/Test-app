import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload, TbLogout } from "react-icons/tb";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import {} from "react-router-dom";


//INTERNAL IMPORT
import Style from "./Profile.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Profile = () => {
  const { getUser, currentAccount } = useContext(NFTMarketplaceContext);
  const [userData, setUserData] = useState(null);
  const [openSeaData, setOpenSeaData] = useState(null);

  // const walletDisconnect = async () => {
  //   try {
  //     if (window.ethereum && window.ethereum.selectedAddress) {
  //       // Prompt the user to disconnect
  //       const isConfirmed = window.confirm("Do you want to disconnect from MetaMask?");
        
  //       if (isConfirmed) {
  //         // Clear the current account in your context
  //         setCurrentAccount(null);
  
  //         // Redirect to the login page or any other desired page
  //         router.push('/login');
  //       }
  //     } else {
  //       console.log('No active MetaMask connection found.');
  //     }
  //   } catch (error) {
  //     console.error('Error during disconnect:', error);
  //   }
  // };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the getUser function to fetch user data
        const userData = await getUser(currentAccount);

        // Set the fetched user data to the state
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error or display a message to the user
      }
    };

    fetchUserData();
  }, [getUser, currentAccount]);

  return (
    <div className={Style.profile}>
      {userData && (
        <div className={Style.profile_account}>
          <img
            src={userData.profilePicture || 'https://res.cloudinary.com/dmesqweam/image/upload/v1705602706/1995071-200_zolgnb.png'}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />

          <div className={Style.profile_account_info}>
            <p>{userData.name || 'Anonymous'}</p>
            <small>{currentAccount.slice(0, 18)}..</small>
          </div>
        </div>
      )}
      

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/myCollections" }}>My Collections</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/aboutus" }}>About Us</Link>
            </p>
          </div>
            {/* <div className={Style.profile_menu_one_item}onClick={walletDisconnect}>
              <TbLogout /> &nbsp;&nbsp;&nbsp;&nbsp;Logout            
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
