import { Record, Search } from '../entities';
import { combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from 'connected-next-router';
import * as types from './types';
import authSlice from './authSlice';

/**
 * Router reducer
 */

// Using next-redux-wrapper's initStore
export const mainReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

// COMBINED REDUCERS
const rootReducer = combineReducers({
  router: routerReducer,
  auth: authSlice,
});

export default rootReducer;
