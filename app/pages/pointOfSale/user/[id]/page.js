'use client'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RightArrowIcon from '../../../../../public/svg/rightArrow';
import LikeIcon from '../../../../../public/svg/like';
import { useRouter } from 'next/navigation';
import StarIcon from '../../../../../public/svg/star';
import ZipCodeIcon from '../../../../../public/svg/zipCode';
import surprise_box from '../../../../../public/surprise_box.png';
import GiftIcon from '../../../../../public/svg/gift';
import WebsiteIcon from '../../../../../public/svg/website';
import PhoneIcon from '../../../../../public/svg/phone';
import ShareIcon from '../../../../../public/svg/share';
import ChevronDownIcon from '../../../../../public/svg/chevron-down';
import ClientsIcon from '../../../../../public/svg/clients';
import { AvatarGroup } from '@mui/material';
import Link from 'next/link';
import AddReview from '../../../../components/reviews/addReview';
import ThankYouModal from '../../../../components/modals/thankYou';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";



export default function PointOfSaleUserPage() {
    const { id } = useParams();
    const [pos, setPos] = useState();
    const router = useRouter();
    const [showRest, setShowRest] = useState(false);
    const [token, setToken] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [thankYouModal, setThanYouModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showHours, setShowHours] = useState(false);
    const now = new Date();
    const handleShowMOdal = (posId) => {
        setModalData(posId);
        setIsModalOpen(true);
    }
    const sit_url= "https://ecbi.app/pages/pointOfSale/user/${pos._id}"
    const handleShare = async () => {
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

    const getPos = async (next, req, res) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleById/${id}`,
                {
                    headers: { 'content-type': 'application/json' },
                    method: 'GET'
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((data) => setPos(data));
                    }
                })
        } catch (err) {
            next(err)
        }
    }

    const handleAddReview = async (data) => {
        console.log('we re here');
        console.log('data', data);

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/createReview`,{
                headers:{
                    'content-type':'application/json',
                    'Authorization': `Bearer ${token}`

                },
                method:'POST',
                body: JSON.stringify(
                    {
                    userId:data.userId, 
                    rating:data.rating, 
                    comment:data.comment,
                    pointOfSaleId:data.posId
                }
                ) 
                    
            }).then((res)=>{
                if(res.ok){
                    console.log('res review', res);
                   setThanYouModal(true);
                }
            })
        }catch(err){
            console.log('error', err);
        }
    }

    const handleCopy = ({ link, text }) => {
        console.log('link', link);
        try {
            navigator.clipboard.writeText(link);
            setCopied(text);

            setTimeout(() => setCopied(''), 2000)
        } catch (err) {
            console.log('error', err);
        }
    }

//     const timeToMinutes = (time) =>{
//     const [hourMinute, period] = time?.split(" ");

//     let [hours, minutes] = hourMinute?.split(":").map(Number);

//     if (period === "PM" && hours !== 12) hours += 12;
//     if (period === "AM" && hours === 12) hours = 0;

//     return hours * 60 + minutes;
// }
// const currentMinutes =
//     now.getHours() * 60 +
//     now.getMinutes();
// const open = timeToMinutes(pos?.hours?.monday?.open);
// const close = timeToMinutes(pos?.hours?.monday?.close);

