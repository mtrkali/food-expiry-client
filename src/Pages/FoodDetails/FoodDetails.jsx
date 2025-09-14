import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import Loading from '../Shared/Loading';
import { AuthContext } from '../../Contexts/AuthContext';
import { div } from 'framer-motion/client';

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState(food?.notes || [])
    const [noteText,setNoteText] = useState("");

    //counddown state --
    const [timeLeft, setTimeLeft] = useState({days: 0,hours: 0,minutes: 0,seconds: 0});
    useEffect(()=>{
        if(!food?.expiryDate) return;

        const expiry = new Date(food.expiryDate).getTime();

        const timer = setInterval(()=>{
            const today = new Date().getTime();
            const distance = expiry - today;

            if(distance <= 0){
                clearInterval(timer);
                setTimeLeft({days: 0,hours: 0,minutes: 0,seconds: 0})   
            }else{
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds })
            }
        },1000)
        return ()=> clearInterval(timer);
    },[food?.expiryDate])

    const handleAddNote = async() =>{
        if(!noteText.trim()) return;

        const newNote = {
            text: noteText,
            postedDate: new Date().toISOString().split("T")[0],
            userEmail: user?.email,
        };

        //send note in food json data--
        try{
            const res = await axios.patch(`http://localhost:3000/foods/${food._id}`,newNote);
            if(res.data.modifiedCount > 0){
                setNotes([...notes,newNote]);
                setNoteText("");
                alert('successfull added note')
            }
        }catch(error){
            console.error('Error ading note ',error)
        }
    }

    
    return (
        <div className='bg-base-300'>
            <div className="max-w-md mx-auto shadow-lg bg-black rounded-2xl p-6 border">
                {/* Food Image */}
                <img
                    src={food.foodImage}
                    alt={food.foodTitle}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                />

                {/* Food Info */}
                <h2 className="text-2xl text-accent font-bold mb-2">{food.foodTitle}</h2>
                <p className="text-gray-600 mb-1"><strong>Category:</strong> {food.category}</p>
                <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {food.quantity}</p>
                <p className="text-gray-600 mb-1"><strong>Expiry Date:</strong> {food.expiryDate}</p>
                <p className="text-gray-600 mb-1"><strong>Added Date:</strong> {food.addedDate}</p>
                <p className="text-gray-600 mb-1"><strong>Added By:</strong> {food.userEmail}</p>

                {/* countdown */}
                <div className="text-center text-lg my-4 font-semibold text-accent">
                    Available Time- {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m: {timeLeft.seconds}s
                </div>

                {/* Description */}
                <p className="mt-3 text-gray-700">{food.description}</p>

                {/* notes display section */}
                <div className="mt-4 bg-base-300 p-3">
                    <h3 className="font-semibold mb-2">Notes:</h3>
                    {
                        notes.length === 0?(
                            <p className="text-sm text-amber-500">no notes yet</p>
                        ):(
                            notes.map((note, index)=> (
                                <div key={index} className="bg-base-200 p-3 rounded mb-2">
                                    <p>{note.text}</p>
                                    <small className='text-blue-500'>Posted: {note.postedDate}</small>
                                </div>
                            ))
                        )
                    }
                </div>

                {/* Note section */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                    <legend className="fieldset-legend ">Add Note</legend>
                    <textarea className="textarea w-full" placeholder="write your note" value={noteText} onChange={(e)=>setNoteText(e.target.value)} disabled= {user?.email !== food?.userEmail}></textarea>
                </fieldset>

               <div className='flex justify-end'>
                <button className='btn btn-info' onClick={handleAddNote} disabled= {user?.email !== food?.userEmail}>AddNote</button>
               </div>
            </div>
        </div>
    );
};

export default FoodDetails;


