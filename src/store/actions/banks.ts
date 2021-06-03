import {ActionType} from "./actions";
import {Dispatch} from "redux";
import {axiosAPI} from "../../constants/Config";
import {IDispatch} from "../../constants/interfaces";
import {showMessage} from "react-native-flash-message";

export const saveBanks = (payload: []) => ({
  type: ActionType.SAVE_BANKS,
  payload,
});

export const banksApi = (cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.get(`banks`);
      console.log('banksApi response', data)
      dispatch(saveBanks(data.data));
      cb(true);
    } catch (error) {
      cb(false);
      console.log('ordersApi Error', error?.response);
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
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
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
        type: ActionType.SAVE_ORDER_REQUEST_ERRORS,
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
        type: ActionType.SAVE_ORDER_REQUEST_ERRORS,
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
