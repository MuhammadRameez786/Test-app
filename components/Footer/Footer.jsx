import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialRed,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { 
  FaPinterest, 
  FaRedditAlien, 
  FaSnapchatGhost, 
  FaTwitch, 
  FaDiscord, 
} from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";
import  Newsletter from "./MailchimpSubscribe";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          { <Image src={images.logo} alt="footer logo" height={130} width={130} /> }
          <p>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>

          <div className={Style.footer_social}>
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
              <FaPinterest />
            </a>
          </div>
          <div className={Style.footer_social}>
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

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <Newsletter />
          <div className={Style.subscribe_box_info}>
            <p>
              Discover, collect, and sell extraordinary NFTs OpenSea is the
              world first and largest NFT marketplace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
