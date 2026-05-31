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

        <section className="min-h-screen h-full max-w-md mx-auto  w-full  mb-15">
            {/* first section */}
            <div className="h-[200px] flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center w-full py-5 px-4 text-white">
                <div className="flex flex-col justify-center items-center gap-2 w-full py-5 ">
                    <div className="flex justify-between items-center  w-full relative z-10">
                        
                            <button className="absolute " onClick={() => router.back()}>
                                 <RightArrowIcon className="w-8 h-8 text-white cursor-pointer rotate-180 stroke-2" />
                            </button>
                           
                     

                        <h2 className="font-semibold font-sans text-xl text-white text-center w-full"> Edit Profile</h2>
                    </div>

                    <div className="flex flex-col items-start justify-center mt-10 relative">
                        <Image alt="profile cover image" src={loggedInUser?.base?.avatar ? loggedInUser?.base?.avatar : default_user} width={100} height={100} className="rounded-full stroke-white " />
                        <div className="absolute -right-2 bottom-9">
                            <CameraIcon className="w-7 h-7 text-white bg-blue-500 rounded-full flex justify-center p-1 absolute -bottom-5 right-0 cursor-pointer stroke-2" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form className="flex justify-between gap-4 mt-6 px-4 flex-wrap">
                    <div className="flex flex-col relative mb-4">
                        <label htmlFor="name" className="text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Name</label>
                        <div className="flex items-center gap-2">
                            <input type="text" id="name" name="name" defaultValue={loggedInUser?.base?.name} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="flex flex-col relative mb-4">
                        <label htmlFor="email" className="text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Email</label>
                        <div className="flex items-center gap-2">
                            <input type="email" id="email" name="email" defaultValue={loggedInUser?.base?.email} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                      <div className="flex flex-col relative w-full">
                        <label htmlFor="email" className="text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Password</label>
                        <div className="flex items-center gap-2">
                            <input type="password" id="email" name="email" defaultValue={loggedInUser?.base?.password} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>


                </form>
            </div>
        </section>
    )




}