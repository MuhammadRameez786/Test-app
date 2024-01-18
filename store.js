import { createStore, combineReducers, applyMiddleware } from "redux";
import { useEffect } from "react";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  UpdatePicReducer,
} from "./reducers/userReducers";
import {
  nftCollectionReducer
} from "./reducers/nftCollectionReducer";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  UpdatePic: UpdatePicReducer,
  GetCllection: nftCollectionReducer
});

let userInfoFromStorage;
if (typeof window !== 'undefined') {
  userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
}
let collectionInfoFromStorage;
if (typeof window !== 'undefined') {
  collectionInfoFromStorage = localStorage.getItem("collectionInfo")
  ? JSON.parse(localStorage.getItem("collectionInfo"))
  : null;
}
//console.log("NFTData:", nftInfoFromStorage)
//console.log(userInfoFromStorage);
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  GetCllection: { collectionInfo: collectionInfoFromStorage},
};



const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
