import { Navigate, Outlet } from "react-router-dom";
import { getDataFromJwtToken } from "../helpers/get-data-from-jwt";
import { useDispatch } from "react-redux";
import { setStep } from "../redux/reducers/auth";

const Index = () => {
  // -------- hook -----------
  const dispatch = useDispatch();

  // -------- variables --------
  const token = localStorage.token;
  const tokenExpireTimestamp = getDataFromJwtToken("exp");
  const tokenExpireDate = new Date(tokenExpireTimestamp * 1000);
  // -------- code to be executed ---------
  if (tokenExpireDate < new Date()) {
    localStorage.token = "";
    localStorage.userInfo = "";
    localStorage.removeItem("requested_comp_");
    dispatch(setStep(1));
    <Navigate to="/login" />;
  }

  // ---------- render jsx ----------
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Index;
