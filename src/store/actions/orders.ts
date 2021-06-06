import {ActionType} from "./actions";
import {Dispatch} from "redux";
import {axiosAPI} from "../../constants/Config";
import {IDispatch} from "../../constants/interfaces";
import {showMessage} from "react-native-flash-message";

export const saveOrders = (payload: []) => ({
  type: ActionType.SAVE_ORDERS,
  payload,
});

export const saveSearchResults = (payload: []) => ({
  type: ActionType.SAVE_SEARCH_RESULTS,
  payload,
});

export const ordersApi = (cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`requests`);
      console.log('ordersApi response', data)
      dispatch(saveOrders(data.data));
      cb(true);
    } catch (error) {
      cb(false);
      console.log('ordersApi Error', error?.response);
    }
  };
};

export const searchOrdersApi = (request_id: string, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<any>) => {
    console.log('searchOrdersApi request_id', request_id)
    try {
      const {data} = await axiosAPI.get(`requests?request_id=${request_id}`);
      console.log('searchOrdersApi response', data)
      dispatch(saveSearchResults(data.data));
      cb(true);
    } catch (error) {
      cb(false);
      console.log('searchOrdersApi Error', error);
    }
  };
};

export const SendRequestHandler = (
  name: string,
  phone: string,
  description: string,
  commission_source: string,
  type: number,
  cost: number,
  requestType: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let errorType = requestType === 'buy' ? ActionType.SAVE_BUY_ORDER_ERRORS : ActionType.SAVE_SALE_ORDER_ERRORS;
    try {
      const {data} = await axiosAPI.post('requests', {
        name,
        phone,
        description,
        commission_source,
        type,
        cost,
      });

      console.log('SendRequestHandler data', data);

      dispatch({
        type: errorType,
        payload: {},
      });

      showMessage({
        message: data.message,
        type: 'success',
      });
      cb(true);
    } catch (error) {
      cb(false);

      console.log('SendRequestHandler error', error?.response);

      dispatch({
        type: errorType,
        payload: error?.response.data.data,
      });
      //
      // {
      //   error.response.data.message
      //     ? showMessage({
      //       message: error?.response.data.message,
      //       type: 'danger',
      //     })
      //     : null;
      // }
    }
  };
};
