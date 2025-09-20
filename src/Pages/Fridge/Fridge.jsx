import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Loading from "../Shared/Loading";

const Fridge = () => {
    const data = useLoaderData();
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (data) {
            setFoods(data);
            setLoading(false);
        }
    }, [data])

    useEffect(() => {
        const controller = new AbortController();

        const params = new URLSearchParams();
        if(search) params.append('search', search);
        if(category) params.append('category', category);

        const url = `http://localhost:3000/foods?${params.toString()}`;

        fetch(url, { signal: controller.signal })
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => {
                if (err.name !== 'AbortError') console.error(err);
            })
        return () => controller.abort();
    }, [search, category])


    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="flex md:flex-row lg:flex-row flex-col justify-center w-full max-w-md gap-6 ">

                <input className="border-2 max-w-md my-5 h-12 text-blue-500 font-bold text-xl rounded-full p-4" type="text" name="" placeholder="search foods...." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="flex justify-center gap-4 my-4 text-amber-500 max-w-md">
                    <select
                        className="border rounded-lg px-4 py-2" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Meat">Meat</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Snacks">Snacks</option>
                    </select>
                </div>
            </div>

            {
                foods.length === 0 && (
                    <div className="text-center">
                        <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold p-10 border rounded-lg">Foods Not Found!!</h1>
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {foods.map((food, index) => (
                    <motion.div
                        key={food._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="border rounded-2xl shadow-md p-4 flex flex-col items-center bg-white"
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

export default Fridge;
