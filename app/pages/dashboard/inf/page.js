'use client'

import SearchIcon from "../../../../public/svg/search"
import { useState, useEffect } from "react";
import AddPost from "../../../components/modals/addPost";
import Image from "next/image";
import LightIcon from "../../../../public/svg/light";
import LikeIcon from "../../../../public/svg/like";
import CommentIcon from "../../../../public/svg/comment";
import ShareIcon from "../../../../public/svg/share";
export default function PointOfSale() {

const [postsList, setPostsList] = useState([])


const getAllPosts = async() =>{

    try{

        const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/getAllPosts`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            method: "GET"
        }).then((res)=>{
            if(res.ok){
               res.json().then((data)=>{
                setPostsList(data);
                console.log('data', data);
               })
               
            }
        })
    }catch(err)
{
        console.log('error', err);
}}
useEffect(()=>{
    getAllPosts();
},[])

console.log('posts list', postsList);

const handleClick = ()=>{
setIsModalOpen(true);
}
    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   overflow-scroll w-full"

        >
              <div className="inf-dash-top fixed top-0 max-w-md mx-auto w-full ">
                <div>
                     <h1 className="font-semibold text-2xl font-sans
                 ">ECBI Feed</h1>
                <p className="">Discover what's happening at local spots.</p>
                </div>
                <div>
                    <SearchIcon className="w-6 h-6 text-white cursor-pointer"/>
                </div>
               
            </div>
            <div className="mt-20">
                {/* <button 
                onClick={()=>handleClick()}
                className="rounded-full bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 cursor-pointer text-white font-semibold hover:scale-110 transition-all duration-500 ease-in-out">
                    Create New Post
                </button> */}
                {
                    postsList?.length > 0 && postsList.map((post, index)=>(
                         <div key={index} className="post-container">
                    {/* first section */}
                    <div className="flex justify-between">
                            <div className="flex gap-2 ">
                        <div className="flex flex-col items-start justify-center">
                            <Image src={post?.owner?.base?.avatar} alt="pos cover image" width={40} height={40} className="rounded-full" />
                        </div>
                        <div className="flex flex-col items-start justify-center px-2">
                            <h5 className="">
                                {post?.owner?.base?.name}
                            </h5>
                            <p className="text-gray-400 font-sm px-1">
                                {post?.owner?.base?.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="flex rounded-full py-1 px-2 bg-green-200">
                           
                            <LightIcon className="w-5 h-5 text-green-500 fill-current" />
                            <span className="flex items-center px-1 text-green-600 font-semibold">+10 pts</span>                            </p>
                    </div>
                    </div>
                    {/* secondsection */}
                    <div className="h-[450px] py-2">
                        <Image src={post?.photoUrl} alr="post image" width={100} height={100}
                        className="w-full h-full object-cover rounded-lg"
                         />
                    </div>
                    {/* third section */}
                    <div className="px-2 py-2 flex gap-3">
                        <button className="font-semibold flex items-center gap-1">
                            <LikeIcon className="w-6 h-6 text-gray-800 cursor-pointer"/>
                            {post?.likes?.length > 0 ? <span className="text-sm px-1 text-gray-600">{post?.likes}</span>:null}
                        </button>
                                               <button className="font-semibold flex items-center gap-1">

                            <CommentIcon className="w-6 h-6 text-gray-800 cursor-pointer"/>
                              {post?.comments?.length > 0 ? <span className="text-sm px-1 text-gray-600">{post?.likes}</span>:null}
                        </button>
                                             <button className="font-semibold flex items-center gap-1">

                            <ShareIcon className="w-6 h-6 text-gray-800 cursor-pointer"/>
                             {post?.shares?.length > 0 ? <span className="text-sm px-1 text-gray-600">{post?.likes}</span>:null}
                        </button>
                    </div>
                    {/* forth section */}
                    <div className="px-2 flex flex-col gap-2">
                        <p className="flex gap-2">
                           <span className="font-xl font-semibold">{post?.owner?.base?.name}</span> 
                            <span>{post?.caption}</span>
                        </p>
                        <p>
                            {post?.pos?.city}
                        </p>
                    </div>


                

                </div>
                    ))
                }
               
            </div>
           

          
        </section>
       
    )
}