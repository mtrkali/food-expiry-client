import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { PlusCircle } from "lucide-react";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const foodData = Object.fromEntries(formData.entries());

    foodData.addedDate = new Date().toISOString().split("T")[0];
    foodData.userEmail = user?.email;

    try {
      const res = await axios.post("http://localhost:3000/foods", foodData);
      console.log("server response is ", res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully added your food",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/myitems`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-200 rounded-lg">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 flex justify-center items-center gap-2">
            <PlusCircle size={26} /> Add New Food
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details below to add a new food item.
          </p>
        </div>

        
        <form onSubmit={handleAddFood} className="space-y-6">
          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Food Image URL
            </label>
            <input
              type="text"
              name="foodImage"
              required
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter image URL"
            />
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Food Title
            </label>
            <input
              type="text"
              name="foodTitle"
              required
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter food title"
            />
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="">Select Category</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Snacks">Snacks</option>
            </select>
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              required
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="e.g. 2kg, 5pcs, 1L"
            />
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              name="userEmail"
              defaultValue={user?.email}
              readOnly
              className="w-full rounded-lg p-3 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              required
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </fieldset>

          
          <fieldset>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter food description"
            ></textarea>
          </fieldset>

          
          <fieldset>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Add Food
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
