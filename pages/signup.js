import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

//INTERNALIMPORT
import Style from "../styles/signUp.module.css";
import SignUp from "../SignUp/SignUp.jsx";
import images from "../img/index.js";
import { Button } from "../components/componentsindex.js";

const signUp = () => {
  
  return (
    <div className={Style.SignUp}>
      <div className={Style.SignUp_box}>
        <h1>SignUp</h1>
        <SignUp />
      </div>
    </div>
  );
};

export default signUp;
