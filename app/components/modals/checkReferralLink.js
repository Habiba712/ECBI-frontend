

'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import GiftIcon from "../../../public/svg/gift";

export default function CheckReferralLink({props, closeModal, setExpiredLink, setIsActive, onClose}) {
    const [referralLinksList, setReferralLinksList] = useState(props?.myReferralLinksForThisPos);
    console.log('props', referralLinksList);
    const [loggedIn, setLoggedIn] = useState(null);
    const [referralUser, setReferralUser] = useState(null);
     const [visitorRewarded, setVisitorRewarded] = useState(false);
 
    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData")) ? JSON.parse(localStorage?.getItem("sessionData")) : null;
        setLoggedIn(sessionData?.userId);

       
    }, []);
    useEffect(() => {
        console.log('referral links list', referralLinksList, loggedIn);
 setReferralUser(props?.myReferralLinksForThisPos?.find((item)=> item?.referrerUser._id !== loggedIn));
    }, [loggedIn]);
    const closeModalFunc = ({isHelping}) => {
console.log('is helping', isHelping);
  closeModal(false);
  setExpiredLink(isHelping);
        if(isHelping){
            setIsActive(true);
setVisitorRewarded(true);
        }
      
      
        onClose(isHelping);
    }

    // useEffect(() => {
    //     console.log('oue', owner, id)
    //     findReferralLink();
    // }, [id, owner])
    // console.log('referral links', myReferralLinksForThisPos);
    console.log('referral user', referralUser);
    return (
        <div className="z-0 w-full  bg-black/50 fixed inset-0
        flex items-center justify-center  h-full max-w-md mx-auto px-3 ">

            <div className="bg-white rounded-lg w-full min-h-100 flex flex-col mx-6 ">
               
                    
                <div className=" w-full relative -top-6 flex justify-center items-start">
                    <div className=" flex justify-center items-center bg-gradient-to-r from-purple-700 to-blue-700 p-2 rounded-full w-fit border-3 border-white">
                   <GiftIcon className="w-5 h-5 inline-block text-white stroke-2 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full" />     
                    </div>

                </div>
                <div className="flex justify-center items-center bg-gradient-to-r from-purple-700 to-blue-700 rounded-full w-full border-3 border-white h-20">
 <div className="mb-6">
                    <Image src={referralUser?.referrerUser?.base?.avatar} alt="referral user avatar" width={100} height={100} className="rounded-full mx-auto mt-25 border-3 border-white shadow-lg" />
         
                </div>
                
                </div>
                <div className="mt-6 ">
                       <h2 className="text-xl font-bold text-gray-800 text-center mt-8">Help your friend?</h2>
            <p className="mt-3 text-gray-600 text-sm px-4 font-semibold text-center">
          <span className="font-semibold text-purple-600">@{referralUser?.referrerUser?.base?.name}</span> recommended you this place! 
          Support them by sharing your experience.
        </p>
                    <div className="space-y-3 flex flex-col gap-3 w-full justify-center items-center mt-6 mb-6">
                        <button className="rounded-full bg-gradient-to-r from-purple-700 to-blue-700 py-2 px-3 w-50 text-white font-semibold cursor-pointer
                         transition-all duration-500 ease-in-out hover:animate-pulse shadow-lg
                        "
                        onClick={()=>closeModalFunc({isHelping: true})}
                        >
                            Yes, I'll help!
                        </button>
                        <button className="rounded-full bg-gray-200 py-2 px-3 w-50 text-sm text-gray-600 font-semibold cursor-pointer
                          whitespace-nowrap
                        "
                        
                        onClick={()=>closeModalFunc({isHelping: false})}>
                            No, I'm here on my own!
                        </button>
                    </div>
                </div>
                          
             
            </div>
        </div>
    )
}