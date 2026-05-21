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
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notif/getByReceipient/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.ok){
                    res.json().then((data) =>{
                        console.log('data', data);
                        setNotifs(data);
                        setNotifCount(data?.length);
                    })
                }
            })
        }catch(err){
            console.log('error fetching notifs', err);
        }
    }

       useEffect(() => {
            const session = JSON.parse(localStorage.getItem("sessionData")) || null;
            // console.log('session', session?.userId);
            setUserId(session?.userId);
            setToken(session?.token);
        }, []);
        useEffect(()=>{
            getNotifs();
        },[userId, token])
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


        </section>
    )
}