import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateModal = ({ isOpen, setIsOpen, selectedFood, setSelectedFood, setFoods, foods }) => {
    console.log(selectedFood)
    const { user } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isOpen || !selectedFood) return null;
        const form = e.target;
        const formData = new FormData(form);
        const updatedFood = Object.fromEntries(formData.entries());
        try {
            const res = await axios.put(`https://food-expiry-server-seven.vercel.app/foods/${selectedFood._id}`, updatedFood);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Food Updated", "success");
                setFoods((foods) => foods.map(food => food._id === selectedFood._id ? { ...food, ...updatedFood } : food))
            }
            setIsOpen(false);
            setSelectedFood(null);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center'>
            <div className="w-[380px] h-[500px] overflow-y-auto mx-auto p-3 bg-white shadow-lg rounded-2xl text-blue-500">
                <h2 className="text-2xl font-bold mb-4">Update modal</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Food Image */}
                    <fieldset>
                        <label className="block font-medium">Food Image URL</label>
                        <input
                            type="text"
                            name="foodImage"
                            defaultValue={selectedFood.foodImage}
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter image URL"
                        />
                    </fieldset>

                    {/* Food Title */}
                    <fieldset>
                        <label className="block font-medium">Food Title</label>
                        <input
                            type="text"
                            name="foodTitle"
                            defaultValue={selectedFood.foodTitle}
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter food title"
                        />
                    </fieldset>

                    {/* Category */}
                    <fieldset>
                        <label className="block font-medium">Category</label>
                        <select name="category" defaultValue={selectedFood?.category} className="w-full border rounded-lg p-2">
                            <option value="" disabled>Select Category</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Meat">Meat</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </fieldset>

                    {/* Quantity */}
                    <fieldset>
                        <label className="block font-medium">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            defaultValue={selectedFood.quantity}
                            className="w-full border rounded-lg p-2"
                            placeholder="e.g. 2kg, 5pcs, 1L"
                        />
                    </fieldset>

                    {/* emial */}
                    <fieldset>
                        <label className="block font-medium">Email</label>
                        <input
                            type="text"
                            name="userEmail"
                            defaultValue={user?.email}
                            readOnly
                            className="w-full border rounded-lg p-2"
                        />
                    </fieldset>

                    {/* Expiry Date */}
                    <fieldset>
                        <label className="block font-medium">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            defaultValue={
                                selectedFood?.expiryDate
                                    ? new Date(selectedFood.expiryDate).toISOString().split("T")[0]
                                    : ""
                            }
                            className="w-full border rounded-lg p-2"
                        />
                    </fieldset>

                    {/* Description */}
                    <fieldset>
                        <label className="block font-medium">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            defaultValue={selectedFood.description}
                            className="w-full border rounded-lg p-2"
                            placeholder="Enter food description"
                        ></textarea>
                    </fieldset>

                    {/* Submit Button */}
                    <fieldset className='flex justify-end sticky bottom-0 bg-black/40'>
                        <button type='button' onClick={() => setIsOpen(false)} className='bg-red-500 text-white px-4 py-2 rounded'>Cancel</button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 ml-4 rounded-lg"
                        >
                            Save
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;