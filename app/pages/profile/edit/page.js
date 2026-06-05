'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import GiftIcon from "../../../../public/svg/gift";
import RightArrowIcon from "../../../../public/svg/rightArrow";
import { useRouter } from 'next/navigation';
import LinkIcon from "../../../../public/svg/link";
import LightIcon from "../../../../public/svg/light";
import Link from "next/link";
import EditIcon from "../../../../public/svg/edit";
import PenIcon from "../../../../public/svg/pen";
import CameraIcon from "../../../../public/svg/camera";
import default_user from "../../../../public/default_user.png";
import UploadImage from "../../../components/modals/uploadImage";
export default function EditProfilePage() {
    const [userId, setUserId] = useState();
    const [loggedInUser, setLoggedInUser] = useState();
    const [token, setToken] = useState("");
    const [uploadImageModal, setUploadImageModal] = useState(false);

    const [uploadedAvatar, setUploadedAvatar] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleShowModal = () => {
        console.log('closing modal')
        setUploadImageModal(prev => !prev);
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

    // Inside your parent page file where you receive the image from the modal
    const handleImageSubmit = (incomingFile) => {
        if (incomingFile) {
            // Create a local, temporary browser URL string from the raw file object
            const previewUrl = URL.createObjectURL(incomingFile);
            setUploadedAvatar(previewUrl);
        }
    };
      const handleSubmit = async (e) => {
        e.preventDefault(); // Stop page reload
        const newErrors = {};

        if (!currentPassword) {
            newErrors.currentPassword = "Your current password is required to save modifications.";
        }

        if (!name.trim()) newErrors.name = "Name field cannot be left empty.";
        if (!email.trim()) newErrors.email = "Email field cannot be left empty.";
        if (!phone.trim()) newErrors.phone = "Phone number cannot be left empty.";


        if (newPassword || confirmPassword) {
            if (!newPassword) {
                newErrors.newPassword = "Please specify your new password.";
            }
            if (newPassword !== confirmPassword) {
                newErrors.confirmPassword = "Confirmation entry must exactly match your new password.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear error flags on successful structural authorization
        setErrors({});
        
        console.log("Form payload passed verification! Sending down to endpoint:", {
            name, email, phone, currentPassword, newPassword
        });
        
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updateProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                section: "base",
                updateData: {
                    name, email, phone, password:currentPassword
                }

                })
            });
            const data = await res.json();
            console.log('data', data);
        }
        catch(err){
            console.log('err', err);
        }
        // Execute fetch() API mutation logic here...
    };
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
    console.log('uplaodedavatrt, ', uploadedAvatar)
    return (

        <section className={`min-h-screen h-full max-w-md mx-auto flex flex-col `}>


            <div className={`h-[100px] h-full flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center  px-4 text-white rounded-b-full w-full `}>
                <div className="w-full flex flex-col pt-10 justify-between items-center gap-2 h-                full ">
                    <div className="w-full flex justify-between items-center  relative z-10 -top-8 ">

                        <button className="absolute w-full" onClick={() => router.back()}>
                            <RightArrowIcon className="w-8 h-8 text-white cursor-pointer rotate-180 stroke-2" />
                        </button>



                        <h2 className="font-semibold font-sans text-xl text-white text-center w-full"> Edit Profile</h2>
                    </div>

                    <div
                        className="flex flex-col items-start justify-end relative">  <Image alt="profile cover image" src={uploadedAvatar ? uploadedAvatar : loggedInUser?.base?.avatar ? loggedInUser?.base?.avatar : default_user} width={100} height={100} className="rounded-full aspect-square object-cover border-2 shadow-m" />


                        <div className="absolute -right-2 bottom-9">
                            <button
                                onClick={() => handleShowModal()}
                            >
                                <CameraIcon className="w-7 h-7 text-white bg-blue-500 rounded-full flex justify-center p-1 absolute -bottom-5 right-0 cursor-pointer stroke-2" />  </button>

                        </div>
                    </div>

                </div>



            </div>

            <div className={`h-full `}>
                <form 
                onSubmit={handleSubmit}
                className="flex justify-between gap-4 mt-6 px-4 flex-wrap relative w-full ">
                    <div className="w-full flex flex-col relative" >
                        <label htmlFor="name" className="font-medium text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Name</label>
                        <div className="flex items-center gap-2">
                            <input type="text" id="name" name="name" defaultValue={loggedInUser?.base?.name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col relative">
                        <label htmlFor="email" className="font-medium text-sm text-gray-600 absolute bg-white px-2 -top-3 left-4">Email</label>
                        <div className="flex items-center gap-2">
                            <input type="email" id="email" name="email" defaultValue={loggedInUser?.base?.email} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="phone" className="text-xs  text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10 font-medium">
                            Phone
                        </label>

                        <div className="flex items-center gap-2">

                            <div className="relative flex items-center bg-gray-50/50 border border-gray-300 rounded-md px-3 py-2.5 min-w-[96px] justify-between cursor-pointer">
                                <div className="flex items-center gap-1.5 select-none">

                                    <svg className="w-5 h-4 rounded-sm object-cover" viewBox="0 0 6 4">
                                        <rect width="6" height="4" fill="#00247D" />
                                        <path d="M0,0 L6,4 M0,4 L6,0" stroke="#FFF" strokeWidth="0.6" />
                                        <path d="M0,0 L6,4 M0,4 L6,0" stroke="#CF142B" strokeWidth="0.4" />
                                        <path d="M3,0 L3,4 M0,2 L6,2" stroke="#FFF" strokeWidth="1" />
                                        <path d="M3,0 L3,4 M0,2 L6,2" stroke="#CF142B" strokeWidth="0.6" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-800">+44</span>
                                </div>
                                {/* Dropdown Chevron Indicator Arrow */}
                                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Local Telephone Number Text Input Field */}
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                pattern="[0-9]*"
                                placeholder="Phone"
                                defaultValue={loggedInUser?.base?.telephone || ""}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    {/* CURRENT PASSWORD (IDENTITY VERIFICATION) */}
                    <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="currentPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            Current Password<span className="text-red-500">*</span>
                        </label>
                        <input
                        
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Enter current password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />{errors.currentPassword && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.currentPassword}</span>}

                    </div>


                    {/* NEW PASSWORD */}
                    <div className="w-full flex flex-col relative mt-2">
                        <label htmlFor="newPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* CONFIRM NEW PASSWORD */}

                    <div className="w-full flex flex-col  relative mt-2">
                        <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2.5 left-4 z-10">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number Field Component Block */}

                    <div className="w-full">
                        <button 
                    
                        type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-700 to-blue-700 py-2 px-2 text-white font-semibold cursor-pointer
                            transition-all duration-500 ease-in-out hover:animate-pulse shadow-lg 
                        ">
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>


            {
                uploadImageModal &&

                <UploadImage
                    onClose={() => handleShowModal()}
                    setImage={handleImageSubmit}
                />


            }

        </section>
    )




}



