'use client'

import { useEffect, useState } from "react";
import StarIcon from "../../../public/svg/star";
import defaultUser from "../../../public/default_user.png";
import Image from "next/image";
import PenIcon from "../../../public/svg/pen";

export default function myReviews({posId, reviews}) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const myreviews = reviews?.filter(review => review?.userId?._id === user);
    console.log('myreviews', myreviews);

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
        // setToken(sessionData?.token);
        setUser(sessionData?.userId);
        setIsLoading(false);
    },[posId])
    
    return (
        <div className="transition duration-500 ease-in-out">
 { isLoading && reviews?.length === 0 ?
                    <div class="animate-pulse flex space-x-4 px-4 py-2">
                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    
                :
                  <div className="flex flex-col gap-3 px-4 py-2 items-center mb-10">
                                       {
                                           myreviews?.length > 0 && myreviews.map((review, index) => (
                                               <div className="p-3 flex flex-col  gap-3 w-full shadow-lg" key={index || review?._id}>
                                                   <div className="items-start flex justify-start gap-3">
               
                                                       <div className="">
                                                           <Image src={review?.userId?.base?.avatar || defaultUser} alt="pos cover image" width={50} height={50} className="rounded-full object-cover aspect-square" />
                                                       </div>
                                                       <div className="flex flex-col items-start w-[80%]">
                                                           <h3 className="text-gray-800 font-medium break-words font-sans">
                                                               {review?.userId?.base?.name}
                                                           </h3>
                                                           <p className="text-gray-400 font-medium ">
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
                                                   <div className="flex flex-col items-start w-[80%]">
               
                                                       <p>
                                                           {review?.comment}
                                                       </p>
               
                                                   </div>
                                                   <div className="w-full flex justify-end items-center gap-1 text-purple-600">
                                                    
                                                    <button className="font-semibold text-sm flex gap-1 cursor-pointer"><PenIcon className="w-5 h-5 stroke-2 " /> Edit</button>
                                                    </div>
                                               </div>
                                           ))
                                       }
                                       </div>
                }
        </div>
    )
}