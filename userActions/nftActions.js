import axios from "axios";

import {
  GET_NFT_REQUEST,
  GET_NFT_SUCCESS,
  GET_NFT_FAILURE,
  UPDATE_NFT_REQUEST,
  UPDATE_NFT_SUCCESS,
  UPDATE_NFT_FAILURE,
  FETCH_TOP_5_NFTS_REQUEST,
  FETCH_TOP_5_NFTS_SUCCESS,
  FETCH_TOP_5_NFTS_FAILURE,
  GET_ALL_NFTS_REQUEST,
  GET_ALL_NFTS_SUCCESS,
  GET_ALL_NFTS_FAILURE

} from "../constants/nftConstants";

export const getNft = (id) => async (dispatch) => {
  return async (dispatch) => {
    dispatch({ type: GET_NFT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `https://testapi.thedaygalpuclub.com/api/v1/nfts/${id}`, config);
      dispatch({
        type: GET_NFT_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("nftInfo", JSON.stringify(data));
    } catch (error) {
        let errorMessage = error.message;
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
      dispatch({
        type: GET_NFT_FAILURE,
        payload: errorMessage,
      });
    }
  };
};


// Action Creator
export const updateNft = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_NFT_REQUEST });

  try {
    const { data } = await axios.patch(`https://testapi.thedaygalpuclub.com/api/v1/nfts/${id}`, data);

    dispatch({
      type: UPDATE_NFT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NFT_FAILURE,
      payload: error.message,
    });
  }
};


export const getTop5Nfts = () => async (dispatch) => {
  
  dispatch({ type: FETCH_TOP_5_NFTS_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get("https://testapi.thedaygalpuclub.com/api/v1/nfts/top-5-nfts", config);
    const data = await response.json();
    console.log('Top 5 NFTs:', data);
    //return data;

    dispatch({ type: FETCH_TOP_5_NFTS_SUCCESS, payload: data });
    //console.log("Data received from API", data);

    localStorage.setItem("nftInfo", JSON.stringify(data));

  } catch (error) {
    console.log(error);
    let errorMessage = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({
      type: FETCH_TOP_5_NFTS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllNfts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_NFTS_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const response = await axios.get("https://testapi.thedaygalpuclub.com/api/v1/nfts", config);
    const data = await response.json();
    console.log('Top 5 NFTs:', data);
    dispatch({
      type: GET_ALL_NFTS_SUCCESS,
      payload: data,
    });
    console.log("Data received from API", data);

  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({
      type: GET_ALL_NFTS_FAILURE,
      payload: errorMessage,
    });
  }
};


