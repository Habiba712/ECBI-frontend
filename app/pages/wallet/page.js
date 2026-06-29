
"use client";

import { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
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
import { AnimatePresence } from 'framer-motion';
import defaultUser from '../../../public/default_user.png';

export default function WalletPage() {
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totolBalancePlatrform, setTotolBalancePlatrform] = useState(0);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [redeemedPoints, setRedeemedPoints] = useState(0);
    const [userId, setUserId] = useState(0);
    const [token, setToken] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(0);
    const [getReferralLinks, setGetReferralLinks] = useState();
    const [getReferralLinksAll, setGetReferralLinksAll] = useState();
    const [getTotalFriends, setGetTotalFriends] = useState();
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [totalActiveReferrals, setTotalActiveReferrals] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [educational, setEducational] = useState(false);
    const [rewards, setRewards] = useState(false);
    const [referrals, setReferrals] = useState(false);
    const [tab, setTab] = useState("history");
    const [platformBalance, setPlatformBalance] = useState(0);
    const [referalsBalance, setReferralsBalance] = useState(0);
    const [platformGains, setPlatformGains] = useState([]);
    const [totalBalanceToDollars, setTotalBalanceToDollars] = useState(0)
    const router = useRouter();

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

    const getreferralLinksAll = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinksByUserId/${userId}`, {


            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('referral link data all',
data
                        )
                        setGetReferralLinksAll(data?.map(link => ({
                            ...link,
                            referredUsers: link?.referredUsers?.filter(
                                referredUser => referredUser?.isActive === true || referredUser?.isActive === false && referredUser?.userId !== userId && referredUser?.tempId === null
                            )
                        }))
                            .filter(link => link?.referredUsers?.length > 0)
                            .reduce((acc, curr) => acc + curr?.referredUsers?.length, 0)

                        );

                        console.log('bakance', 
                            data?.find(referral => referral?.referrerUser === userId).referredUsers.reduce((acc, curr) => acc + curr?.pointsAwarded, 0)
                            // .referredUsers?.filter(referredUser => referredUser?.isActive === true || referredUser?.isActive === false && referredUser?.userId !== userId && referredUser?.tempId === null)
                            // .reduce((acc, curr) => acc + curr?.pointsAwarded, 0)
                            
                        
                            
                         );


                        setReferralsBalance(data?.find(referral => referral?.referrerUser === userId).referredUsers.reduce((acc, curr) => acc + curr?.pointsAwarded, 0))

                        setTotalActiveReferrals(data?.map(link => ({
                            ...link,
                            referredUsers: link?.referredUsers?.filter(
                                referredUser => referredUser?.isActive === true && referredUser?.user?._id !== userId && referredUser?.tempId === null
                            )
                        }))
                            .filter(link => link?.referredUsers?.length > 0)
                            )
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
                console.log('dataaa',data?.user?.finalUser?.pointsPlatrform?.reduce((acc, curr) => acc + curr?.earnedPoints, 0));
                setLoggedInUser(data.user);
                setPlatformGains(data?.user?.finalUser?.pointsPlatrform);
                setPlatformBalance(
                    (data?.user?.finalUser?.pointsPlatrform?.reduce((acc, curr) => acc + curr?.earnedPoints, 0) > 0 ? data?.user?.finalUser?.pointsPlatrform?.reduce((acc, curr) => acc + curr?.earnedPoints, 0) : 0
                    ) 
                    
                );
                setRedeemedPoints(data?.user?.finalUser?.pointsByPos?.reduce((acc, curr) => acc + curr?.redeemedPoints, 0) + data?.user?.finalUser?.pointsPlatrform?.reduce((acc, curr) => acc + curr?.redeemedPoints, 0));
                // setTotalBalance(calculateBalance(data?.user?.finalUser?.pointsByPos, data?.user?.finalUser?.pointsPlatrform));
                
               
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }


    // const calculateBalance = (pointsByPos, pointsFromPlatform) => {
    //     console.log('pointsByPos', pointsByPos);
    //     if(!pointsByPos && !pointsFromPlatform){ return 0}

    //     const gainedPoints = (pointsByPos?.reduce((acc, curr) => acc + curr?.earnedPoints, 0) || 0) + 
    //     (pointsFromPlatform?.reduce((acc, curr) => acc + curr?.earnedPoints, 0) || 0);
    //     console.log('gained points', gainedPoints);

    //     const spentPoints = (pointsByPos?.reduce((acc, curr) => acc + curr?.redeemedPoints, 0) || 0) + (pointsFromPlatform?.reduce((acc, curr) => acc + curr?.redeemedPoints, 0) || 0);
    //     console.log('spent points', spentPoints);


    //     if (gainedPoints && spentPoints) {
    //         const total = gainedPoints.reduce((acc, curr) => acc + curr?.gainedPoints, 0) - spentPoints;
    //         console.log('total', total);
    //         return total;
    
    //     }
    //     else if (!spentPoints) {
    //         return gainedPoints;
    //     }

    // }

    const calculateBalance = (referalPoints, platformPoints)=>{
        if(!referalPoints && !platformPoints){ return 0}
        const sum = referalPoints + platformPoints;
        setEarnedPoints(sum);

        console.log('sum', sum);
        setTotalBalanceToDollars((sum * 0.001).toFixed(2));
        return setTotalBalance(sum);
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
            getreferralLinksAll();
        }
    }, [userId])

    useEffect(() => {
        
        calculateBalance(referalsBalance, platformBalance);
    }, [referalsBalance, platformBalance])
console.log('earned points', getReferralLinks)
                                console.log('gettotla firend', getTotalFriends)
                                console.log('total balance', totalBalance)
                                console.log('redeemed points', redeemedPoints)
                                console.log('platform gains', platformGains)

    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   mb-30 ">
            <div className={`h-[100px] flex flex-col justify-start  items-center py-3 text-white rounded-b-lg w-full bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]`}
            >
                <div className="w-full flex items-center justify-between relative z-10 ">

                    <button
                        onClick={() => router.back()}
                        
                    >
                        <RightArrowIcon className="z-10 w-6 h-6 text-white rotate-180 stroke-2 cursor-pointer" />
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

                <div className="flex flex-col gap-3 p-4 text-sm bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)] rounded-[30px] border-1 border-purple-50  w-full relative -top-13" >
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
                        >≈ ${totalBalanceToDollars}</p>

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
                <div className="flex justify-between gap-3 p-4 relative -top-5 w-full" >
                    <div className={`${tab === "rewards" ? "w-1/4 flex flex-col gap-2 text-md rounded-lg items-center justify-center bg-gray-100 w-1/4 font-semibold py-2 px-3 " : "w-1/4 flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-1/4 font-semibold py-2 px-3"} `}>
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        " 
                                                    onClick={() => changeTab("rewards")}

                        >
                            <Image src={goblet} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </button>

                        <p> Rewards</p>

                    </div>

                    <div className={`${tab === "educational" ? "w-1/4 flex flex-col gap-2 text-md rounded-lg items-center justify-center bg-gray-100 w-1/4 font-semibold py-2 px-3 " : "w-1/4 flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-1/4 font-semibold py-2 px-3"} `}>
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        "
                            onClick={() => changeTab("educational")}
                        >
                            <GiftIcon className="w-7 h-7 text-green-500 stroke-2" />
                        </button>

                        <p className="text-center"> How to Earn</p>

                    </div>

                    <div className={`${tab === "referrals" ? "w-1/4 flex flex-col gap-2 text-md rounded-lg items-center justify-center bg-gray-100 font-semibold py-2 px-3 " : "w-1/4 flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-1/4 font-semibold py-2 px-3"} `}>
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                    " onClick={() => changeTab("referrals")}
                        >
                            <ClientsIcon className="w-7 h-7 text-blue-500 stroke-2" />
                        </button>

                        <p> Refferals</p>

                    </div>

                    <div className={`${tab === "history" ? " flex flex-col gap-2 text-md rounded-lg items-center justify-center bg-gray-100 w-1/4 font-semibold py-2 px-3 " : "w-1/4 flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-1/4 font-semibold py-2 px-3"} `}>
                        <button className={`rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300`}
                            onClick={() => changeTab("history")}
                        >

                            <Image src={history_icon} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </button>

                        <p> History</p>

                    </div>


                </div>


                <div className="">
                    <AnimatePresence>
                          {tab === "history" ? (
                                
                        <History
                            getReferralLinks={getReferralLinks}
                            getTotalFriends={getTotalFriends}
                            totalBalance={totalBalance}
                            redeemedPoints={redeemedPoints}
                            platformGains={platformGains}
                           
                        />
                    ) : tab === "educational" ? (
                        <Educational />
                    )
                        : tab === "rewards" ? (
                            <Rewards getReferralLinks={getReferralLinks} />
                        )
                            : tab === "referrals" ? (
                                <Referrals 
                                getReferralLinksAll={getReferralLinksAll}
                                activeReferrals={totalActiveReferrals}
                                totalPoints={totalBalance}
                                />
                            ) : null
                    }
                    </AnimatePresence>
                  
                </div>


             

            </div>
        </section>
    )
}