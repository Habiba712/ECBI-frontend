'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CloseIcon from "../../../public/svg/close";




export default function UploadImage({onClose }){
    const [image, setImage] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    // const [closeModal, setCloseModal] = useState(props?.setUploadImageModal);

    // useEffect(()=>{
    //     if(props.image){
    //         setImage(props.image);
    //     }
    // },[props.image])

   
    const handleSubmit = ()=>{
        submit(image);
        setCloseModal(true);
    }

return(
    <div className="z-100 absolute w-full h-[200px] bg-white bottom-0 left-0 flex justify-center items-center shadow-full rounded-lg border-gray-100 border-2 ">
        <span className="absolute top-3 right-[1/2] border-b-4 border-gray-200 w-10 rounded-lg "></span>
        <button
        onClick={onClose}
        ><CloseIcon className="w-5 h-5  absolute top-3 right-3 text-gray-400 cursor-pointer" />
            </button>
        
       <p>
        fopwejf 
        eworh 
        weohr 
        weorh 
        cp3
       </p>
        </div>
)}