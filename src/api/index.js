import axios from 'axios';
// const API = axios.create({ baseURL: "https://mempro.herokuapp.com" });
const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    const data = JSON.parse(localStorage.getItem('profile'))
    if (data) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        req.headers.id = data?.result?.id || data?.id
        req.headers.type = data.type
    }
    return req;
})
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deltePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signUp = (formData) => API.post(`/users/signup`, formData);
export const signIn = (formData) => API.post(`/users/signin`, formData);
export const getUsers = () => API.get('/users');
export const commentPost = (id, comment, user) => API.patch(`/posts/${id}/commentPost`, { comment: comment, user: user })
export const deleteComment = (id, c_id) => API.patch(`/posts/${id}/deleteComment`, { c_id: c_id })
export const uploadImage = () => API.get('/image-upload')
export const sendOTP = (mobile)=> API.post('/users/otpsend', mobile)
// export const getTwitterData = (oauth_token) => API.post('/auth/twitter', { oauth_token })