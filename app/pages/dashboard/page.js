'use client'

import Link from "next/link"
import AwardIcon from "../../../public/svg/award"
import ClientsIcon from "../../../public/svg/clients"
import MessageReviewIcon from "../../../public/svg/messageReview"
import StarIcon from "../../../public/svg/star"

export default function PointOfSale() {
    return (
        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-800  w-full  "

        >
              <div className="p-4 flex flex-col">
                <h1 className="font-bold  text-2xl
                 text-black">Dashboard</h1>
                <p className="text-sm">Welcome back, John Restaurant! Here's your business overview.</p>
            </div>
           

            {/* //some overviews */}
            <div className="flex flex-col gap-3 p-4 text-sm " >
                <div className="grid grid-cols-2 gap-3 w-full ">

                    <div className="p-4 shadow-lg rounded-lg bg-purple-100">
                        <div className="flex justify-between w-full">
                            <h2 className=" font-semibold ">Total Visits</h2>
                            <ClientsIcon className="w-7 h-7 text-gray-500" />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="text-3xl font-semibold text-green-700 
                            ">290</span>
                            <span  style={{
                                'fontSize':'12px'
                            }} className="text-gray-700 text-sm ">This Month</span>
                        </div>



                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-green-100">
                        <div className="flex justify-between w-full">
                            <h2 className=" font-semibold ">Average Rating</h2>
                            <StarIcon className="w-7 h-7 text-gray-500 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-3xl text-green-700 
                            ">4.6</span>
                            <span
                            style={{
                                'fontSize':'12px'
                            }}
                            className="text-gray-700 text-sm ">Out of 5.0</span>
                        </div>



                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-4 shadow-lg rounded-lg bg-blue-100 ">
                        <div className="flex justify-between w-full">
                            <h2 className=" font-semibold ">Total Reviews</h2>
                            <MessageReviewIcon className="w-7 h-7 text-gray-500 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-green-700 
                            text-3xl">29</span>
                            <span  style={{
                                'fontSize':'12px'
                            }} className="text-gray-700 text-sm ">This Month</span>
                        </div>



                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-red-100">
                        <div className="flex justify-between w-full">
                            <h2 className=" font-semibold ">Points Redeemed</h2>
                            <AwardIcon className="w-7 h-7 text-gray-500 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-3xl text-green-700 
                            ">680$</span>
                            <span  style={{
                                'fontSize':'12px'
                            }} className="text-gray-700 text-sm">Value</span>
                        </div>



                    </div>
                </div>

            </div>


            {/* a chart of the montly visits */}

            <div className="p-4 flex flex-col gap-3">
                <div className="p-4 shadow-lg rounded-lg ">
                    <h2 className=" font-semibold ">Weekly visits trend</h2>
                    <div className="h-[200px]">

                    </div>
                </div>

            </div>

            {/* top 3 clients */}

            <div className="p-4 flex flex-col gap-3 ">
                <div className="p-4 shadow-lg rounded-lg flex flex-col gap-4 ">
                    <h2 className=" font-semibold mb-3">Top 3 clients</h2>
                    
                    <div className="bg-gray-100 rounded-lg flex justify-between p-3 ">

                        <div className="flex gap-3  items-center">
                            <span
                            className="w-10 h-10 bg-gradient-to-br from-green-800 via-blue-800 to-blue-600 rounded-full shadow-lg flex justify-center items-center text-white font-bold"
                            >#1</span>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold ">Srah Johnson</span>
                                <span style={{
                                'fontSize':'12px'
                            }} className=" ">10 visits</span>
                            </div>
                        </div>

                        <div>
                            <span className="font-bold  text-green-600 text-sm">10 pts</span>
                        </div>
                    </div> 
                    
                   
                </div>

            </div>

            {/* some reviews */}

            <div className="p-4 flex flex-col gap-3 ">
                <div className="p-4 shadow-lg rounded-lg flex flex-col gap-4 ">
                    <div className="w-full flex justify-between p-3">
                        <h2 className=" font-semibold mb-3">Recent reviews</h2>
                        <Link 
                        className="font-semibold text-blue-600"
                        href={'/pages/reviews'}>View More </Link>
                    </div>
                    
                    
                    <div className="bg-gray-100 rounded-lg flex flex-col justify-between p-3 gap-4">

                        <div className="flex justify-between w-full">
                              <div className="flex gap-3  items-center">
                            <span
                            className="w-10 h-10 bg-gradient-to-br from-green-800 via-blue-800 to-blue-600 rounded-full shadow-lg flex justify-center items-center text-white font-bold"
                            >😇 </span>
                            <div className="flex flex-col">
                                <span className="font-semibold ">Srah Johnson</span>
                                <span style={{
                                'fontSize':'12px'
                            }}>Point Of Sale</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span>⭐⭐⭐⭐</span>
                            <span  style={{
                                'fontSize':'12px'
                            }} className=" text-gray-400">Jan 12, 2025</span>
                        </div>
                        </div>
                      
                        <div>
                            <p className="text-sm ">
                                Absolutely amazing pizza! The margherita is to die for. Will definitely come back!
                            </p>
                        </div>
                    </div> 
                     
                </div>

            </div>
        </section>
    )
}