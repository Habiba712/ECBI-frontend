

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import GiftIcon from "../../../../public/svg/gift";
import PersonIcon from "../../../../public/svg/person";
import RightArrowIcon from "../../../../public/svg/rightArrow";
import { redirect, useRouter } from 'next/navigation';
import LinkIcon from "../../../../public/svg/link";
import LightIcon from "../../../../public/svg/light";
import Link from "next/link";
import EditIcon from "../../../../public/svg/edit";
import PenIcon from "../../../../public/svg/pen";
import default_user from "../../../../public/default_user.png";


export default function InfProfilePage() {
    const [loggedInUser, setLoggedInUser] = useState();
    const [myReferralLinks, setMyReferralLinks] = useState([]);
    const [myPoints, setMyPoints] = useState(0);
    const [userId, setUserId] = useState();
    const [visitedPos, setVisitedPos] = useState([]);
    const [token, setToken] = useState("");
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const [showReferralLinks, setShowReferralLinks] = useState(false);
    const [theReferralLink, setTheReferralLink] = useState([
        {
            link: "",
            posId: ""
        }
    ]);
    const getUser = async () => {
        console.log('🔥 getUserById HIT', userId);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`).then((res) => res.json().then((data) => {
                console.log('datadoioi', data);
                setLoggedInUser(data.user);
                setVisitedPos(data.user.finalUser.visits);
                // console.log("Fetched user data:", data.data);
            }))

        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    }
    const getMyReferralLinks = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinksByUserId/${userId}`, {
                 
           
             }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('referral link data', data);
                        setMyReferralLinks(prev => {
                                return [...prev, ...data];
                        });
                    })
                }
            })

        } catch (err) {
            console.log('error', err);
        }
    }
    
    const pointsAwardedSum = async (myReferralLinks) => {
        console.log('my referral linkssss', myReferralLinks);
        let sum = 50;
        myReferralLinks.forEach((item) => {
            console.log('item', item);
            sum += item.pointsEarned;
        });
        
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updateUserPoints/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "PUT",
                    body: JSON.stringify({ points: sum })
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            console.log('referral link data', data);
                            
                        })
                    }
                })
            }
            catch (err) {
                console.log('error', err);
            }

        
        return sum;
    }
    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ token })
            }).then((res) => {
                if (res.ok) {
                    localStorage.removeItem("sessionData");
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    router.push("/pages/login");
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }
    const handleCopy = ({ link }) => {
        console.log('link', link);
        try {
            navigator.clipboard.writeText(link);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.log('error', err);
        }
    }
    const handleGenerateLink = async ({ userId, posId }) => {
        console.log('link', userId, posId)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/createReferralLink`, {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: "POST",
                body: JSON.stringify({ userId, posId })
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('referral link data', data);
                        setTheReferralLink(prev => {
                            // On vérifie si le lien existe déjà dans la liste précédente
                            const exists = prev.some(item => item?.link === data?.link);

                            if (!exists) {
                                return [...prev, { link: data?.link, posId: data?.posId }];
                            }

                            return prev; // On retourne l'ancien état si déjà présent
                        });

                    })
                }
            })

        } catch (err) {
            console.log('error', err);
        }

    }
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("sessionData")) || null;
        // console.log('session', session?.userId);
        setUserId(session?.userId);
        setToken(session?.token);
    }, []);
    console.log('visited pos', visitedPos);
    useEffect(() => {
        // setShowReferralLinks(false);
        if (userId) {
            getUser();
        }
    }, [userId])
    useEffect(() => {
        if (userId) {
            getMyReferralLinks();
        }
    }, [userId])
    //  console.log('visited pos', visitedPos);
    console.log('my referral links', myReferralLinks);  
    return (
        <section className="min-h-screen h-full max-w-md mx-auto  w-full  mb-15">
            {/* first section */}
            <div className="h-[200px] flex flex-col justify-center bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)] items-center w-full py-5 px-4 text-white">
                     <button className="w-full" onClick={() => router.back()}>
                                                <RightArrowIcon className="w-8 h-8 text-white cursor-pointer rotate-180 stroke-2" />
                                            </button>
                    
                
                <div className="flex gap-2 w-full px-5 py-5">
                    <div className="flex flex-col items-start justify-center">
                        <Image src={loggedInUser?.base?.avatar || default_user} alt="pos cover image" width={50} height={50} className="rounded-full object-cover aspect-square" />
                        
                    </div>
                    <div className="flex flex-col items-start justify-center px-1">
                        <h5 className=" flex items-end font-semibold text-lg ">
                            {loggedInUser?.base?.name}
                        </h5>
                        <p className=" font-sm ">
                            {loggedInUser?.base?.username}
                        </p>
                    </div>
                </div>

                <div className="w-full flex justify-around">
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">
                            {pointsAwardedSum(myReferralLinks)}
                        </h4>
                        <p className="text-lg ">Points</p>
                    </div>
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">{loggedInUser?.finalUser?.posts?.length}</h4>
                        <p className="text-lg ">Posts</p>
                    </div>
                    <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                        <h4 className="text-xl font-semibold">
                            {myReferralLinks.length}
                        </h4>
                        <p className="text-lg">Referrals</p>
                    </div>
                </div>

            </div>
            {
                showReferralLinks === false ? (
                    <div>


                        {/* second section */}
                        <div className="flex flex-col gap-2 w-full p-5">
                            <div className="cursor-pointer shadow-lg p-3 flex justify-between items-center gap-3 rounded-lg">
                                <div className=" flex items-center gap-3">
                                    <GiftIcon className="w-6 h-6 text-purple-700" />
                                    <div className=""
                                    >
                                        <h4 className="font-semibold">My Referral Links</h4>
                                        <p className="text-sm text-gray-500">Invite friends and earn points</p>
                                    </div>
                                </div>



                                <div className="">
                                    <button
                                        className="cursor-pointer "
                                        onClick={() => { setShowReferralLinks(true) }}
                                    >
                                        <RightArrowIcon className="w-5 h-5  text-gray-400" />
                                    </button>
                                </div>


                            </div>

                            <div className="cursor-pointer shadow-lg p-3 flex items-center justify-between gap-3 rounded-lg">
                                <div className=" flex items-center gap-3">
                                    <PersonIcon className="w-6 h-6 text-pink-700" />
                                    <div>
                                        <h4 className="font-semibold">Edit Profile</h4>
                                        <p className="text-sm text-gray-500">Update your profile informations</p>
                                    </div>
                                </div>
                                <div >
                                    <button
                                        className="cursor-pointer "
                                        onClick={() => {
                                            redirect("/pages/profile/edit");
                                        }}
                                    >
                                        <RightArrowIcon className="w-5 h-5 ml-auto text-gray-400" />
                                    </button>
                                </div>



                            </div>

                            <div className="cursor-pointer shadow-lg p-3 flex items-center justify-center gap-3 rounded-lg bg-red-100 flex items-center
                  hover:shadow-red-200 hover:scale-105 duration-300 ease-in-out
                  ">
                                <button className="cursor-pointer text-red-600 font-semibold font-sans"
                                    onClick={() => handleLogout()}
                                >Logout</button>
                            </div>
                        </div>
                    </div>



                )
                    :
                    (
                        <div className="flex flex-col gap-2 w-full p-5">
                            <h1 className="text-md font-semibold text-start font-sans px-3">
                                My Visited Spots
                            </h1>
                            {
                                visitedPos?.length > 0 && visitedPos.map((pos, index) => (
                                    <div key={index} className="w-full h-20 cursor-pointer shadow-lg p-3 flex items-center gap-3 rounded-lg justify-between">

                                        <div className="flex items-center justify-start  w-20 h-20  rounded-full">
                                            <img src={pos?.coverImage} alt="pos cover image" className=" rounded-full w-[40px] h-[40px] object-cover aspect-square" />
                                        </div>

                                        <div className="text-start w-full"
                                        >
                                            <h4 className="font-semibold text-xs">{pos?.name}</h4>
                                            <p className="text-xs  text-gray-500">+20 points per visit</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            {
                                                theReferralLink?.find((item) => item.posId === pos._id)?.link !== undefined ? (
                                                    <>
                                                        <div className="cursor-pointer p-2 flex rounded-full  items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 hover:bg-gray-100 ">

                                                            <button
                                                                className="cursor-pointer h-10 w-10 flex items-center justify-center transition-all duration-500 ease-in-out rounded-full"
                                                                onClick={() =>
                                                                    handleCopy({ link: theReferralLink?.find((item) => item.posId === pos._id)?.link })
                                                                }
                                                            >

                                                                {
                                                                    copied === true ? (
                                                                        <span className="relative z-1000 text-gray-500 text-sm py-2 px-3 rounded ">
                                                                            Copied!
                                                                        </span>
                                                                    )
                                                                        :
                                                                        <LinkIcon className="w-6 h-6 text-gray-400" />
                                                                }
                                                            </button>

                                                        </div>


                                                    </>


                                                ) : (
                                                    <>
                                                        <button
                                                            style={{
                                                                "fontSize": "12px"
                                                            }}
                                                            className="cursor-pointer font-bold whitespace-nowrap text-white py-2 px-3 bg-gradient-to-r from-purple-800 to-blue-600 items-center rounded-full transition-all duration-500 ease-in-out hover:scale-110 flex gap-2"
                                                            onClick={() => { handleGenerateLink({ userId: userId, posId: pos?._id }) }}
                                                        >
                                                            <LightIcon className="w-4 h-4 stroke-2" /> Generate My Link
                                                        </button>

                                                    </>

                                                )
                                            }


                                        </div>

                                    </div>

                                ))
                            }


                        </div>
                    )

            }

        </section>
    )
}