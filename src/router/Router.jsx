import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home/Home';
import TermsService from '../Pages/Shared/TermsService';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import AddFood from '../Pages/AddFood/AddFood';
import MyItems from '../Pages/MyItems/MyItems';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Fridge from '../Pages/Fridge/Fridge';
import FoodDetails from '../Pages/FoodDetails/FoodDetails';
import ErrorPage from '../Pages/Shared/ErrorPage';

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
            },
            {
                path: 'addfood',
                element:<PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: 'myitems',
                element:<PrivateRoute><MyItems></MyItems></PrivateRoute>
            },
            ,
            {
                path: 'fridge',
                loader: ()=>fetch('https://food-expiry-server-seven.vercel.app/foods'),
                Component: Fridge,
            },
            {
                path: '/foodDetails/:id',
                loader: ({params})=>fetch(`https://food-expiry-server-seven.vercel.app/foods/${params.id}`),
                Component: FoodDetails,
            },
            {
                path:'*',
                Component: ErrorPage
            }
        ]
    }
])

export default router;