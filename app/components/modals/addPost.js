'user client'

import Image from "next/image";
import CloseIcon from "../../../public/svg/close";
import { useEffect, useState } from "react";
import PrintIcon from "../../../public/svg/print";
import DownloadIcon from "../../../public/svg/download";
import { on } from "events";
import CameraIcon from "../../../public/svg/camera";
import { useParams } from "next/navigation";
import UploadIcon from "../../../public/svg/upload";

import { useRouter } from "next/navigation";
import CheckReferralLink from "./checkReferralLink";
export default function AddPost() {
    const { id } = useParams();
    const router = useRouter();
    const [owner, setOwner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [photoURL, setPhotoURL] = useState("");
    const [postPicToAdd, setPostPicToAdd] = useState(null);
    const [expiredLink, setExpiredLink] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [myReferralLinksForThisPos, setMyReferralLinksForThisPos] = useState([]);
    const [referredLoggedInUser, setReferredLoggedInUser] = useState(null);
    const [caption, setCaption] = useState("");


    const handleModal = () => {
        router.push(`/pages/dashboard/inf`);

    }
    const formData = new FormData();
    formData.append('owner', owner);
    formData.append('pos', id);
    formData.append('image', photoURL);
    formData.append('caption', caption);
    console.log('modal', showModal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/createPost`, {
                method: "POST",

                body: formData,
            }).then((res) => {
                if (res.ok) {
                    //visited = true; visitedAt = now; 
                    router.push(`/pages/dashboard/inf`);
                    // setIsModalOpen(false);
                }
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    const updateReferralLink = async (expiredState) => {
        if (!owner || !id) return;

        console.log('er re here', expiredState)
        const link_id = myReferralLinksForThisPos[0]?.linkId;
        console.log('owner', myReferralLinksForThisPos);
        console.log('link id', link_id);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/updateReferralLink/${myReferralLinksForThisPos[0]?.linkId}`, {
                method: "PUT",
                body: JSON.stringify({


                    isExpired: expiredState,
                    visitorId: owner,
                    isActive: isActive,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        } catch (err) {
            console.log('error', err);
        }
    }
    const findReferralLink = async () => {
        if (!owner || !id) return;
        try {
            const params = new URLSearchParams({
                posId: id,
                visitorId: owner
            });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getAllReferralLinks?${params.toString()}`);
            const data = await res.json();
            // console.log('dataaaa', data);
            if (data && data.length > 0) {
                console.log('we re here fr fr')
                setMyReferralLinksForThisPos(data);
                setReferredLoggedInUser(data[0]?.referredUsers?.find((item) => item.user === owner));
                if(data[0]?.referredUsers?.find((item) => item.user === owner)
                    .blocked === false && data[0]?.referredUsers?.find((item) => item.user === owner).isActive === false){
                setShowModal(true)

                }
            }

            // console.log('data', data.referralLinks);
            return data.referralLink;

        } catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData")) ? JSON.parse(localStorage?.getItem("sessionData")) : null;
        setOwner(sessionData?.userId);
    }, []);

    useEffect(() => {
        // console.log('oue', owner, id)
        findReferralLink();
    }, [id, owner])

    //  console.log('user id', owner, id);
    //  console.log('referral links', myReferralLinksForThisPos[0]);
    //  console.log('referred user', referredLoggedInUser);
    console.log('show modal',showModal)
    console.log('my referral links for this pos', myReferralLinksForThisPos);
    console.log('referred logged in user', referredLoggedInUser);
    return (
        <div className="z-0 w-full  bg-black/50 fixed inset-0
        flex items-center justify-center py-8  h-full max-w-md mx-auto px-3 ">

            <div className={`my-10 w-full bg-white rounded-lg p-4 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-gray-200 overflow-scrollscrollbar-track-gray-100`}

            >
                <div className="w-full flex justify-between border-b border-gray-200 py-3">
                    <h3 className="text-md font-semibold" style={{
                        'color': 'black'
                    }}>Share Your Experience</h3>
                    <button
                        onClick={() => handleModal()}
                    >

                        <CloseIcon className="w-5 h-5 cursor-pointer text-gray-400" />
                    </button>
                </div>
                <div className=" w-full flex flex-col justify-center items-center">

                    <form className="w-full flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >




                        <div className="flex flex-col w-full">
                            <div className="mb-4">
                                <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:bg-purple-100 transition">
                                    <label className="upload-label" htmlFor="file-upload">
                                        <UploadIcon className="w-10 h-10 mx-auto text-purple-600" />

                                        Upload Photo
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden mt-1 block w-full"
                                            placeholder="Upload an image"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setPostPicToAdd(URL.createObjectURL(file))
                                                    setPhotoURL(file);
                                                }
                                            }}

                                        />
                                        {
                                            postPicToAdd && (
                                                <div className="w-full flex justify-center bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl text-center p-3 cursor-pointer hover:bg-purple-100 transition">

                                                    <img src={postPicToAdd} alt="Preview Image" width={100} height={100} className="" />
                                                </div>
                                            )

                                        }

                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">Required to earn points,{id}</p>
                                </div>
                            </div>
                            <div className="mb-4">

                            </div>
                            <div className="grid grid-cols-2 w-full">


                            </div>

                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex  items-center">
                                <label className="block text-sm font-medium text-gray-700 text-start">
                                    Caption
                                </label>
                            </div>
                            <div className="w-full mt-1">
                                <div className="block w-full" >
                                    <textarea className="w-full h-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder="Enter your caption" rows="5"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}

                                    ></textarea>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-around w-full mt-3 px-2 text-center items-center gap-3">

                            <button className="rounded-full bg-gradient-to-r from-purple-700 to-blue-700 py-2 px-3 w-full text-white font-semibold cursor-pointer
                            hover:scale-110 transition-all duration-500 ease-in-out
                            "
                                type="submit"
                            >Create</button>
                            <button className="rounded-full bg-white text-blue-500 border border-blue-500 py-2 px-3 w-full text-blue-300 font-semibold cursor-pointer  hover:scale-110 transition-all duration-500 ease-in-out"
                                onClick={() => handleModal()}
                            >Cancel</button>
                        </div>

                    </form>


                </div>


                {
                    showModal && myReferralLinksForThisPos.length > 0 && referredLoggedInUser.blocked === false && referredLoggedInUser.isActive === false && (
                        <CheckReferralLink

                            props={{ myReferralLinksForThisPos }}
                            closeModal={setShowModal}
                            setExpiredLink={setExpiredLink}
                            setIsActive={setIsActive}
                            onClose={(val) => updateReferralLink(val)}
                        />
                    )


                }


            </div>


        </div>


    )
}