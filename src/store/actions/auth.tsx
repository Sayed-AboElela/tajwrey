import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

export const LoginHandler = (
  phone: string,
  password: string,
  cb: (success?: boolean) => void,
  navigate: (screen: string) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('guest/login-user', {
        phone,
        password,
      });
      console.log('LoginHandler data', data);
      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: {},
      });

      showMessage({
        message: data.success.message,
        type: 'success',
      });
      dispatch({
        type: ActionType.SAVE_LOGIN_DATA,
        payload: data.user,
      });
      await saveItem(AsyncKeys.USER_DATA, data.user);
      cb(true);
    } catch (error) {
      cb(false);
      console.log('error?.response.data.error', error?.response.data.error);

      dispatch({
        type: ActionType.SAVE_LOGIN_ERORRS,
        payload: error?.response.data.message,
      });
      {
        error.response.data.error
          ? showMessage({
            message: error?.response.data.error,
            type: 'danger',
          })
          : null;
      }
      if (error?.response.data.error === 'Please Verify phone') {
        console.log('error?.response.data', error?.response.data.phone);
        await saveItem(AsyncKeys.USER_DATA, {
          phone: error?.response.data.phone,
          token: error?.response.data.token,
        });
        dispatch({
          type: ActionType.SAVE_USER_DATA_STEP_2,
          payload: {
            phone: error?.response.data.phone,
            token: error?.response.data.token,
          },
        });
        navigate('PhoneCode');
      }

      console.log('Loginerorr', error?.response);
    }
  };
};
//sayed@email.com
//Sayed@123
