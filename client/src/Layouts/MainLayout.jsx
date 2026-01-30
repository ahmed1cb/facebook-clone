import { Box, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Cookie from "../App/Cookie/Cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorizedUser } from "../App/Redux/Features/Auth/Services";
import Loader from "../components/Loader/Loader";
import Alert from "../App/Alert/Swal";

export default () => {
  const go = useNavigate();
  const token = Cookie.get("authorization");
  const { user, state } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    Alert.init(theme);
  }, []);
  useEffect(() => {
    if (!token) {
      go("/auth/register");
      return;
    }
  }, [token]);

  useEffect(() => {
    if (!user && token) {
      dispatch(getAuthorizedUser(token));
    }
  }, [user]);

  useEffect(() => {
    if (state === "Fail") {
      Cookie.remove("authorization");
      go("/auth/login");
    }

    if (state === "InternalError") {
      Alert.error(
        "Internal Server Error",
        "SOmething Went Wrong Please Try Again Later",
      );
    }
  }, [state]);

  return (
    (user && (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    )) ||
    (state == "Loading" && <Loader />)
  );
};
