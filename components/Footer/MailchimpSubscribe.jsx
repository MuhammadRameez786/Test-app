import { useState } from "react";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";

import Style from "./Footer.module.css";

export default () => {
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
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" disabled={state === "LOADING"} onClick={subscribe}>
          <RiSendPlaneFill size={30} />
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
  );
};
