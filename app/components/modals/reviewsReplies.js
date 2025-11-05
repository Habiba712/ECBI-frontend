
'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useState } from "react";

export default function ReviewsReplies({review, setIsModalOpen, onSend}){
    console.log('review', review);

    const [reply, setReply] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        onSend({
            reply:{
                reviewId: review.review.id,
                replyText: reply
            }
        });
        setReply("");
        setIsModalOpen(false);
        // console.log('reply', reply);
    }
    console.log('review', review);
    return(
        <div className="z-0 w-full mh-100vh bg-black/50 fixed inset-0 
        flex items-center justify-center">
            {/* the parent div should be a modal
             */}
             <form className="z-1 h-fit bg-white opacity-100 rounded-lg w-1/2 h-1/2 p-4 shadow-lg" onSubmit={handleSubmit}>
                <div className="w-full flex justify-between">
                    <h3 className="text-md font-semibold" style={{
                        'color':'black'
                    }}>Reply To Review</h3>
                    <button 
                    onClick={()=>setIsModalOpen(false)}
                    >

                    <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                    </button>
                </div>
                <div className="flex flex-col gap-3 mt-3 text-start p-4 bg-gray-100 rounded-lg border-b border-gray-100 ">
                    <div className="flex gap-2 items-center">
                         <div>
                        <Image src={review.review.userAvatar} alt="user avatar" width={40} height={40} className="rounded-full" />
                        </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold">{review.review.userName}</p>
                        <p className="text-xs text-gray-400">
                            {review.review.rating === 5 && <span className="text-green-500">⭐⭐⭐⭐⭐</span>}
                            {(review.review.rating === 4 || review.review.rating === 4.4) && <span className="text-green-500">⭐⭐⭐⭐ </span>}
                            {review.review.rating === 3 && <span className="text-green-500">⭐⭐⭐</span>}
                            {review.review.rating === 2 && <span className="text-green-500">⭐⭐</span>}
                            {review.review.rating === 1 && <span className="text-green-500">⭐</span>}
                        </p>
                    </div>
                    </div>
                   
                    <div>
                        <p className="text-sm">{review.review.comment}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 h-50 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder="Add a reply..." value={reply} onChange={(e) => setReply(e.target.value)} />
                        <div className="flex justify-around w-full py-2 px-2 text-center items-center gap-3">
                           
                            <button className="rounded-full bg-blue-300 py-2 px-3 w-full text-white font-semibold cursor-pointer"
                            type="sumbit"
                            >Send</button> <button className="rounded-full bg-white text-blue-300 border border-blue-300 py-2 px-3 w-full text-blue-300 font-semibold cursor-pointer"
                            onClick={()=>setIsModalOpen(false)}
                            >Cancel</button>
                        </div>
                </div>


             </form>
        </div>
    )
}