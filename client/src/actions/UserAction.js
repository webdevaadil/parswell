import axios from "axios";
import { useEffect } from "react";
import {
  CLEAR_ERRORS,
  DETAIL_USER_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  select_product_DETAIL_Reject_,
  select_product_DETAIL_Request_,
  select_product_DETAIL_Success_,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFIE_FAIL,
  UPDATE_PROFIE_REQUEST,
  UPDATE_PROFIE_SUCCESS,
  UPDATE_PROFILE_IMAGE_request,
  UPDATE_PROFILE_IMAGE_SUCCESS,
} from "../constants/userConstants";

export const userregister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "Application/json" } };

    const { data } = await axios.post(
      ` /api/auth/register`,
      userData,
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};
export const adminregister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "Application/json" } };

    const { data } = await axios.post(
      ` /api/auth/adminregister
    adminregister`,
      userData,
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};
export const userlogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "Application/json" } };

    const { data } = await axios.post(
      ` /api/auth/login`,
      userData,
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};
export const adminlogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "Application/json" } };

    const { data } = await axios.post(
      ` /api/auth/adminlogin`,
      userData,
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};



export const loaduser = () => async (dispatch) => {
  
  try {
    dispatch({ type: DETAIL_USER_REQUEST });
    const { data } = await axios.get(`/api/auth/me`, {
      withCredentials: 'include',
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
  }});

    dispatch({ type: DETAIL_USER_SUCCESS, payload: data.user });

    // console.log(data.user);
  } catch (error) {
    dispatch({ type: DETAIL_USER_FAIL });
  }
};
export const selectproduct =(product)=>async(dispatch)=>{
  const config = { headers: { "Content-Type": "Application/json" } };
  try {
    dispatch({type:select_product_DETAIL_Request_})
    const {data} =await axios.post('/api/auth/selectProduct',{product:product},config)
    dispatch({ type: DETAIL_USER_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: select_product_DETAIL_Reject_ });
    
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    await axios.get(`/api/auth/logout`);
    
    dispatch({ type: LOGOUT_USER_SUCCESS });
 
    
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};