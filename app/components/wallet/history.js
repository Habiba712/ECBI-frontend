
'use client'
import ClientsIcon from '../../../public/svg/clients';
import GiftIcon from '../../../public/svg/gift';
import StarIcon from '../../../public/svg/star';
import surprise_box from '../../../public/surprise_box.png';
import Image from 'next/image';
import { formatDistanceToNow } from "date-fns";


export default function History({getReferralLinks, getTotalFriends, totalBalance, redeemedPoints}) {
    return (
   <div className="flex flex-col gap-3 px-1">
                    <div className="flex justify-between items-center">
                        <p
                            style={{
                                fontSize: "18px",
                                paddingLeft: "10px",
                                fontWeight: 600,
                                letterSpacing: ".5px",

                                opacity: 0.95,
                                fontFamily: "sans-serif",
                            }}
                            clasName=" font-semibold text-center text-sans ">
                            Recent Activity
                        </p>
                        <button className="text-purple-500 font-semibold text-md cursor-pointer">
                            See More
                        </button>
                    </div>
                    <div className="w-full">
                        {
                            getReferralLinks?.length > 0 && (
                                getReferralLinks?.map((referral) => (

                                    referral?.referredUsers?.length > 0 && (
                                        referral?.referredUsers?.map((reff) => (

                                            <div key={reff?.user?._id} className="rounded-lg border border-gray-200 py-3 mb-2 flex">
                                                <div className="flex gap-2 items-center w-30">
                                                    <Image src={reff?.user?.base?.avatar} alt="avatar" width={40} height={40} className="rounded-full object-cover aspect-square" />
                                                    <span className="text-green-600 font-semibold border-2 border-green-100 rounded-full flex items-center justify-center h-[40px] w-[40px] text-[12px]">+{(totalBalance - 50) / referral?.referredUsers?.length}</span>
                                                </div>

                                                <div className="w-50 ">
                                                    <p className="font-semibold ">Referral Completed</p>
                                                    <span className="text-gray-500 text-xs font-sans flex-wrap"> Your friend {reff?.user?.base?.name} has completed the referral</span>
                                                </div>
                                                <div className="w-20 flex justify-end ">
                                                    <span className="text-gray-400 text-xs font-sans flex-nowrap w-fit">
                                                        {formatDistanceToNow(new Date(reff?.joinedAt), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>

                                        )))

                                ))
                            )
                        }

                    </div>

                    <div className="flex gap-2 w-full justify-between">
                        <div className="flex flex-col shadow-lg rounded-lg items-center justify-between flex-grow  bg-white  py-4 px-4 w-full">
                            <div className="bg-purple-100 rounded-full p-1 ">
                                <ClientsIcon className="w-7 h-7 text-purple-500 stroke-2" />
                            </div>
                            <p style={{ 'fontSize': '20px' }} className="font-semibold">{getTotalFriends} </p>
                            <p style={{ 'fontSize': '13px', 'fontWeight': '600' }} className="text-gray-500 text-lg text-center w-full min-h-[40px] flex items-center justify-center">Friends Referred</p>

                        </div>
                        <div className="flex flex-col shadow-lg rounded-lg items-center justify-between flex-grow  bg-white  py-4 px-4 w-full">
                            <div className="bg-green-100 rounded-full p-1 ">
                                <StarIcon className="w-7 h-7 text-green-500 stroke-2" />

                            </div>
                            <p style={{ 'fontSize': '20px' }} className="font-semibold">{totalBalance}</p>
                            <p style={{ 'fontSize': '13px', 'fontWeight': '600' }} className="text-gray-500 text-lg text-center w-full min-h-[40px] flex items-center justify-center">Points Earned</p>
                        </div>
                        <div className="flex flex-col shadow-lg rounded-lg items-center justify-between flex-grow  bg-white  py-4 px-4 w-full">
                            <div className="bg-orange-100 rounded-full p-1 ">
                                <GiftIcon className="w-7 h-7 text-yellow-500 stroke-2" />

                            </div>
                            <p style={{ 'fontSize': '20px' }} className="font-semibold">{redeemedPoints ? redeemedPoints : 0}</p>
                            <p style={{ 'fontSize': '13px', 'fontWeight': '600' }} className="text-gray-500 text-lg text-center w-full min-h-[40px] flex items-center justify-center">Rewards Redeemed</p>
                        </div>
                    </div>

                   
                </div>

    )}