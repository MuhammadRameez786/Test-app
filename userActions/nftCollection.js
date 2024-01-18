import axios from "axios";

import {
    GET_COLLECTION_REQUEST,
    GET_COLLECTION_SUCCESS,
    GET_COLLECTION_FAILURE,

} from "../constants/nftCollectionConstant";

export const createCollection = (name, description, category, image, seller) => async (dispatch) => {
    try {
      dispatch({ type: GET_COLLECTION_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "https://testapi.thedaygalpuclub.com/api/v1/collection",
        { name, description, category, image, seller },
        config
      );
  
      dispatch({ type: GET_COLLECTION_SUCCESS, payload: data });
  
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      console.log(error.response);
      dispatch({
        type: GET_COLLECTION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };