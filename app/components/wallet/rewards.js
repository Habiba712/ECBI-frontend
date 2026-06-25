
'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import dollar from '../../../public/dollar.png';
import  GiftIcon from '../../../public/svg/gift';
import surprise_box from '../../../public/surprise_box.png';
import { motion } from "framer-motion";

export default function Rewards({ getReferralLinks }) {
    console.log('get referral links', getReferralLinks);
    const [rewards, setRewards] = useState([
        {
            pos_name: "",
            pos_cover: "",
            rewards: []
        }
    ]);
    useEffect(() => {
        setRewards(getReferralLinks?.map(referralLink => ({
            pos_name: referralLink?.pos?.name,
            pos_cover: referralLink?.pos?.coverImage,
            rewards: referralLink?.pos?.rewards
        }
        )))
    }, [getReferralLinks]);
    console.log('rewards', rewards);
    return (
            <motion.div
                    className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scrollbar-thin"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    onClick={(e) => e.stopPropagation()} // Prevents closing when clicking modal content
                >
                 <div className="px-4 flex flex-col gap-3  ">
            <div>
                <p
                    style={{
                        fontSize: "18px",
                        paddingLeft: "10px",
                        fontWeight: 600,
                        letterSpacing: ".5px",

                        opacity: 0.95,
                        fontFamily: "sans-serif",
                    }}
                    className=" font-semibold text-start text-sans ">
                    Available Rewards
                </p>
            </div>
            <div className="border border-gray-100 rounded-lg ">
                {
                    rewards?.map((reward, index) => (
                        reward.rewards?.map((red, index) => (

                            <div className="flex  items-start border-b border-gray-100 px-2 py-2 gap-2">
                                <div className="w-fit">
                                    <Image src={reward?.pos_cover} alt="pos cover image" width={60} height={60} className="rounded-lg object-cover aspect-square " />
                                </div>
                                <div className="flex flex-col gap-1 w-50">
                                    <p className="font-semibold" style={{ 'fontSize': '15px' }}>{reward?.pos_name} Gift Card</p>

                                    <p className="text-gray-600">${red?.cost * 0.001} {reward?.pos_name} Gift Card</p>
                                </div>
                                <div className=" w-25 flex flex-col ">
                                    <div className="flex gap-1 justify-center items-center text-lg font-bold text-gray-800">
                                        <Image src={dollar} alt="pos cover image" width={15} height={15} className="rounded-lg object-cover aspect-square" />
                                        <p style={{ 'fontSize': '16px' }}>
                                            {red?.cost}
                                        </p>
                                    </div>

                                    <button className="text-purple-700 bg-purple-100/30 font-semibold rounded-lg px-3 py-1 border border-purple-300 text-xs cursor-pointer">Redeem</button>

                                </div>
                            </div>
                        ))

                    )
                    )
                }

            </div>
            <div>
                
            </div>
       <div className="py-2 px-3 rounded-full bg-purple-100/40 flex items-center gap-2  ">
         <div className="bg-purple-100 rounded-full p-2">
            <GiftIcon className="w-6 h-6 text-purple-800 stroke-2 " />
            
        </div>
        <p className="text-purple-700 font-semibold">Keep earning points to unlock more amazing rewards!</p>
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