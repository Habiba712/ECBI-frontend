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
import Sparkline from "../../components/dashboard/Sparkline";
import AverageRatingSparkline from "../../components/dashboard/AverageRatings";

export default function PointOfSaleOwner() {

    const [userId, setUserId] = useState();
    const [token, setToken] = useState("");
    const [clients, setClients] = useState([]);
    const [possByOwner, setPossByOwner] = useState([]);
    const [visitHistorycount, setVisitHistorycount] = useState([])
    const [businessNameSession, setBusinessNameSession] = useState([])
    const [totalVisits, setTotalVisits] = useState(0);
    const [visitsData, setVisitsData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [avgRatingData, setAvgRatingData] = useState([]);
    const [pointsRedeemedData, setPointsRedeemedData] = useState([]);
    const [reviews, setReviews] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loyaltyConfig, setLoyaltyConfig] = useState({
        New: {
            bg: "bg-gray-100",
            text: "text-gray-500",
            border: "border-gray-100",
            icon: "text-gray-400",
        },
        Silver: {
            bg: "bg-gray-100",
            text: "text-gray-500",
            border: "border-gray-100",
            icon: "text-gray-400",
        },
        Gold: {
            bg: "bg-gray-100",
            text: "text-gray-500",
            border: "border-green-100",
            icon: "text-green-600",
        },
        Platinum: {
            bg: "bg-gray-100",
            text: "text-gray-500",
            border: "border-purple-100",
            icon: "text-purple-600",
        },
    });
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
                        const result = data?.data?.filter((client) =>
                            client?.finalUser?.visits?.some(
                                visitPosId => possByOwner.includes(visitPosId)
                            )

                        )
                        const visitsHis = data?.data?.filter((client) =>
                            client?.finalUser?.visitHistory?.some(
                                visit => visit?.businessName === businessNameSession
                            ))


                        const chartData = visitsHis.map(user => {
                            const history = user.finalUser.visitHistory.find(
                                h => h.businessName === businessNameSession
                            );

                            return {
                                "value": history.count || 0,
                            };
                        });

                        setVisitsData(chartData);

                       
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
               
const businessReviews = res.getReviews.filter(
  (review) => review?.pointOfSaleId?.name === businessNameSession
);
console.log('businessReviews', businessReviews);

// 1. Calculate the raw total length metric
const totalReviewsCount = businessReviews.length;

// 2. Format chronological data coordinates for the Recharts timeline sparkline array
const processedChartData = () => {
  // Group counts cleanly by calendar date strings
  const countMap = {};
  
  businessReviews.forEach((review) => {
    if (!review.createdAt) return;
    // Extract the clean date scalar representation (YYYY-MM-DD)
    const dateKey = new Date(review.createdAt).toISOString().split('T')[0];
    countMap[dateKey] = (countMap[dateKey] || 0) + 1;
  });

  // Sort dates chronologically to prevent rendering line path zig-zag artifacts
  const sortedDates = Object.keys(countMap).sort((a, b) => new Date(a) - new Date(b));

  // Cumulative running total transformation calculation
  let runningTotal = 0;
  return sortedDates.map((date) => {
    runningTotal += countMap[date]; // Increments baseline growth metrics
    return {
      date,
      value: runningTotal // Feeds the scalar node metric map parameters
    };
  });
};

// Update your chart data lifecycle state variable
setReviewsData(processedChartData());
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
                        // Assuming ownerPointsOfSaleList is the array of POS documents fetched for this specific owner
// 1. Let .map() do the cleaning and build the entire array first
const ratingChartData = data.map((posDoc, index) => {
  return {
    name: posDoc?.name || `POS ${index + 1}`,
    value: posDoc?.stats?.averageRating !== undefined ? posDoc.stats.averageRating : 0
  };
});
console.log('ratingChartData', ratingChartData);
const pointsRedeemedChartData = data.map((posDoc, index) => {
  return {
    name: posDoc?.name || `POS ${index + 1}`,
    value: posDoc?.stats?.pointsRedeemed !== undefined ? posDoc.stats.pointsRedeemed : 0
  };
});
console.log('pointsRedeemedChartData', pointsRedeemedChartData);

// 2. Pass the final clean array to your state setter ONCE
setAvgRatingData(ratingChartData);
setPointsRedeemedData(pointsRedeemedChartData);


// Update your chart display state tracker hook

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
            
        }
    }, [userId])
    useEffect(() => {
        if (
            possByOwner
        ) {
            getClients();

        }
    }, [possByOwner, userId])
    useEffect(() => {
        handleGetAllReviews();
    }, [possByOwner, userId])
    return (
        <section className="mt-1 p-4 text-gray-800 w-full transition-all duration-300 ease-in-out font-sans"

        >
            <div className="p-4 flex flex-col dashboard-page mb-5">
               <h1 className="text-2xl font-semibold text-gray-700">
  Good evening, John! 👋
</h1>
                <p className="text-gray-500">Welcome back, John Restaurant! Here's your business overview.</p>
            </div>

<div className="flex justify-between gap-3 p-4">
      <Sparkline
                    data={visitsData}
                    title="Total Visits"
                    percentage={10}
                    icon={ClientsIcon}
                    color="#7C5CFC"
                /> 

<Sparkline
                    data={reviewsData}
                    title="Total Reviews"
                    percentage={5}
                    icon={MessageReviewIcon}
                    color="#10B981"
                /> 
                <AverageRatingSparkline
                    data={avgRatingData}
                    title="Avg. Rating"
                    percentage={3}
                    icon={StarIcon}
                    color="#1E88E5"
                /> 
                 <AverageRatingSparkline
                    data={pointsRedeemedData}
                    title="Points Redeemed"
                    percentage={3}
                    icon={AwardIcon}
                    color="#F97316"
                /> 
</div>
            
            


        
            {/* top 3 clients */}

            <div className="p-4 flex flex-col gap-3 ">
                <div className="p-4 shadow-lg rounded-lg flex flex-col">
                    <h2 className="font-semibold mb-3 w-full text-lg">Top 3 clients</h2>
                    {
                        clients.length > 0 && clients
                            .sort((a, b) => {
                                const countA = a?.finalUser?.visitHistory?.find(visit => visit?.businessName === businessNameSession)?.count || 0;
                                const countB = b?.finalUser?.visitHistory?.find(visit => visit?.businessName === businessNameSession)?.count || 0;
                                return countB - countA;
                            })
                            .slice(0, 3)
                            .map((client) => (

                                           <div
              key={client._id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center`}
                >
                  <ClientsIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-1">
                {client._id}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {/* {card.value} */}
                    card value
                  </p>
                  <p
                    className={`text-xs mt-0.5 
                    //   card.subGreen ? "text-green-500" : "text-gray-400"
                    `}
                  >
                    All time
                  </p>
                </div>
                <Sparkline  data={visitsData}
                    title="Total Visits"
                    percentage={10}
                    icon={ClientsIcon}
                    color="#7C5CFC" />
              </div>
            </div>
          ))}
        </div>
 
        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 placeholder-gray-400"
              placeholder="Search clients by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {["All Status", "All Loyalty", "Sort: Recent"].map((label) => (
            <select
              key={label}
              className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
            >
              <option>Top Clients</option>
            </select>
          ))}
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
 
        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["CLIENT", "LOYALTY STATUS", "TOTAL VISITS", "LAST VISIT", "TOTAL SPENT", "ACTIONS"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left text-xs font-semibold text-gray-400 tracking-wider px-6 py-4"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((client) => {
                const lc = loyaltyConfig[client.loyalty] || loyaltyConfig.New;
                return (
                  <tr
                    key={client._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Client */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={client.base.avatar}
                          alt={client.base.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {client.base.name}
                          </p>
                          <p className="text-xs text-gray-400">{client.base.email}</p>
                          <p className="text-xs text-gray-400">{client.base.phone}</p>
                        </div>
                      </div>
                    </td>
 
                    {/* Loyalty */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${lc.bg} ${lc.text} ${lc.border}`}
                      >
                        <span>{lc.icon}</span>
                        {client.loyalty}
                      </span>
                      <p className="text-xs text-gray-400 mt-1 ml-1">
                        {client.loyaltyLabel}
                      </p>
                    </td>
 
                    {/* Visits */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-800">
                        {client.finalUser.visits}
                      </span>
                    </td>
 
                    {/* Last Visit */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">LAst visit</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          client.lastVisitStatus === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {/* {client.lastVisitStatus} */}
                        last visit status
                      </span>
                    </td>
 
                    {/* Spent */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {/* {client.spent} */}
                        clients spent
                      </p>
                      <p className="text-xs text-purple-500 mt-0.5">
                        {/* {client.points} */}
                        cleints points
                      </p>
                    </td>
 
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
 
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Showing 1 to 5 of 256 clients
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === p
                      ? "bg-purple-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                ...
              </span>
              <button className="w-8 h-8 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                52
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
                </div>  

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

                    {/* {reviews && reviews?.length > 0 && reviews
                        ?.slice(0, 4)
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
                                                    {review?.visitedAt?.replace('T', ' ').split(' ')[0].toString()}
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
                    } */}

                </div>
            </div>


        </section>
    )
}