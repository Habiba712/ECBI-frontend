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

                        console.log('clients',visitsHis )
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
        // console.log('rating', rating);
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
                        // console.log('data', data);
                        // Assuming ownerPointsOfSaleList is the array of POS documents fetched for this specific owner
// 1. Let .map() do the cleaning and build the entire array first
const ratingChartData = data.map((posDoc, index) => {
  return {
    name: posDoc?.name || `POS ${index + 1}`,
    value: posDoc?.stats?.averageRating !== undefined ? posDoc.stats.averageRating : 0
  };
});
// console.log('ratingChartData', ratingChartData);
const pointsRedeemedChartData = data.map((posDoc, index) => {
  return {
    name: posDoc?.name || `POS ${index + 1}`,
    value: posDoc?.stats?.pointsRedeemed !== undefined ? posDoc.stats.pointsRedeemed : 0
  };
});
// console.log('pointsRedeemedChartData', pointsRedeemedChartData);

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
      console.log('possByOwner', possByOwner);
        if (
            possByOwner
        ) {
            getClients();

        }
    }, [possByOwner, userId])
    useEffect(() => {
        handleGetAllReviews();
    }, [possByOwner, userId])
    // Add this helper above your return
const getLoyaltyTier = (earnedPoints) => {
    if (earnedPoints >= 200) return { tier: "Platinum", label: "VIP", ...loyaltyConfig.Platinum };
    if (earnedPoints >= 100) return { tier: "Gold", label: "Top Visitor", ...loyaltyConfig.Gold };
    if (earnedPoints >= 50)  return { tier: "Silver", label: "Regular", ...loyaltyConfig.Silver };
    return { tier: "New", label: "New Customer", ...loyaltyConfig.New };
};

const getClientVisitInfo = (client) => {
    const history = client.finalUser.visitHistory.find(
        h => h.businessName === businessNameSession
    );
    return {
        count: history?.count || 0,
        date: history?.date ? formatDistanceToNow(new Date(history.date), { addSuffix: true }) : "N/A",
        pointsEarned: client.finalUser.pointsByPos?.reduce((sum, p) => sum + (p.earnedPoints || 0), 0) || 0,
    };
};
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

           {clients.slice(0, 3).map((client) => {
    const { count, date, pointsEarned } = getClientVisitInfo(client);
    const loyalty = getLoyaltyTier(pointsEarned);
    return (
        <div key={client._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <img
                src={client.base.avatar || defaultUser}
                alt={client.base.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{client.base.name}</p>
                <p className="text-xs text-gray-400">{count} visits · Last {date}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${loyalty.bg} ${loyalty.text} ${loyalty.border}`}>
                {loyalty.tier}
            </span>
        </div>
    );
})}

{clients.map((client) => {
    const { count, date, pointsEarned } = getClientVisitInfo(client);
    const loyalty = getLoyaltyTier(pointsEarned);
    return (
        <tr key={client._id} className="hover:bg-gray-50/50 transition-colors">
            {/* Client */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={client.base.avatar || defaultUser}
                        alt={client.base.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{client.base.name}</p>
                        <p className="text-xs text-gray-400">{client.base.email}</p>
                        <p className="text-xs text-gray-400">{client.base.telephone}</p>
                    </div>
                </div>
            </td>

            {/* Loyalty */}
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${loyalty.bg} ${loyalty.text} ${loyalty.border}`}>
                    {loyalty.tier}
                </span>
                <p className="text-xs text-gray-400 mt-1 ml-1">{loyalty.label}</p>
            </td>

            {/* Visits */}
            <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-800">{count}</span>
            </td>

            {/* Last Visit */}
            <td className="px-6 py-4">
                <p className="text-sm text-gray-700">{date}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    count > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                }`}>
                    {count > 0 ? "Active" : "Inactive"}
                </span>
            </td>

            {/* Points */}
            <td className="px-6 py-4">
                <p className="text-xs text-purple-500">{pointsEarned} pts earned</p>
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