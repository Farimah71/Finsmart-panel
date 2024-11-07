import { setInfo } from "../../reducers/user-type";

export const changeUserType = (data) => (dispatch) => {
  dispatch(setInfo(data));
};
