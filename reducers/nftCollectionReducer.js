import {
    GET_COLLECTION_REQUEST,
    GET_COLLECTION_SUCCESS,
    GET_COLLECTION_FAILURE,

} from "../constants/nftCollectionConstant";

export const nftCollectionReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_COLLECTION_REQUEST:
        return { loading: true };
      case GET_COLLECTION_SUCCESS:
        return { loading: false, collectionInfo: action.payload };
      case GET_COLLECTION_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };