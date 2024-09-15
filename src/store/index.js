import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
const initialState = {
    users: [],
    token: '',
    isLoading: true,
    isLogin: false,
    stats: [],
    paymentVolume: 0
}

const AuthReducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        console.log(action.payload)
        return {
            ...state,
            users: action.payload.user,
            token: action.payload.token,
            isLogin: true,
            isLoading: false

            // dispatch('attempt',action)

        }

    }
    if (action.type === 'USER_PROFILE') {

        return {
            ...state,
            users: action.payload.data.data,
            isLogin: true


        }
    }
    if (action.type === 'STATS') {
        return {
            ...state,
            stats: action.payload.data.data
        }
    }
    if (action.payload === 'PAYMENT_VOLUME') {
        return {
            ...state,
            paymentVolume: action.payload.data.data
        }
    }

    return state
}


const store = createStore(AuthReducer, composeWithDevTools())


export default store
