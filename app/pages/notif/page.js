'use client'

import SearchIcon from "../../../public/svg/search"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";


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
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col w-full mb-20">
            <div className="p-4 flex justify-between items-center dashboard-page mb-5 mt-5 border-b-3 border-gray-100">

                <div >
                    <h2 className="font-semibold font-sans text-xl align-middle">
                        Notifications
                    </h2>
                </div>

                <div className="align-center rounded-full p-3 shadow-lg ">
                    <SearchIcon className="w-6 h-6 cursor-pointer" />
                </div>

            </div>

            {/* notifs list */}
             <div className="flex justify-between w-full">
                            <h2 className="font-bold text-md px-4 font-gray-800"> Last 7 days</h2>
             </div>
            {
               notifs?.length > 0 ? (
                   <div className="flex flex-col gap-3 p-4 text-sm " >
                        {
                            notifs.map((notif) => (
                                <div key={notif._id}  className="flex items-start px-2 py-4 rounded-lg shadow-lg w-full cursor-pointer hover:bg-gray-100">
                                    <div className="flex justify-start justify-center cover-image  w-10">
                                        <Image src={notif?.sender?.base?.avatar} alt="avatar" width={70} height={60} className="rounded-full" />
                                        </div>
                                    
                                    <div className="flex flex-col items-start w-70">
                                        <p className="px-2 font-bold  ">{notif?.message}</p>
                                        <span style={{ fontSize: "12px" }} className="text-gray-600 text-sm px-2">
                                            {notif?.sender?.base?.name}
                                        </span>
                                        </div>
                                    
                                    <div className="flex items-start justify-center w-30 ">
                                        <span 
                                        style={{ fontSize: "10px" }}
                                        className="font-semibold flex justify-start items-center text-gray-600 text-sm">
                                            {new Date(notif?.createdAt).toLocaleString('en-US', {
                                                month: 'numeric',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            
                                            })}
                                        </span>
                                        </div>
                                </div>
                            ))

                        }

                    </div>
               )
               : 
               null
            }


        </section>
    )
}