'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import next from "next";
import ReviewsReplies from "../../../components/modals/reviewsReplies";
import ReplyIcon from "../../../../public/svg/reply";
import StarIcon from "../../../../public/svg/star";
import defaultUser from "../../../../public/default_user.png";

export default function OwnerReviews() {
    const [reviews, setReviews] = useState();
    const [pointsOfSaleByOwner, setPointsOfSaleByOwner] = useState();
    const [searchText, setSearchText] = useState("");
    const [filterByRestaurant, setFilterByRestaurant] = useState("");
    const [filterByRating, setFilterByRating] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalReview, setModalReview] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [userOwnerId, setUserOwnerId] = useState();
    const [businessName, setBusinessName] = useState();
    const [token, setToken] = useState("");
    const [avgRating, setAvgRating] = useState(0);
    const [userId, setUserId] = useState();

    const getPoSsByOwnerId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userId}`,
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: "GET" }
      );
      if (!res.ok) return;
      const data = await res.json();
      console.log('data jjj', data);

      // setPossByOwner(data?.map(pos => pos._id));
      // setAvgRatingData(data.map((pos, i) => ({
      //   name: pos?.name || `POS ${i + 1}`,
      //   value: pos?.stats?.averageRating ?? 0,
      // })));
      setAvgRating(data?.length
  ? Math.max(...data.map(p => p?.stats?.averageRating || 0)).toFixed(1)
  : "0.0");

    } catch (err) {
      console.log(err);
    }
  };

    const handleGetPointsOfSale = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userId}`, {
                headers: { 'Content-Type': 'application/json' },
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json();
                setPointsOfSaleByOwner(data);
            }
        } catch (err) {
            next(err);
        }
    };

    const handleGetAllReviews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getAllReviews`, {
                headers: { 'Content-Type': 'application/json' },
                method: "GET"
            });
            if (res.ok) {
                setIsLoading(false);
                const data = await res.json();
                setReviews(data.getReviews);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowModal = (review) => {
        setModalReview(review);
        setIsModalOpen(true);
    };

    const hundleUpdateReview = async (reply) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/updateReviews/${reply.reply.reviewId}`, {
                headers: { 'content-type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify({ ownerReply: reply.reply.replyText })
            });
            if (res.ok) handleGetAllReviews();
        } catch (err) {
            next(err);
        }
    };

    const calculateStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`} />
        ));

    useEffect(() => {
        if (userId) {
  handleGetAllReviews();
        getPoSsByOwnerId();
        handleGetPointsOfSale();
        }
      
        
    }, [userId]);

 useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData")) || null;
    setToken(sessionData?.token);
    setUserId(sessionData?.userId);
    setUserOwnerId(sessionData?.userId);
        setBusinessName(sessionData?.businessName);
  }, [])
    const filteredReviews = reviews
        ?.filter(r => r.pointOfSaleId.ownerId === userId)
        ?.filter(r => {
            const matchesSearch = searchText
                ? r.pointOfSaleId.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  r.userId?.base?.name?.toLowerCase().includes(searchText.toLowerCase())
                : true;
            const matchesRestaurant = filterByRestaurant
                ? r.pointOfSaleId.name.toLowerCase().includes(filterByRestaurant.toLowerCase())
                : true;
            const matchesRating = filterByRating
                ? r.rating === parseInt(filterByRating)
                : true;
            return matchesSearch && matchesRestaurant && matchesRating;
        });

    const totalReviews = filteredReviews?.length || 0;
    
    const repliedCount = filteredReviews?.filter(r => r.ownerReply).length || 0;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <section className="p-6 text-gray-800 w-full font-sans">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage and respond to customer feedback</p>
                </div>
            </div>
            {/* Skeleton Loading Visual Sheet */}
{isLoading ? (
  <div className="p-6 space-y-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        className="flex flex-col w-full pb-6 border-b border-slate-100 last:border-0 last:pb-0 relative overflow-hidden"
      >
        {/* Shimmer Header Row */}
        <div className="flex justify-between w-full items-start animate-pulse">
          <div className="flex items-center gap-4">
            
            {/* Avatar Circle Placeholder */}
            <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0" />
            
            {/* Metadata Text Stack Placeholders */}
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-slate-200 rounded w-28" />
              <div className="h-3 bg-slate-200 rounded w-40" />
              <div className="h-2.5 bg-slate-100 rounded w-16" />
            </div>

          </div>

          {/* Star Rating Layout Placeholder */}
          <div className="h-4 bg-slate-200 rounded-md w-24" />
        </div>

        {/* Comment Narrative Content Area Placeholder */}
        <div className="mt-4 w-full pl-16 space-y-2 animate-pulse">
          <div className="h-3.5 bg-slate-200 rounded w-full" />
          <div className="h-3.5 bg-slate-200 rounded w-4/5" />
          
          {/* Action Button Placeholder */}
          <div className="h-9 bg-slate-100 rounded-xl w-32 mt-4" />
        </div>
      </div>
    ))}
  </div>
)
: 
(
    <>  {/* Stat pills */}
            <div className="flex gap-4 mb-6">
                {[
                    { label: "Total Reviews", value: totalReviews, color: "bg-purple-50 text-purple-700 border-purple-100" },
                    { label: "Avg. Rating",   value: `⭐ ${avgRating}`, color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
                    { label: "Replied",       value: repliedCount,  color: "bg-green-50 text-green-700 border-green-100"  },
                    { label: "Pending Reply", value: totalReviews - repliedCount, color: "bg-orange-50 text-orange-700 border-orange-100" },
                ].map(stat => (
                    <div key={stat.label} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-medium ${stat.color}`}>
                        <span className="text-lg font-bold">{stat.value}</span>
                        <span className="text-xs opacity-70">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Search + Filters */}
          <div className="flex items-start gap-3 mb-5 w-full">
             <div className="flex items-center gap-2 max-w-sm w-1/4 bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-200 focus-within:border-purple-400">
    <svg className="text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <input
        type="text"
        className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
        placeholder="Search by customer or restaurant..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
    />
