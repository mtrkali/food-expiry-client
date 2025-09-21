import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../Shared/Loading";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer"; 

const ExpiryStats = () => {
    const [foods, setFoods] = useState([]);
    const [expFoods, setExpFoods] = useState([]);
    const [frFoods, setFrFoods] = useState([]);
    const [nrExFoods, setNrExFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Intersection Observer hook
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        { title: "Total Foods", value: foods.length, color: "bg-blue-500" },
        { title: "Expired Foods", value: expFoods.length, color: "bg-red-500" },
        { title: "Nearly Expired", value: nrExFoods.length, color: "bg-yellow-500" },
        { title: "Fresh Foods", value: frFoods.length, color: "bg-green-500" },
    ];

    useEffect(() => {
        axios.get('https://food-expiry-server-seven.vercel.app/foods?expired=true')
            .then(res => { setExpFoods(res.data); setLoading(false); })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        axios.get('https://food-expiry-server-seven.vercel.app/foods?expired=false')
            .then(res => { setFrFoods(res.data); setLoading(false); })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        axios.get('https://food-expiry-server-seven.vercel.app/foods')
            .then(res => { setFoods(res.data); setLoading(false); })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        axios.get('https://food-expiry-server-seven.vercel.app/foods?type=nearly-expiry')
            .then(res => { setNrExFoods(res.data); setLoading(false); })
            .catch(err => console.error(err))
    }, []);

    if (loading) return <Loading />;

    return (
        <div ref={ref} className="max-w-4xl mx-auto my-8 text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Expiry Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${stat.color} p-4 rounded-lg shadow-md text-center`}
                    >
                        <h3 className="text-lg font-semibold">{stat.title}</h3>
                        <p className="text-2xl font-bold mt-2">
                            {inView ? <CountUp end={stat.value} duration={4} /> : 0}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ExpiryStats;
