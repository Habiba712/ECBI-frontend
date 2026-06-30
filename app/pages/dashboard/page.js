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
  const [ownerName, setOwnerName] = useState("");
  const [token, setToken] = useState("");
  const [clients, setClients] = useState([]);
  const [possByOwner, setPossByOwner] = useState([]);
  const [businessNameSession, setBusinessNameSession] = useState("");
  const [visitsData, setVisitsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [avgRatingData, setAvgRatingData] = useState([]);
  const [pointsRedeemedData, setPointsRedeemedData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loyaltyFilter, setLoyaltyFilter] = useState("All Loyalty");
  const [sortFilter, setSortFilter] = useState("Sort: Recent");
  const [isLoading, setIsLoading] = useState(true);
  const [visitsDataTotal, setVisitsDataTotal] = useState(0);
  const [reviewsDataTotal, setReviewsDataTotal] = useState(0);
  const now = new Date();

  const [currentTime, setCurrentTime] = useState("");

  const calculateTimeDifference = (date) => {
    const hour = new Date().getHours();

  if (hour < 12) {
    setCurrentTime("Morning");
  } else if (hour < 18) {
    setCurrentTime("Afternoon");
  } else {
    setCurrentTime("Evening");
  }
    
  }

  const loyaltyConfig = {
    New: { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-200" },
    Silver: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    Gold: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
    Platinum: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  };

  const router = useRouter();

  // ── Helpers ──────────────────────────────────────────────────────────────

  const getLoyaltyTier = (earnedPoints) => {
    if (earnedPoints >= 200) return { tier: "Platinum", label: "VIP", ...loyaltyConfig.Platinum };
    if (earnedPoints >= 100) return { tier: "Gold", label: "Top Visitor", ...loyaltyConfig.Gold };
    if (earnedPoints >= 50) return { tier: "Silver", label: "Regular", ...loyaltyConfig.Silver };
    return { tier: "New", label: "New Customer", ...loyaltyConfig.New };
  };

  const getClientVisitInfo = (client) => {
    const history = client.finalUser.visitHistory.find(
      h => h.businessName === businessNameSession
    );
    const pointsEarned = client.finalUser.pointsByPos?.reduce(
      (sum, p) => sum + (p.earnedPoints || 0), 0
    ) || 0;
    return {
      count: history?.count || 0,
      date: history?.date
        ? formatDistanceToNow(new Date(history.date), { addSuffix: true })
        : "N/A",
      pointsEarned,
    };
  };

  const calculateStars = (rating) =>
    Array.from({ length: rating }, (_, i) => (
      <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
    ));

  // ── Data fetching ─────────────────────────────────────────────────────────

  const getClients = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getAllUsers`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        method: "GET"
      });
      if (!res.ok) return;
      const data = await res.json();

      const visitsHis = data?.data?.filter((client) =>
        client?.finalUser?.visitHistory?.some(
          visit => visit?.businessName === businessNameSession
        )
      );

      const chartData = visitsHis.map(user => ({
        value: user.finalUser.visitHistory.find(
          h => h.businessName === businessNameSession
        )?.count || 0,
      }));
      // console.log('chartData', chartData);

      setVisitsData(chartData);
      setVisitsDataTotal(chartData.reduce((acc, curr) => acc + curr.value, 0));
      // console.log('visitsDataTotal', chartData.reduce((acc, curr) => acc + curr.value, 0));

      setClients(visitsHis);
      setIsLoading(false);
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleGetAllReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getAllReviews`, {
        headers: { 'Content-Type': 'application/json' },
        method: "GET"
      });
      if (!res.ok) return;
      const data = await res.json();
console.log('data gt', data.getReviews);
      const businessReviews = data.getReviews.filter(
        review => review?.pointOfSaleId?.name === businessNameSession
      );

      const countMap = {};
      businessReviews.forEach(review => {
        if (!review.createdAt) return;
        const dateKey = new Date(review.createdAt).toISOString().split('T')[0];
        countMap[dateKey] = (countMap[dateKey] || 0) + 1;
      });
      let runningTotal = 0;
      const processedChartData = Object.keys(countMap)
        .sort((a, b) => new Date(a) - new Date(b))
        .map(date => {
          runningTotal += countMap[date];
          return { date, value: runningTotal };
        });

      setReviewsData(data.getReviews?.length > 0 ? processedChartData : 0);
      console.log('data.getReviews', data.getReviews);
      setReviews(data.getReviews);
      setReviewsDataTotal(data?.getReviews?.length || 0);

      console.log('reviewsDataTotal', data.getReviews[data.getReviews.length - 1]);

    } catch (err) {
      console.log(err);
    }
  };
