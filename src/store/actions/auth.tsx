import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, clear, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';
import RNRestart from 'react-native-restart';

export const RegisterHandler = (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  phone: string,
  city_id: number | string,
  device_token: string,
  device_type: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('register', {
        name,
        email,
        phone,
        password,
        password_confirmation,
        city_id,
        role: 1,
        device_token,
        device_type,
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
  // navigate: (screen: string) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('login', {
        phone,
        password,
        "device_token": "token 93939",
        "device_type": "iphone"
      });

      console.log('LoginHandler data', {...data.data.user, token: data.data.token});

      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: {},
      });
      //
      showMessage({
        message: data.message,
        type: 'success',
      });
      //
      dispatch({
        type: ActionType.SAVE_LOGIN_DATA,
        payload: {...data.data.user, token: data.data.token},
      });
      await saveItem(AsyncKeys.USER_DATA, {...data.data.user, token: data.data.token});
      //
      cb(true);
    } catch (error) {
      cb(false);
      console.log('error?.response.data.message', error?.response.data.message);

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
      // if (error?.response.data.message === 'Please Verify phone') {
      //   console.log('error?.response.data', error?.response.data.phone);
      // await saveItem(AsyncKeys.USER_DATA, {
      //   phone: error?.response.data.phone,
      //   token: error?.response.data.token,
      // });
      // dispatch({
      //   type: ActionType.SAVE_USER_DATA_STEP_2,
      //   payload: {
      //     phone: error?.response.data.phone,
      //     token: error?.response.data.token,
      //   },
      // });
      // navigate('PhoneCode');
      // }

      console.log('Loginerorr', error?.response);
    }
  };
};


export const updateProfile = (
  name: string,
  email: string,
  phone: number,
  avatar: string,
  cb: () => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {

      const {data} = await axiosAPI.post('me', {
        name,
        email,
        phone,
        avatar,
      });
      console.log('updateProfile response data', data);
      // dispatch({
      //   type: ActionType.SAVE_USER_DATA_AFTER_VERIFY,
      //   payload: data.data.user.data,
      // });
      showMessage({
        message: data.data.message,
        type: 'success',
      });
      cb && cb();
    } catch (error) {
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
      cb && cb();
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
