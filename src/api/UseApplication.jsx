import React from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const UseApplication = () => {
    const axiosSecure = UseAxiosSecure();
    const myApplicationPromise = email =>{
        return axiosSecure.get(`food?email=${email}`)
        .then(res => res.data)
    }
    return{
        myApplicationPromise
    }
};

export default UseApplication;