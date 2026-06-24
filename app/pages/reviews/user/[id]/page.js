
'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import ChevronDownIcon from "../../../../../public/svg/chevron-down";
import AllReviews from "../../../../components/reviews/allReviews";
import MyReviews from "../../../../components/reviews/myReviews"

export default function UserReviews() {

  const { id } = useParams();
  console.log('id', id);
  const [tab, setTab] = useState("myReviews")
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const [pos, setPos] = useState();

  const getPos = async (next, req, res) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pointOfSale/getPointsOfSaleById/${id}`,
        {
          headers: {
            'content-type': 'application/json',

            'Authorization': `Bearer ${token}`
          },
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


  const getAllReviewsByPosId = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/getReviewsByPointOfSaleId/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: "GET"
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log('data', data);
            setReviews(data.reviews);
            // setIsLoading(false);
          })
        }
      })
    } catch (err) {
      console.log('error', err);
    }
  }


  console.log('id', id)
  console.log('pos', pos);
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData")) || null;
    setToken(sessionData?.token);
    // setIsLoading(false);
  }, [id])
  useEffect(() => {
    getPos();
    getAllReviewsByPosId();
  }, [token])

  return (
    <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-20">

      <div className="w-full flex py-4 items-center">
        <button
          onClick={() => router.back()}
          className="py-3 cursor-pointer"><ChevronDownIcon className="w-6 h-6 text-black stroke-2 rotate-90" /></button>

        <h2 className="w-full text-center text-xl font-semibold">Reviews</h2>
      </div>
      <div>
        {/* reviews progressbar */}
      </div>

      <div className="w-full">
        <div className="w-full flex justify-center transition duration-300 ease-in-out">
          <button className={` w-full py-4 font-semibold flex flex-col gap-4 cursor-pointer transition duration-300 ease-in-out ${tab === "myReviews" ? "text-gray-400" : "text-purple-600"} `}
            onClick={() => setTab("allReviews")}

          >
            All Reviews
            <span className={`${tab === "allReviews" ? "border-b-2 border-purple-500  w-full" : "border-b-2 border-gray-200"} transition duration-300 ease-in-out`}></span>
          </button>
          <button className={`${tab === "allReviews" ? "text-gray-400" : "text-purple-600"} w-full py-4 font-semibold flex flex-col gap-4 cursor-pointer transition duration-300 ease-in-out`}
            onClick={() => setTab("myReviews")}

          >

            My Reviews
            <span className={`${tab === "myReviews" ? "border-b-2 border-purple-500  w-full" : "border-b-2 border-gray-200"} transition duration-300 ease-in-out`}></span>
          </button>
        </div>
      </div>

      {
        tab === "allReviews" ?
          <AllReviews posId={id} reviews={reviews} />
          :
          <MyReviews posId={id} reviews={reviews} />
      }
    </section>
  )
}