import * as types from './types';
import * as api from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { push } from 'connected-next-router';

export const signUp = (data) => async (dispatch) => {
  try{
    dispatch({
      type: types.SIGN_UP
    });
    const res = await api.signUp(data);
    if(res.errors) throw res.errors;
    dispatch({
      type: types.SIGN_UP,
      payload: res.user
    });
  }catch(e){
    dispatch({
      type: types.SIGN_UP_ERROR,
      payload: e
    })
  }
};