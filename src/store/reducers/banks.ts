import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  banks: [],
  banksErrors: {},
  addBankErrors: {}
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_BANKS:
      return {...state, banks: payload};
    case ActionType.SAVE_BANKS_ERRORS:
      return {...state, banksErrors: payload};
    case ActionType.SAVE_ADD_BANK_ERRORS:
      return {...state, addBankErrors: payload};
  }
  return state;
};
