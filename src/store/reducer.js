import {Confirm_Login_Action} from "./action";

const initialState = {
    users: [],
    token: ''
}
export default function LoginReducer(state = initialState, actions) {

    if (actions.type === Confirm_Login_Action) { // console.log(actions.payload)
        return { // eslint-disable-next-line
            ... state,
            users: actions.payload,
            token: actions.payload.token
        }
    }
    return state;


}
