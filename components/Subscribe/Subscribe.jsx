import { useState } from "react";
import axios from "axios";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Subscribe.module.css";
import images from "../../img";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);
  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("https://newsletter-server-lemon.vercel.app/api/subscribe", { email });
      
      if (response.data.success) {
        // Check if the email is already subscribed
        if (response.data.message.includes("already subscribed")) {
          setState("ALREADY_SUBSCRIBED");
        } else {
          setState("SUCCESS");
        }
      }
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
    }
  };

  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss a drop</h2>
          <p>
            Subcribe to our super-exclusive drop list and be the first to know
            abour upcoming drops
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premium magazines</small>
          </div>

          <div className={Style.subscribe_box_left_input}>
            <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <button type="button" disabled={state === "LOADING"} onClick={subscribe}>
            <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} />
            </button>
          </div>
          {state === "ERROR" && (
        <p className={Style.error_msg}>{errorMessage}</p>
          )}
          {state === "SUCCESS" && (
            <p className={Style.success_msg}>Thanks for subscribing to our email list</p>
          )}
          {state === "ALREADY_SUBSCRIBED" && (
            <p className={Style.success_msg}>You are already subscribed to our email list</p>
          )}
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="get update"
            height={600}
            width={800}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
