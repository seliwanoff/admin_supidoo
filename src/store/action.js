import axios from "axios";
export const LOGIN_ACTION = "[Login Action]";
export const Confirm_Login_Action = "[Confirm Login Action]";

export function createLoginAction() {
  return { type: LOGIN_ACTION };
}

export function login(payload) {
  const data = {
    email: payload.email,
    password: payload.password,
  };
  console.log(data);
  axios
    .post("v1/users/login", data)
    .then((res) => {
      console.log(res);
      // store.dispatch(confirmloginAction(res))
    })
    .catch((e) => {
      console.log(e);
    });
}
export function loginAction(payload) {
  return (dispatch) => {
    axios.post("v1/users/login", payload).then((res) => {});
    login(payload).then((res) => {
      console.log(res);
      dispatch(confirmloginAction(res.data.data));
    });
  };
}

export function LOGOUT_USER() {
  localStorage.removeItem("token");
}
export function confirmloginAction(response) {
  return { type: Confirm_Login_Action, payload: response };
}
export function LOGIN_USER(payload, dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/login", payload)
      .then((res) => {
        resolve(res);
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: "LOGIN", payload: res.data.data });
      })
      .catch((e) => {
        reject(e);
        console.log(e);
      });
  });
}
