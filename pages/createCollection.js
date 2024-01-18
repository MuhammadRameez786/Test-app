
import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";

import Style from "../styles/account.module.css";
import images from "../img";
import NFT from "../nftcollectionPage/Form/createAccount";


const createCollection = () => {
    return (
      <div className={Style.account}>
        <div className={Style.account_info}>
          <h1>Create Collection</h1>
          <p>
             You can set preferred display name.
          </p>
        </div>
  
        <div className={Style.account_box}>
          <div className={Style.account_box_from}>
            <NFT />
          </div>
        </div>
      </div>
    );
  };
  
  export default createCollection;