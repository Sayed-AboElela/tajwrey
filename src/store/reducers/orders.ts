import {IReduser} from '../../constants/interfaces';
import {ActionType} from '../actions/actions';

const initialState = {
  orders: [],
  saleOrderErrors: {},
  buyOrderErrors: {}
};
export default (state = initialState, {type, payload}: IReduser) => {
  switch (type) {
    case ActionType.SAVE_ORDERS:
      return {...state, orders: payload};
    case ActionType.SAVE_BUY_ORDER_ERRORS:
      return {...state, buyOrderErrors: payload};
    case ActionType.SAVE_SALE_ORDER_ERRORS:
      return {...state, saleOrderErrors: payload};
  }
  return state;
};
