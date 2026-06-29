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
    const [token, setToken] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [incorrectOldPassword, setIncorrectOldPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPhoneError, setNewPhoneError] = useState("");
    const [newNameError, setNewNameError] = useState("");

    // ── Data ─────────────────────────────────────────────────────────────────

    const notify = () => {
        toast.success('Your changes have been saved successfully');
        setTimeout(() => toast.dismiss(), 5000);
    };

    const getOwnerById = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${ownerId}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                method: "GET"
            });
            if (!res.ok) return;
            const data = await res.json();
            setNewEmail(data?.data?.base?.email);
            setNewPhone(data?.data?.base?.telephone);
            setNewName(data?.data?.base?.name);
            setNewBusinessName(data?.data?.ownerInfo?.businessName);
        } catch (err) {
            console.log('err', err);
        }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordError('Passwords do not match');
            return;
        }
        const data = {
            email: newEmail,
            telephone: newPhone,
            name: newName,
            oldPassword,
            password: newPasswordConfirm,
            preferences: {
                reviews_notifications: reviewsNotification,
                visits_notifications: newVisitsNotification,
                weekly_report: weeklyReportsNotification
            },
            businessName: newBusinessName
        };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/settingsUpdateById/${ownerId}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                method: "PUT",
                body: JSON.stringify({ data })
            });
            const result = await res.json();
            if (res.ok) {
                notify();
                setNewPasswordError(""); setIncorrectOldPassword(""); setNewPhoneError(""); setNewNameError("");
                return;
            }
            let arr = result?.message;
            if (typeof result?.message === "string" && result?.message !== "Old Password is incorrect") {
                try { arr = JSON.parse(result?.message); } catch (e) { console.error(e); return; }
            }
            setNewPasswordError(""); setIncorrectOldPassword(""); setNewPhoneError(""); setNewNameError("");
            if (Array.isArray(arr)) {
                arr.forEach(e => {
                    const field = e.path?.[0];
                    const msg = e.message;
                    if (field === "password") setNewPasswordError(msg);
                    else if (field === "oldPassword") setIncorrectOldPassword(msg);
                    else if (field === "telephone") setNewPhoneError(msg);
                    else if (field === "username") setNewNameError(msg);
                });
            } else {
                setIncorrectOldPassword(arr);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEmptyForm = () => {
        setNewEmail(""); setNewPhone(""); setNewName(""); setNewPassword("");
        setOldPassword(""); setNewPasswordConfirm(""); setNewPhoneError("");
        setNewBusinessName(""); setNewNameError(""); setIncorrectOldPassword("");
        setNewPasswordError("");
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData"));
        setOwnerId(sessionData?.userId);
        setToken(sessionData?.token);
    }, []);

    useEffect(() => {
        if (ownerId) getOwnerById();
    }, [ownerId]);

    // ── Shared input class ────────────────────────────────────────────────────

    const inputClass = (hasError) =>
        `w-full px-4 py-2.5 text-sm rounded-xl border transition-all outline-none focus:ring-2 ${
            hasError
                ? 'border-red-300 text-red-500 focus:ring-red-100 bg-red-50'
                : 'border-gray-200 text-gray-700 focus:ring-purple-100 focus:border-purple-400 bg-white'
        }`;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <section className="p-6 text-gray-800 w-full font-sans">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-400 mt-0.5">Manage your account, password and notification preferences.</p>
            </div>

            <div className="max-w-5xl">
                <form onSubmit={handleUpdateSettings} className="flex flex-col gap-5 ">

                    {/* Account Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Account Information</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Update your personal and business details</p>
                        </div>
                        <div className="px-6 py-5 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-start text-xs font-medium text-gray-600 w-fit">Owner Username</label>
                                    <input
                                        type="text"
                                        className={inputClass(!!newNameError)}
                                        placeholder="Enter your name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    {newNameError && <span className="text-xs text-red-400">{newNameError}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-600 w-fit ">Business Name</label>
                                    <input
                                        type="text"
                                        className={inputClass(false)}
                                        placeholder="Enter your business name"
                                        value={newBusinessName}
                                        onChange={(e) => setNewBusinessName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-600 w-fit ">Email</label>
                                    <input
                                        type="email"
                                        className={inputClass(false)}
                                        placeholder="Enter your email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-600 w-fit ">Phone</label>
                                    <input
                                        type="number"
                                        className={inputClass(!!newPhoneError)}
                                        placeholder="Enter your phone"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                    />
                                    {newPhoneError && <span className="text-xs text-red-400">{newPhoneError}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Change Password</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Leave blank to keep your current password</p>
                        </div>
                        <div className="px-6 py-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-600 w-fit ">Current Password</label>
                                <input
                                    type="password"
                                    className={inputClass(!!incorrectOldPassword)}
                                    placeholder="Enter your current password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                {incorrectOldPassword && <span className="text-xs text-red-400">{incorrectOldPassword}</span>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-600 w-fit ">New Password</label>
                                    <input
                                        type="password"
                                        className={inputClass(!!newPasswordError)}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {newPasswordError && <span className="text-xs text-red-400">{newPasswordError}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-600 w-fit ">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={inputClass(!!newPasswordError)}
                                        placeholder="Confirm new password"
                                        value={newPasswordConfirm}
                                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Notification Preferences</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Choose what you want to be notified about</p>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {[
                                {
                                    label: "Email Notifications",
                                    sub: "Get notified when customers leave reviews",
                                    checked: reviewsNotification,
                                    onChange: (e) => setReviewsNotification(e.target.checked)
                                },
                                {
                                    label: "New Visits",
                                    sub: "Get notified when customers check in",
                                    checked: newVisitsNotification,
                                    onChange: (e) => setNewVisitsNotification(e.target.checked)
                                },
                                {
                                    label: "Weekly Reports",
                                    sub: "Receive weekly analytics via email",
                                    checked: weeklyReportsNotification,
                                    onChange: (e) => setWeeklyReportsNotification(e.target.checked)
                                },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{item.label}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                                    </div>
                                    <Switch
                                        checked={item.checked}
                                        onChange={item.onChange}
                                        color="primary"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 py-2  w-full">
                        <div className="flex justify-between gap-3 px-4 py-2 ">
                             <button
                             
                            onClick={handleEmptyForm}
                            className="w-1/2 px-6 py-2.5 cursor-pointer  text-sm font-medium text-purple-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 text-nowrap px-6 py-2.5 text-sm font-medium text-white flex cursor-pointer justify-center items-center flex-nowrap flex-grow bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
                        >
                            Save Changes
                        </button>
                        </div>
                       
                    </div>

                </form>
            </div>

            <ToastContainer />
        </section>
    );
}