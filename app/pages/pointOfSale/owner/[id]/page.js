'use client'

import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MessageReviewIcon from "../../../../../public/svg/messageReview";
import StarIcon from "../../../../../public/svg/star";
import ClientsIcon from "../../../../../public/svg/clients";
import AwardIcon from "../../../../../public/svg/award";
import Image from "next/image";
import BackIcon from "../../../../../public/svg/back";
import ReplyIcon from "../../../../../public/svg/reply";
import ReviewsReplies from "../../../../components/modals/reviewsReplies";


export default function PointOfSale() {
    const { id } = useParams();


    console.log('id', id)
    const [pointsOfSaleById, setPointsOfSaleById] = useState();
    const [reviews, setReviews] = useState();
     const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalReview, setModalReview] = useState();
    const getPointsOfSaleById = async (next, req, res) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleById/${id}`

            ).then((res) => {
                if (res.ok) {

                    console.log('res', res);
                    return res.json();
                }
                setPointsOfSaleById(res.json());


            })
            setPointsOfSaleById(res);
        } catch (err) {
            next(err)
        }
    }
    const getReviewsByPointOfSaleId = async (next, req, res) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getReviewsByPointOfSaleId/${id}`,

            ).then((res) => {
                if (res.ok) {

                    console.log('res', res);
                    return res.json();
                }
          


            })
            setReviews(res.reviews);
        } catch (err) {
            next(err)
        }
    }
     const handleShowMOdal = (review) => {
        setModalReview(review);
        setIsModalOpen(true);
    }

    const hundleUpdateReview = async (reply)=>{
        console.log('reply', reply);
        try{
            const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/updateReviews/${reply.reply.reviewId}`,{
                headers:{'content-type':'application/json'},
                method:'PUT',
                body: JSON.stringify({ownerReply:reply.reply.replyText})
            }).then((res)=>{
                if(res.ok){
                    getReviewsByPointOfSaleId();
                    return res.json();
                }
            })
            console.log('res', res);

        }catch(err){
            next(err)
        }
    }
    const calculateStars = (rating) =>{
            console.log('rating', rating);
            let stars = [];
            for (let i=0; i < rating; i++){
                 stars.push(<StarIcon className={'w-5 h-5 text-yellow-500 fill-current'}/>)
                    
               
            }
              return stars;
        }
    
    useEffect(() => {
        getPointsOfSaleById();
        getReviewsByPointOfSaleId();
    }, [])
    console.log('points of sale by id', pointsOfSaleById);
    console.log('reviews', reviews);
    return (
        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-500  w-full "
        key={pointsOfSaleById?.id}
        >
            <div className="p-4  text-md flex flex-col  items-center w-full">
                <div className="flex justify-between items-center w-full">
                    <button className="cursor-pointer flex gap-2 items-center "
                        onClick={() => redirect(`/pages/pointOfSale/owner`)}

                    >
                        <BackIcon className="hover:scale-110 transition-all ease-in-out duration-500 w-5 h-5 text-gray-400" />
                        Back to my points of sale</button>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                {/* first part */}
                <div className="flex flex-col gap-3 p-4">

                    <div className="w-2/3 h-2/3">
                        <Image src={pointsOfSaleById?.coverImage} alt="restaurant" width={500} height={500} className="rounded-lg h-fit w-full object-cover flex-grow" />
                    </div>
                    <h1 className="font-bold text-2xl text-black">{pointsOfSaleById?.name}</h1>
                    <p>
                        {pointsOfSaleById?.description}
                    </p>
                </div>

                {/* //some overviews */}
                <div className="flex flex-col gap-3 p-4 text-sm " >
                    <div className="grid grid-cols-2 gap-3 w-full ">

                        <div className="p-4 shadow-lg rounded-lg bg-purple-100">
                            <div className="flex justify-between w-full">



                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <span className="text-3xl font-semibold text-purple-700 
                                             ">{pointsOfSaleById?.stats.totalVisits}</span>
                                <span style={{
                                    'fontSize': '12px'
                                }} className="text-gray-700 text-sm ">Total Visits</span>
                            </div>



                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-green-100">
                            <div className="flex justify-between w-full">



                            </div>

                            <div className="flex flex-col justify-center items-center ">
                                <span className="font-semibold text-3xl text-green-700 
                                             ">{pointsOfSaleById?.stats.averageRating}</span>
                                <span
                                    style={{
                                        'fontSize': '12px'
                                    }}
                                    className="text-gray-700 text-sm ">Average Rating</span>
                            </div>



                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="p-4 shadow-lg rounded-lg bg-blue-100 ">
                            <div className="flex justify-between w-full">



                            </div>

                            <div className="flex flex-col justify-center items-center ">
                                <span className="font-semibold text-blue-700 
                                             text-3xl">{pointsOfSaleById?.stats.totalReviews}</span>
                                <span style={{
                                    'fontSize': '12px'
                                }} className="text-gray-700 text-sm ">Total Reviews</span>
                            </div>



                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-red-100">
                            <div className="flex justify-between w-full">



                            </div>

                            <div className="flex flex-col justify-center items-center ">
                                <span className="font-semibold text-3xl text-red-700 
                                             ">{pointsOfSaleById?.stats?.pointsRedeemed}</span>
                                <span style={{
                                    'fontSize': '12px'
                                }} className="text-gray-700 text-sm">Points Used</span>
                            </div>



                        </div>
                    </div>

                </div>

                




            </div>{/* recent reviews and visits */}
            <div className="shadow-lg rounded-lg p-4 mt-4">
                <div className="p-4">
                    <h3 className="font-bold text-black text-gray-700">Recents Visitors & Reviews</h3>
                    
                </div>
                {
                    reviews && reviews?.length > 0 ?
                    reviews?.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col items-center w-full mb-5 border border-gray-200 rounded-lg p-2 ">
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex justify-around gap-2 w-fit">
                                        <div className="w-fit  flex justify-center items-center">
                                            <Image src={item?.userId?.avatar} alt="restaurant" width={50} height={50} className="rounded-full" />
                                        </div>

                                        <div className=" flex flex-col">
                                            <p className="font-semibold" style={{
                                                'font-size': "14px"
                                            }}>{item.userId.username}</p>
                                            <p style={{
                                                'font-size': "12px"
                                            }}>{item?.pointOfSaleId?.name}</p>
                                            <span className="text-gray-400" style={{
                                                'font-size': "12px"
                                            }}>
                                                {item.visitedAt.replace('T', ' ').split(' ')[0].toString()}</span>

                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span style={{
                                            'font-size': "12px"
                                        }}>

                                            {item.rating && <span className="text-green-500 flex">
                                                {calculateStars(item.rating)}

                                            </span>}

                                        </span>
                                        <span style={{
                                            'font-size': "12px"
                                        }} className="text-green-600">
                                            +{item?.pointsEarned ? item.pointsEarned : 0} points earned
                                        </span>
                                    </div>


                                </div>
                                <div className="flex flex-col items-end w-full">
                                    <p className="mb-3 py-3 w-full">{item.comment}</p>
                                    {
                                        !item.ownerReply ?
                                            <div className="w-full py-2">
                                                <button className="text-sm rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500 flex gap-2 items-center text-nowrap"
                                                    onClick={() => handleShowMOdal({
                                                        item: {
                                                            id: item._id,
                                                            comment: item.comment,
                                                            rating: item.rating,
                                                            userName: item.userId.username,
                                                            userAvatar: item.userId.avatar

                                                        }
                                                    })}
                                                >
                                                    <ReplyIcon className="w-5 h-5 text-gray-400" />
                                                    <span>Reply to Review</span>
                                                </button>
                                            </div>

                                            :
                                            <div className="w-full py-2">
                                                <p style={{
                                                    'font-size': "12px"
                                                }} className="w-full p-4 border-l-3 border-blue-400 bg-blue-100 rounded-lg">
                                                    {item.ownerReply}
                                                </p>
                                            </div>

                                    }

                                </div>
                            </div>
                        )
                    })
                    : 
                    <div className="min-h-[200px] p-6 flex justify-center items-center">
                        <p 
                        style={{
                            'fontSize':'15px'
                        }}
                        className="text-gray-400">No reviews yet !!</p>
                        </div>
                }
            </div>
             {isModalOpen &&
                            <ReviewsReplies
                                review={modalReview}
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                onSend={hundleUpdateReview}
                            />}
        </section>
    )
}