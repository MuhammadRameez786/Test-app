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

export const nftGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NFT_REQUEST:
      return { loading: true };
    case GET_NFT_SUCCESS:
      return { loading: false, nftInfo: action.payload };
    case GET_NFT_FAILURE:
      return { loading: false, error: action.payload };
      default:
          return state;  
  }
};

export const nftUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_NFT_REQUEST:
      return { loading: true };
    case UPDATE_NFT_SUCCESS:
      return { loading: false, nftInfo: action.payload, success: true };
    case UPDATE_NFT_FAILURE:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

// const initialState = {
//   loading: false,
//   nfts: [],
//   error: null,
// };

export const top5NftReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TOP_5_NFTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TOP_5_NFTS_SUCCESS:
      return { ...state, loading: false, nftInfo: action.payload, error: null };
    case FETCH_TOP_5_NFTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllNftReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_NFTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_NFTS_SUCCESS:
      return { ...state, loading: false, nftInfo: action.payload, error: null };
    case GET_ALL_NFTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
