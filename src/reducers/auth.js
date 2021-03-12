import { AUTH, LOGOUT, USERS } from '../constants/actionTypes';
// eslint-disable-next-line
export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        case USERS:
            localStorage.setItem('users', JSON.stringify([...action?.data]));
            return { ...state, authData: action?.data };
        default:
            return state;
    }
}