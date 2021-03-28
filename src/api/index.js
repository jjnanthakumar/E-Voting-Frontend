import axios from 'axios';
const API = axios.create({ baseURL: "https://evotingback.herokuapp.com/" });
// const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    const data = JSON.parse(localStorage.getItem('profile'))
    if (data) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        req.headers.id = data?.result?.id || data?.id
        req.headers.type = data.type
    }
    return req;
})
export const fetchPartys = () => API.get('/partys');
export const createParty = (newParty) => API.post('/partys', newParty);
export const updateParty = (id, party) => API.patch(`/partys/${id}`, party);
// export const deltePost = (id) => API.delete(`/posts/${id}`);
export const voteParty = (id) => API.patch(`/partys/${id}/vote`);
export const signUp = (formData) => API.post(`/users/signup`, formData);
export const signIn = (formData) => API.post(`/users/signin`, formData);
export const getUsers = () => API.get('/users');
// export const commentPost = (id, comment, user) => API.patch(`/posts/${id}/commentPost`, { comment: comment, user: user })
// export const deleteComment = (id, c_id) => API.patch(`/posts/${id}/deleteComment`, { c_id: c_id })
// export const uploadImage = () => API.get('/image-upload')
export const sendOTP = (mobile) => API.post('/users/otpsend', mobile)
export const verifyOTP = (otp, actualotp) => API.post('/users/otpverify', { otp, actualotp })