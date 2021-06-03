import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, clear, getItem, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';
import RNRestart from 'react-native-restart';
import {getDeviceType, getUniqueId} from 'react-native-device-info';
import {I18nManager} from "react-native";

const {isRTL} = I18nManager;

export const RegisterHandler = (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  phone: string,
  city_id: number | string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {

    try {
      let type = getDeviceType();
      let uniqueId = getUniqueId();

      const {data} = await axiosAPI.post('register', {
        name,
        email,
        phone,
        password,
        password_confirmation,
        city_id,
        "device_token": `token ${uniqueId}`,
        "device_type": type
      });
      console.log('RegisterHandler data', data.data.user);

      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: {},
      });
      await saveItem(AsyncKeys.USER_DATA, data);
      dispatch({
        type: ActionType.SAVE_USER_DATA_STEP_1,
        payload: data.data.user,
      });

      // await saveItem(AsyncKeys.USER_DATA, data);
      // console.log(data);
      cb(true);
    } catch (error) {
      dispatch({
        type: ActionType.SAVE_REGISTER_ERORRS,
        payload: error?.response.data.data,
      });
      console.log('errorRegisterHandler', error?.response.data.data)
      cb(false);
      // console.log('RegisterHandler Error', error?.response.data.message);
    }
  };
};

export const LoginHandler = (
  phone: string,
  password: string,
  cb: (success?: boolean) => void,
  navigate: (screen: string, params?: {}) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let type = getDeviceType();
      let uniqueId = getUniqueId();
      const {data} = await axiosAPI.post('login', {
        phone,
        password,
        "device_token": `token ${uniqueId}`,
        "device_type": type
      });

      console.log('LoginHandler data', data);

      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: {},
      });

      if (data.data.user.active) {
        dispatch({
          type: ActionType.SAVE_LOGIN_DATA,
          payload: {...data.data.user, token: data.data.token},
        });
        await saveItem(AsyncKeys.USER_DATA, {...data.data.user, token: data.data.token});

        showMessage({
          message: data.message,
          type: 'success',
        });
        cb(true);
      } else {
        let verifyMsg = isRTL ? "برجاء تفعيل رقم الجوال" : "Please activate the mobile number";
        showMessage({
          message: verifyMsg,
          type: 'danger',
        });
        navigate('PhoneCode', {phone: data.data.user.phone, navigateTo: 'Home'});
        cb(false);
      }

    } catch (error) {
      cb(false);
      console.log('error?.response.data.message', error?.response);

      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: error?.response.data.data,
      });
      {
        error.response.data.message
          ? showMessage({
            message: error?.response.data.message,
            type: 'danger',
          })
          : null;
      }

      console.log('Loginerorr', error?.response);
    }
  };
};


export const VerifyPhoneCodeHandler = (
  phone: string,
  code: string,
  cb: (success?: boolean) => void,
  // navigate: (screen: string, params?: {}) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {

      const {data} = await axiosAPI.post('validate-confirmation-code', {
        phone,
        code,
      });
      console.log('VerifyPhoneCodeHandler', data);
      // dispatch({
      //   type: ActionType.SAVE_LOGIN_DATA,
      //   payload: {...data.data.user, token: data.data.token},
      // });
      // await saveItem(AsyncKeys.USER_DATA, {...data.data.user, token: data.data.token});

      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);

    } catch (error) {
      cb(false);
      showMessage({
        message: error?.response.data.message,
        type: 'danger',
      });
      console.log('VerifyPhoneCodeHandler Error', error?.response);
    }
  };
};


export const ForgetHandler = (
  phone: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('send-confirmation-code', {
        phone,
      });
      console.log('ForgetHandler data',data)

      dispatch({
        type: ActionType.SAVE_FORGET_PASSWORD_ERRORS,
        payload: {},
      });

      showMessage({
        message: data.message,
        type: 'success',
      });
      cb(true);
      // navigate('PhoneCode', {phone: data.data.user.phone, navigateTo: 'Home'});

    } catch (error) {
      cb(false);

      console.log('error?.response.data.data', error?.response.data.data)
      let noUserFound = Array.isArray(error?.response.data.data) ? {
        "phone": [error?.response.data.message]
      } : error?.response.data.data

      dispatch({
        type: ActionType.SAVE_FORGET_PASSWORD_ERRORS,
        payload: noUserFound,
      });

      console.log('ForgetHandler Error', error?.response);

    }
  };
};

export const updateProfile = (
  name: string,
  phone: string,
  email: string,
  avatar: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      console.log(name,
        email,
        phone,
        avatar,)
      const {data} = await axiosAPI.post('me', {
        name,
        phone,
        email,
        avatar,
      });
      dispatch({
        type: ActionType.SAVE_UPDATE_PROFILE_ERRORS,
        payload: {},
      });

      const {token} = (await getItem(AsyncKeys.USER_DATA)) || '';

      if (token !== '') {
        dispatch({
          type: ActionType.SAVE_LOGIN_DATA,
          payload: {...data.data, token: token},
        });
      }

      console.log('updateProfile response data', data);
      showMessage({
        message: data.message,
        type: 'success',
      });
      cb(true);
    } catch (error) {
      cb(false);
      // showMessage({
      //   message: error?.response.data.data?.email
      //     ? error?.response.data.data?.email[0]
      //     : error?.response.data.data?.avatar[0],
      //   type: 'danger',
      // });
      dispatch({
        type: ActionType.SAVE_UPDATE_PROFILE_ERRORS,
        payload: error?.response.data.data,
      });
      console.log('updateProfile Error', error?.response.data.data);
    }
  };
};


export const NewPasswordHandler = (
  phone: string,
  password: string,
  password_confirmation: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('reset-password', {
        phone,
        password,
        password_confirmation,
      });
      console.log(data);
      dispatch({
        type: ActionType.SAVE_CHANGE_PASSWORD_ERRORS,
        payload: {},
      });
      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);
    } catch (error) {
      cb(false);
      // showMessage({
      //   message: error?.response.data.message,
      //   type: 'danger',
      // });
      dispatch({
        type: ActionType.SAVE_CHANGE_PASSWORD_ERRORS,
        payload: error?.response.data.data,
      });

      console.log(error?.response);
    }
  };
};

export const ChangePasswordHandler = (
  old_password: string,
  password: string,
  password_confirmation: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('update-password', {
        old_password,
        password,
        password_confirmation,
      });
      showMessage({
        message: data.message,
        type: 'success'
      });
      cb(true);
    } catch (error) {
      cb(false);

      if (error?.response.data.message === "Data Validation Error") {
        dispatch({
          type: ActionType.SAVE_CHANGE_PASSWORD_ERRORS,
          payload: error?.response.data.data,
        });
      } else {
        dispatch({
          type: ActionType.SAVE_CHANGE_PASSWORD_ERRORS,
          payload: {"old_password": [error?.response.data.message]},
        });
      }
      console.log('ChangePasswordHandler error', error?.response);
    }
  };
};


export const LogoutHandler = (cb?: () => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    console.log('LogoutHandler')
    dispatch({type: ActionType.LOGOUT});
    await clear().then(() => {
      RNRestart.Restart();
    });
  };
};
