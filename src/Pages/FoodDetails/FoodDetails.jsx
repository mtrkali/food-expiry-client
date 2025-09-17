import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);

    const [notes, setNotes] = useState(food?.notes || []);
    const [noteText, setNoteText] = useState("");

    // Countdown state
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!food?.expiryDate) return;

        const expiry = new Date(food.expiryDate).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiry - now;

            if (distance <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [food?.expiryDate]);

    // Add note
    const handleAddNote = async () => {
        if (!noteText.trim()) return;

        const newNote = {
            text: noteText,
            postedDate: new Date().toISOString().split("T")[0],
            userEmail: user?.email,
        };

        try {
            const res = await axios.patch(
                `http://localhost:3000/foods/${food._id}`,
                newNote
            );

            if (res.data.modifiedCount > 0) {
                setNotes([...notes, newNote]);
                setNoteText("");

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your note has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error adding note ", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-lg mx-auto shadow-lg bg-white rounded-2xl p-6">
                {/* Food Image */}
                <img
                    src={food.foodImage}
                    alt={food.foodTitle}
                    className="w-full h-60 object-cover rounded-xl mb-4"
                />

                {/* Food Info */}
                <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">
                    {food.foodTitle}
                </h2>
                <div className="space-y-1 text-black bg-gray-200 p-2 rounded-lg">
                    <div className="flex gap-5">
                        <p>
                            <strong>Category:</strong> {food.category}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {food.quantity}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Expiry Date:</strong> {new Date(food.expiryDate).toISOString().split('T')[0]}
                        </p>
                        <p>
                            <strong>Added Date:</strong> {new Date(food.addedDate).toISOString().split('T')[0]}
                        </p>
                    </div>
                    <p className="italic">
                        <strong>Added By:</strong> {food.userEmail}
                    </p>
                </div>

                {/* Countdown */}
                <div className="my-4">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                        AvailableTime To Expire-  {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
                        {timeLeft.seconds}s
                    </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-black/60 leading-relaxed bg-gray-100 p-3 my-2 rounded-lg">
                    {food.description}
                </p>

                {/* Notes */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2 text-black">Notes:</h3>
                    {notes.length === 0 ? (
                        <p className="text-sm text-slate-400 p-3 bg-slate-100 rounded text-center">No notes yet!!!</p>
                    ) : (
                        <div className="space-y-2">
                            {notes.map((note, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-gray-100 rounded-lg shadow-sm"
                                >
                                    <p className="text-gray-500">{note.text}</p>
                                    <small className="text-blue-500 block mt-1">
                                        Posted: {note.postedDate}
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Note */}
                <div className="mt-6">
                    <label className="block font-medium mb-2 text-black">Add Note</label>
                    <textarea
                        className="w-full text-black  border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                        placeholder="Write your note..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        disabled={user?.email !== food?.userEmail}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="btn btn-info text-black border-amber-500"
                            onClick={handleAddNote}
                            disabled={user?.email !== food?.userEmail || !noteText.trim()}
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
