import axios from "axios";
export function checkAutoLogin(dispatch) {
  const tokenDetailString = localStorage.getItem("token");
  if (!tokenDetailString) {
    // dispatch(logout)
    return;
  } else {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("/admin/getadmin")
      .then((res) => {
        console.log(res);
        dispatch({ type: "USER_PROFILE", payload: res });
      })
      .catch((e) => {
        console.log(e);
      });
    {
      /***
        axios.get('/v1/admin/dashboard-stats').then((res) => {
            dispatch({type: 'STATS', payload: res})


        }).catch((e) => {
            console.log(e)
        })
        axios.get('/v1/admin/payment-volume').then((res) => {
            dispatch({type: 'PAYMENT_VOLUME', payload: res})


        }).catch((e) => {
            console.log(e)
        })
            */
    }
  }
}
