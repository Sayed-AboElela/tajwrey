import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  isLogin: false,
  userData: {},
  notifications: [],
  registerErrors: {},
  loginErrors: {},
  forgetPasswordErrors: {},
  updateProfileErrors: {},
  changePasswordErrors: {},
};


export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_USER_DATA_STEP_1:
      return {
        ...state,
        userData: payload,
      };
    case ActionType.SAVE_USER_DATA_STEP_2:
      return {
        ...state,
        userData: {...state.userData, phone: payload.phone, token: payload.token},
      };
    case ActionType.SAVE_USER_DATA_STEP_3:
      return {
        ...state,
        isLogin: true,
      };
    case ActionType.SAVE_LOGIN_DATA:
      return {
        ...state,
        userData: payload,
        isLogin: true,
      };
    case ActionType.SAVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
      };
    case ActionType.SAVE_USER_DATA_AFTER_VERIFY:
      return {
        ...state,
        isLogin: true,
        userData: {...state.userData, ...payload},
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
    case ActionType.SAVE_REGISTER_ERORRS:
      return {...state, registerErrors: payload};
    case ActionType.SAVE_UPDATE_PROFILE_ERRORS:
      return {...state, updateProfileErrors: payload};
    case ActionType.SAVE_LOGIN_ERORRS:
      return {...state, loginErrors: payload};
    case ActionType.SAVE_CHANGE_PASSWORD_ERRORS:
      return {...state, changePasswordErrors: payload};
    case ActionType.SAVE_FORGET_PASSWORD_ERRORS:
      return {...state, forgetPasswordErrors: payload};
    case ActionType.SAVE_PHONE:
      return {...state, phoneNumber: payload};
  }
  return state;
};
