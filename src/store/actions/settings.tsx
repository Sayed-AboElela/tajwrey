import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {axiosAPI} from "../../constants/Config";
import {IDispatch} from "../../constants/interfaces";
import {RootState} from "../store";
import {showMessage} from "react-native-flash-message";

const {isRTL, forceRTL, allowRTL, swapLeftAndRightInRTL} = I18nManager;

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});

export const toggleLoader = (payload: boolean) => ({
  type: ActionType.TOGGLE_LOADER,
  payload,
});

export const saveCities = (payload: []) => ({
  type: ActionType.SAVE_CITIES,
  payload,
});

export const savePages = (payload: []) => ({
  type: ActionType.SAVE_PAGES,
  payload,
});

export const saveBanners = (payload: []) => ({
  type: ActionType.SAVE_BANNERS,
  payload,
});

export const saveContacts = (payload: []) => ({
  type: ActionType.SAVE_CONTACTS,
  payload,
});

export const LanguageHandler = (lang: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch({type: ActionType.SAVE_LANGUAGE, payload: lang});
    allowRTL(lang === 'ar');
    forceRTL(lang === 'ar');
    swapLeftAndRightInRTL(lang === 'ar');
    setTimeout(() => {
      RNRestart.Restart();
    }, 300);
  };
};


export const citiesApi = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`areas`);
      // console.log('citiesApi response',data)
      dispatch(saveCities(data.data));
    } catch (error) {
      console.log('citiesApi Error', error?.response);
    }
  };
};

export const bannersApi = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`banners`);
      // console.log('bannersApi response',data)
      dispatch(saveBanners(data.data));
    } catch (error) {
      console.log('bannersApi Error', error?.response);
    }
  };
};
export const contactsApi = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`contacts`);
      // console.log('contactsApi response',data)
      dispatch(saveContacts(data.data));
    } catch (error) {
      console.log('contactsApi Error', error?.response);
    }
  };
};

export const pagesApi = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`pages`);
      console.log('pagesApi response',data)
      dispatch(savePages(data.data));
    } catch (error) {
      console.log('pagesApi Error', error?.response);
    }
  };
};

export const sendContactApi = (
  full_name: string,
  mobile_number: string,
  email: string,
  body: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.post(`contacts`,{
        full_name,
        mobile_number,
        email,
        body,
      });
      dispatch({
        type: ActionType.SAVE_CONTACTUS_ERRORS,
        payload: {},
      });
      showMessage({
        message: data.message,
        type: 'success',
      })
      cb(true);
    } catch (error) {
      cb(false);

      dispatch({
        type: ActionType.SAVE_CONTACTUS_ERRORS,
        payload: error?.response.data.data,
      });

      console.log('contactsApi Error', error?.response);
    }
  };
};


export const initializApp = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    try {
      if (getState().auth.userData?.token !== undefined) {
        dispatch(bannersApi());
        dispatch(contactsApi());
      }
      dispatch(citiesApi());
      dispatch(loadApp());
    } catch (error) {
      console.log('initializApp error', error);
    }
  };
};
