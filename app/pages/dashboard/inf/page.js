'use client'

import SearchIcon from "../../../../public/svg/search"
import { useState, useEffect } from "react";
import AddPost from "../../../components/modals/addPost";
import Image from "next/image";
import LightIcon from "../../../../public/svg/light";
import LikeIcon from "../../../../public/svg/like";
import CommentIcon from "../../../../public/svg/comment";
import ShareIcon from "../../../../public/svg/share";
import ZipCodeIcon from "../../../../public/svg/zipCode";
export default function PointOfSale() {

    const [likes, setLikes] = useState({
        likes: 0,
        postId: null
    });
    // one user can have zero or one like
    const [postsList, setPostsList] = useState([])

  const [userId, setUserId] = useState();
    const [loggedInUser, setLoggedInUser] = useState();
    const [token, setToken] = useState("");
    const getAllPosts = async () => {

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/getAllPosts`, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                method: "GET"
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setPostsList(data);
                        console.log('data', data);
                    })

                }
            })
        } catch (err) {
            console.log('error', err);
        }
    }
const getUser = async () => {
        console.log('🔥 getUserById HIT', userId);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`).then((res) => res.json().then((data) => {
                console.log('datadoioi', data);
                setLoggedInUser(data.user);
                // setVisitedPos(data.user.finalUser.visits);
                // console.log("Fetched user data:", data.data);
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }

    const handleLike = async (id) =>{
       if (!userId) return;
       const targetPost = postsList.find(p => p._id === id);
       const isAlreadyLiked = targetPost.likes?.includes(userId);
    const evaluationValue = isAlreadyLiked ? -1 : 1;
    setPostsList(prevList => 
        prevList.map(post => {
            if (post._id === id) {
                const updatedLikesArray = isAlreadyLiked
                    ? post.likes.filter(id => id !== userId) // Remove user ID
                    : [...(post.likes || []), userId];       // Append user ID
                return { ...post, likes: updatedLikesArray };
            }
            return post;
        })
    );
    if (!targetPost) return;

        try{
            
           
            const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/post/likes/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    
                    userId: userId,
                    newLikes: evaluationValue
                })
            }); 
        }catch(err){
            console.log('error', err);
            getAllPosts();
        }
    }
        useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    useEffect(() => {
        // setShowReferralLinks(false);
        if (userId) {
            getUser();
        }
    }, [userId])
    useEffect(() => {
        getAllPosts();
    }, [])

    console.log('posts list', postsList);

    const handleClick = () => {
        setIsModalOpen(true);
    }
    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-20"

        >
            <div className="inf-dash-top fixed top-0 max-w-md mx-auto w-full z-100 ">
                <div>
                    <h1 className="brand-header-script font-semibold text-2xl font-sans
                 ">ECBI Feed</h1>
                   
                </div>
                <div>
                    <SearchIcon className="w-6 h-6 text-white cursor-pointer" />
                </div>

            </div>
            <div className="mt-12 ">
                {/* <button 
                onClick={()=>handleClick()}
                className="rounded-full bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 cursor-pointer text-white font-semibold hover:scale-110 transition-all duration-500 ease-in-out">
                    Create New Post
                </button> */}
                {
                    postsList?.length > 0 && postsList.map((post, index) => (
                        <div key={index} className="post-container">
                            {/* first section */}
                            <div className="flex justify-between items-center px-1 pt-2 border-b border-gray-50 bg-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-9 h-9 overflow-hidden rounded-full border border-gray-100 flex-shrink-0 ">
                                        <Image src={post?.owner?.base?.avatar || "/default_user.png"} alt="pos cover image" fill className="object-cover" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 leading-none">
                                        {post?.owner?.base?.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full shadow-sm">
                                    <LightIcon className="w-4 h-4 text-emerald-500 fill-current" />
                                    <span className="text-xs font-bold tracking-wide">+10 pts</span>
                                </div>
                            </div>
                            {/* secondsection */}
                            <div className="relative w-full bg-gray-50 flex items-center justify-center max-h-[500px] overflow-hidden border-y border-gray-100">
                                <img
                                    src={post?.photoUrl}
                                    alt="post attachment"
                                    className="w-full h-auto max-h-[500px] object-cover aspect-square block mx-auto"
                                />
                            </div>
                            {/* third section */}
                            <div className="px-1 pt-3 pb-1 flex items-center gap-4 bg-white">
                                <button className="font-semibold flex items-center gap-1"
                                 onClick={() => handleLike(post?._id)}>
                                   
                                    <LikeIcon className={`w-6 h-6 text-gray-800 cursor-pointer ${post.likes.includes(userId) ? "fill-red-500 stroke-red-500" : ""}`} />
                                    {post?.likes?.length > 0 ? <span className="text-sm text-gray-600">{post?.likes?.length}</span> : null}
                                </button>
                                <button className="font-semibold flex items-center gap-1">
                                    <CommentIcon className="w-6 h-6 text-gray-800 cursor-pointer" />
                                    {post?.comments?.length > 0 ? <span className="text-sm px-1 text-gray-600">{post?.likes}</span> : null}
                                </button>
                                <button className="font-semibold flex items-center gap-1"
                                    onClick={() => handleShare()}
                                >

                                    <ShareIcon className="w-6 h-6 text-gray-800 cursor-pointer" />
                                    {post?.shares?.length > 0 ? <span className="text-sm px-1 text-gray-600">{post?.likes}</span> : null}
                                </button>
                            </div>
                            {/* forth section */}
                            <div className="px-1 flex flex-col gap-1.5 bg-white">
                                {/* Caption Layout */}
                                <p className="text-sm text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900 mr-2">{post?.owner?.base?.name}</span>
                                    {post?.caption}
                                </p>

                                {/* Metadata Location Tag Layout */}
                                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium ">


                                    {post?.pos?.address?.city && (
                                        <>
                                            <span className="font-semibold text-gray-700">{post?.pos?.name}</span> <span className="text-gray-300">•</span>  <span>{post?.pos?.address?.city}</span><ZipCodeIcon className="w-4 h-4 text-gray-400 flex-shrink-0 " />

                                        </>
                                    )}
                                </div>
                            </div>



                        </div>
                    ))
                }

            </div>



        </section>

    )
}