'use client'

import Link from "next/link"
import AwardIcon from "../../../public/svg/award"
import ClientsIcon from "../../../public/svg/clients"
import MessageReviewIcon from "../../../public/svg/messageReview"
import StarIcon from "../../../public/svg/star"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { formatDistanceToNow } from "date-fns";
import defaultUser from "../../../public/default_user.png";

export default function PointOfSaleOwner() {

    const [userId, setUserId] = useState();
    const [token, setToken] = useState("");
    const [clients, setClients] = useState([]);
    const [possByOwner, setPossByOwner] = useState([]);
    const [visitHistorycount, setVisitHistorycount] = useState([])
    const [businessNameSession, setBusinessNameSession] = useState([])
    const [totalVisits, setTotalVisits] = useState(0);
        const [reviews, setReviews] = useState();
        const router = useRouter();

    const getClients = async () => {

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getAllUsers`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                         const result = data?.data?.filter((client)=>
                         client?.finalUser?.visits?.some(
                            visitPosId => possByOwner.includes(visitPosId)
                         )
                        
                       )
                        const visitsHis = data?.data?.filter((client)=>
                         client?.finalUser?.visitHistory?.some(
                            visit => visit?.businessName ===businessNameSession
                         ))
                        
                      
                    const sum = visitsHis?.reduce((acc, user) => {
  const userSum = user?.finalUser?.visitHistory?.reduce((innerAcc, vis) => {
    return innerAcc + (vis.count || 0);
  }, 0);

  return acc + userSum;
}, 0);


                    
                
         
                    setTotalVisits(sum);
                       return setClients(visitsHis);
                       
                    })
                     
                }
            })

        } catch (err) {
            console.log('error', err);
        }


    }

        const handleGetAllReviews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getAllReviews`,

                {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization': `Bearer ${sessionData.token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    console.log('res', res);
                    return res.json();
                }
            }).then((res) => {
                 console.log('res rev', res);
            setReviews(res.getReviews);

            })
                               

        } catch (err) {
            console.log(err);
        }
    }
      const calculateStars = (rating) => {
            console.log('rating', rating);
            let stars = [];
            for (let i = 0; i < rating; i++) {
                stars.push(<StarIcon className={'w-5 h-5 text-yellow-500 fill-current'} />)
    
    
            }
            return stars;
        }

    const getPoSsByOwnerId = async (next, req, res) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: "GET"
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setPossByOwner(data?.map(pos => pos._id));
                        console.log('data', data);
                    })
                }
            })

        } catch (err) {
            next(err)
        }
    }

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setBusinessNameSession(session?.businessName);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        // setShowReferralLinks(false);
        if (userId) {
            getPoSsByOwnerId();
            handleGetAllReviews();
        }
    }, [userId])
    useEffect(() => {
        if (
            possByOwner
        ) {
            getClients();

        }
    }, [possByOwner, userId])
    return (
        <section className="mt-1 p-4 text-gray-800 w-full transition-all duration-300 ease-in-out"

        >
            <div className="p-4 flex flex-col dashboard-page mb-5">
                <h1 className="font-semibold text-4xl font-sans
                 text-black">Dashboard</h1>
                <p className="text-gray-500">Welcome back, John Restaurant! Here's your business overview.</p>
            </div>


            {/* //some overviews */}
            <div className="flex flex-col gap-3 p-4 text-sm " >
                <div className="grid grid-cols-2 gap-3 w-full ">

                    <div className="p-4 shadow-lg rounded-lg bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]">
                        <div className="flex justify-between w-full">
                            <h2 className="text-gray-100 font-semibold ">Total Visits</h2>
                            <ClientsIcon className="w-7 h-7 text-gray-100" />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="text-3xl font-semibold text-gray-100 
                            ">
                                {totalVisits}
                            </span>
                            <span style={{
                                'fontSize': '12px'
                            }} className="text-gray-100 text-sm ">This Month</span>
                        </div>



                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]">
                        <div className="flex justify-between w-full">
                            <h2 className="text-gray-100 font-semibold ">Average Rating</h2>
                            <StarIcon className="w-7 h-7 text-gray-100 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-3xl text-gray-100 
                            ">4.6</span>
                            <span
                                style={{
                                    'fontSize': '12px'
                                }}
                                className="text-gray-100 text-sm ">Out of 5.0</span>
                        </div>



                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-4 shadow-lg rounded-lg bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]">
                        <div className="flex justify-between w-full">
                            <h2 className="text-gray-100 font-semibold ">Total Reviews</h2>
                            <MessageReviewIcon className="w-7 h-7 text-gray-100 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-gray-100 
                            text-3xl">
                                {reviews && reviews?.length > 0 && reviews?.filter(review => review?.pointOfSaleId?.name === businessNameSession)?.length }
                            </span>
                            <span style={{
                                'fontSize': '12px'
                            }} className="text-gray-100 text-sm ">This Month</span>
                        </div>



                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]">
                        <div className="flex justify-between w-full">
                            <h2 className="text-gray-100 font-semibold ">Points Redeemed</h2>
                            <AwardIcon className="w-7 h-7 text-gray-100 " />

                        </div>

                        <div className="flex flex-col mt-3">
                            <span className="font-semibold text-3xl text-gray-100 
                            ">680$</span>
                            <span style={{
                                'fontSize': '12px'
                            }} className="text-gray-100 text-sm">Value</span>
                        </div>



                    </div>
                </div>

            </div>


            {/* a chart of the montly visits */}

            {/* <div className="p-4 flex flex-col gap-3">
                <div className="p-4 shadow-lg rounded-lg ">
                    <h2 className=" font-semibold ">Weekly visits trend</h2>
                    <div className="h-[200px]">

                    </div>
                </div>

            </div> */}

            {/* top 3 clients */}

            <div className="p-4 flex flex-col gap-3 ">
                <div className="p-4 shadow-lg rounded-lg flex flex-col">
                    <h2 className="font-semibold mb-3 w-full text-lg">Top 3 clients</h2>
                    {
                        clients.length > 0 && clients
                        .sort((a,b) =>{
                            const countA = a?.finalUser?.visitHistory?.find(visit => visit?.businessName === businessNameSession)?.count || 0;
                            const countB = b?.finalUser?.visitHistory?.find(visit => visit?.businessName === businessNameSession)?.count || 0;
                            return countB - countA;
                        })
                        .slice(0,3)
                        .map((client) => (

                            <div key={client._id || index}className="bg-gray-100 rounded-lg flex justify-between p-3 mb-3">

                                <div className="flex gap-3  items-center">
                                    <div>
                                        <Image src={client?.base?.avatar || defaultUser} alt="pos cover image" width={40} height={40} className="rounded-full object-cover aspect-square" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold ">{client?.base?.name}</span>
                                        <span className="text-gray-400 text-sm">
                                            {client?.finalUser?.visitHistory?.find((visit => visit?.businessName === businessNameSession)).count} visit(s)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className=" text-gray-400 text-sm text-end">Last Visit</span>
                                    <span className="  text-gray-400 text-sm text-end">{formatDistanceToNow(new Date(client?.finalUser?.visitHistory?.find((visit => visit?.businessName === businessNameSession)).date), { addSuffix: true })}</span>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </div>

            {/* some reviews */}
             <div className="p-4 flex flex-col gap-3 ">
                <div className="p-4 shadow-lg rounded-lg mt-3 flex flex-wrap justify-between">
                    <div className="w-full flex justify-between items-center">
                         <h2 className=" font-semibold mb-3 w-full text-lg">Recent reviews</h2>
                         
                              <button 
                              onClick={() => router.push('/pages/reviews/owner')}
                              className="text-blue-700 text-lg font-semibold cursor-pointer text-nowrap hover:text-purple-500 transition-all duration-300 ease-in-out">
                                  See all
                              </button>
                        

                    </div>
                         
                          {reviews && reviews?.length > 0 && reviews
                                ?.slice(0,4)
                                 ?.filter((element) => element.pointOfSaleId.ownerId === userId)
                                  ?.map((review, index) => {
          
                                      return (
                                          <div key={index} className="w-[45%] flex items-start mb-5  bg-gray-100 px-3 py-3 rounded-lg ">
                                              <div className="w-full flex justify-between  items-center">
                                                  <div className="flex justify-between  w-full">
                                                      <div className=" flex justify-start items-start w-[80px]">
                                                          <Image src={review?.userId?.base?.avatar || defaultUser} alt="restaurant" width={50} height={50} className="rounded-full object-cover aspect-square" />
                                                      </div>
          
                                                      <div className=" flex flex-col items-start w-full">
                                                          <p className="font-semibold px-2" style={{
                                                              'font-size': "14px"
                                                          }}>{review.userId.base.name}</p>
                                                          <p style={{
                                                              'font-size': "12px"
                                                          }} className="px-2">{review?.pointOfSaleId?.name}</p>
                                                          <span className="text-gray-400 px-2" style={{
                                                              'font-size': "12px"
                                                          }}>
                                                              {review.visitedAt.replace('T', ' ').split(' ')[0].toString()}
                                                              </span>  
                                                              <p className="w-full px-2  rounded-lg py-2 w-full">{review.comment} pgjpojr</p>
          
                                                      </div>
                                                            
                                                  </div>
                                            <div className="">
                                                      <span style={{
                                                          'font-size': "12px"
                                                      }}>
          
                                                          {review.rating && <span className="text-green-500 flex">
                                                              {calculateStars(review.rating)}
          
                                                          </span>}
          
                                                      </span>
                                                      
                                                  </div>
          
          
                                              </div>
                                            
                                          </div>
                                      )
                                  })
                          }
          
                      </div>
             </div>

                 
        </section>
    )
}