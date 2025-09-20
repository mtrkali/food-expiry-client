import React from "react";
import { motion } from "framer-motion";

const tips = [
    "Store ginger in fridge to last 2 weeks.",
    "Use fruits within 3 days of purchase.",
    "Keep dairy products sealed and refrigerated.",
    "Label leftovers with date to track freshness.",
];

const FoodTips = () => {
    return (
        <div className="max-w-4xl mx-auto my-8 border boder-aber-500 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-4 text-white text-center border-b border-dashed">
                Food Usage Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-green-100 p-4 rounded-lg shadow-md text-gray-800"
                    >
                        <p className="font-medium">{tip}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FoodTips;
