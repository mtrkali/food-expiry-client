import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Lay;outs/RootLayout';
import Home from '../Pages/Home/Home';
import TermsService from '../Pages/Shared/TermsService';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'terms',
                Component: TermsService
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    }
])

export default router;