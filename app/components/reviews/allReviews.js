'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import defaultUser from "../../../public/default_user.png";
import StarIcon from "../../../public/svg/star";
import Link from "next/link";


export default function AllReviews({ posId, reviews }) {
     const [isLoading, setIsLoading] = useState(true);
    console.log('posId', posId);
    console.log('reviews', reviews);
    const [token, setToken] = useState("");

    

    const calculateStars = (rating) => {
        console.log('rating', rating);
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<StarIcon
                key={i}
                className={'w-5 h-5 text-yellow-500 fill-current'} />)


        }
        return stars;
    }

    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem("sessionData")) || null;
        setToken(sessionData?.token);
        setIsLoading(false);
    }, [posId])
 
  

    return (
        <div className="flex flex-col gap-3 px-4 py-2">
            {
                isLoading ?
                <div className="flex flex-col gap-3 px-4 py-2">
                 <div className="animate-pulse flex flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                     <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
 <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="animate-pulse flex  flex-col  space-x-4 px-4 py-2">
                        <div className="rounded-full bg-slate-200 h-10 w-10">

                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                   
                    :


                    <div className="flex flex-col gap-3 px-4 py-2 items-center mb-10">
                        {
                            reviews?.length > 0 && reviews.map((review, index) => (
                                <div className="p-3 flex flex-col  gap-3 w-full border-b-2 border-gray-100" key={index || review?._id}>
                                    <div className="items-start flex justify-start gap-3">

                                        <div className="">
                                            <Image src={review?.userId?.base?.avatar || defaultUser} alt="pos cover image" width={50} height={50} className="rounded-full object-cover aspect-square" />
                                        </div>
                                        <div className="flex flex-col items-start w-[80%]">
                                            <h3 className="text-gray-800 font-medium break-words font-sans">
                                                {review?.userId?.base?.name}
                                            </h3>
                                            <p className="text-gray-400 font-medium w-full">
                                                {new Date(review?.visitedAt
                                                ).toLocaleDateString("en-Us", {
                                                    'year': 'numeric',
                                                    'month': 'short',
                                                    'day': 'numeric'
                                                })}


                                            </p>
                                            {review.rating && <span className="text-green-500 flex">
                                                {calculateStars(review.rating)}

                                            </span>}

                                        </div>


                                    </div>
                                    <div className="flex flex-col items-start ">

                                        <p>
                                            {review?.comment}
                                        </p>

                                    </div>
                                </div>
                            ))
                        }

                         <div className=" fixed bottom-20 w-[90%] shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
                   
                </div>

                    </div>

            }


        </div>
    )

}