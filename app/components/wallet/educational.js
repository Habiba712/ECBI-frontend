
'use client'
import Image from 'next/image';
import gift_box from '../../../public/gift_box.png';
import PersonIcon from '../../../public/svg/person';
import StarIcon from '../../../public/svg/star';
import TaskIcon from '../../../public/svg/task';
import ShareIcon from '../../../public/svg/share';
import CakeIcon from '../../../public/svg/cake';

export default function Educational({ }) {
    return (
        <div className="px-4 flex flex-col gap-3 ">
            <div className="flex gap-3 rounded-lg shadow-lg px-4 py-1">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">How to Earn Points</h1>
                    <p className="text-gray-600 font-semibold"> Complete actions below to earn points and unlock amazing rewards!</p>

                </div>
                <div>
                    <Image src={gift_box} alt="gift box" width={100} height={100} className="rounded-full object-cover aspect-square" />
                </div>

            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-lg  border border-gray-200 ">
                    <div className="rounded-full p-4 bg-blue-100 flex items-center justify-center">
                                            <PersonIcon className="w-7 h-7 text-blue-500 stroke-3" />

                    </div>

                    <div className=" w-full">
                        <h3 className="font-semibold ">Refer a Friend</h3>
                        <p className="text-gray-600 font-semibold">Invite a friend to join and earn points when they use your link to create a post</p>
                    </div>
                    <p style={{'fontSize':'20px'}} className="font-bold text-blue-600">+50</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-lg  border border-gray-200 ">
                    <div className="rounded-full p-4 bg-orange-100 flex items-center justify-center">
                                            <StarIcon className="w-7 h-7 text-yellow-500 stroke-3 fill-yellow-500" />

                    </div>

                    <div className=" w-full">
                        <h3 className="font-semibold ">Daily Login</h3>
                        <p className="text-gray-600 font-semibold">Log in to the app daily to earn bonus points</p>
                    </div>
                    <p style={{'fontSize':'20px'}} className="font-bold text-yellow-600">+5</p>
                </div>
            </div>

  <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-lg  border border-gray-200 ">
                    <div className="rounded-full p-4 bg-purple-100 flex items-center justify-center">
                                            <TaskIcon className="w-7 h-7 text-purple-500 stroke-3" />

                    </div>

                    <div className=" w-full">
                        <h3 className="font-semibold ">Complete Profile</h3>
                        <p className="text-gray-600 font-semibold">Complete your profile information to earn points</p>
                    </div>
                    <p style={{'fontSize':'20px'}} className="font-bold text-purple-600">+20</p>
                </div>
            </div>
             <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-lg  border border-gray-200 ">
                    <div className="rounded-full p-4 bg-green-100 flex items-center justify-center">
                                            <ShareIcon className="w-7 h-7 text-green-500 stroke-3" />

                    </div>

                    <div className=" w-full">
                        <h3 className="font-semibold ">Share on Social Media</h3>
                        <p className="text-gray-600 font-semibold">Share our app on social media and earn points</p>
                    </div>
                    <p style={{'fontSize':'20px'}} className="font-bold text-green-600">+10</p>
                </div>
            </div>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-lg  border border-gray-200 ">
                    <div className="rounded-full p-4 bg-pink-100 flex items-center justify-center">
                                            <CakeIcon className="w-7 h-7 text-pink-500 stroke-3" />

                    </div>

                    <div className=" w-full">
                        <h3 className="font-semibold ">Birthday Bonus</h3>
                        <p className="text-gray-600 font-semibold">Get a special bonus on your birthday! </p>
                    </div>
                    <p style={{'fontSize':'20px'}} className="font-bold text-pink-600">+10</p>
                </div>
            </div>


        </div>
    )
}