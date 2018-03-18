import axios from 'axios';

export const LOGIN_SUCCESS = "SET_CURRENT_USER";
export const LOGIN_FAILD = "LOGIN_FAILD";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const SIGN_UP_SUCCESS = "SIGN_UP";
export const SIGN_UP_FAILD = 'SIGN_UP_FAILD';

export function login(email, pass) {
  return (dispatch, getState, retry = true) => {

    axios.post('http://localhost:3030/loginWithPass', { email, pass })
      .then(function (response) {
        if (response.data.error) {
          let error = response.data.error;
          dispatch({ type: LOGIN_FAILD, error });
        } else {
          let currentUser = response.data.user_id;
          dispatch({ type: LOGIN_SUCCESS, currentUser });
        }
      })
      .catch(function (error) {
        dispatch({ type: LOGIN_FAILD, error });
      });
  }
}

export function logOutUser() {
  return (dispatch, getState, retry = true) => {
    dispatch({ type: LOG_OUT_USER });
  }
}

export function SignUp(user) {
  return (dispatch, getState, retry = true) => {
    axios.post('http://localhost:3030/signup', user)
      .then(function (response) {
        if (response.data.error) {
          let error = response.data.error;
          dispatch({ type: SIGN_UP_FAILD, error });
        } else {
          let currentUser = response.data.user_id;
          dispatch({ type: SIGN_UP_SUCCESS, currentUser });
        }
      })
      .catch(function (error) {
        dispatch({ type: SIGN_UP_FAILD, error });
      });
  }
}