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
      const response = await axios.post("https://testapi.thedaygalpuclub.com/api/v1/users/newsletter", { email });
      setState("SUCCESS");
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        // If response, data, and error properties are present, set the error message
        setErrorMessage(e.response.data.error);
      } else {
        // If any of the properties are missing, set a generic error message
        setErrorMessage("An error occurred while processing your request.");
      }
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
    </div>
  );
};