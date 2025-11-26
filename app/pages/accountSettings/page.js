'use client'

import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
export default function AccountSettings() {

    const [reviewsNotification, setReviewsNotification] = useState(false);
    const [newVisitsNotification, setNewVisitsNotification] = useState(false);
    const [weeklyReportsNotification, setWeeklyReportsNotification] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newBusinessName, setNewBusinessName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newName, setNewName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const[businessName, setBusinessName]= useState("")
    const [ownerId, setOwnerId]= useState("")
    const [ownerById, setOwnerById] = useState();
    const [incorrectOldPassword, setIncorrectOldPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPhoneError, setNewPhoneError] = useState("");
    const [newNameError, setNewNameError] = useState("");

    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };
    console.log('reviews notificaitions selected', reviewsNotification);

    const notify = async () => {
        toast.success('Your changes have been saved successfully');
        setTimeout(() => {
            toast.dismiss();
        }, 5000);
    }
    const getOwnerById = async (next, req, res) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userOwnerId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization': `Bearer ${sessionData.token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            setOwnerById(res.data);
            setNewEmail(res.data.email);
            setNewPhone(res.data.telephone);
            setNewName(res.data.username);
            setNewVisitsNotification(res.data.preferences.visits_notifications);
            setReviewsNotification(res.data.preferences.reviews_notifications);
            setWeeklyReportsNotification(res.data.preferences.weekly_report);
            setNewBusinessName(res.data.businessName);

        } catch (err) {
            next(err)
        }
    }
    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        const data = {
            email: newEmail,
            telephone: newPhone,
            username: newName,
            oldPassword: oldPassword,
            password: newPasswordConfirm,
            preferences: {
                reviews_notifications: reviewsNotification,
                visits_notifications: newVisitsNotification,
                weekly_report: weeklyReportsNotification
            },
            businessName: newBusinessName
        }
        console.log('data to update', data);
        //    if(!newEmail || !newPhone || !newName || !oldPassword || !newPasswordConfirm){
        //        setErrorMessage('you did fill any fields!!');
        //        return false; 
        //    }


        if (newPassword !== newPasswordConfirm) {
            setNewPasswordError('Passwords do not match');
            return false;
        }
        setErrorMessage('');

        // maybe add a green icon with a check mark as in yes it is correct


        console.log('new email', newEmail);
        console.log('new phone', newPhone);
        console.log('new name', newName);
        console.log('old password', oldPassword);
        console.log('new password', newPassword);
        console.log('confirm password', newPasswordConfirm);
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/settingsUpdateById/${userOwnerId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    data
                })
            })
                const result = await res.json(); // ALWAYS parse JSON ONCE

            if (res.ok) {
        notify();
        window.scrollTo(0, 0);
           setNewPasswordError("");
    setIncorrectOldPassword("");
    setNewPhoneError("");
    setNewNameError("");
        return;
    }
let arr = result?.message;
console.log('arr', arr);


 // Your backend sends message: [ ... ]
    console.log('TYPE:', typeof arr);
    if(typeof result?.message === "string" && result?.message !== "Old Password is incorrect"){
        try{
        arr = JSON.parse(result?.message);
        console.log('arr 2', arr);

        }catch(e){
            console.error(e);
            return;
        }
    }

 
   

      // RESET previous errors
    setNewPasswordError("");
    setIncorrectOldPassword("");
    setNewPhoneError("");
    setNewNameError("");
    if(Array.isArray(arr)){
          arr.forEach(e => {
        const field = e.path?.[0];
        const msg = e.message;

        switch (field) {
            case "password":
                setNewPasswordError(msg);
                break;
            case "oldPassword":
                setIncorrectOldPassword(msg);
                break;
            case "telephone":
                setNewPhoneError(msg);
                break;
            case "username":
                setNewNameError(msg);
                break;
            default:
                console.warn("Unexpected error field:", field, msg);
        }
    })
    }else if(!Array.isArray(arr)){
            setIncorrectOldPassword(arr);

    }
              

        } catch (err) {
            console.error(err)
        }


    }
    const handleEmptyForm = async () =>{
        setNewEmail("");
        setNewPhone("");
        setNewName("");
        setNewPassword("");
        setOldPassword("");
        setNewPasswordConfirm("");
        setNewPhoneError("");
        setNewBusinessName("");
        setNewNameError("");
        setIncorrectOldPassword("");
        setNewPasswordError("");
        window.scrollTo(0, 0);

    
    }
