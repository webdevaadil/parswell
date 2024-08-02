import {
  CLEAR_ERRORS,
  DETAIL_USER_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFIE_FAIL,
  UPDATE_PROFIE_REQUEST,
  UPDATE_PROFIE_SUCCESS,
  UPDATE_PROFILE_IMAGE_request,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAIL,
  LOGOUT_USER_REQUEST,
  select_product_DETAIL_,
  select_product_DETAIL_Success_,
  select_product_DETAIL_Reject_,
  select_product_DETAIL_Request_,
} from "../constants/userConstants.js";
const INTIAL_STATE = {
  user: {},
  loading: false,
  isAuthenticated: false,
};
export const userReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case DETAIL_USER_REQUEST:
      return {
        loading: true,
        user: "loading",
        // isAuthenticated: false,
      };
    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case DETAIL_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case select_product_DETAIL_Reject_:
    case select_product_DETAIL_Success_:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user:action.payload,
        msg: action.payload
      };
    case select_product_DETAIL_Request_:
      return {
        loading: true,
        isAuthenticated: true,

      };
    default:
      return state;
  }
};