// 'use client'

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import RightArrowIcon from "../../../../public/svg/rightArrow";
// import { useRouter } from 'next/navigation';
// import CameraIcon from "../../../../public/svg/camera";
// import default_user from "../../../../public/default_user.png";
// import UploadImage from "../../../components/modals/uploadImage";

// export default function EditProfilePage() {
//     const [userId, setUserId] = useState();
//     const [loggedInUser, setLoggedInUser] = useState();
//     const [token, setToken] = useState("");
//     const [uploadImageModal, setUploadImageModal] = useState(false);

//     const [uploadedAvatar, setUploadedAvatar] = useState(null);
    
//     // Form Controlled States
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
    
//     // Validation Errors State Object
//     const [errors, setErrors] = useState({});
    
//     const router = useRouter();

//     const handleShowModal = () => {
//         setUploadImageModal(prev => !prev);
//     }

//     const getUser = async () => {
//         try {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`);
//             const data = await res.json();
//             if (data.user) {
//                 setLoggedInUser(data.user);
//                 // Pre-populate fields with existing database values
//                 setName(data.user.base?.name || "");
//                 setEmail(data.user.base?.email || "");
//                 setPhone(data.user.base?.telephone || "");
//             }
//         } catch (err) {
//             console.log("Error fetching user data:", err);
//         }
//     }

//     const handleImageSubmit = (incomingFile) => {
//         if (incomingFile) {
//             const previewUrl = URL.createObjectURL(incomingFile);
//             setUploadedAvatar(previewUrl);
//         }
//     };

//     useEffect(() => {
//         const session = JSON.parse(localStorage.getItem("sessionData")) || null;
//         setUserId(session?.userId);
//         setToken(session?.token);
//     }, []);

//     useEffect(() => {
//         if (userId) {
//             getUser();
//         }
//     }, [userId]);

//     // Validation Rules and Form Submission Handler
  

//     return (
//         <section className="min-h-screen h-full max-w-md mx-auto flex flex-col pb-10 bg-white">
//             <div className="h-[100px] flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center px-4 text-white rounded-b-full w-full">
//                 <div className="w-full flex flex-col pt-10 justify-between items-center gap-2 h-full">
//                     <div className="w-full flex justify-between items-center relative z-10 -top-8">
//                         <button className="absolute left-0" onClick={() => router.push('/pages/profile')}>
//                             <RightArrowIcon className="w-8 h-8 text-white cursor-pointer rotate-180 stroke-2" />
//                         </button>
//                         <h2 className="font-semibold font-sans text-xl text-white text-center w-full">Edit Profile</h2>
//                     </div>

