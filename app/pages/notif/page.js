'use client'

import SearchIcon from "../../../public/svg/search"
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import MailIcon from "../../../public/svg/mail";
import DeleteIcon from "../../../public/svg/delete";
import { setRef } from "@mui/material";



export default function Notifications() {

    const [notifs, setNotifs] = useState([]);
    const [notifCount, setNotifCount] = useState(0);
    const [userId, setUserId] = useState();
    const [token, setToken] = useState("");
    const [activeNotifId, setActiveNotifId] = useState(null);
    const ref = useRef(null);

    const handleSlide = (notifId) => {
        // console.log('notif id', notifId);
        ref.current = notifId;
        setActiveNotifId(activeNotifId == null ? notifId : null)
    }

    const markAsRead = async (notifId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notif/markAsRead/${notifId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                console.log('marked as read');
                getNotifs();
            }
        })
    }

    const handleDelete = async (notifId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notif/deleteNotification/${notifId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                console.log('deleted');
                getNotifs();
            }
        })
    }


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
            <div className="inf-dash-top fixed top-0 max-w-md mx-auto w-full ">
                    <h2 className="font-semibold font-sans text-xl text-white align-middle">
                        Notifications
                    </h2>
                </div>

            <div className="p-4 flex justify-between items-center dashboard-page mb-5 mt-5 border-b-3 border-gray-100">

                
                {/* <div className="align-center rounded-full p-3 shadow-lg ">
                    <SearchIcon className="w-6 h-6 cursor-pointer" />
                </div> */}

            </div>

            {/* notifs list */}
            <div className="flex justify-between w-full">
                <h2 className="font-semibold text-md px-6 mt-4 text-gray-700"> Last 7 days</h2>
            </div>
            {
                notifs?.length > 0 ? (
                    <div className="flex flex-col gap-3 p-4 text-sm " >
                        {notifs?.length > 0 ? (
                            <div className="flex flex-col w-full">
                                {notifs.map((notif) => (
                                    <div
                                        key={notif?._id}

                                        onClick={() => handleSlide(notif?._id)}
                                        className={`flex items-start w-full rounded-lg  border-gray-50/80  gap-3 py-3 px-1 cursor-pointer hover:bg-gray-50/50 transition-colors duration-150 mb-3 ${notif?.read == false && 'bg-gray-100'}`

                                        }
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
                                            <span className="text-[11px]  text-gray-400 whitespace-nowrap">
                                                {new Date(notif?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {/* Optional 'View' badge if needed to fully match screen 2
                                            <span className="mt-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                                .
                                            </span> */}
                                        </div>
                                        {/* appears slidin to the left */}
                                        {
                                            activeNotifId && ref.current == notif?._id && (
                                                <div className="flex "
                                                    key={notif?._id}
                                                >
                                                    <div className="p-3 bg-blue-100">
                                                        <button
                                                            onClick={() => markAsRead(notif?._id)}
                                                            className="cursor-pointer hover:scale-[1.5] transtion ease-in-out duration-300"
                                                        > <MailIcon className="w-5 h-5 text-blue-600" /></button>
                                                    </div>
                                                    <div className="p-3 bg-red-200">
                                                        <button
                                                            onClick={() => handleDelete(notif?._id)}
                                                            className="cursor-pointer hover:scale-[1.5] transtion ease-in-out duration-300"
                                                        > <DeleteIcon
                                                                className="w-5 h-5 text-red-600" />
                                                        </button>

                                                    </div>
                                                </div>
                                            )

                                        }


                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm text-center mt-10">No notifications available.</p>
                        )}

                        <div className="flex justify-center items-center">
                            <span className="text-gray-300 text-center text-4xl">...</span>
                        </div>

                    </div>
                )
                    :
                    <div className="flex justify-center items-center mt-3">
                        <h3 className="text-gray-400 text-sm">
                            You have no notifications yet.
                        </h3>
                    </div>

            }


        </section>
    )
}