import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
})
const UseAxiosSecure = () => {
    const { user, logOut } = useContext(AuthContext);

    if(!user?.accessToken) return;
    console.log(user.accessToken)

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })

    //response interceptors ---
    // axiosInstance.interceptors.response.use(response =>{
    //     return response;
    // },error => {
    //     if(error.status === 401 || error.status === 403){
    //         logOut()
    //         .then(()=>{
    //             console.log('sign out user for 401 or 403 status code')
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    //     }
    //     return Promise.reject(error)
    // })


    return axiosInstance
};

export default UseAxiosSecure;