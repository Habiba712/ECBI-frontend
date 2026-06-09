'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SettingsIcon from "../../public/svg/settings";
import DashboardIcon from "../../public/svg/dashboard";
import RestaurantIcon from "../../public/svg/restaurant";
import ReviewsIcon from "../../public/svg/reviews";
import LogoutIcon from "../../public/svg/logout";
import QRCodeIcon from "../../public/svg/qrCode";
import WalletIcon from "../../public/svg/wallet";
import PersonIcon from "../../public/svg/person";
import MenuBehaviorIcon from "../../public/svg/menuBehavior";
import NotificationsIcon from "../../public/svg/notifications";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [buisinessName, setBuisinessName] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);
    const [userId, setUserId] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifCount, setNotifCount] = useState(0);

    const isLoginPage = pathname.includes("/register") || 
                        pathname.includes("/login") || 
                        pathname.includes("/createOwner") || 
                        pathname.includes("/password");

    const getNotifs = async (currentUserId, currentToken) => {
        if (!currentUserId) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notif/getByReceipient/${currentUserId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                }
            });
            if (res.ok) {
                const data = await res.json();
                setNotifCount(data?.length || 0);
            }
        } catch (err) {
            console.log('Error fetching notifications', err);
        }
    };

    const getUser = async (currentUserId, currentToken) => {
        if (!currentUserId) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${currentUserId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                method: "GET"
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log('Fetched User Profile Data:', data);
                
                setFetchedUser(data?.user?.finalUser || null);
                
                // Defensive Fallback: Only overwrite role if the server explicitly provides a valid one
                if (data?.user?.base?.role) {
                    setRole(data.user.base.role);
                }
            }
        } catch (err) {
            console.log('Error fetching user profile:', err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ token })
            });
            if (res.ok) {
                localStorage.removeItem("sessionData");
                router.push("/pages/login");
            }
        } catch (err) {
            console.log('Logout failed:', err);
        }
    };

    const handleMenuButtonClick = () => {
        setMenuOpen(prev => !prev);
    };

     useEffect(() => {
        const rawData = localStorage?.getItem("sessionData");
        const sessionData = rawData ? JSON.parse(rawData) : null;
        
        if (sessionData) {
            setToken(sessionData.token || "");
            setRole(sessionData.role || "");
            setBuisinessName(sessionData.businessName || "");
            setUserId(sessionData.userId || "");
            
            // Execute updates using parameters immediately to prevent state sync lagging issues
            if (sessionData.userId) {
                getUser(sessionData.userId, sessionData.token);
                getNotifs(sessionData.userId, sessionData.token);
            }
        }
    }, [pathname]);

    // Hidden layout utility for login views
    if (isLoginPage) return null;

    return (
        <>
            {role === "FINAL_USER" && (
                <header 
                    className="z-100 gap-3 flex flex-col bg-white fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md mx-auto w-full transition-all duration-500 ease-in-out"
                    style={{
                        "background": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(175, 158, 158, 0.17))",
                        "WebkitBackdropFilter": "blur(20px)",
                        "backdropFilter": "blur(5px)",
                        "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.15)" 
                    }}
                >
                    <nav className="w-full transition-all duration-800 ease-in-out bg-white">
                        <ul className='pb-2 flex justify-center items-center gap-2'>
                            <li className='sidebar-li-mobile'>
                                <Link href="/pages/dashboard/inf" className={`nav-item ${pathname === '/pages/dashboard/inf' ? 'active' : ''}`}>
                                    <div className="icon-mobile">
                                        <DashboardIcon className="w-5 h-5 cursor-pointer" />
                                    </div>
                                </Link>
                            </li>
                            <li className='sidebar-li-mobile'>
                                <Link href='/pages/qrScan' className={`nav-item ${pathname === '/pages/qrScan' ? 'active' : ''}`}>
                                    <div className="icon-mobile"><QRCodeIcon className="w-5 h-5 cursor-pointer" /></div>
                                </Link>
                            </li>
                            <li className='sidebar-li-mobile'>
                                <Link href='/pages/notif' className={`nav-item ${pathname === '/pages/notif' ? 'active' : ''}`}>
                                    <div className="icon-mobile relative"> 
                                        <NotificationsIcon className="w-5 h-5 cursor-pointer" /> 
                                        {notifCount > 0 && (
                                            <span className="absolute -top-1 left-3 text-[6px] bg-red-500 rounded-full text-white w-3 h-3 flex items-center justify-center border-2 border-white">
                                                {notifCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                            <li className='sidebar-li-mobile'>
                                <Link href='/pages/wallet' className={`nav-item ${pathname === '/pages/wallet' ? 'active' : ''}`}>
                                    <div className="icon-mobile"><WalletIcon className="w-5 h-5 cursor-pointer" /></div>
                                </Link>
                            </li>
                            <li className='sidebar-li-mobile'>
                                <Link href='/pages/profile/inf' className={`nav-item ${pathname === '/pages/profile/inf' ? 'active' : ''}`}>
                                    <div className="icon-mobile"><PersonIcon className="w-5 h-5 cursor-pointer" /></div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}

            {role === "RESTO_SUPER_ADMIN" && (
                <header 
                    className={`gap-3 py-3 flex flex-col bg-white h-full min-h-screen sticky top-0 transition-all duration-500 ease-in-out ${menuOpen ? 'w-[80px]' : 'w-[260px]'}`}
                    style={{
                        "background": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(175, 158, 158, 0.17))",
                        "WebkitBackdropFilter": "blur(20px)",
                        "backdropFilter": "blur(5px)",
                        "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.15)"
                    }}
                >
                    <div className='pb-6 flex items-center w-fit border-b-3 border-gray-100 py-3 relative mx-4'>
                        <Image src={'/fancy_resto_bg.webp'} width={100} height={100} alt="logo" className='sidebar-top' />
                        <div className={`px-3 transition-all duration-800 ease-in-out text-nowrap ${menuOpen ? 'hidden opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                            <h1>{buisinessName || "Restaurant Admin"}</h1>
                            <span className='text-sm text-gray-400 word-nowrap words-break-all'>Management Hub</span>
                        </div>
                        <button
                            className={menuOpen ? 'transition-all duration-600 ease-in-out menu-button-open' : 'transition-all duration-600 ease-in-out menu-button-close'}
                            onClick={handleMenuButtonClick}
                        >
                            <MenuBehaviorIcon className='w-6 h-6 text-gray-900' />
                        </button>
                    </div>

                    <div className='flex flex-col gap-3 w-full relative grow'>
                        <nav className={`absolute top-0 left-0 px-3 transition-all duration-800 ease-in-out ${menuOpen ? '-translate-x-3' : 'opacity-100 translate-x-0'}`}>
                            <ul className='px-3 py-3 flex flex-col gap-7'>
                                <li className='sidebar-li'>
                                    <Link href="/pages/dashboard" className="flex items-center gap-3">
                                        <DashboardIcon className="w-6 h-6 cursor-pointer" />
                                        <span className={`transition-all duration-800 ease-in-out ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                            Home
                                        </span>
                                    </Link>
                                </li>
                                <li className='sidebar-li'>
                                    <Link href="/pages/pointOfSale/owner" className="flex items-center gap-3">
                                        <RestaurantIcon className="w-6 h-6 cursor-pointer" />
                                        <span className={`transition-all duration-800 ease-in-out ${menuOpen ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                                            Point Of Sale
                                        </span>
                                    </Link>
                                </li>
                                <li className='sidebar-li'>
                                    <Link href='/pages/reviews/owner' className="flex items-center gap-3">
                                        <ReviewsIcon className="w-6 h-6 cursor-pointer" />
                                        <span className={`transition-all duration-800 ease-in-out ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                            Reviews
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className='px-3 p-4 flex flex-col gap-5 border-t border-gray-100'>
                        <div className='sidebar-li'>
                            <Link href="/pages/accountSettings" className="flex items-center gap-3">
                                <SettingsIcon className="w-6 h-6 cursor-pointer" />
                                <span className={`transition-all duration-800 ease-in-out ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                    Settings
                                </span>
                            </Link>
                        </div>
                        <div className='sidebar-li'>
                            <button className="flex items-center gap-3 cursor-pointer w-full text-left" onClick={handleLogout}>
                                <LogoutIcon className="w-6 h-6 cursor-pointer text-red-500" />
                                <span className={`text-red-500 font-semibold transition-all duration-800 ease-in-out ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}