'use client';
import { useEffect, useState } from "react";
import ReviewsData from "../../../../data/data";
import Image from "next/image";
import next from "next";
import ReviewsReplies from "../../../components/modals/reviewsReplies";
import ReplyIcon from "../../../../public/svg/reply";
import StarIcon from "../../../../public/svg/star";

export default function OwnerReviews() {
    const [reviews, setReviews] = useState();
    const [pointsOfSaleByOwner, setPointsOfSaleByOwner] = useState();
    const [searchText, setSearchText] = useState("");
    const [filterByRestaurant, setFilterByRestaurant] = useState("");
    const [filterByRating, setFilterByRating] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalReview, setModalReview] = useState();
    const [reply, setReply] = useState("");
    const sessionData = JSON.parse(localStorage?.getItem("sessionData"));
    const userOwnerId = sessionData?.userId;
    const businessName = sessionData?.businessName;
    // console.log(ReviewsData);

    const handleGetPointsOfSale = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleByOwnerId/${userOwnerId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization': `Bearer ${sessionData.token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {

                    return res.json();
                }


            })
            setPointsOfSaleByOwner(res);
        } catch (err) {
            next(err)
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
                    return res.json();
                }
            })
            setReviews(res.getReviews);

        } catch (err) {
            console.log(err);
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
                    handleGetAllReviews();
                    return res.json();
                }
            })
            console.log('res', res);

        }catch(err){
            next(err)
        }
    }
    console.log('is modal open', isModalOpen);
    const calculateStars = (rating) =>{
        console.log('rating', rating);
        let stars = [];
        for (let i=0; i < rating; i++){
             stars.push(<StarIcon className={'w-5 h-5 text-yellow-500 fill-current'}/>)
                
           
        }
          return stars;
    }

    useEffect(() => {
        handleGetAllReviews()
        handleGetPointsOfSale()
    }, [])
    console.log('reviewww fetched', reviews);
    console.log('poitns of sale', pointsOfSaleByOwner);

    return (

        <section className="mt-4 mx-auto max-w-4xl p-4 text-gray-700  w-full">
            {/* first part */}
            <div className="p-4 text-md flex justify-between items-center w-full">
                <div>
                    <h1 className="font-bold text-md text-2xl text-black">Customer Reviews
                    </h1>
                    <p className="text-sm">Manage and respond to customer feedback</p>
                </div>
                {/* <div>
                    <button className="rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500">Add Restaurant </button>
                </div> */}

            </div>

            {/* filter and search section */}
            <div className="rounded-lg shadow-lg p-4 flex flex-col gap-3">
                {/* search bar */}
                <div className="flex gap-3">

                    <input type="text" className="w-full rounded-full border-2 border-gray-200 px-6 py-2 text-sm text-gray-700 " placeholder="Search for a restaurant..."
                        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>


                {/* filter by restaurant name */}
                <div className="flex gap-3">

                    <select onChange={(e) => setFilterByRestaurant(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 "

                    >
                        <option value="">All Restaurants</option>
                        {pointsOfSaleByOwner && pointsOfSaleByOwner?.length > 0 && pointsOfSaleByOwner
                            ?.map((restaurant, index) => {
                                return (
                                    <option value={restaurant.id} key={index}>{restaurant.name}</option>
                                )
                            })
                        }



                    </select>
                </div>
                {/* filter by rating stars */}
                <div className="flex gap-3">

                    <select onChange={(e) => setFilterByRating(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 "

                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Stars</option>
                    </select>
                </div>

            </div>

            {/* list of reviews */}
            <div className="shadow-lg rounded-lg p-4 mt-3">

                {
                    reviews && reviews?.length > 0 &&



                    reviews
                        ?.filter(item => {
                            if (searchText) {
                                return item.pointOfSaleId.name.toLowerCase().includes(searchText.toLowerCase())
                            }
                            else if (filterByRestaurant) {
                                return item.pointOfSaleId.name.toLowerCase().includes(filterByRestaurant.toLowerCase())
                            }
                            else if (filterByRating) {
                                return item.rating === parseInt(filterByRating)
                            }
                            else {
                                return true;
                            }
                        }
                        )
                        .filter((element) => element.pointOfSaleId.ownerId === userOwnerId)
                        ?.map((review, index) => {

                            return (
                                <div key={index} className="flex flex-col items-center w-full mb-5 border-b border-gray-100">
                                    <div className="flex justify-between w-full items-center">
                                        <div className="flex justify-around gap-2 w-fit">
                                            <div className="w-fit  flex justify-center items-center">
                                                <Image src={review.userId.avatar} alt="restaurant" width={50} height={50} className="rounded-full" />
                                            </div>

                                            <div className=" flex flex-col">
                                                <p className="font-semibold" style={{
                                                    'font-size': "14px"
                                                }}>{review.userId.username}</p>
                                                <p style={{
                                                    'font-size': "12px"
                                                }}>{review?.pointOfSaleId?.name}</p>
                                                <span className="text-gray-400" style={{
                                                    'font-size': "12px"
                                                }}>
                                                    {review.visitedAt.replace('T', ' ').split(' ')[0].toString()}</span>

                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span style={{
                                                'font-size': "12px"
                                            }}>

                                                {review.rating && <span className="text-green-500 flex">
                                                    {calculateStars(review.rating)}
                                                   
                                                    </span>}
                                               
                                            </span>
                                            <span style={{
                                                'font-size': "12px"
                                            }} className="text-green-600">
                                                +{review?.pointsEarned ? review.pointsEarned : 0} points earned
                                            </span>
                                        </div>


                                    </div>
                                    <div className="flex flex-col items-end w-full">
                                        <p className="mb-3 py-3 w-full">{review.comment}</p>
                                        {
                                            !review.ownerReply ?
                                                <div className="w-full py-2">
                                                    <button className="text-sm rounded-lg px-3 py-2 bg-blue-500 text-white font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-500 flex gap-2 items-center text-nowrap"
                                                        onClick={() => handleShowMOdal({
                                                            review: {
                                                                id: review._id,
                                                                comment: review.comment,
                                                                rating: review.rating,
                                                                userName: review.userId.username,
                                                                userAvatar: review.userId.avatar

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
                                                        {review.ownerReply}
                                                    </p>
                                                </div>

                                        }

                                    </div>
                                </div>
                            )
                        })
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