import { useSelector } from "react-redux";
import SideBar from "./components/sidebar";
import { Outlet, useLocation } from "react-router";
import Login from "./auth/login";
import Loader from "./components/loader";
const useAuth = () => {
  const selector = useSelector((state) => state);
  const user = selector.isLogin;
  const users = selector.users;

  const isloading = selector.isLoading;
  return {
    user,
    isloading,
    users,
  };
};

const RootLayout = () => {
  const isAuth = useAuth();
  const location = useLocation();
  const users = useAuth();

  return isAuth.user ? (
    <div className="colapse-main">
      <div className="colapse_auto">
        {location.pathname !== "/proof_of_address" &&
          location.pathname !== "/wallet/fund" &&
          location.pathname !== "/verifyDocument" &&
          location.pathname !== "/purchase_order/document" &&
          location.pathname !== "/account/edit" &&
          location.pathname !== "/finance/fundrequest" &&
          location.pathname !== "/finance/changeterm" &&
          location.pathname !== "/finance/document" &&
          location.pathname !== "/receipt/home" &&
          location.pathname !== "/finance/review" &&
          location.pathname !== "/lender/agreement" &&
          location.pathname !== "/payment/document" &&
          location.pathname !== "/payment/record" &&
          location.pathname !== "/finance/approve_factoring_request" && (
            <SideBar users={users} />
          )}{" "}
      </div>
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  ) : isAuth.isloading === true ? (
    <Loader />
  ) : (
    <Login />
  );
};
export default RootLayout;
