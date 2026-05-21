'use client'

import SearchIcon from "../../../public/svg/search"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import MailIcon from "../../../public/svg/mail";
import DeleteIcon from "../../../public/svg/delete";


export default function Notifications() {

    const [notifs, setNotifs] = useState([]);
    const [notifCount, setNotifCount] = useState(0);
    const [userId, setUserId] = useState();
    const [token, setToken] = useState("");

    const getNotifs = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notif/getByReceipient/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('data', data);
                        setNotifs(data);
                        setNotifCount(data?.length);
                    })
                }
            })
        } catch (err) {
            console.log('error fetching notifs', err);
        }
    }

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        getNotifs();
    }, [userId, token])
    console.log('userId', userId);
    console.log('my notifs', notifs);
    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-20">
            <div className="p-4 flex justify-between items-center dashboard-page mb-5 mt-5 border-b-3 border-gray-100">

                <div >
                    <h2 className="font-semibold font-sans text-xl align-middle">
                        Notifications
                    </h2>
                </div>

                {/* <div className="align-center rounded-full p-3 shadow-lg ">
                    <SearchIcon className="w-6 h-6 cursor-pointer" />
                </div> */}

            </div>

            {/* notifs list */}
            <div className="flex justify-between w-full">
                <h2 className="font-bold text-md px-4 font-gray-800"> Last 7 days</h2>
            </div>
            {
                notifs?.length > 0 ? (
                    <div className="flex flex-col gap-3 p-4 text-sm " >
                        {notifs?.length > 0 ? (
                            <div className="flex flex-col w-full">
                                {notifs.map((notif) => (
                                    <div
                                        key={notif._id}
                                        className={`flex items-center w-full rounded-lg  border-gray-50/80  gap-3 py-3  cursor-pointer hover:bg-gray-50/50 transition-colors duration-150 mb-3 ${notif?.read == false && 'border-green-300 border-l-4 '}`}
                                    >
                                        {/* Avatar Wrapper - Guarantees 1:1 Aspect Ratio Box */}
                                        <div className="relative w-10 h-10 flex-shrink-0 ">
                                            <img
                                                src={notif?.sender?.base?.avatar || "/default-avatar.png"}
                                                alt="avatar"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>


                                        <div className="flex flex-col flex-grow min-w-0 pr-2">
                                            <p className="text-[13px] text-gray-800 leading-snug font-medium break-words">
                                                {notif?.message}
                                            </p>
                                            <span className="text-[11px] text-gray-400 mt-0.5">
                                                {notif?.sender?.base?.name || "Sarah James"}
                                            </span>
                                        </div>

                                        {/* Action / Timestamp Container Right-Aligned */}
                                        <div className="flex flex-col items-end flex-shrink-0 ms-auto">
                                            <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                                                12:00
                                            </span>
                                            {/* Optional 'View' badge if needed to fully match screen 2 */}
                                            <span className="mt-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                                View
                                            </span>
                                        </div>
                                        {/* appears slidin to the left */}
                                        <div className="flex ">
                                            <div className="p-3 bg-blue-100">
                                               <button
                                               className="cursor-pointer hover:scale-[1.5] transtion ease-in-out duration-300"
                                               > <MailIcon className="w-5 h-5 text-blue-600" /></button>
                                                </div>
                                                  <div className="p-3 bg-red-200">
                                                    <button
                                                     className="cursor-pointer hover:scale-[1.5] transtion ease-in-out duration-300"
                                                    > <DeleteIcon
                                                     className="w-5 h-5 text-red-600" />
                                                        </button>
                                                   
                                                </div>
                                            </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm text-center mt-10">No notifications available.</p>
                        )}

                    </div>
                )
                    :
                    null
            }


        </section>
    )
}