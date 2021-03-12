import { AUTH, USERS } from '../constants/actionTypes';
import * as api from '../api';
import { toast } from 'react-toastify';
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        if (data.message) {
            toast.error(data.message);
        } else {
            dispatch({ type: AUTH, data });
            history.push('/');
            toast.success(`Welcome user ${data.result.name}!`);
        }
    } catch (err) {
        console.log(err);
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        if (data.message) {
            toast.error(data.message);
        } else {
            dispatch({ type: AUTH, data });
            history.push('/');
            toast.success(`Registration succeded!`);
        }
    } catch (err) {
        console.log(err);
    }

}

export const getusers = ()=> async(dispatch)=>{
    try {
        const { data } = await api.getUsers();
        dispatch({ type: USERS, data });
    } catch (error) {
        console.log(error)
    }

}