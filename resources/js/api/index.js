import axios from "axios";

const api = axios.create()

api.interceptors.request.use(config => {
    if(localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config;
},error =>{
    return Promise.reject(error)
})

api.interceptors.response.use(response => {

    return response;
}, error => {
    if(error.response.data.message === 'Token has expired') {
        return axios.post('/api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            error.config.headers.authorization = `Bearer ${res.data.access_token}`
            return api.request(error.config)
        })
    }
    return Promise.reject(error)
})

export default api;
