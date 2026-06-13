
"use client";

import { useState, useEffect } from 'react';
import RightArrowIcon from '../../../public/svg/rightArrow';
import { QuestionMarkIcon } from '../../../public/svg/question-mark';
import coin from '../../../public/dollar.png';
import GiftIcon from '../../../public/svg/gift';
import Image from 'next/image';
import TredingUpIcon from '../../../public/svg/tredingUp';
import goblet from '../../../public/goblet.png';
import ClientsIcon from '../../../public/svg/clients';
import history_icon from '../../../public/svg/history.svg';
import StarIcon from '../../../public/svg/star';
import surprise_box from '../../../public/surprise_box.png';
import { formatDistanceToNow } from "date-fns";
import History from '../../components/wallet/history';
import Educational from '../../components/wallet/educational';
import Rewards from '../../components/wallet/rewards';
import Referrals from '../../components/wallet/referral';

export default function WalletPage() {
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [redeemedPoints, setRedeemedPoints] = useState(0);
    const [userId, setUserId] = useState(0);
    const [token, setToken] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(0);
    const [getReferralLinks, setGetReferralLinks] = useState();
    const [getTotalFriends, setGetTotalFriends] = useState();
     const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [educational, setEducational] = useState(false);
    const [rewards, setRewards] = useState(false);
    const [referrals, setReferrals] = useState(false);
    const [tab, setTab] = useState("history");

    const getMyReferralLinks = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinksForWallet/${userId}`, {


            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('referral link data', data);
                        setGetReferralLinks(data);
                        setGetTotalFriends(data?.reduce((acc, reff) => acc + reff?.referredUsers?.length, 0));
                    })
                }
            })

        } catch (err) {
            console.log('error', err);
        }
    }
    console.log('ref', getReferralLinks)

    const changeTab = (tab) => {
        setTab(tab);
    }

    const getUser = async () => {
        console.log('🔥 getUserById HIT', userId);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`).then((res) => res.json().then((data) => {
                console.log('datadoioi', data);
                setLoggedInUser(data.user);

                setEarnedPoints(data?.user?.finalUser?.points);
                setRedeemedPoints(data?.user?.finalUser?.redeemedPoints);
                setTotalBalance(calculateBalance(data?.user?.finalUser?.points, data?.user?.finalUser?.redeemedPoints));

                // setVisitedPos(data.user.finalUser.visits);
                // console.log("Fetched user data:", data.data);
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }
    const calculateBalance = (earnedPoints, redeemedPoints) => {
        if (earnedPoints && redeemedPoints) {
            return earnedPoints - redeemedPoints;
        }
        else if (!redeemedPoints) {
            return earnedPoints;
        }

    }
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        // setShowReferralLinks(false);
        if (userId) {
            getUser();
            getMyReferralLinks();
        }
    }, [userId])

    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   mb-30 ">
            <div className={`h-[100px] flex flex-col justify-start  items-center py-3 text-white rounded-b-full w-full bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]`}
            >
                <div className="w-full flex items-center justify-between relative z-10 ">

                    <button
                        onClick={() => router.back()}
                        className=""
                    >
                        <RightArrowIcon className="w-6 h-6 text-white rotate-180 stroke-2 cursor-pointer" />
                    </button>

                    <h2
                        className="w-full text-center"
                        style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            letterSpacing: ".5px",
                            color: "white",
                            opacity: 0.95,
                            fontFamily: "sans-serif",
                        }}
                    >
                        My Wallet
                    </h2>

                    <button>
                        <QuestionMarkIcon className="w-6 h-6 text-white cursor-pointer " />
                    </button>


                </div>



            </div>
            <div>

                <div className="flex flex-col gap-3 p-4 text-sm bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)] rounded-[30px] border-1 border-purple-50  w-full relative -top-10" >
                    <div className="border-b py-2 border-gray-300">
                        <h3 className="text-white px-2 text-xl"> Total Points</h3>
                        <div className="px-2 flex items-center gap-3">
                            <h2
                                style={{
                                    fontSize: "35px",
                                    fontWeight: 600,
                                    letterSpacing: ".5px",
                                    color: "white",
                                    opacity: 0.95,
                                    fontFamily: "sans-serif",
                                }}
                                className="text-white font-semibold">{totalBalance},00</h2>
                            <Image src={coin} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </div>
                        <p
                            style={{
                                fontSize: "18px",
                                paddingLeft: "10px",
                                fontWeight: 600,
                                letterSpacing: ".5px",
                                color: "white",
                                opacity: 0.95,
                                fontFamily: "sans-serif",
                            }}
                        >≈ ${totalBalance * 0.001}</p>

                    </div>
                    <div className="flex justify-between  gap-3">
                        <div className="flex justify-center items-center gap-3">
                            <div className="flex items-center gap bg-green-300 rounded-full p-2 -3">
                                <TredingUpIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white px-2 text-xl">Lifetime Earned</p>
                                <p className="text-white px-2 font-semibold " style={{ 'fontSize': '18px' }}>{earnedPoints}</p>
                            </div>

                        </div>
                        <div className="flex justify-center items-center gap-3">
                            <div className="flex items-center gap bg-purple-300 rounded-full p-2 -3">
                                <GiftIcon className="w-6 h-6 text-white" />
                            </div>
                            <div><p className="text-white px-2 text-xl">Lifetime Redeemed</p>
                                <p className="text-white px-2 font-semibold " style={{ 'fontSize': '18px' }}>{redeemedPoints ? redeemedPoints : 0}</p>
                            </div>
                        </div>
                    </div>




                </div>
                <div className="flex gap-3 p-4 relative -top-5" >
                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        " >
                            <Image src={goblet} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </button>

                        <p> Rewards</p>

                    </div>

                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        " 
                        onClick={() => changeTab("educational")}
                        >
                            <GiftIcon className="w-7 h-7 text-green-500 stroke-2" />
                        </button>

                        <p> How to Earn</p>

                    </div>

                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                    " onClick={() => changeTab("referrals")}
                        >
                            <ClientsIcon className="w-7 h-7 text-blue-500 stroke-2" />
                        </button>

                        <p> Refferals</p>

                    </div>

                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        "
                        onClick={() => changeTab("history")}
                        >

                            <Image src={history_icon} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </button>

                        <p> History</p>

                    </div>


                </div>
                
                   
                   <div className="">
                   {tab === "history" ? (
                         <History 
             getReferralLinks={getReferralLinks}
             getTotalFriends={getTotalFriends}
             totalBalance={totalBalance}
             redeemedPoints={redeemedPoints}
             />
                    ) : tab === "educational" ? (
                        <Educational />
                    )
                    : tab === "rewards" ? (
                        <Rewards />
                    )
                    : tab === "referrals" ? (
                        <Referrals />
                    ): null
                }
                   </div>
              
                
 <div className="px-1 ">
    <div className="w-full flex bg-purple-100 rounded-lg items-center justify-between  py-2 shadow-lg mt-3 ">
                        <div className="w-20">
                            <Image src={surprise_box} alt="pos cover image" width={100} height={100} className="rounded-full object-cover aspect-square" />
                        </div>
                        <div className="w-50">
                            <p style={{ 'fontSize': '18px' }} className="text-purple-800 font-semibold">
                                Redeem Your Points
                            </p>
                            <p className="text-gray-500 font-semibold">
                                Turn your points into amazing rewards and discounts
                            </p>
                        </div>
                        <div className="w-30">
                            <button className="w-full bg-purple-900 opacity-80 text-white px-1 py-2 rounded-full text-[13px] flex justify-center nowrap w-full cursor-pointer font-semibold">
                                Explore Rewards
                            </button>
                        </div>

                    </div>
 </div>
            
            </div>
        </section>
    )
}