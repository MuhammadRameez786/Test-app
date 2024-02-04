import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
//----IMPORT ICON
import { MdNotifications, MdOutlineWallet } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
import loading from "../../img"

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {

  //----USESTATE COMPONNTS
  const { getUser, getWalletBalance, currentAccount, openError, connectToUserProfile } = useContext(NFTMarketplaceContext);
  const [user, setUser] = useState('')
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userbalance, setUserBalance] = useState(null);

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
    
    const fetchBalance = async () => {
      try {
        // Call the getUser function to fetch user data
        const userbalance = await getWalletBalance(currentAccount);
        // Set the fetched user data to the state
        setUserBalance(userbalance);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error or display a message to the user
      }
    };

    fetchUserData();
    fetchBalance();
  }, [getUser,getWalletBalance, currentAccount]);
  
  const handleDiscoverClick = () => {
    setDiscoverOpen(!discoverOpen);
    setHelpOpen(false);
  }
  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
    setDiscoverOpen(false);
  } 

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscoverOpen(true);
      setHelpOpen(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscoverOpen(false);
      setHelpOpen(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscoverOpen(false);
      setHelpOpen(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscoverOpen(false);
      setHelpOpen(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelpOpen(false);
      setDiscoverOpen(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        // Fetch and log wallet balance
        const walletBalance = await getWalletBalance(accounts[0]);
        if (walletBalance !== null) {
          setUserBalance(walletBalance);
        } else {
          throw new Error("Error fetching wallet balance");
        }
      } else {
        console.log("No account");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const userProfileContract = await connectToUserProfile(); // Replace with your actual function to initialize the user profile contract
        setUserData(userProfileContract);
      } catch (error) {
        console.error("Error initializing contracts:", error);
      }
    };

    initialize();
  }, []); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
          <Image
          src={images.logo}
          alt="logo"
          width={150}
          height={150}  onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}
            onMouseEnter={() => setDiscoverOpen(true)}
            onMouseLeave={() => setDiscoverOpen(false)}
             >
          <Link href="#">
            <a>Discover</a>
          </Link>
            {discoverOpen && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}
            onMouseEnter={handleHelpClick}
            onMouseLeave={() => setHelpOpen(false)}
          >
            <Link href="#">
              <a>Help</a>
            </Link>
            {helpOpen && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (  
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>
          {/* USER PROFILE */}
      {isMounted && (
        <div className={Style.navbar_container_right_profile_box}>
          <MdOutlineWallet className={Style.notify} />
          {userbalance !== null ? (
            <p className={Style.balanceText}>{userbalance.slice(0, 6)}</p>
          ) : (
            <p>Loading...</p>
            // <img
            //   src="https://res.cloudinary.com/dmesqweam/image/upload/v1707033859/loading_p9a9mf.gif"
            //   alt="Loading"
            //   width={30}
            //   height={20}
            // />
          )}
          <div className={Style.navbar_container_right_profile}>
            <div className={Style.profileContainer}>
              <img
                src={
                  userData
                    ? userData.profilePicture ||
                      'https://res.cloudinary.com/dmesqweam/image/upload/v1707047901/1995071-200_zolgnb-removebg-preview_non0fm.png'
                    : 'https://res.cloudinary.com/dmesqweam/image/upload/v1707047901/1995071-200_zolgnb-removebg-preview_non0fm.png'
                }
                alt="Profile"
                width={30}
                height={30}
                onClick={() => {
                  openProfile();
                }}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>
        </div>
      )}
      {!isMounted && (
        <div className={Style.navbar_container_right_profile_box}>
          <div className={Style.navbar_container_right_profile}>
            <Link href="/login">
              <a className={Style.link}>Login</a>
            </Link>
          </div>
        </div>
      )}

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}

    </div>
  );
};

export default NavBar;


