import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  appLoaded: false,
  preloaderVisible: false,
  onboarding: null,
  cities: [],
  banners: [],
  notifications: [],
  contacts: [],
  pages: [],
  contactsUsErrors: {},
};
export default (state = initialState, action: IReduser) => {
  switch (action.type) {
    case ActionType.APP_LOADED:
      return {...state, appLoaded: true};
    case ActionType.SAVE_CITIES:
      return {...state, cities: action.payload};
    case ActionType.SAVE_BANNERS:
      return {...state, banners: action.payload};
    case ActionType.SAVE_ON_BOARDING:
      return {...state, onboarding: action.payload};
    case ActionType.SAVE_CONTACTS:
      return {...state, contacts: action.payload};
    case ActionType.SAVE_CONTACTUS_ERRORS:
      return {...state, contactsUsErrors: action.payload};
    case ActionType.SAVE_PAGES:
      return {...state, pages: action.payload};
    case ActionType.SAVE_NOTIFICATIONS:
      return {...state, notifications: action.payload};
    case ActionType.TOGGLE_LOADER:
      return {...state, preloaderVisible: action.payload};

  }
  return state;
};
