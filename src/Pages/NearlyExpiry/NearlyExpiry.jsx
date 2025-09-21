import axios from 'axios';
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../Shared/Loading';
import { AuthContext } from '../../Contexts/AuthContext';

const NearlyExpiry = () => {
    const {user} = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://food-expiry-server-seven.vercel.app/foods?type=nearly-expiry`)
            .then(res => setFoods(res.data))
            .catch(err => console.error(err))
            .finally(()=> setLoading(false))
    }, [])
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-5'>
            <h1 className="text-center text-3xl font-semibold">Nearly Expire item</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {foods.map((food, index) => (
                    <motion.div
                        key={food._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, delay: index * 0.1 }}
                        className="border-2 rounded-2xl shadow-md p-4 flex flex-col items-center bg-gray-200 border-blue-500"
                    >
                        {/* Food Image */}
                        <img
                            src={food.foodImage}
                            alt={food.foodTitle}
                            className="w-32 h-32 object-cover rounded-xl mb-4"
                        />

                        {/* Title */}
                        <h2 className="text-lg text-blue-600 font-semibold">{food.foodTitle}</h2>

                        {/* Category */}
                        <p className="text-sm text-gray-500">{food.category}</p>

                        {/* Quantity */}
                        <p className="text-sm text-gray-700 mt-2">Quantity: {food.quantity}</p>

                        {/* Expired Badge */}
                        {food.expired ? (
                            <span className="mt-2 px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                Expired
                            </span>
                        ) : (
                            <span className="mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                                Fresh
                            </span>
                        )}

                        {/* See Details Button */}
                        <Link to={`/foodDetails/${food._id}`}>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                See Details
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NearlyExpiry;