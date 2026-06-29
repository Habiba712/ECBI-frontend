'use client'

import Image from "next/image"
import EditIcon from "../../../../public/svg/edit"
import QRCodeIcon from "../../../../public/svg/qrCode"
import ViewIcon from "../../../../public/svg/view"
import { useEffect, useState } from "react"
import QRCodeModal from "../../../components/modals/qrCode"
import EditPointOfSaleModal from "../../../components/modals/editPoinOfSale"
import AddtPointOfSaleModal from "../../../components/modals/addPointOfSaleModal"
import PhoneIcon from "../../../../public/svg/phone"
import ZipCodeIcon from "../../../../public/svg/zipCode"
import WebsiteIcon from "../../../../public/svg/website"
import StarIcon from "../../../../public/svg/star"
import { redirect } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import SearchIcon from "../../../../public/svg/search"
import FilterIcon from "../../../../public/svg/filter"
import GridIcon from "../../../../public/svg/grid"
import ListIcon from "../../../../public/svg/list"
import DotsIcon from "../../../../public/svg/dots"
import TrendUpIcon from "../../../../public/svg/trenUp"
import PlusIcon from "../../../../public/svg/plus"
import EyeIcon from "../../../../public/svg/eye"
import StarOutlineIcon from "../../../../public/svg/startLine"
import ChatBubbleIcon from "../../../../public/svg/chat"
import TrophyIcon from "../../../../public/svg/trophy"
import ShareIcon from "../../../../public/svg/share"
import zipCodeIcon from "../../../../public/svg/zipCode"
import websiteIcon from "../../../../public/svg/website"
import GalleryIcon from "../../../../public/svg/gallery"


const handleShareButton = async (pos) => {
    const sit_url= `https://ecbi.vercel.app/pages/pointOfSale/owner/${pos._id}`
  const shareData = {
    title: pos.name,
    text: `Check out ${pos.name}! 👀 `,
    url: sit_url,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(sit_url);
      toast.success("Link copied!");
    }
  } catch (err) {
    console.log(err);
  }
};
 


const RestaurantIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
)

 function StatsBar({ points }) {
  if (!points || points.length === 0) return null
  const totalVisits = points.reduce((s, p) => s + (p?.stats?.totalVisits || 0), 0)
 const avgRating = points?.length
  ? Math.max(...points.map(p => p?.stats?.averageRating || 0)).toFixed(1)
  : "0.0";
  const totalReviews = points.reduce((s, p) => s + (p?.stats?.totalReviews || 0), 0)

  const pointsEarned = points.reduce((s, p) => s + (p?.stats?.pointsRedeemed || 0), 0)
  const stats = [
    {
      label: "Total Visits",
      value: totalVisits,
      growth: "+18%",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
      icon: <EyeIcon />,
    },
    {
      label: "Average Rating",
      value: avgRating,
      growth: "+5%",
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      icon: <StarOutlineIcon />,
    },
    {
      label: "Total Reviews",
      value: totalReviews,
      growth: "+14%",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: <ChatBubbleIcon />,
    },
    {
      label: "Points Earned",
      value: pointsEarned,
      growth: "+12%",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: <TrophyIcon />,
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} ${s.border} border rounded-2xl px-5 py-4 flex items-center gap-4`}
        >
          <span className={`${s.color} opacity-70`}>{s.icon}</span>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-green-500 flex items-center gap-0.5 font-medium">
                ↑ {s.growth}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">from last 30 days</p>
          </div>
        </div>
      ))}
    </div>
  )
}

 
function PosCard({ item, onEdit, onQR, onView, 
    onShare }) {
  const isActive = item?.status === "active"

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="flex gap-0">
        {/* image */}
        <div className="relative w-[340px] flex-shrink-0">
          <img
            src={item?.coverImage}
            alt={item?.name}
            className="w-full h-[220px] object-cover"
          />
          {/* active badge on image */}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
              isActive
                ? "bg-green-500 text-white"
                : "bg-red-400 text-white"
            }`}
          >
            {isActive ? "Active" : item?.status}
          </span>
          {/* gallery button */}
          <button className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-gray-400 text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow 
          disabled
          ">
            <GalleryIcon className="w-4 h-4" />
            View Gallery
          </button>
          <p className="absolute bottom-3 left-3 text-white text-xs font-medium drop-shadow">
            Added on {item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
              : ""}
          </p>
        </div>

        {/* info */}
        <div className="flex-1 px-6 py-4 flex flex-col justify-between">
          <div>
            {/* name + status + dots */}
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">{item?.name}</h2>
              <div className="flex items-center gap-2">
                {/* <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    isActive
                      ? "border-green-400 text-green-500"
                      : "border-red-300 text-red-400"
                  }`}
                >
                  {isActive ? "Active" : item?.status}
                </span> */}
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <DotsIcon />
                </button>
              </div>
            </div>

            {/* meta */}
            <div className="flex flex-col gap-1.5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <ZipCodeIcon className="w-4 h-4" />
                {[item?.address?.city, item?.address?.country].filter(Boolean).join(", ")}
              </span>
              <span className="flex items-center gap-2">
                <PhoneIcon  className="w-4 h-4" />
                {item?.phone}
              </span>
              <a
                // href={item?.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 "
              >
                <WebsiteIcon className="w-4 h-4" />
                {item?.website}
              </a>
              <span className="flex items-center gap-2">
                <StarIcon  className="w-4 h-4 " />
                Specialises in {item?.cuisine} cuisine
              </span>
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-purple-50 rounded-xl py-2 text-center">
              <p className="text-lg font-bold text-purple-500">{item?.stats?.totalVisits ?? 0}</p>
              <p className="text-xs text-gray-400">Total Visits</p>
            </div>
            <div className="bg-green-50 rounded-xl py-2 text-center">
              <p className="text-lg font-bold text-green-500">{item?.stats?.averageRating ?? 0}</p>
              <p className="text-xs text-gray-400">Average Rating</p>
            </div>
            <div className="bg-blue-50 rounded-xl py-2 text-center">
              <p className="text-lg font-bold text-blue-500">{item?.stats?.totalReviews ?? 0}</p>
              <p className="text-xs text-gray-400">Reviews</p>
            </div>
          </div>

          {/* action buttons */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            <button
              onClick={() => onEdit(item)}
              className="flex items-center justify-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-500 text-sm font-medium py-2 px-3 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button
              onClick={() => onQR(item)}
              className="flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-500 text-sm font-medium py-2 px-3 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <path d="M14 14h.01M14 17h.01M17 14h.01M17 17h.01M20 14h.01M20 17h.01M20 20h.01"/>
              </svg>
              QR Code
            </button>
            <button
              onClick={() => onView(item?._id)}
              className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-500 text-sm font-medium py-2 px-3 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View
            </button>
            <button
              onClick={() => onShare && onShare(item)}
              className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-sm font-medium py-2 px-3 rounded-xl transition-colors cursor-pointer cursor-pointer"
            >
              <ShareIcon  className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function PointOfSale() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [modalEditData, setModalEditData] = useState()
  const [modalData, setModalData] = useState([])
  const [modalAddData, setModalAddData] = useState()
  const [userOwnerId, setUserOwnerId] = useState()
  const [pointsOfSaleByOwner, setPointsOfSaleByOwner] = useState()
  const [search, setSearch] = useState("")
  const [token, setToken] = useState("");
  const [totalVisits, setTotalVisits] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [pointsRedeemed, setPointsRedeemed] = useState(0);
  const [userId, setUserId] = useState();

  const getPoSsByOwnerId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userId}`,
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: "GET" }
      );
      if (!res.ok) return;
      const data = await res.json();
      console.log('data', data);

      // setPossByOwner(data?.map(pos => pos._id));
      // setAvgRatingData(data.map((pos, i) => ({
      //   name: pos?.name || `POS ${i + 1}`,
      //   value: pos?.stats?.averageRating ?? 0,
      // })));
      setPointsRedeemed(data?.reduce((acc, curr) => acc + curr?.stats?.pointsRedeemed, 0));
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowModal = (data) => {
    setModalData(data)
    setIsModalOpen(true)
  }
  const handleShowEditModal = (data) => {
    setIsEditModalOpen(true)
    setModalEditData(data)
  }
  const handleEditPointOfSale = async (updatedData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/updatePointOfSale/${updatedData.id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify(updatedData),
        }
      )
      if (res.ok) {
        setIsEditModalOpen(false)
        getPointsOfSaleByOwnerId()
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleAddPointOfSale = async (data) => {
    const formData = new FormData()
    formData.append("ownerId", data.ownerId)
    formData.append("name", data.name)
    formData.append("address", JSON.stringify(data.address))
    formData.append("phone", data.phone)
    formData.append("cuisine", data.cuisine)
    formData.append("image", data.coverImage)
    formData.append("description", data.description)
    formData.append("status", data.status)
    formData.append("website", data.website)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/addPointOfSale`,
        { method: "POST", body: formData }
      )
      if (res.ok) {
        setIsAddModalOpen(false)
        getPointsOfSaleByOwnerId()
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleShowAddModal = () => {
    setIsAddModalOpen(true)
    setModalAddData(userOwnerId)
  }
  const handleDownloadQRCode = async (e) => {
    e.preventDefault()
  }
  const getPointsOfSaleByOwnerId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${
          userId
        }`,
        { headers: { "Content-Type": "application/json" }, method: "GET" }
      )
      if (res.ok) {
        const data = await res.json()
        setPointsOfSaleByOwner(data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("sessionData")) || null
    setUserOwnerId(session?.userId)
    setUserId(session?.userId)
    setToken(session?.token)

  }, [])

  useEffect(() => {
    if (userOwnerId) 
      {
        getPointsOfSaleByOwnerId()
     getPoSsByOwnerId()
      }
  }, [userOwnerId])

 

  const filtered = pointsOfSaleByOwner?.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className=" px-4 py-6 w-full">
      <div className="w-full">

        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Points of Sale</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your restaurant listings</p>
          </div>
          <div className="flex items-center gap-3">
            {/* search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-4 h-4" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurant..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 w-52"
              />
            </div>
            {/* filter */}
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-500 text-sm px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              <FilterIcon />
              Filter
            </button>
            {/* view toggles */}
            {/* <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button className="px-3 py-2 bg-purple-50 text-purple-500">
                <GridIcon />
              </button>
              <button className="px-3 py-2 text-gray-400 hover:bg-gray-50">
                <ListIcon />
              </button>
            </div> */}
            {/* add */}
            <button
              onClick={handleShowAddModal}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <PlusIcon />
              Add Restaurant
            </button>
          </div>
        </div>

   
        <StatsBar points={pointsOfSaleByOwner} />

      
        {filtered && filtered.length > 0 ? (
          <>
            {filtered.map((item, index) => (
              <PosCard
                key={item?._id || index}
                item={item}
                onEdit={handleShowEditModal}
                onQR={handleShowModal}
                onView={(id) => redirect(`/pages/pointOfSale/owner/${id}`)}
                onShare={() => handleShareButton(item)}
              />
            ))}

             
            <div className="mt-4 bg-purple-50 border border-purple-100 rounded-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-purple-500">
                  <RestaurantIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-purple-700">Adding more restaurants?</p>
                  <p className="text-xs text-purple-400">You can add unlimited points of sale and manage them all in one place.</p>
                </div>
              </div>
              <button
                onClick={handleShowAddModal}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                Add Another Restaurant
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-300 mb-4 flex justify-center">
              <RestaurantIcon />
            </div>
            <h2 className="text-gray-400 font-medium">No restaurants yet</h2>
            <p className="text-sm text-gray-300 mt-1">Create a new point of sale to get started</p>
            <button
              onClick={handleShowAddModal}
              className="mt-4 bg-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add Restaurant
            </button>
          </div>
        )}
      </div>

      {/* ── modals (unchanged) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <QRCodeModal
            data={modalData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onSend={handleDownloadQRCode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditModalOpen && (
          <EditPointOfSaleModal
            data={modalEditData}
            setIsModalOpen={setIsEditModalOpen}
            onSend={handleEditPointOfSale}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddModalOpen && (
          <AddtPointOfSaleModal
            data={modalAddData}
            setIsModalOpen={setIsAddModalOpen}
            onSend={handleAddPointOfSale}
          />
        )}
      </AnimatePresence>
    </section>
  )
}