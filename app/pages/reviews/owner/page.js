'use client';
import { useEffect, useState } from "react";
import ReviewsData from "../../../../data/data";
import Image from "next/image";

export default function OwnerReviews() {
    const [reviews, setReviews] = useState();
    const [searchText, setSearchText] = useState("");
    const [filterByRestaurant, setFilterByRestaurant] = useState("");
    const [filterByRating, setFilterByRating] = useState("");
    console.log(ReviewsData);

    useEffect(() => {
        setReviews(ReviewsData);
    }, [])
    return (

        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-700  w-full">
            {/* first part */}
            <div className="p-4 text-md flex justify-between items-center w-full">
                <div>
                    <h1 className="font-bold text-md text-2xl text-black">Customer Reviews
                    </h1>
                    <p className="text-sm">Manage and respond to customer feedback</p>
                </div>
                {/* <div>
                    <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Add Restaurant </button>
                </div> */}

            </div>

            {/* filter and search section */}
            <div className="rounded-lg shadow-lg p-4 flex flex-col gap-3">
                {/* search bar */}
                <div className="flex gap-3">
                   
                    <input type="text" className="w-full rounded-full border-2 border-gray-200 px-6 py-2 text-sm text-gray-700 " placeholder="Search for a restaurant..."
                        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                

                {/* filter by restaurant name */}
                  <div className="flex gap-3">
                   
                   <select onChange={(e) => setFilterByRestaurant(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 "
                    
                    >
                        <option value="">All Restaurants</option>
                        <option value="Pizza Paradise">Pizza Paradise</option>
                        <option value="Burger Hub">Burger Hub</option>
                   </select>
                </div>
                {/* filter by rating stars */}
                  <div className="flex gap-3">
                   
                    <select onChange={(e) => setFilterByRating(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 "
                    
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Stars</option>
                   </select>
                </div>

            </div>

            {/* list of reviews */}
            <div className="shadow-lg rounded-lg p-4 mt-3">

                {
                    reviews && reviews
                    .filter(item => {
                        if(searchText){
                           return item.restaurantName.toLowerCase().includes(searchText.toLowerCase())
                        } 
                        else if(filterByRestaurant){
                            return item.restaurantName.toLowerCase().includes(filterByRestaurant.toLowerCase())
                        }
                        else if(filterByRating){
                            return item.rating === parseInt(filterByRating)
                        }
                        else{
                            return true;
                        }
                    }
                )
                    .map((review, index) => {
                        return (
                            <div key={index} className="flex flex-col items-center w-full mb-5 border-b border-gray-100">
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex justify-around gap-2 w-fit">
                                       <div className="w-fit  flex justify-center items-center">
                                        <Image src={review.userAvatar} alt="restaurant" width={50} height={50} className="rounded-full" />
                                       </div>

                                       <div className=" flex flex-col">
                                        <p className="font-semibold text-sm">{review.userName}</p>
                                        <p style={{
                                            'font-size':"14px"
                                        }}>{review.restaurantName}</p>
 <span className="text-gray-400" style={{
                                            'font-size':"12px"
                                        }}>
                                        {review.visitDate.replace('T',' ').split(' ')[0].toString()}</span>

                                       </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span  style={{
                                            'font-size':"12px"
                                        }}>
                                       
                                        {review.rating === 5 && <span className="text-green-500">⭐⭐⭐⭐⭐</span>}
                                        {review.rating === 4 && <span className="text-green-500">⭐⭐⭐⭐</span>}
                                        {review.rating === 3 && <span className="text-green-500">⭐⭐⭐</span>}
                                        {review.rating === 2 && <span className="text-green-500">⭐⭐</span>}
                                        {review.rating === 1 && <span className="text-green-500">⭐</span>}
                                    </span>
                                    <span style={{
                                            'font-size':"12px"
                                        }}className="text-green-600">
                                        +{review.pointsEarned}points earned
                                    </span>
                                    </div>
                                   
                                  
                                </div>
                                <div className="flex flex-col items-end ">
                                   <p className="mb-3 py-3">{review.comment}</p>
                                 {
                                    !review.ownerReply && review.comment ? 
                                    <div className="w-full py-2">
                                         <button className="text-sm rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Reply to Review</button>
                                        </div>
                                   
                                    :
                                    <div className="w-full py-2">
 <p style={{
                                            'font-size':"12px"
                                        }}className=" p-4 border-l-3 border-blue-400 bg-blue-100 rounded-lg">
                                        {review.ownerReply}
                                    </p>
                                    </div>
                                   
                                }
                                   
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>


    )
}