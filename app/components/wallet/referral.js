
'use client'
import { useState, useEffect } from 'react';
import ClientsIcon from "../../../public/svg/clients"
import CheckIcon from '../../../public/svg/check';
import StarIcon from '../../../public/svg/star';
import Image from 'next/image';
import surprise_box from '../../../public/surprise_box.png';
import {motion} from 'framer-motion'


export default function Referrals({ getReferralLinksAll, activeReferrals, totalPoints }) {



    //  useEffect(() => {
    //     console.log('getReferralLinksAll', getReferralLinksAll);
    //     getActiveReferrals();
    // }, [])

    return (
        <motion.div
            className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scrollbar-thin"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking modal content
        >
            <div className="px-4 flex flex-col gap-3 ">
                <h2 className="font-semibold text-xl">Referral Stats</h2>
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col rounded-lg gap-2 px-3 py-2 bg-purple-100 items-center ">

                        <ClientsIcon className="w-7 h-7 text-purple-500 stroke-2 fill-purple-500" />

                        <p className="font-semibold " style={{ 'fontSize': '20px' }}>{getReferralLinksAll}</p>
                        <p className="text-gray-800 font-semibold">Total Referrals</p>
                    </div>
                    <div className="flex flex-col rounded-lg gap-2 px-3 py-2 bg-green-100 items-center ">

                        <CheckIcon className="w-7 h-7 text-green-500 stroke-2" />

                        <p className="font-semibold " style={{ 'fontSize': '20px' }}>{activeReferrals?.reduce((acc, curr) => acc + curr?.referredUsers?.length, 0)}</p>
                        <p className="text-gray-800 font-semibold">Active Referrals </p>
                    </div>
                    <div className="flex flex-col rounded-lg gap-2 px-3 py-2 bg-orange-100 items-center ">

                        <StarIcon className="w-7 h-7 text-yellow-500 fill-yellow-500 stroke-2" />

                        <p className="font-semibold " style={{ 'fontSize': '20px' }}>{totalPoints}</p>
                        <p className="text-gray-800 font-semibold">Points Earned</p>
                    </div>

                </div>

                <h2 className="font-semibold text-xl">Top Referrals</h2>

                <div className="">
                    {
                        activeReferrals?.map((reff, index) => {
                            { console.log('reff', reff) }
                            return reff?.referredUsers?.map((referredUser, index) => (
                                // console.log('referredUser', referredUser)
                                <div key={referredUser?.user?._id} className="flex gap-2 items-center justify-between border border-gray-200 rounded-lg px-3 py-3">
                                    {console.log('referredUser', referredUser?.user?.base?.name)}
                                    <div className="flex items-center gap-2 ">
                                        <Image src={referredUser?.user?.base?.avatar} alt="pos cover image" width={50} height={50} className="rounded-full object-cover aspect-square" />
                                        {/* <p className="font-semibold " style={{'fontSize':'20px'}}>{referredUser?.user?.base?.name}</p> */}
                                    </div>
                                    <div className="w-full ">
                                        <p className="text-gray-700 font-bold">{referredUser?.user?.base?.name}</p>
                                        <p className="text-gray-600 font-semibold">{new Date(referredUser?.joinedAt).toLocaleDateString("en-US", {

                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-green-600 font-semibold text-xl">+50</p>
                                        <p className="bg-green-100 px-3 py-1 text-green-700 font-semibold rounded-full">{referredUser?.isActive && 'Active'}</p>
                                    </div>
                                </div>
                            )
                            ).slice(0, 3)
                        })
                    }
                </div>

                <div className="flex bg-purple-100 rounded-lg items-center justify-between  py-2 shadow-lg mt-3 px-2">
                    <div className="">
                        <Image src={surprise_box} alt="pos cover image" width={100} height={100} className="rounded-full object-cover aspect-square" />
                    </div>
                    <div className="w-fit ">
                        <p style={{ 'fontSize': '18px' }} className="w-fit text-purple-800 font-semibold">
                            Redeem Your Points
                        </p>
                        <p className="text-gray-500 font-semibold px-1 ">
                            Turn your points into amazing rewards and discounts
                        </p>
                    </div>
                    <div className="">
                        <button className="bg-purple-900 opacity-80 text-white px-1 py-2 rounded-full text-[13px] flex justify-center nowrap cursor-pointer font-semibold ">
                            Explore Rewards
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>

    )
}