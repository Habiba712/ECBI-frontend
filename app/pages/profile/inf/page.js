

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import GiftIcon from "../../../../public/svg/gift";
import PersonIcon from "../../../../public/svg/person";
import RightArrowIcon from "../../../../public/svg/rightArrow";
import { useRouter } from 'next/navigation';

export default function InfProfilePage() {
    const [loggedInUser, setLoggedInUser] = useState();
    const [userId, setUserId] = useState();
    const [token, setToken] = useState("");
    const router = useRouter();
    const getUser = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`).then((res) => res.json().then((data) => {
                setLoggedInUser(data.data);
                console.log("Fetched user data:", data.data);
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }
    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ token })
            }).then((res) => {
                if (res.ok) {
                    localStorage.removeItem("sessionData");
                    router.push("/pages/login");
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [userId])
    return (
        <section className="min-h-screen h-full max-w-md mx-auto  overflow-scroll w-full  mb-15">
            {/* first section */}
            <div className="h-[200px] flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center w-full py-5 px-4 text-white">
                <div className="flex gap-2 w-full px-5 py-5">
                    <div className="flex flex-col items-start justify-center">
                        <Image src={loggedInUser?.base?.avatar} alt="pos cover image" width={50} height={50} className="rounded-full" />
                    </div>
                    <div className="flex flex-col items-start justify-center px-1">
                        <h5 className=" flex items-end font-semibold text-lg ">
                            {loggedInUser?.base?.name}
                        </h5>
                        <p className=" font-sm ">
                            {loggedInUser?.base?.username}
                        </p>
                    </div>
                </div>

                <div className="w-full flex justify-around">
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">{loggedInUser?.finalUser?.points}</h4>
                        <p className="text-lg ">Points</p>
                    </div>
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">{loggedInUser?.finalUser?.posts?.length}</h4>
                        <p className="text-lg ">Posts</p>
                    </div>
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">0</h4>
                        <p className="text-lg">Referrals</p>
                    </div>
                </div>

            </div>

            {/* second section */}
            <div className="flex flex-col gap-2 w-full p-5">
               <div className="cursor-pointer shadow-lg p-3 flex items-center gap-3 rounded-lg">
             <GiftIcon className="w-6 h-6 text-purple-700"/>
             <div>
                <h4 className="font-semibold">My Referral Links</h4>
                <p className="text-sm text-gray-500">Invite friends and earn points</p>
             </div>
             <RightArrowIcon className="w-5 h-5 ml-auto text-gray-400"/>
               </div>

                <div className="cursor-pointer shadow-lg p-3 flex items-center gap-3 rounded-lg">
             <PersonIcon className="w-6 h-6 text-pink-700"/>
             <div>
                <h4 className="font-semibold">Edit Profile</h4>
                <p className="text-sm text-gray-500">Update your profile informations</p>
             </div>
             <RightArrowIcon className="w-5 h-5 ml-auto text-gray-400"/>

               </div>

                  <div className="cursor-pointer shadow-lg p-3 flex items-center justify-center gap-3 rounded-lg bg-red-100 flex items-center
                  hover:shadow-red-200 hover:scale-105 duration-300 ease-in-out
                  ">
                     <button className="cursor-pointer text-red-600 font-semibold font-sans"
                     onClick={()=>handleLogout()}
                     >Logout</button>            
               </div>
            </div>
        </section>
    )
}