'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CloseIcon from "../../../public/svg/close";
import GalleryIcon from "../../../public/svg/gallery";
import CameraIcon from "../../../public/svg/camera";



export default function UploadImage({ onClose, setImage }) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    // const [closeModal, setCloseModal] = useState(props?.setUploadImageModal);

    // useEffect(()=>{
    //     if(props.image){
    //         setImage(props.image);
    //     }
    // },[props.image])


    const handleSubmit = () => {
        submit(image);
        setCloseModal(true);
    }

    return (
     <div className={`absolute min-h-screen h-full max-w-md mx-auto flex flex items-end bg-black/25 backdrop-blur-sm z-100 w-full h-full`}>
             <div className="relative bottom-0 max-w-md mx-auto w-full  h-[200px] bg-white flex justify-center items-center shadow-full rounded-t-[25px] border-gray-100 border-2 ">
            <span className="absolute top-3 right-[1/2] border-b-4 border-gray-200 w-10 rounded-lg "></span>
            <button
                className="z-100 cursor-pointer absolute top-3 right-3 bg-gray-100 rounded-full p-1"
                onClick={onClose}
            ><CloseIcon className=" w-5 h-5  text-gray-400 " />
            </button>
            <h2 className="absolute top-5 font-semibold font-sans text-center w-full border-b border-gray-200 py-2">Upload Image</h2>

            <div className="w-full px-2 py-4 absolute top-15 flex flex-col gap-4">

                <div className="flex gap-2 w-full flex items-center">
                    <GalleryIcon className="rounded-full bg-gray-100  w-10 h-10 p-2 " /><label
                        htmlFor="avatar-upload"
                        className="upload-btn-label"
                    >

                        Upload from gallery
                    </label>

                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden" // Hides the ugly native "Choose file" text completely
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            onClose();
                            setIsUploaded(true);
                        }}
                    />
                </div>
                <div className="flex gap-2 w-full flex items-center">
                    <CameraIcon className="rounded-full bg-gray-100  w-10 h-10 p-2" />
                    <label
                        htmlFor="avatar-upload-camera"
                        className="upload-btn-label"
                    >

                        Take a photo
                    </label>
                    <input
                        type="file"
                        id="avatar-upload-camera"
                        disabled={true}
                        accept="image/*"
                        className="hidden" // Hides the ugly native "Choose file" text completely
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setImage(e.target.files[0]);
                            setIsUploaded(true);
                        }
                    }}
                    />
                </div>
            </div>

        </div>
            </div>
      
    )
}