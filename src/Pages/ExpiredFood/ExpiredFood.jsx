import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { AuthContext } from '../../Contexts/AuthContext';

const ExpiredFood = () => {
    const {user} = useContext(AuthContext)
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://food-expiry-server-seven.vercel.app/foods?expired=true')
            .then(res => setFoods(res.data))
            .catch(err => console.error(err))
            .finally(()=>setLoading(false))
    },[])
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className='my-6'>
            <h2 className="text-center font-semibold text-3xl">Expired Food</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    foods.map(food =>
                        <div key={food._id} className="bg-white shadow-lg rounded-xl overflow-hidden m-4">
                            {/* Food Image */}
                            <img
                                src={food.foodImage}
                                alt="ginger"
                                className="w-full h-48 object-cover"
                            />

                            {/* Card Content */}
                            <div className="p-4">
                                {/* Food Title */}
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{food.foodTitle}</h2>

                                {/* Category & Quantity */}
                                <div className="flex justify-between text-gray-600 mb-2">
                                    <span>Category: {food.category}</span>
                                    <span>Quantity: {food.quantity}</span>
                                </div>

                                {/* Expiry Date */}
                                <p className="text-gray-600 mb-2">
                                    <strong>Expiry Date:</strong> {new Date(food.expiryDate).toISOString().split('T')[0]}
                                </p>

                                {/* Expired Badge */}
                                <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                                    Expired
                                </span>

                                {/* Description */}
                                <p className="mt-3 text-gray-700 text-sm bg-gray-200 p-3 rounded-2xl">
                                    {food.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ExpiredFood;