'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import GiftIcon from "../../../../public/svg/gift";
import RightArrowIcon from "../../../../public/svg/rightArrow";
import { useRouter } from 'next/navigation';
import LinkIcon from "../../../../public/svg/link";
import LightIcon from "../../../../public/svg/light";
import Link from "next/link";
import EditIcon from "../../../../public/svg/edit";
import PenIcon from "../../../../public/svg/pen";
import CameraIcon from "../../../../public/svg/camera";
import default_user from "../../../../public/default_user.png";
export default function EditProfilePage() {
    const [userId, setUserId] = useState();
    const [loggedInUser, setLoggedInUser] = useState();
    const [token, setToken] = useState("");
    const router = useRouter();
    const getUser = async () => {
        console.log('🔥 getUserById HIT', userId);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`).then((res) => res.json().then((data) => {
                console.log('datadoioi', data);
                setLoggedInUser(data.user);
                setVisitedPos(data.user.finalUser.visits);
                // console.log("Fetched user data:", data.data);
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        // setShowReferralLinks(false);
        if (userId) {
            getUser();
        }
    }, [userId])

    return (

        <section className="min-h-screen h-full max-w-md mx-auto">
            {/* first section */}
            <div className="h-[100px] h-full flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center  px-4 text-white rounded-b-full w-full">
                <div className="w-full flex flex-col pt-10 justify-between items-center gap-2 h-full ">
                    <div className="w-full flex justify-between items-center  relative z-10 -top-8 ">

                        <button className="absolute w-full" onClick={() => router.back()}>
                            <RightArrowIcon className="w-8 h-8 text-white cursor-pointer rotate-180 stroke-2" />
                        </button>



                        <h2 className="font-semibold font-sans text-xl text-white text-center w-full"> Edit Profile</h2>
                    </div>

                    <div
                     className="flex flex-col items-start justify-end relative">
                        <Image alt="profile cover image" src={loggedInUser?.base?.avatar ? loggedInUser?.base?.avatar : default_user} width={100} height={100} className="rounded-full stroke-white " />
                        <div className="absolute -right-2 bottom-9">
                            <CameraIcon className="w-7 h-7 text-white bg-blue-500 rounded-full flex justify-center p-1 absolute -bottom-5 right-0 cursor-pointer stroke-2" />
                        </div>
                    </div>
                    
                </div>


                
            </div>
 <div className="h-full">
                <form className="flex justify-between gap-4 mt-6 px-4 flex-wrap relative w-full"> 
                    <div className="w-full flex flex-col relative" >
                        <label htmlFor="name" className="font-medium text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Name</label>
                        <div className="flex items-center gap-2">
                            <input type="text" id="name" name="name" defaultValue={loggedInUser?.base?.name} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col relative">
                        <label htmlFor="email" className="font-medium text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Email</label>
                        <div className="flex items-center gap-2">
                            <input type="email" id="email" name="email" defaultValue={loggedInUser?.base?.email} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                     <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="phone" className="text-xs  text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10 font-medium">
                            Phone
                        </label>

                        <div className="flex items-center gap-2">

                            <div className="relative flex items-center bg-gray-50/50 border border-gray-300 rounded-md px-3 py-2.5 min-w-[96px] justify-between cursor-pointer">
                                <div className="flex items-center gap-1.5 select-none">

                                    <svg className="w-5 h-4 rounded-sm object-cover" viewBox="0 0 6 4">
                                        <rect width="6" height="4" fill="#00247D" />
                                        <path d="M0,0 L6,4 M0,4 L6,0" stroke="#FFF" strokeWidth="0.6" />
                                        <path d="M0,0 L6,4 M0,4 L6,0" stroke="#CF142B" strokeWidth="0.4" />
                                        <path d="M3,0 L3,4 M0,2 L6,2" stroke="#FFF" strokeWidth="1" />
                                        <path d="M3,0 L3,4 M0,2 L6,2" stroke="#CF142B" strokeWidth="0.6" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-800">+44</span>
                                </div>
                                {/* Dropdown Chevron Indicator Arrow */}
                                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Local Telephone Number Text Input Field */}
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                pattern="[0-9]*"
                                placeholder="Phone"
                                defaultValue={loggedInUser?.base?.telephone || ""}
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    {/* CURRENT PASSWORD (IDENTITY VERIFICATION) */}
                    <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="currentPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Enter current password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    {/* NEW PASSWORD */}
                    <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="newPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* CONFIRM NEW PASSWORD */}
                  
                     <div className="w-full flex flex-col  relative mt-2">
                        <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number Field Component Block */}
                   
                   <div className="w-full">
                     <button type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-700 to-blue-700 py-2 px-2 text-white font-semibold cursor-pointer
                            transition-all duration-500 ease-in-out hover:animate-pulse shadow-lg 
                        ">
                        Save Changes
                    </button>
                   </div>

                </form>
            </div>

           
        </section>
    )




}