// const isOpen =
//     currentMinutes >= open &&
//     currentMinutes < close;


    console.log('id', id)
    console.log('pos', pos);
    useEffect(()=>{
        const sessionData = JSON.parse(localStorage.getItem("sessionData")) || null;
        setToken(sessionData?.token);
    },[])
    useEffect(() => {
        getPos();
    }, [id])

    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-20">
            <div className="w-full  max-h-[300px] overflow-hidden rounded-b-lg">
                <div className="max-w-md mx-auto absolute flex items-center justify-between px-4 h-[100px]  w-full">
                    <button onClick={() => router.back()} >
                        <RightArrowIcon className="z-10 w-7 h-7 text-white rotate-180 stroke-2 cursor-pointer" />
                    </button>

                    <button>
                        <LikeIcon className="w-7 h-7 text-white cursor-pointer" />
                    </button>
                </div>
                <Image src={pos?.coverImage} alt="pos" width={500} height={200} className="object-cover aspect-square flex-grow" />
            </div>
                <motion.div
                        className="bg-white w-full h-full rounded-lg p-4 overflow-y-auto scrollbar-thin"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking modal content
                    >
                     <div className="rounded-t-[20px] bg-white p-4 flex flex-col items-start gap-3 w-full relative -top-10 ">
                <div className="flex  gap-4  px-3">
                    <div className="flex flex-col rounded-lg py-4 ">
                        <h1 className="font-bold text-black font-semibold text-xl">{pos?.name}</h1>
                        <p className="text-gray-400 ">{pos?.address?.city}</p>
                    </div>
                    <div className="flex flex-col rounded-lg py-4">
                        <p className="bg-green-200 px-3 py-2 rounded-full text-green-700 font-semibold">
                            {pos?.status}</p>
                    </div>

                </div>
                <div className="flex justify-between w-full px-3">
                    <p className="flex gap-2 items-center text-gray-700 font-bold">
                        <StarIcon className="w-4 h-4 text-yellow-500 " />
                        {pos?.stats?.averageRating}

                        <Link 
                        href={`/pages/reviews/user/${pos?._id}`}
                        className="text-purple-400 font-sans hover:underline hover:scale-110 transitoin-all duration-500 ease-in-out">
                            see reviews
                        </Link>
                    </p>
                    <p className="text-gray-500 font-semibold flex gap-2 items-center">
                        <ZipCodeIcon className="w-5 h-5 text-gray-400 " />
                        <span className="text-gray-400 font-sans flex justify-between items-center">
                            {pos?.address?.city} . {pos?.address?.country}

                        </span>

                    </p>

                </div>
                <div className="py-2 px-3 rounded-full bg-purple-100/40 flex justify-between items-center gap-2 w-full ">
                    <div className="bg-purple-100 rounded-full p-2 ">
                        <GiftIcon className="w-6 h-6 text-purple-800 stroke-2 " />

                    </div>
                    <h3 className="text-gray-700 font-semibold flex items-center text-sm">Earn points when you refer friends!!</h3>
                    <button className="cursor-pointer">
                        <RightArrowIcon className="w-6 h-6 text-purple-500 stroke-2 " />
                    </button>

                </div>

                <div className="flex justify-between w-full text-black px-3 py-2 shadow-lg rounded-lg bg-white">
                    <div className="flex flex-col items-center gap-2 ">
                        <button
                        className="cursor-pointer flex flex-col items-center gap-2 "
                            onClick={() => {
                                handleCopy({ link: pos?.website, text: "website" });
                            }}
                        >
                              <WebsiteIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                              {
                                copied === "website" ? (
                                    <span className="relative z-1000 text-gray-500 text-sm  rounded w-full text-center">
                                        Copied!
                                    </span>
                                )
                                    :
                                    
                                   <p className="text-gray-600 font-semibold flex items-center text-sm">Website</p>  
                              }
                        </button>
                      
                       
                    </div>
                    <div className="flex flex-col items-center gap-2 ">
                      
                        <button
                        className="cursor-pointer flex flex-col items-center gap-2 "
                            onClick={() => {
                                handleCopy({ link: pos?.phone, text: "telephone" });
                            }}
                        >
                              <PhoneIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                              {
                                copied === "telephone" ? (
                                    <span className="relative z-1000 text-gray-500 text-sm  rounded w-full text-center">
                                        Copied!
                                    </span>
                                )
                                    :
                                    
                                   <p className="text-gray-600 font-semibold flex items-center text-sm">Call</p>  
                              }
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-2 ">
                       
                       
                          <button
                        className="cursor-pointer flex flex-col items-center gap-2 "
                            onClick={() => {
                                handleCopy({ link: pos?.address.country + pos?.address.city + pos?.address.street, text: "directions" });
                            }}
                        >
                              <WebsiteIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                              {
                                copied === "directions" ? (
                                    <span className="relative z-1000 text-gray-500 text-sm  rounded w-full text-center">
                                        Copied!
                                    </span>
                                )
                                    :
                                    
                                   <p className="text-gray-600 font-semibold flex items-center text-sm">Directions</p>
                              }
                        </button>
                    </div>
                    <div className="flex flex-col items-center ">
                        <button onClick={handleShare} className="cursor-pointer flex flex-col items-center gap-2 ">
                             <ShareIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                        <p className="text-gray-600 font-semibold flex items-center text-sm">Share</p>
                        </button>
                       
                    </div>
                </div>

                <div className="px-3 py-2 border-b-2 border-gray-100">
                    <h4 className="font-bold text-xl text-black font-semibold ">About</h4>
                    <p className={`text-gray-600 font-semibold transition-all duration-500 ease-in-out ${showRest === false && "line-clamp-3"}`}>
                        Atlas Grill offers the best grilled dishes made from fresh ingredients and tradinional Moroccan spices.
                        Atlas Grill offers the best grilled dishes made from fresh ingredients and tradinional Moroccan spices.
                        Atlas Grill offers the best grilled dishes made from fresh ingredients and tradinional Moroccan spices.
                        {pos?.description}

                    </p>
                    <button
                        onClick={() => setShowRest(prev => !prev)}
                        className="text-purple-600 font-semibold text-sm cursor-pointer">{
                            showRest ? "Read Less" : "Read More"
                        }</button>
                </div>

                <div className="px-3 py-2 border-b-2 border-gray-100 w-full">
                    <h4 className="font-bold text-gray-700 ">Opening Hours</h4>
                    <div className="flex justify-between items-center gap-4 py-3">
                    <button onClick={() => setShowHours(!showHours)} 
                    className="w-full flex justify-between items-center py-2 cursor-pointer" > 
                   
                       <div><p className="font-semibold text-gray-800"> Monday - Sunday </p>
                        
                        </div> 
                          <div className="flex gap-3"><p className={pos?.hours?.monday?.closed === false ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
    {pos?.hours?.monday?.closed === false ? "● Open Now" : "● Closed"}
</p><ChevronDownIcon className={`w-5 h-5 stroke-2 text-gray-600 transition-transform duration-300 ${ showHours ? "rotate-180" : "" }`} /> 
                            </div> 
                     
                  </button>
               

                    </div>
                       <div
        className={`overflow-hidden transition-all duration-300 ${
            showHours ? "max-h-96 pt-3" : "max-h-0"
        }`}
    >
        
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Moday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div>
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Tuesday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div>
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Wednesday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div>

<div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Thursday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div> 
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Friday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div> 
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Saturday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div>           
            <div
                
                className="flex justify-between py-2 text-sm border-t border-gray-100 font-semibold text-gray-800"
            >
                <span className="text-gray-700">Sunday</span>

                <span
                    className={
                        pos?.hours?.monday?.closed === true
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                    }
                >
                    <span>{pos?.hours?.monday?.open} - {pos?.hours?.monday?.close}</span>
                </span>
            </div>
       
    </div>

                </div>

                <div className="px-3 py-2 border-b-2 border-gray-100 w-full">
                    <h4 className="font-semibold text-gray-700 text-xl">Stats</h4>
                    <div className="flex justify-between items-center gap-2 py-3 w-full">
                        <div className="flex flex-col items-center gap-2 px-5 py-3 shadow-lg rounded-lg w-1/3">
                            <ClientsIcon className="w-7 h-7 text-purple-500 stroke-2 " />
                            <p className="font-bold " style={{ 'fontSize': '20px' }}> {pos?.stats?.totalVisits}</p>
                            <p className="font-semibold text-gray-600 flex items-center justify-center w-full min-h-[25px] align-center items-center">Total Visits</p>
                        </div>
                        <div className="flex flex-col items-center gap-2  px-3 py-2 shadow-lg rounded-lg w-1/3 ">
                            <StarIcon className="w-7 h-7 text-yellow-500 " />
                            <p className="font-bold " style={{ 'fontSize': '20px' }}> {pos?.stats?.averageRating}</p>
                            <p className="font-semibold text-gray-600 flex items-center justify-center w-full min-h-[25px] text-center">Avg. Rating</p>
                        </div>
                        <div className="flex flex-col items-center gap-2  px-3 py-2 shadow-lg rounded-lg w-1/3">
                            <GiftIcon className="w-7 h-7 text-green-500 stroke-2" />
                            <p className="font-bold " style={{ 'fontSize': '20px' }}> {pos?.stats?.pointsRedeemed}</p>
                            <p className="font-semibold text-gray-600 flex items-center justify-center w-full min-h-[25px] items-center text-center">Points Redeemed</p>

                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <button 
                   onClick={()=>handleShowMOdal(id)}
                    className="bg-purple-600 rounded-lg w-full flex items-center justify-center text-white font-semibold py-3 cursor-pointer">Leave Review</button>
                </div>
            </div>    
                    </motion.div>
           
            <AnimatePresence>
               {
                isModalOpen &&
                <AddReview
                    data={modalData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSend={(data)=>handleAddReview(data)}
                />
            }   
            </AnimatePresence>
          <AnimatePresence>
              {
                thankYouModal &&
                <ThankYouModal id={id}
                onClose={()=>{
                    setThanYouModal(false)
                    setIsModalOpen(false)
                }}


                    // onSend={()=>setThankYouModal(false)}
                />
            }
          </AnimatePresence>
          
        </section>
    )
}