</div>
                <div className="relative flex justify-between items-center gap-2 w-2/4">
                     <select
                    onChange={(e) => setFilterByRestaurant(e.target.value)}
                    className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
                >
                    <option value="">All Restaurants</option>
                    {pointsOfSaleByOwner?.map((pos, i) => (
                        <option key={i} value={pos.id}>{pos.name}</option>
                    ))}
                </select>
                <select
                    onChange={(e) => setFilterByRating(e.target.value)}
                    className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
                >
                    <option value="">All Ratings</option>
                    {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r} Stars</option>
                    ))}
                </select>
                </div>
               <div className="relative flex justify-between items-center gap-2 w-1/4">
                <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
               </div>
          </div>
                
            
            {/* Reviews list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Skeleton */}
                {isLoading && (
                    <div className="p-6 space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex flex-col w-full pb-6 border-b border-gray-100 last:border-0 last:pb-0 animate-pulse">
                                <div className="flex justify-between w-full items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-gray-200 rounded-full flex-shrink-0" />
                                        <div className="flex flex-col space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-24" />
                                            <div className="h-3 bg-gray-200 rounded w-32" />
                                            <div className="h-3 bg-gray-100 rounded w-16" />
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded-md w-16" />
                                </div>
                                <div className="mt-3 w-full pl-14 space-y-2">
                                    <div className="h-3.5 bg-gray-200 rounded w-full" />
                                    <div className="h-3.5 bg-gray-200 rounded w-5/6" />
                                    <div className="h-8 bg-gray-100 rounded-lg w-28 mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actual reviews */}
                {!isLoading && filteredReviews?.length > 0 && (
                    <div className="divide-y divide-gray-50">
                        {filteredReviews.map((review, index) => (
                            <div key={index} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start justify-between gap-4">

                                    {/* Left: avatar + meta */}
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={review?.userId?.base?.avatar || defaultUser}
                                            alt="reviewer"
                                            width={44}
                                            height={44}
                                            className="rounded-full object-cover aspect-square flex-shrink-0"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{review.userId.base.name}</p>
                                            <p className="text-xs text-gray-400">{review?.pointOfSaleId?.name}</p>
                                            <p className="text-xs text-gray-300 mt-0.5">
                                                {review.visitedAt?.replace('T', ' ').split(' ')[0]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: stars */}
                                    <div className="flex gap-0.5 flex-shrink-0">
                                        {calculateStars(review.rating)}
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-14">
                                    {review.comment}
                                </p>

                                {/* Reply or button */}
                                <div className="pl-14 mt-3">
                                    {review.ownerReply ? (
                                        <div className="flex items-start gap-2 bg-purple-50 border-l-4 border-purple-400 rounded-r-xl px-4 py-3">
                                            <div>
                                                <p className="text-xs font-semibold text-purple-600 mb-1">Your reply</p>
                                                <p className="text-sm text-gray-600">{review.ownerReply}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleShowModal({
                                                review: {
                                                    id: review._id,
                                                    comment: review.comment,
                                                    rating: review.rating,
                                                    userName: review.userId.base.name,
                                                    avatar: review.userId.base.avatar
                                                }
                                            })}
                                            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors cursor-pointer"
                                        >
                                            <ReplyIcon className="w-4 h-4" />
                                            Reply to Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && (!filteredReviews || filteredReviews.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                            <StarIcon className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No reviews found</p>
                        <p className="text-xs text-gray-300 mt-1">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ReviewsReplies
                    review={modalReview}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSend={hundleUpdateReview}
                />
            )}  
    </>
 
)

}

           
        </section>
    );
}