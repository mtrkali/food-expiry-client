import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";
import { Pencil, Trash2 } from "lucide-react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();

    // for modal
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);


    useEffect(() => {
        if (!user?.email) return;
        const fetchFood = async () => {
            try {
                const res = await axiosSecure.get(`my-foods?email=${user.email}`)
                setFoods(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchFood();
    }, [user?.email, axiosSecure])

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Delete Item?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(
                        `foods/${_id}`
                    );
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Item removed successfully.", "success");
                        setFoods(foods.filter((food) => food._id !== _id));
                    }
                } catch (error) {
                    console.error("Delete error", error);
                }
            }
        });
    };

    const handleUpdate = (food) => {
        setSelectedFood(food);
        setIsOpen(true);
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen px-4 py-8 bg-gray-50">
            {foods.length === 0 ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-500 text-center">
                        You haven’t added any food items yet!!
                    </h1>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">
                        My Items
                    </h2>

                    {/* dynamic part */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                            >
                                <img
                                    src={food.foodImage}
                                    alt={food.foodTitle}
                                    className="h-40 w-full object-cover rounded-xl mb-3"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {food.foodTitle}
                                </h3>
                                <p className="text-sm text-gray-500">{food.category}</p>

                                <div className="mt-3 flex flex-wrap justify-between text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Qty:</span> {food.quantity}
                                    </p>
                                    <p>
                                        <span className="font-medium">Expiry:</span>{" "}
                                        {food.expiryDate && !isNaN(new Date(food.expiryDate))
                                            ? new Date(food.expiryDate).toISOString().split("T")[0]
                                            : "N/A"}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex justify-between gap-2">
                                    <button
                                        onClick={() => handleUpdate(food)}
                                        className="flex items-center justify-center gap-1 flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                                    >
                                        <Pencil size={16} /> Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(food._id)}
                                        className="flex items-center justify-center gap-1 flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Update Modal compo */}
            {isOpen && selectedFood && (
                <UpdateModal
                    isOpen={isOpen}
                    foods={foods}
                    setIsOpen={setIsOpen}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    setFoods={setFoods}
                />
            )}
        </div>
    );
};

export default MyItems;