const getOwnerName = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        method: "GET"
      });
      if (!res.ok) return;
      const data = await res.json();
      setOwnerName(data?.data?.base?.name);
    } catch (err) {
      console.log('Error fetching owner name:', err);
    }
  };
  const getPoSsByOwnerId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userId}`,
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: "GET" }
      );
      if (!res.ok) return;
      const data = await res.json();

      setPossByOwner(data?.map(pos => pos._id));
      setAvgRatingData(data.map((pos, i) => ({
        name: pos?.name || `POS ${i + 1}`,
        value: pos?.stats?.averageRating ?? 0,
      })));
      setPointsRedeemedData(data.map((pos, i) => ({
        name: pos?.name || `POS ${i + 1}`,
        value: pos?.stats?.pointsRedeemed ?? 0,
      })));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("sessionData")) || null;
    setUserId(session?.userId);
    setBusinessNameSession(session?.businessName);
    setToken(session?.token);
    handleGetAllReviews();
    // getOwnerName();
  }, []);

  
  useEffect(() => {
    if (userId) {
      getPoSsByOwnerId();
     
    };
  }, [userId]);

  useEffect(() => {
    if (possByOwner.length){ getClients();
      handleGetAllReviews();
    }
  }, [possByOwner]);

  useEffect(() => {
   getOwnerName(); 
   handleGetAllReviews();
    const now = new Date();
    calculateTimeDifference(now);
    
  }, [userId]);


  useEffect(() => {
    if (!clients.length) return;
    const lower = search.toLowerCase();

    let result = clients.filter(client => {
      const matchesSearch =
        client.base.name?.toLowerCase().includes(lower) ||
        client.base.email?.toLowerCase().includes(lower) ||
        client.base.telephone?.includes(lower);

      const { count, pointsEarned } = getClientVisitInfo(client);
      const loyalty = getLoyaltyTier(pointsEarned);
      const isActive = count > 0;

      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Active" && isActive) ||
        (statusFilter === "Inactive" && !isActive);

      const matchesLoyalty =
        loyaltyFilter === "All Loyalty" ||
        loyalty.tier === loyaltyFilter;

      return matchesSearch && matchesStatus && matchesLoyalty;
    });

    if (sortFilter === "Sort: Most Visits") {
      result = result.sort((a, b) => {
        const aCount = getClientVisitInfo(a).count;
        const bCount = getClientVisitInfo(b).count;
        return bCount - aCount;
      });
    } else if (sortFilter === "Sort: Most Points") {
      result = result.sort((a, b) => {
        return getClientVisitInfo(b).pointsEarned - getClientVisitInfo(a).pointsEarned;
      });
    }

    setFiltered(result);
  }, [search, clients, statusFilter, loyaltyFilter, sortFilter]);


  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
  
    <section className="mt-20 p-4 text-gray-800 w-full transition-all duration-300 ease-in-out font-sans">

        {/* Header — always visible */}
    

        {isLoading ? (
             <div className="animate-pulse p-4 flex flex-col gap-6">
<div className="p-4 flex flex-col mb-5">
          <div className="w-100 h-5 bg-gray-200 rounded-full flex-shrink-0 mb-2" />
            
            <div className="w-60 h-3 bg-gray-200 rounded-full flex-shrink-0" />
        </div>
                {/* Stat cards skeleton */}
                <div className="flex justify-between gap-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                            <div className="h-3 bg-gray-200 rounded w-24" />
                            <div className="h-8 bg-gray-200 rounded w-16" />
                            <div className="h-3 bg-gray-100 rounded w-20" />
                        </div>
                    ))}
                </div>

                {/* Top 3 clients skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="h-3.5 bg-gray-200 rounded w-32" />
                                <div className="h-3 bg-gray-100 rounded w-48" />
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full w-16" />
                        </div>
                    ))}
                </div>

                {/* Table skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
                    {/* Header row */}
                    <div className="flex gap-6 pb-3 border-b border-gray-100">
                        {[120, 80, 80, 80, 80, 40].map((w, i) => (
                            <div key={i} className="h-3 bg-gray-200 rounded" style={{ width: w }} />
                        ))}
                    </div>
                    {/* Rows */}
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-6 py-2">
                            <div className="flex items-center gap-3" style={{ width: 120 }}>
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-3 bg-gray-200 rounded w-20" />
                                    <div className="h-2.5 bg-gray-100 rounded w-28" />
                                </div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full w-16" />
                            <div className="h-3 bg-gray-200 rounded w-8" />
                            <div className="h-3 bg-gray-200 rounded w-20" />
                            <div className="h-3 bg-gray-200 rounded w-20" />
                            <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                        </div>
                    ))}
                </div>

                {/* Reviews skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="flex flex-wrap gap-4">
                        {[1, 2].map(i => (
                            <div key={i} className="w-[calc(50%-8px)] flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="h-3.5 bg-gray-200 rounded w-28" />
                                    <div className="h-3 bg-gray-100 rounded w-36" />
                                    <div className="h-3 bg-gray-100 rounded w-full" />
                                    <div className="h-3 bg-gray-100 rounded w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        ) : (
             <>
                     <div className="p-4 flex flex-col mb-5">
            <h1 className="text-2xl font-semibold text-gray-700">
                Good {currentTime}, <span className="text-purple-600">{ownerName}</span>! 👋
            </h1>
            <p className="text-gray-500">Here's your business overview.</p>
        </div>
                <div className="flex justify-between gap-3 p-4">
                    <Sparkline data={visitsData} 
                    value={visitsDataTotal}
                    title="Total Visits" percentage={10} icon={ClientsIcon} color="#7C5CFC" />
                  
                    <Sparkline 
                    data={reviewsData} 
                    value={reviewsDataTotal}
                    title="Total Reviews" 
                    percentage={5} 
                    icon={MessageReviewIcon} color="#10B981" />

                    <AverageRatingSparkline data={avgRatingData} title="Avg. Rating" percentage={3} icon={StarIcon} color="#1E88E5" />
                    <AverageRatingSparkline data={pointsRedeemedData} title="Points Redeemed" percentage={3} icon={AwardIcon} color="#F97316" />
                </div>

                {/* Top 3 clients */}
                <div className="p-4">
                    <div className="p-4 shadow-sm rounded-2xl border border-gray-100 bg-white mb-6">

                     
                        <h2 className="w-full flex gap-2 font-semibold text-lg text-gray-800"> <ClientsIcon className="w-7 h-7 text-purple-500 stroke-2 " /> Top 3 clients</h2>
                        <div className="flex flex-col gap-2">
                            {clients.slice(0, 3).map((client) => {
                                const { count, date, pointsEarned } = getClientVisitInfo(client);
                                const loyalty = getLoyaltyTier(pointsEarned);
                                return (
                                    <div key={client._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <img src={client.base.avatar || defaultUser.src} alt={client.base.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
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
                            {clients.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No clients yet.</p>}
                        </div>
                    </div>

                    {/* Search + Filters */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center gap-2 flex-1 max-w-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-200 focus-within:border-purple-400">
                            <svg className="text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
                                placeholder="Search clients by name, email or phone..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <select value={loyaltyFilter} onChange={(e) => { setLoyaltyFilter(e.target.value); setCurrentPage(1); }} className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer">
                            <option>All Loyalty</option>
                            <option>Platinum</option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>New</option>
                        </select>
                        <select value={sortFilter} onChange={(e) => { setSortFilter(e.target.value); setCurrentPage(1); }} className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer">
                            <option>Sort: Recent</option>
                            <option>Sort: Most Visits</option>
                            <option>Sort: Most Points</option>
                        </select>
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
                                    {["CLIENT", "LOYALTY", "TOTAL VISITS", "LAST VISIT", "POINTS EARNED", "ACTIONS"].map(col => (
                                        <th key={col} className="text-left text-xs font-semibold text-gray-400 tracking-wider px-6 py-4">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginated.length > 0 ? paginated.map((client) => {
                                    const { count, date, pointsEarned } = getClientVisitInfo(client);
                                    const loyalty = getLoyaltyTier(pointsEarned);
                                    return (
                                        <tr key={client._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={client.base.avatar || defaultUser.src} alt={client.base.name} className="w-10 h-10 rounded-full object-cover" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{client.base.name}</p>
                                                        <p className="text-xs text-gray-400">{client.base.email}</p>
                                                        <p className="text-xs text-gray-400">{client.base.telephone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${loyalty.bg} ${loyalty.text} ${loyalty.border}`}>{loyalty.tier}</span>
                                                <p className="text-xs text-gray-400 mt-1 ml-1">{loyalty.label}</p>
                                            </td>
                                            <td className="px-6 py-4"><span className="text-sm font-semibold text-gray-800">{count}</span></td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700">{date}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${count > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                                    {count > 0 ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4"><p className="text-xs text-purple-500">{pointsEarned} pts earned</p></td>
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
                                }) : (
                                    <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">No clients match your search.</td></tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                            <p className="text-sm text-gray-400">
                                Showing {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} clients
                            </p>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === p ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
                                ))}
                                {totalPages > 5 && <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>}
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent reviews */}
                <div className="p-4">
                    <div className="p-4 shadow-sm rounded-2xl border border-gray-100 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="w-full flex gap-2 font-semibold text-lg text-gray-800">
                              <MessageReviewIcon className="w-7 h-7 text-purple-500 stroke-2 " /> Recent reviews
                            </h2>
                            <button onClick={() => router.push('/pages/reviews/owner')} className="text-sm text-nowrap cursor-pointer font-semibold text-purple-600 hover:text-purple-800 transition-colors">See all</button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {reviews && reviews
                                .filter(r => r?.pointOfSaleId?.name === businessNameSession)
                                .slice(0, 4)
                                .map((review, index) => (
                                    <div key={index} className="w-[calc(50%-8px)] flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                                        <Image src={review?.userId?.base?.avatar || defaultUser} alt="reviewer" width={40} height={40} className="rounded-full object-cover aspect-square flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{review.userId?.base?.name}</p>
                                                <span className="flex gap-0.5 flex-shrink-0">{calculateStars(review.rating)}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mb-1">{review?.pointOfSaleId?.name} · {review?.visitedAt?.split('T')[0]}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            {(!reviews || reviews.filter(r => r?.pointOfSaleId?.name === businessNameSession).length === 0) && (
                                <p className="text-sm text-gray-400 w-full text-center py-4">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )}
    </section>

  );
}