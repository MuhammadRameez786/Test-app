import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialRed,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiSocialPinterest,
} from "react-icons/ti";
import { DiJqueryLogo } from "react-icons/di";
import { 
  FaPinterest, 
  FaRedditAlien, 
  FaSnapchatGhost, 
  FaTwitch, 
  FaDiscord, 
} from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
import { Router } from "next/router";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "Account Setting",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];
  //------HELP CNTEER
  const helpCenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Sign Up",
      link: "signUp",
    },
    {
      name: "LogIn",
      link: "login",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        <div className={Style.sideBar_social}>
            <a href="https://www.facebook.com/Thedaygalpuclub">
              <TiSocialFacebook />
            </a>
            <a href="https://www.linkedin.com/company/the-day-galpu-club/">
              <TiSocialLinkedin />
            </a>
            <a href="https://twitter.com/TheDayGalpuClub">
              <TiSocialTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCSiAaU4ogteY4Q6_2VZhlVw">
              <TiSocialYoutube />
            </a>
            <a href="https://www.instagram.com/thedaygalpuclub">
              <TiSocialInstagram />
            </a>
            <a href="https://www.pinterest.com/TheDayGalpuClub/">
              <TiSocialPinterest />
            </a>
        </div>
        <div className={Style.sideBar_social}>
            <a href="https://www.reddit.com/user/TheDayGalpuClub">
              <FaRedditAlien />
            </a>
            <a href="https://www.snapchat.com/add/thedaygalpuclub?share_id=0B8r2amIyFk&locale=en-US">
              <FaSnapchatGhost />
            </a>
            <a href="https://www.twitch.tv/thedaygalpuclub">
              <FaTwitch />
            </a>
            <a href="https://support.discord.com/hc/en-us/profiles/10059899835671">
              <FaDiscord />
            </a>
          </div>
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button btnName="connect" handleClick={() => connectWallet()} />
        ) : (
          <Button
            btnName="Create"
            handleClick={() => router.push("/uploadNFT")}
          />
        )}

        <Button btnName="Connect Wallet" handleClick={() => {}} />

      </div>
    </div>
  );
};

export default SideBar;
