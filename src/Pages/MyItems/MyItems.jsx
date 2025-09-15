import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Loading from '../Shared/Loading';
import Swal from 'sweetalert2';

const MyItems = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);


    //for modal --
    const[isOpen,setIsOpen] = useState(false);
    const[selectedFood, setSelectedFood] = useState(null);


    useEffect(() => {
        if (!user?.email) return;
        axios.get(`http://localhost:3000/foods?email=${user?.email}`)
            .then(res => {
                setFoods(res.data)
                setLoading(false)
            })
            .catch((error) => console.error(error))
    }, [])
    console.log(foods);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:3000/foods/${_id}`)
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setFoods(foods.filter(food=> food._id !== _id));
                    }
                } catch (error) {
                    console.error('data deleting error', error)
                }

            }
        });
    }

    const handleUpdate = (food)=>{
        setSelectedFood(food);
        setIsOpen(true);
    }

    //my serverside code --
    // app.get('/foods', async(req, res)=>{
    //   const email = req.query.email;
    //   const query = {userEmail: email};
    //   const result = await foodCollection.find(query).toArray();
    //   res.send(result);
    // })


    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className="">
            {
                foods.length === 0 ? (
                    <div className='min-h-screen flex justify-center items-center'>
                        <h1 className='text-2xl lg:text-5xl md:text-4xl font-bold italic text-accent'>you have not added food Item Yet!!!</h1>
                    </div>
                ) :
                    (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">My Items</h2>
                            <table className="w-full border">
                                <thead>
                                    <tr className=''>
                                        <th className="p-2 border">Image</th>
                                        <th className="p-2 border">Title</th>
                                        <th className="p-2 border">Category</th>
                                        <th className="p-2 border">Quantity</th>
                                        <th className="p-2 border">Expiry</th>
                                        <th className="p-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food) => (
                                        <tr key={food._id}>
                                            <td className="border p-2 w-24">
                                                <img src={food.foodImage} alt="" className="w-20 h-20 object-cover" />
                                            </td>
                                            <td className="border p-2">{food.foodTitle}</td>
                                            <td className="border p-2">{food.category}</td>
                                            <td className="border p-2">{food.quantity}</td>
                                            <td className="border p-2">{food.expiryDate}</td>
                                            <td className="border p-2 space-x-2 text-center">
                                                <button
                                                onClick={()=>handleUpdate(food)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    );
};

export default MyItems;