console.log('error message', incorrectOldPassword);
console.log('error message', newPhoneError);
    useEffect(() => {
        getOwnerById();
        
        }, [])
    console.log('owner by id', ownerById);
    return (
        <section className="mt-1 p-4 text-gray-800 w-full  transition-all duration-300 ease-in-out">
            <div className="p-4 flex flex-col gap-2 settings-page mb-5">
                <h1 className="font-semibold  text-4xl font-sans
                 text-black">Settings</h1>
                <p className="text-gray-500">You can change your password, email, and other account settings here.</p>
            </div>
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleUpdateSettings}>
                    
                    <div className="p-5 mb-5 rounded-lg bg-white settings-form-container">
                        <h3 className="py-2 px-3 font-semibold">Account Imformation</h3>
                        <form>
                            <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                <label htmlFor="name">Userame</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full formFields"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                             <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                <label htmlFor="businessName">Business Name</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    className="w-full formFields"
                                    id="businessName"
                                    placeholder="Enter your business name"
                                    value={newBusinessName}
                                    onChange={(e) => setNewBusinessName(e.target.value)}
                                />
                            </div>
                            <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="w-full formFields"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </div>
                            <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="number"
                                    className="w-full formFields"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter your phone"
                                    value={newPhone}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                />
                                 {newPhoneError ? <span className="relative -top-2 px-3 text-red-400 text-sm ">{newPhoneError}</span> : null}
                            </div>

                        </form>

                    </div>
                    <div className="p-5 mb-5 rounded-lg bg-white settings-form-container">
                        <h3 className="py-2 px-3 font-semibold">Change Password</h3>


                        <div>
                            <div>
                                {/* //password */}
                                <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                    <label htmlFor="password">Current Password</label>
                                    <input
                                        type="password"
                                        className={`
                                            w-full 
                                            ${incorrectOldPassword ? ' border border-red-500 rounded-full px-4 py-2 text-sm text-red-400 focus:outline-none focus:ring-1 focus:ring-red-500' : ' formFields'}
                                            `}
                                        name="password"
                                        id="password"
                                        placeholder="Enter your old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                     {incorrectOldPassword ? <span className="relative -top-2 px-3 text-red-400 text-sm ">{incorrectOldPassword}</span> : null}
                                            
                                </div>
                                <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        type="password"
                                        className={`
                                            w-full 
                                            ${newPasswordError ? ' border border-red-500 rounded-full px-4 py-2 text-sm text-red-400 focus:outline-none focus:ring-1 focus:ring-red-500' : ' formFields'}
                                            `}
                                        name="password"
                                        id="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {newPasswordError ? <span className="px-3 text-red-500 text-sm relative -top-2">{newPasswordError}</span> : null}  
                                            
                                  
                                </div>
                                <div className="py-2 flex flex-col w-full gap-2 items- justify-center">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                          className={`
                                            w-full 
                                            ${newPasswordError ? ' border border-red-500 rounded-full px-4 py-2 text-sm text-red-400 focus:outline-none focus:ring-1 focus:ring-red-500' : ' formFields'}
                                            `}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={newPasswordConfirm}
                                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                    />
                                     {newPasswordError ? <span className="px-3 text-red-500 text-sm relative -top-2">{newPasswordError}</span> : null}
                                            
                                </div>
                            </div>

                        </div>



                    </div>

                    <div className="p-5 mb-5 rounded-lg bg-white  settings-form-container">
                        <h3 className="py-2 px-3 font-semibold">Notification Preferences</h3>
                        <div className="px-3 flex flex-col gap-3 items-between justify-center switch-container">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="switch-text">Email Notifications</p>
                                    <p className="switch-subtext">Get notified when customers leave reviews</p>
                                </div>
                                <div>
                                    <Switch
                                        checked={reviewsNotification}
                                        onChange={(e) => setReviewsNotification(e.target.checked)}
                                        color="primary"
                                    />

                                </div>

                            </div>

                            <div className="flex justify-between items-center switch-container">
                        <div>
                            <p className="switch-text">New Visits</p>
                            <p className="switch-subtext">Get notified when customers check in</p>
                        </div>
                        <div>
                            <Switch
                                        checked={newVisitsNotification}
                                        onChange={(e) => setNewVisitsNotification(e.target.checked)}
                                        color="primary"
                                    />
                        </div>
                        
                    </div>

                       <div className="flex justify-between items-center switch-container">
                        <div>
                            <p className="switch-text">Weekly Reports
</p>
                            <p className="switch-subtext">Receive weekly analytics via email</p>
                        </div>
                        <div>
                              <Switch
                                        checked={weeklyReportsNotification}
                                        onChange={(e) => setWeeklyReportsNotification(e.target.checked)}
                                        color="primary"
                                    />
                        </div>
                        
                    </div>

                        </div>

                    </div>
                    <div className="w-full flex justify-end items-center gap-3 py-6">
                        <button className="rounded-full bg-blue-500 py-2 px-5 w-40 text-white font-semibold cursor-pointer text-nowrap
                                                        hover:scale-110 transition-all duration-500 ease-in-out
                            "type="submit">Save All Changes</button>
                        <button className="w-40 rounded-full bg-white py-2 px-5  text-blue-500 border border-blue-500 font-semibold cursor-pointer
                            hover:scale-110 transition-all duration-500 ease-in-out
                           " 
                           onClick={()=>handleEmptyForm()}
                           >Cancel</button>
                      
                    </div>
                </form>

            </div>

  <ToastContainer 
  className="border border-transparent"
  />

        </section>
    )
}

