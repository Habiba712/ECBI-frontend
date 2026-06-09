
'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CloseIcon from "../../../public/svg/close";
import GalleryIcon from "../../../public/svg/gallery";
import CameraIcon from "../../../public/svg/camera";
import BackIcon from "../../../public/svg/back";
import LikeIcon from "../../../public/svg/like";



export default function CommentsModal({onClose, postComments}) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    // const [closeModal, setCloseModal] = useState(props?.setUploadImageModal);

    // useEffect(()=>{
    //     if(props.image){
    //         setImage(props.image);
    //     }
    // },[props.image])

console.log('post comments', postComments);
    const handleSubmit = () => {
        submit(image);
        setCloseModal(true);
    }
useEffect(() => {
  // Disables background scrolling instantly when the modal renders
  document.body.style.overflow = 'hidden';

  // Cleanup Function: Restores default scrolling layout rules when modal unmounts
  return () => {
    document.body.style.overflow = 'unset';
  };
}, []);
   return (
   <div className="fixed max-w-md inset-0 bg-black/40 backdrop-blur-xs z-100 flex  overflow-hidden ">
    
     <div className="absolute w-full max-w-md h-[100vh] bg-white shadow-2xl flex flex-col  border border-gray-100">
      
       <span className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full z-20"></span>

       <div className="fixed w-full flex justify-between items-center px-4 pt-6 pb-4 border-b border-gray-100 bg-white flex-shrink-0">
        <button
          className="cursor-pointer bg-gray-100 rounded-full p-1.5 hover:bg-gray-200 transition-colors"
          onClick={onClose}
        >
          <BackIcon className="w-4 h-4 text-gray-500" />
        </button>
        <h2 className="font-semibold font-sans text-gray-900 text-base mx-auto pr-6">Comments</h2>
      </div>

       <div className="overflow-y-auto px-4 mt-20 flex flex-col gap-4 bg-white min-h-0">
        {postComments?.length > 0 ? (
          postComments.map((comment, index) => (
            <div 
              key={index} 
              className="flex items-start w-full gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors duration-150"
            >
              {/* User Avatar */}
              <div className="relative w-9 h-9 overflow-hidden rounded-full border border-gray-100 flex-shrink-0">
                <img
                  src={comment?.userId?.base?.avatar || "/default_user.png"}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

               <div className="flex flex-col flex-grow min-w-0">
                <p className="text-[13px] text-gray-800 leading-snug font-semibold break-words">
                  {comment?.userId?.base?.name}
                </p>
                <span className="text-[13px] text-gray-600 mt-0.5 break-words font-normal leading-normal line-clamp-1">
                  {comment?.comment}
                </span>
              </div>

               <div className="flex flex-col items-end flex-shrink-0 ms-auto pl-2">
                <span className="text-[11px] text-gray-400 whitespace-nowrap">
                  {new Date(comment?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button className="mt-1 p-1 hover:bg-gray-50 rounded-full transition-colors">
                  <LikeIcon className="w-4 h-4 stroke-gray-400 fill-none" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400 font-sans">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
      
    </div>
  </div>
);
}