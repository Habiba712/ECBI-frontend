
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
import history from '../../../public/svg/history.svg';

export default function WalletPage() {
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [redeemedPoints, setRedeemedPoints] = useState(0);
    const [userId, setUserId] = useState(0);
    const [token, setToken]= useState(0);
    const [loggedInUser, setLoggedInUser] = useState(0);
 
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
        if(earnedPoints && redeemedPoints){
            return earnedPoints - redeemedPoints;
        }
        else if(!redeemedPoints){
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
        }
    }, [userId])

    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-30 ">
            <div className={`h-[100px] flex flex-col justify-start  items-center  px-4 py-3 text-white rounded-b-full w-full bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]`}
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
                        <p className="text-white px-2 font-semibold " style={{'fontSize':'18px'}}>{earnedPoints}</p>
                        </div>
                        
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <div className="flex items-center gap bg-purple-300 rounded-full p-2 -3">
                            <GiftIcon className="w-6 h-6 text-white" />
                        </div>
                        <div><p className="text-white px-2 text-xl">Lifetime Redeemed</p>
                        <p className="text-white px-2 font-semibold " style={{'fontSize':'18px'}}>{redeemedPoints ? redeemedPoints : 0}</p>
                            </div>
                    </div>
                </div>
                
                
                
                                   
               </div>
<div className="flex gap-3 p-4 relative -top-5" >
                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        ">
                           <Image src={goblet} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" /> 
                        </button>
                        
                        <p> Rewards</p>

                    </div>
                    
                   <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        ">
                           <GiftIcon className="w-7 h-7 text-green-500 stroke-2" />
                        </button>
                        
                        <p> How to Earn</p>

                    </div>
                    
                     <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                       <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        ">
                           <ClientsIcon className="w-7 h-7 text-blue-500 stroke-2" />
                        </button>
                        
                        <p> Refferals</p>

                    </div>
                    <div className="flex flex-col gap-2 text-md shadow-lg rounded-lg items-center justify-center bg-white w-full font-semibold py-2 px-3">
                        <button className="rounded-full cursor-pointer p-2 bg-gray-100
                        hover:scale-[1.1] transition-all duration-300
                        ">
                        
                           <Image src={history} alt="pos cover image" width={30} height={30} className="rounded-full object-cover aspect-square" />
                        </button>
                        
                        <p> History</p>

                    </div>
                    

                </div>
      <div className="px-4 flex flex-col gap-3 ">
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
            clasName=" font-semibold text-center text-sans">
                Recent Activity
            </p>
            <button className="text-purple-500 font-semibold text-md cursor-pointer">
                See More
                </button>
        </div>
        <div>{
            
            
            }

        </div>
      </div>
            </div>
        </section>
    )
}