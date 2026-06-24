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


export default function PointOfSaleUserPage() {
    const { id } = useParams();
    const [pos, setPos] = useState();
    const router = useRouter();
    const [showRest, setShowRest] = useState(false);
    const [token, setToken] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [thankYouModal, setThanYouModal] = useState(false);
    const handleShowMOdal = (posId) => {
        setModalData(posId);
        setIsModalOpen(true);
    }

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

            <div className="rounded-t-[20px] bg-white p-4 flex flex-col items-start gap-3 w-full relative -top-10">
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
                        <WebsiteIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                        <p className="text-gray-600 font-semibold flex items-center text-sm">Website</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 ">
                        <PhoneIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                        <p className="text-gray-600 font-semibold flex items-center text-sm">Call</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 ">
                        <WebsiteIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                        <p className="text-gray-600 font-semibold flex items-center text-sm">Directions</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 ">
                        <ShareIcon className="w-6 h-6 text-gray-600 stroke-2 " />
                        <p className="text-gray-600 font-semibold flex items-center text-sm">Share</p>
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
                        <p className="text-gray-800 font-semibold">Moday - Sunday</p>
                        <p className="text-green-500 flex items-center gap-2">10:00 AM - 8:00 PM

                            <ChevronDownIcon className="w-4 h-4 text-gray-800 stroke-2 " />
                        </p>
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
            {
                isModalOpen &&
                <AddReview
                    data={modalData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSend={(data)=>handleAddReview(data)}
                />
            }
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
        </section>
    )
}