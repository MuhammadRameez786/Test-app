import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_PIC_REQUEST,
  USER_PIC_SUCCESS,
  USER_PIC_FAIL,
  USER_UPDATE_DATA
} from "../constants/userConstants";
import {
  FETCH_TOP_5_NFTS_REQUEST,
  FETCH_TOP_5_NFTS_SUCCESS,
  FETCH_TOP_5_NFTS_FAILURE,

} from "../constants/nftConstants";
import axios from "axios";

export const acountLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://testapi.thedaygalpuclub.com/api/v1/users/login",
      { email, password },
      config
    );
    console.log("LoginData", data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    let errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (!error.response) {
      errorMessage = "Network Error. Please try again later.";
    }

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};


// export const acountLogin = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "https://testapi.thedaygalpuclub.com/api/v1/users/login",
//       { email, password },
//       config
//     );
//     console.log("LOginData", data);
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, photo) => async (dispatch) => {
  
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://testapi.thedaygalpuclub.com/api/v1/users/signup",
      { name, photo, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data }  = await axios.patch("https://testapi.thedaygalpuclub.com/api/v1/users/updateme", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    console.log("UpdatedData", data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const updateUser = (user) => (dispatch) => {
//   dispatch({
//     type: USER_UPDATE_DATA,
//     payload: user,
//   });
//   localStorage.setItem('userInfo', JSON.stringify(user));
// };

export const updatepic = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PIC_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("https://testapi.thedaygalpuclub.com/api/v1/users/updatepic", user, config);

    dispatch({ type: USER_PIC_SUCCESS, payload: data });
    console.log(data);

    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllusers = () => async (dispatch) => {
  
  dispatch({ type: FETCH_TOP_5_NFTS_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get("https://testapi.thedaygalpuclub.com/api/v1/users", config);

    dispatch({ type: FETCH_TOP_5_NFTS_SUCCESS, payload: data });
    console.log("Data received from API", data);

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