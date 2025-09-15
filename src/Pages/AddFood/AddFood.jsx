import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddFood = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const foodData = Object.fromEntries(formData.entries());

        // extra fields
        foodData.addedDate = new Date().toISOString().split("T")[0];
        foodData.userEmail = user?.email;

        console.log("Food Data:", foodData);


        //sending data to the db --
        try {
            const res = await axios.post('http://localhost:3000/foods', foodData)
            console.log('server response is ', res.data)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully added your food",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(`/myitems`)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl text-blue-500">
            <h2 className="text-2xl font-bold mb-4">Add New Food</h2>

            <form onSubmit={handleAddFood} className="space-y-4">
                {/* Food Image */}
                <fieldset>
                    <label className="block font-medium">Food Image URL</label>
                    <input
                        type="text"
                        name="foodImage"
                        required
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
                        required
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter food title"
                    />
                </fieldset>

                {/* Category */}
                <fieldset>
                    <label className="block font-medium">Category</label>
                    <select name="category" required className="w-full border rounded-lg p-2">
                        <option value="">Select Category</option>
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
                        required
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
                        required
                        className="w-full border rounded-lg p-2"
                    />
                </fieldset>

                {/* Description */}
                <fieldset>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter food description"
                    ></textarea>
                </fieldset>

                {/* Submit Button */}
                <fieldset>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
                    >
                        Add Food
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default AddFood;
