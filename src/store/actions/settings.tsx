import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const {isRTL, forceRTL, allowRTL, swapLeftAndRightInRTL} = I18nManager;

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});
export const toggleLoader = (payload: boolean) => ({
  type: ActionType.TOGGLE_LOADER,
  payload,
});

export const LanguageHandler = async (lang:string) => {
  allowRTL(lang === 'ar');
  forceRTL(lang === 'ar');
  swapLeftAndRightInRTL(lang === 'ar');
  RNRestart.Restart();
};

export const initializApp = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loadApp());
    } catch (error) {
      console.log(error);
    }
  };
};
