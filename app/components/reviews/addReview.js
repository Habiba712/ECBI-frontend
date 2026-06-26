'use client'

import { useEffect, useState } from "react";
import ChevronDownIcon from "../../../public/svg/chevron-down"
import StarIcon from "../../../public/svg/star"
import { TextareaAutosize } from "@mui/material";
import { motion } from 'framer-motion';

export default function AddReview({ data, isModalOpen, onSend, setIsModalOpen }) {
    const [user, setUser] = useState();
    const { posId } = data;
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    console.log('rating', rating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('review text', reviewText);

        const newData = {
            posId: data,
            rating: rating,
            comment: reviewText,
            userId: user
        }
        console.log('data', newData);
        onSend(newData);
        setIsModalOpen(false);
    }

    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem("sessionData")) || null;
        // setToken(sessionData?.token);
        setUser(sessionData?.userId);
        // setIsLoading(false);
    }, [posId])
    return (
        <motion.div 
            className="min-h-screen h-full max-w-md mx-auto z-50 w-full bg-black/50 fixed inset-0 flex items-end sm:items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
        >
             <div className="min-h-screen h-full max-w-md mx-auto z-0 w-full mh-100vh bg-black/50 fixed inset-0
        flex items-center justify-center py-8">
           <motion.div 
                className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scrollbar-thin"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking modal content
            >
                 <div className="bg-white w-full h-full rounded-lg px-4 py-3 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 ">

                <div className="w-full flex items-center">
                    <button 
                    onClick={() => setIsModalOpen(false)}
                    className="py-3 cursor-pointer">
                        <ChevronDownIcon className="w-6 h-6 text-black stroke-2 rotate-90" /></button>

                    <h2 className="w-full text-center text-xl font-semibold">Leave a Review</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <h3 className="font-semibold text-sm">Your Rating</h3>
                    <div className="flex flex-col gap-3 px-4 py-2 items-center">
                        <div className="flex gap-2 items-center justify-center py-3">
                            {
                                [1, 2, 3, 4, 5].map((star, index) => (
                                    <div className="flex items-center gap-1" key={index}>
                                        <input
                                            type="radio"
                                            placeholder="none"
                                            name="rating"
                                            id={`star${index}`}
                                            value={star}
                                            onChange={() => setRating(prev => prev === star ? 0 : star)}
                                            checked={rating === star}
                                            className="sr-only"

                                        />
                                        <label htmlFor={`star${index}`} className="text-gray-400 font-semibold text-sm">
                                            <StarIcon className={`w-10 h-10 text-purple-500  ${rating >= star ? 'fill-current' : ''}`} />
                                        </label>
                                    </div>
                                ))
                            }


                        </div>
                        <p className="text-gray-500 font-medium"> Tap a start to rate</p>
                    </div>
                    <h3 className="font-semibold text-sm">Your Review</h3>
                    <div className="flex flex-col gap-3  py-2 items-center">
                        <TextareaAutosize
                            placeholder="Share your experience"
                            className="w-full h-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-500 font-semibold focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)} />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <button
                            type="submit"
                            className="bg-purple-600 rounded-lg w-full flex items-center justify-center text-white font-semibold py-3 cursor-pointer">Submit Review</button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-white border border-pruple-600 rounded-lg w-full flex items-center justify-center text-purple-600 font-semibold py-3 cursor-pointer">cancel </button>
                    </div>


                </form>
            </div>
            </motion.div>
        </div>
        </motion.div>
       
    )
}