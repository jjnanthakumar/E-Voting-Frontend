import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'
import * as api from '../api';
export const getPartys = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPartys();
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (err) {
        console.log(err.message);
    }

}

export const createParty = (party) => async (dispatch) => {
    try {
        const { data } = await api.createParty(party);
        dispatch({ type: CREATE, payload: data })
    } catch (err) {
        console.log(err.message);
    }
}

export const updateParty = (id, party) => async (dispatch) => {
    try {
        const { data } = await api.updateParty(id, party);
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err.message);
    }
}


export const voteParty = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.voteParty(id, user?.token);
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err);
    }
}
