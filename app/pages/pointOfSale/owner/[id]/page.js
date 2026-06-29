'use client'

import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import defaultUser from "../../../../../public/default_user.png";
import ReviewsReplies from "../../../../components/modals/reviewsReplies";

// ─── icons ────────────────────────────────────────────────────────────────────
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)
const StarFilledIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-yellow-400 text-yellow-400`} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const StarEmptyIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-gray-200 text-gray-200`} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const ReplyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
  </svg>
)
const EyeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const StarOutlineIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
)
const MapPinIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const PhoneIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const GlobeIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// ─── star renderer ────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rating
          ? <StarFilledIcon key={i} className="w-4 h-4" />
          : <StarEmptyIcon key={i} className="w-4 h-4" />
      )}
    </div>
  )
}

// ─── stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, bg, border }) {
  return (
    <div className={`${bg} ${border} border rounded-2xl px-5 py-5 flex items-center gap-4`}>
      <span className={`${color} opacity-70`}>{icon}</span>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value ?? "—"}</p>
      </div>
    </div>
  )
}

// ─── review card ─────────────────────────────────────────────────────────────
function ReviewCard({ item, onReply }) {
  const date = item?.visitedAt
    ? item.visitedAt.replace("T", " ").split(" ")[0]
    : ""

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      {/* top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={item?.userId?.base?.avatar || defaultUser}
            alt="user"
            width={44}
            height={44}
            className="rounded-full object-cover w-11 h-11 flex-shrink-0"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{item?.userId?.base?.name}</p>
            <p className="text-xs text-gray-400">{item?.pointOfSaleId?.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {item?.rating && <StarRating rating={item.rating} />}
          <span className="text-xs font-semibold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">
            +{item?.pointsEarned ?? 0} pts
          </span>
        </div>
      </div>

      {/* comment */}
      {item?.comment && (
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{item.comment}</p>
      )}

      {/* reply area */}
      <div className="mt-4">
        {!item?.ownerReply ? (
          <button
            onClick={() => onReply({
              review: {
                id: item._id,
                comment: item.comment,
                rating: item.rating,
                userName: item.userId.base.name,
                userAvatar: item.userId.base.avatar || defaultUser,
              }
            })}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ReplyIcon />
            Reply to Review
          </button>
        ) : (
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4">
            <p className="text-xs font-semibold text-purple-500 mb-1">Your reply</p>
            <p className="text-sm text-gray-600">{item.ownerReply}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── main page ────────────────────────────────────────────────────────────────
export default function PointOfSaleDetail() {
  const { id } = useParams()

  const [pointsOfSaleById, setPointsOfSaleById] = useState()
  const [reviews, setReviews] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalReview, setModalReview] = useState()

  const getPointsOfSaleById = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleById/${id}`
      )
      if (res.ok) {
        const data = await res.json()
        setPointsOfSaleById(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getReviewsByPointOfSaleId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getReviewsByPointOfSaleId/${id}`
      )
      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleShowModal = (review) => {
    setModalReview(review)
    setIsModalOpen(true)
  }

  const handleUpdateReview = async (reply) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/updateReviews/${reply.reply.reviewId}`,
        {
          headers: { "content-type": "application/json" },
          method: "PUT",
          body: JSON.stringify({ ownerReply: reply.reply.replyText }),
        }
      )
      if (res.ok) {
        getReviewsByPointOfSaleId()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getPointsOfSaleById()
    getReviewsByPointOfSaleId()
  }, [])

  const pos = pointsOfSaleById

  return (
    <section className="min-h-screen bg-gray-50 w-full p-6 mx-auto ">
      <div className="">

        {/* ── back button ── */}
        <button
          onClick={() => redirect("/pages/pointOfSale/owner")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6 cursor-pointer"
        >
          <BackIcon />
          Back to list
        </button>

        {/* ── hero card ── */}
        {pos && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="relative h-52 w-full">
              <img
                src={pos.coverImage}
                alt={pos.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <h1 className="text-2xl font-bold">{pos.name}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-white/80">
                  {pos.address && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon />
                      {[pos.address.city, pos.address.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {pos.phone && (
                    <span className="flex items-center gap-1">
                      <PhoneIcon />
                      {pos.phone}
                    </span>
                  )}
                  {pos.website && (
                    <a href={pos.website} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 hover:text-white transition-colors">
                      <GlobeIcon />
                      Website
                    </a>
                  )}
                </div>
              </div>
              <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                pos.status === "active"
                  ? "bg-green-500 text-white"
                  : "bg-red-400 text-white"
              }`}>
                {pos.status}
              </span>
            </div>
            {pos.description && (
              <p className="px-5 py-4 text-sm text-gray-500 border-t border-gray-100">
                {pos.description}
              </p>
            )}
          </div>
        )}

        {/* ── stats grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<EyeIcon />}
            label="Total Visits"
            value={pos?.stats?.totalVisits}
            color="text-purple-500"
            bg="bg-purple-50"
            border="border-purple-100"
          />
          <StatCard
            icon={<StarOutlineIcon />}
            label="Average Rating"
            value={pos?.stats?.averageRating}
            color="text-green-500"
            bg="bg-green-50"
            border="border-green-100"
          />
          <StatCard
            icon={<ChatIcon />}
            label="Total Reviews"
            value={pos?.stats?.totalReviews}
            color="text-blue-500"
            bg="bg-blue-50"
            border="border-blue-100"
          />
          <StatCard
            icon={<TrophyIcon />}
            label="Points Used"
            value={pos?.stats?.pointsRedeemed}
            color="text-amber-500"
            bg="bg-amber-50"
            border="border-amber-100"
          />
        </div>

        {/* ── reviews section ── */}
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Visitors &amp; Reviews</h2>

          {reviews && reviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {reviews.map((item, index) => (
                <ReviewCard
                  key={item._id || index}
                  item={item}
                  onReply={handleShowModal}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm min-h-[200px] flex flex-col items-center justify-center text-center p-8">
              <ChatIcon />
              <p className="mt-3 text-gray-400 font-medium">No reviews yet</p>
              <p className="text-sm text-gray-300 mt-1">Reviews from your visitors will show up here</p>
            </div>
          )}
        </div>
      </div>

      {/* ── modal (unchanged) ── */}
      {isModalOpen && (
        <ReviewsReplies
          review={modalReview}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSend={handleUpdateReview}
        />
      )}
    </section>
  )
}