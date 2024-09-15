import axios from 'axios'
import store from './index'


const createSubscriber = () => {
    const lateststate = store.getState()
    if (lateststate.isLogin === true) {

        axios.defaults.headers.common['Authorization'] = `Bearer ${
            localStorage.getItem('token')
        }`
    }
};
store.subscribe(createSubscriber)
