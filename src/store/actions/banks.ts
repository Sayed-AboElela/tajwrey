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
      console.log('banksApi Error', error?.response);
    }
  };
};

export const deleteBankHandler = (id: string, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.delete(`banks/${id}/delete`, {
        data: {id}
      });
      console.log('deleteBankHandler response', data)
      dispatch(saveBanks(data.data));
      cb(true);

      showMessage({
        message: data.message,
        type: 'success',
      });

    } catch (error) {
      cb(false);
      console.log('deleteBankHandler Error', error?.response.data);
    }
  };
};

export const AddNewBankHandler = (
  name: string,
  account_number: string,
  owner_name: string,
  iban: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('banks', {
        name,
        account_number,
        owner_name,
        iban,
      });

      console.log('AddNewBankHandler data', data);

      dispatch({
        type: ActionType.SAVE_ADD_BANK_ERRORS,
        payload: {},
      });

      dispatch({
        type: ActionType.SAVE_BANKS,
        payload: data.data,
      });

      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);

    } catch (error) {

      cb(false);

      console.log('AddNewBankHandler error', error?.response);

      dispatch({
        type: ActionType.SAVE_ADD_BANK_ERRORS,
        payload: error?.response.data.data,
      });

    }
  };
};

export const UpdateBankHandler = (
  id:string,
  name: string,
  account_number: string,
  owner_name: string,
  iban: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post(`banks/${id}`, {
        name,
        account_number,
        owner_name,
        iban,
      });

      console.log('AddNewBankHandler data', data);

      dispatch({
        type: ActionType.SAVE_ADD_BANK_ERRORS,
        payload: {},
      });

      dispatch({
        type: ActionType.SAVE_BANKS,
        payload: data.data,
      });

      showMessage({
        message: data.message,
        type: 'success',
      });

      cb(true);

    } catch (error) {

      cb(false);

      console.log('AddNewBankHandler error', error?.response);

      dispatch({
        type: ActionType.SAVE_ADD_BANK_ERRORS,
        payload: error?.response.data.data,
      });

    }
  };
};
