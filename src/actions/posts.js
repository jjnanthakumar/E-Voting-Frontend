import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'
import * as api from '../api';
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (err) {
        console.log(err.message);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data })
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deltePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (err) {
        console.log(err.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.likePost(id, user?.token);
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err);
    }
}
export const commentPost = (id, comment) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.commentPost(id, comment, user?.result || user);
        // console.log(data)
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err);
    }
}

export const deleteComment = (id, c_id) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id, c_id);
        // console.log(data)
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err);
    }
}
