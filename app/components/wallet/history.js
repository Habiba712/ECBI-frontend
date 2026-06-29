
'use client'
import ClientsIcon from '../../../public/svg/clients';
import GiftIcon from '../../../public/svg/gift';
import StarIcon from '../../../public/svg/star';
import surprise_box from '../../../public/surprise_box.png';
import Image from 'next/image';
import { formatDistanceToNow } from "date-fns";
import { motion } from 'framer-motion';
import defaultUser from '../../../public/default_user.png';



export default function History({ getReferralLinks, getTotalFriends, totalBalance, redeemedPoints, platformGains }) {
    return (
        <motion.div
            className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scrollbar-thin"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking modal content
        >
            <div className="px-4 flex flex-col gap-3">
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
                        className=" font-semibold text-center text-sans ">
                        Recent Activity
                    </p>
                    {/* <button className="text-purple-500 font-semibold text-md cursor-pointer">
                            See More
                        </button> */}
                </div>
                <div className="w-full rounded-lg border border-gray-200 ">
                     {[
    ...(getReferralLinks?.flatMap(referral =>
      (referral.referredUsers || []).map(reff => ({
        ...reff,
        type: "referral"
      }))
    ) || []),

    ...(platformGains?.map(gain => ({
      ...gain,
      type: "login"
    })) || [])
  ]
    .sort((a, b) => {
      const dateA = new Date(a.joinedAt || a.createdAt).getTime();
      const dateB = new Date(b.joinedAt || b.createdAt).getTime();
      return dateB - dateA; // newest first
    })
    .map((item, index) =>
      item.type === "referral" ? (
        <div key={`ref-${index}`} className="px-3 py-1 flex justify-between gap-3 items-start">
          <div className="w-1/3 flex items-center">
            <div className="w-[40px]">
              <Image
                src={item?.user?.base?.avatar || defaultUser}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full object-cover aspect-square"
              />
            </div>

            <div>
              <span className="text-blue-600 font-bold rounded-full flex items-center justify-center h-[20px] w-[20px] text-[16px]">
                +{item.pointsAwarded}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <p className="font-semibold">Referral Completed</p>
            <span className="text-gray-500 text-xs">
              Your friend {item?.user?.base?.name} has completed the referral.
            </span>
          </div>

          <div className="w-1/3 flex justify-center items-start">
            <span className="text-gray-400 text-xs">
              {formatDistanceToNow(new Date(item.joinedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      ) : (
        <div key={`login-${index}`} className="px-3 py-1 flex justify-between gap-3 items-start">
          <div className="w-1/3 flex items-center">
            <div className="w-[40px]">
              <Image
                src={defaultUser}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full object-cover aspect-square"
              />
            </div>

            <div>
              <span className="text-yellow-600 font-bold rounded-full flex items-center justify-center h-[20px] w-[20px] text-[16px]">
                +{item.earnedPoints}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <p className="font-semibold">Daily Login</p>
            <span className="text-gray-500 text-xs">
              Earned {item.earnedPoints} points for logging in today.
            </span>
          </div>

          <div className="w-1/3 flex justify-center items-start">
            <span className="text-gray-400 text-xs">
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      )
    )}
                    {
                        platformGains?.length > 0 && (
                            platformGains?.map((gain) => (
                                <div key={gain?._id} className="px-3 py-1 flex justify-center gap-3 items-start">
                                    <div className="w-1/3 flex items-center ">
                                        <div className="w-[40px]">  <Image src={gain?.user?.base?.avatar || defaultUser} alt="avatar" width={50} height={50} className="rounded-full object-cover aspect-square" /></div>
                                        <div> <span className="text-yellow-600 font-bold  rounded-full flex items-center justify-center h-[20px] w-[20px] text-[16px]">+{gain?.earnedPoints}
                                        </span></div>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <p className="font-semibold ">Daily Login</p>
                                        <span className="w-full text-gray-500 text-xs font-sans line-"> Earned {gain?.earnedPoints} points for login today</span>
                                    </div>
                                    <div className="w-1/3 flex justify-center  items-start">
                                        <span className="text-gray-400 text-xs font-sans flex-nowrap">
                                            {formatDistanceToNow(new Date(gain?.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
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
                        <button className="bg-purple-900 opacity-80 text-white px-1 py-2 rounded-lg text-[13px] flex justify-center nowrap cursor-pointer font-semibold ">
                            Explore Rewards
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>


    )
}