//                     <div className="flex flex-col items-start justify-end relative">
//                         <Image 
//                             alt="profile cover image" 
//                             src={uploadedAvatar || loggedInUser?.base?.avatar || default_user} 
//                             width={100} 
//                             height={100} 
//                             className="rounded-full aspect-square object-cover border-2 border-white shadow-md" 
//                         />
//                         <div className="absolute -right-2 bottom-9">
//                             <button onClick={handleShowModal} type="button">
//                                 <CameraIcon className="w-7 h-7 text-white bg-blue-500 rounded-full flex justify-center p-1 absolute -bottom-5 right-0 cursor-pointer stroke-2" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="h-full mt-12">
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 w-full">
                    
//                     {/* NAME FIELD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="name" className="font-medium text-xs text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10">Name</label>
//                         <input 
//                             type="text" 
//                             id="name" 
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className={`w-full border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2`} 
//                         />
//                         {errors.name && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.name}</span>}
//                     </div>

//                     {/* EMAIL FIELD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="email" className="font-medium text-xs text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10">Email</label>
//                         <input 
//                             type="email" 
//                             id="email" 
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className={`w-full border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2`} 
//                         />
//                         {errors.email && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.email}</span>}
//                     </div>

//                     {/* PHONE FIELD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="phone" className="text-xs text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10 font-medium">Phone</label>
//                         <div className="flex items-center gap-2">
//                             <div className="relative flex items-center bg-gray-50/50 border border-gray-300 rounded-md px-3 py-2 min-w-[96px] justify-between cursor-pointer">
//                                 <div className="flex items-center gap-1.5 select-none">
//                                     <svg className="w-5 h-4 rounded-sm object-cover" viewBox="0 0 6 4">
//                                         <rect width="6" height="4" fill="#00247D" />
//                                         <path d="M0,0 L6,4 M0,4 L6,0" stroke="#FFF" strokeWidth="0.6" />
//                                         <path d="M0,0 L6,4 M0,4 L6,0" stroke="#CF142B" strokeWidth="0.4" />
//                                         <path d="M3,0 L3,4 M0,2 L6,2" stroke="#FFF" strokeWidth="1" />
//                                         <path d="M3,0 L3,4 M0,2 L6,2" stroke="#CF142B" strokeWidth="0.6" />
//                                     </svg>
//                                     <span className="text-sm font-medium text-gray-800">+44</span>
//                                 </div>
//                                 <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>

//                             <input
//                                 type="tel"
//                                 id="phone"
//                                 pattern="[0-9]*"
//                                 placeholder="Phone"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 className={`w-full border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2`}
//                             />
//                         </div>
//                         {errors.phone && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.phone}</span>}
//                     </div>

//                     <hr className="border-gray-100 my-1" />

//                     {/* CURRENT PASSWORD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="currentPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10">
//                             Current Password <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="password"
//                             id="currentPassword"
//                             placeholder="Enter current password"
//                             value={currentPassword}
//                             onChange={(e) => setCurrentPassword(e.target.value)}
//                             className={`w-full border ${errors.currentPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2`}
//                         />
//                         {errors.currentPassword && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.currentPassword}</span>}
//                     </div>

//                     {/* NEW PASSWORD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="newPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10">New Password (Optional)</label>
//                         <input
//                             type="password"
//                             id="newPassword"
//                             placeholder="Enter new password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className={`w-full border ${errors.newPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2`}
//                         />
//                         {errors.newPassword && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.newPassword}</span>}
//                     </div>

//                     {/* CONFIRM NEW PASSWORD */}
//                     <div className="w-full flex flex-col relative">
//                         <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-500 absolute bg-white px-2 -top-2 left-4 z-10">Confirm New Password</label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             placeholder="Confirm new password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className={`w-full border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2`}
//                         />
//                         {errors.confirmPassword && <span className="text-[11px] text-red-500 mt-1 pl-2 font-medium">{errors.confirmPassword}</span>}
//                     </div>

//                     {/* SUBMIT BUTTON CONTAINER */}
//                     <div className="w-full mt-2">
//                         <button 
//                             type="submit" 
//                             className="w-full rounded-full bg-gradient-to-r from-purple-700 to-blue-700 py-2.5 text-white font-semibold cursor-pointer transition-all duration-300 hover:opacity-95 shadow-lg text-sm active:scale-[0.99]"
//                         >
//                             Save Changes
//                         </button>
//                     </div>

//                 </form>
//             </div>

//             {uploadImageModal && (
//                 <UploadImage
//                     onClose={handleShowModal}
//                     setImage={handleImageSubmit}
//                 />
//             )}
//         </section>
//     )
// }