
import {
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOG_OUT_USER,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILD
} from '../actions/users'

const INIT_STATE = {
  currentUser: null,
  error: null
}

const successful = (state, user) => {
  return { ...state, currentUser: user, error: null };
}

const faild = (state, error) => {
  return { ...state, currentUser: null, error: error };
}

export default function users(state = INIT_STATE, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return successful(state, action.currentUser);
    case SIGN_UP_FAILD:
      return faild(state, action.error);
    case LOGIN_SUCCESS:
      return successful(state, action.currentUser);
    case LOGIN_FAILD:
      return faild(state, action.error);
    case LOG_OUT_USER:
      return { ...state, currentUser: null, error: null }
    default:
      return state;

  }
}

