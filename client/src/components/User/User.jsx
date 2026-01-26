import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../App/Redux/Features/Users/Services";
import Loader from "../Loader/Loader";
import NotFound from "../States/404";
import Profile from "../Profile/Profile";

export default function User() {
  let { id } = useParams();
  let { user, state } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  let autorizedUser = useSelector((s) => s.auth.user);
  const go = useNavigate();
  useEffect(() => {
    if (!user) {
      dispatch(getUser(id));
    }

    if (user) {
      if (autorizedUser.id === user.id && state !== "Loadign") {
        go("/profile");
      }
    }
  }, [user]);

  return (
    (state === "Loading" && <Loader />) ||
    (state === "NotFound" && <NotFound />) ||
    (user && <Profile userData={user} />)
  );
}
