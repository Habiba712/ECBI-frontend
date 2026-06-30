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
import defaultUser from "../../public/default_user.png";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [token, setToken] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [role, setRole] = useState("");
    const [buisinessName, setBuisinessName] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);
    const [userId, setUserId] = useState("");
    const [menuOpen, setMenuOpen] = useState(true);
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
                console.log('data', data)
                console.log('Fetched User Profile Data:', data?.user?.base?.avatar);

                setCoverImage(data?.user?.base?.avatar);
                
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
                                            <span className="absolute -top-1 left-3 text-[8px] bg-red-500 rounded-full text-white w-[15px] h-[15px] flex items-center justify-center border-2 border-white">
                                                {notifCount > 10 ? '+9' : notifCount}
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
    <header className={`flex flex-col bg-white h-full min-h-screen sticky top-0 border-r border-gray-100 transition-all duration-300 ease-in-out ${menuOpen ? 'w-[245px]' : 'w-[60px]'}`}>
        {
            menuOpen ? (
                 <div className="flex items-center gap-3 mb-3 mt-6 px-4 w-full">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            ECBI
          </span>
        </div>
 
            )
            : 
            (
                <div className="flex items-center gap-3 mb-3 mt-6 px-4 w-full">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" fill="white" />
            </svg>
          </div>
          
        </div> 
            )
        }
      
        
        {/* Top: logo + business */}
        <div className={`flex items-center border-b border-gray-100 p-4 gap-3 overflow-hidden`}>
            <Image 
                src={coverImage || defaultUser} 
                width={40} height={40} 
                alt="logo" 
                className="rounded-full object-cover aspect-square flex-shrink-0" 
            />
            <div className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                <span className="font-semibold text-gray-800 text-sm whitespace-nowrap truncate">
                    {buisinessName || "Restaurant Admin"}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap">Management Hub</span>
                  
            </div>
          <button 
                onClick={handleMenuButtonClick}
                className={`${menuOpen ? 'bg-white text-gray-500 rounded-full p-3 w-10 h-10 flex items-center justify-center border-2 border-gray-200 transition-all duration-300 ease-in-out cursor-pointer' : ' hidden'}`}
            >
                <MenuBehaviorIcon className="w-5 h-5 text-gray-500" />
            </button>
        </div>
        <div className=" flex justify-center items-center rounded-full px-3 ">
            <button onClick={handleMenuButtonClick} className={`${menuOpen === false ? 'bg-white text-gray-500  w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer' : ' hidden'}`}>
                <MenuBehaviorIcon className="w-5 h-5 text-gray-400 stroke-2 rotate-180" />
            </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-4 px-3 overflow-hidden">
            {[
                { href: "/pages/dashboard", label: "Home", Icon: DashboardIcon, active: pathname === '/pages/dashboard' },
                { href: "/pages/pointOfSale/owner", label: "My Points Of Sale", Icon: RestaurantIcon, active: pathname === '/pages/pointOfSale/owner' },
                { href: "/pages/reviews/owner", label: "Reviews", Icon: ReviewsIcon, active: pathname === '/pages/reviews/owner' },
                { href: "/pages/accountSettings", label: "Settings", Icon: SettingsIcon, active: pathname === '/pages/accountSettings' },
            ].map(({ href, label, Icon, active }) => (
                <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group w-full
                        ${!menuOpen && 'justify-center'}
                        ${active 
                            ? 'bg-purple-50 text-purple-600' 
                            : 'text-gray-900 hover:bg-gray-50 hover:text-gray-500'
                        }`}
                >
                 
                <Icon className={`w-5 h-5 flex-shrink-0 stroke-2 ${active ? 'text-purple-600' : 'text-gray-900 group-hover:text-gray-500'}
                
                `} />
                   
                   {
                    menuOpen && <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden `}>
                        {label}
                    </span>
                   } 
                </Link>
            ))}
        </nav>

        {/* Bottom: settings + logout */}
        <div className="flex flex-col  justify-end gap-1 px-3 py-5">
           
            <button
                onClick={handleLogout}
                className=" flex justify-center items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full cursor-pointer"
            >
                <LogoutIcon className="w-5 h-5  flex-shrink-0 " />
                <span className={` text-sm flex justify-start font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden  ${menuOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                    Logout
                </span>
            </button>

            {/* Version */}
            <div className={`mt-2 px-3 transition-all duration-300 overflow-hidden ${menuOpen ? 'w-full opacity-100' : 'hidden'}`}>
                <p className="text-xs text-gray-300">ECBI v1.0.0</p>
                <p className="text-xs text-gray-300">Powered by <span className="font-semibold text-gray-400">ECBI</span> <span className="text-purple-400">♥</span></p>
            </div>
        </div>
    </header>
)}
        </>
    );
}