'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SettingsIcon from "../../public/svg/settings";
import DashboardIcon from "../../public/svg/dashboard";
import RestaurantIcon from "../../public/svg/restaurant";
import ReviewsIcon from "../../public/svg/reviews";
import LogoutIcon from "../../public/svg/logout";
import QRCodeIcon from "../../public/svg/qrCode";
import WalletIcon from "../../public/svg/wallet";
import PersonIcon from "../../public/svg/person";
import MenuBehaviorIcon from "../../public/svg/menuBehavior";
import { useRouter } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    console.log(pathname.includes("/register"));
    const router = useRouter();
    console.log('pathname', pathname);


    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [buisinessName, setBuisinessName] = useState("");
    const [fetchedUSer, setFetchedUser] = useState(null);
    const [userId, setUserId] = useState();
    const isLoginPage = pathname.includes("/register") || pathname.includes("/login") || pathname.includes("/createOwner") || pathname.includes("/password");
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ token })
            }).then((res) => {
                if (res.ok) {
                    localStorage.removeItem("sessionData");
                    router.push("/pages/login");
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }

    const handleMenuButtonClick = () => {
        setMenuOpen(prev => !prev);
    }

    const getUser = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log('data', data);
                        setFetchedUser(data?.data);
                        setUserId(data?.data?._id);
                        setRole(data?.data?.base.role)
                    })
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData")) ? JSON.parse(localStorage?.getItem("sessionData")) : null;
        setToken(sessionData?.token);
        setRole(sessionData?.role);
        setBuisinessName(sessionData?.businessName);
        setUserId(sessionData?.userId);
        console.log('id', userId);
    }, [pathname])
    useEffect(() => {
        if (userId) getUser();
    }, [userId])

    console.log('menu state', menuOpen);
    console.log('user', fetchedUSer, userId, role);
    return (
        <>

            {
                role === "FINAL_USER" ? <header className={`
            gap-3 flex flex-col bg-white fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md mx-auto w-full

            transition-all duration-500 ease-in-out
            ${isLoginPage ? 'hidden' : ''}
            
        `}
                    style={{
                        "background": "linear-gradient(135deg,rgba (255,255,255,0.1),rgba(175, 158, 158, 0.17))",
                        "WebkitBackdropFilter": "blur(20px)",
                        "backdropFilter": "blur(5px)",
                        "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.15)"

                    }}

                >

                    <nav
                        className={`w-full transition-all duration-800 ease-in-out `}
                    >
                        <ul className='py-3 flex justify-center items-center gap-2' >
                            <li className='sidebar-li-mobile'>

                                <Link href="/pages/dashboard/inf"
                                    className={`nav-item
                                ${pathname === '/pages/dashboard/inf' ? 'active' : ''}`}>
                                    <div className="icon-mobile">
                                        <DashboardIcon className=" w-5 h-5 cursor-pointer" />
                                    </div>

                                    <span
                                        className={`link-text transition-all duration-800 ease-in-out
                                          ${pathname === '/pages/dashboard/inf' ? 'link-text-on' : ''}`}>
                                        Home
                                    </span>

                                </Link>



                            </li>
                            <li className='sidebar-li-mobile'>

                                <Link href='/pages/qrScan' className={`nav-item
                                ${pathname === '/pages/qrScan' ? 'active' : ''}
                                `


                                }>
                                    <div className="icon-mobile"> <QRCodeIcon className=" w-5 h-5 cursor-pointer" /> </div>
                                    <span
                                        className={` link-text transition-all duration-800 ease-in-out
                                          ${pathname === '/pages/qrScan' ? 'link-text-on' : ''}
              `}
                                    >
                                        QR
                                    </span>                 </Link>
                            </li>

                            <li className='sidebar-li-mobile'>

                                <Link href='/pages/wallet' className={`nav-item
                                ${pathname === '/pages/wallet' ? 'active' : ''}
                                `


                                }>
                                    <div className="icon-mobile"> <WalletIcon className=" w-5 h-5 cursor-pointer" /> </div>
                                    <span
                                        className={` link-text transition-all duration-800 ease-in-out
                                          ${pathname === '/pages/wallet' ? 'link-text-on' : ''}
              `}
                                    >
                                        Wallet
                                    </span>                  </Link>
                            </li>
                            <li className='sidebar-li-mobile'>

                                <Link href='/pages/profile/inf' className={`nav-item  ${pathname === '/pages/profile/inf' ? 'active' : ''}
        `}>
                                    <div className="icon-mobile">  <PersonIcon className=" w-5 h-5 cursor-pointer" />
                                    </div>
                                    <span className={` link-text transition-all duration-800 ease-in-out
                                          ${pathname === '/pages/profile/inf' ? 'link-text-on' : ''}
              `}

                                    >
                                        Profile
                                    </span>                   </Link>
                            </li>




                        </ul>
                    </nav>
                </header>
                    : role === "RESTO_SUPER_ADMIN" ?

                        <header className={`${role === "FINAL_USER" && 'hidden'}
            gap-3 py-3 flex flex-col bg-white h-full min-h-screen sticky top-0
            transition-all duration-500 ease-in-out
            ${isLoginPage ? 'hidden' : ''}
            ${menuOpen ? 'w-[80px]' : 'w-[260px]'}
        `}
                            style={{
                                "background": "linear-gradient(135deg,rgba (255,255,255,0.1),rgba(175, 158, 158, 0.17))",
                                "WebkitBackdropFilter": "blur(20px)",
                                "backdropFilter": "blur(5px)",
                                "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.15)"

                            }}

                        >

                            <div className='pb-6 flex items-center w-fit border-b-3 border-gray-100 py-3 relative mx-4  '>

                                <Image src={'/fancy_resto_bg.webp'} width={100} height={100} alt="logo" className='sidebar-top' />
                                <div className={`px-3 transition-all duration-800 ease-in-out text-nowrap
                  ${menuOpen ? 'hidden opacity-0 translate-x-4 ' : 'opacity-100 translate-x-0'}`}>
                                    <h1>{buisinessName}</h1>
                                    <span className='text-sm text-gray-400 word-nowrap words-break-all '> iiuy998u98u98uc</span>
                                </div>

                                <button
                                    className={menuOpen ? 'transition-all duration-600 ease-in-out menu-button-open' : 'transition-all duration-600 ease-in-out menu-button-close'}
                                    onClick={() => handleMenuButtonClick()}
                                >
                                    <MenuBehaviorIcon className='w-6 h-6 text-gray-900' />
                                </button>

                            </div>
                            <div className='flex flex-col gap-3 w-full relative'>



                                <nav
                                    className={`absolute top-0 left-0 px-3 transition-all duration-800 ease-in-out
                  ${menuOpen ? '-translate-x-3' : 'opacity-100 translate-x-0'}`}
                                >
                                    <ul className='px-3 py-3 flex flex-col  gap-7' >
                                        <li className='sidebar-li'>
                                            <Link href="/pages/dashboard">
                                                <DashboardIcon className="w-6 h-6 cursor-pointer " />
                                                <span
                                                    className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                                                >
                                                    Home
                                                </span>

                                            </Link>


                                        </li>
                                        {
                                            role === "RESTO_SUPER_ADMIN" ?
                                                <>
                                                    <li className='sidebar-li'>

                                                        <Link href="/pages/pointOfSale/owner">
                                                            <RestaurantIcon className="w-6 h-6 cursor-pointer" />                      <span
                                                                className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 ' : 'opacity-100 translate-x-0'}`}
                                                            >
                                                                Point Of Sale
                                                            </span></Link>
                                                    </li>

                                                    <li className='sidebar-li'>

                                                        <Link href='/pages/reviews/owner'><ReviewsIcon className="w-6 h-6 cursor-pointer" />                      <span
                                                            className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                                                        >
                                                            Reviews
                                                        </span></Link>
                                                    </li>
                                                </>

                                                :

                                                role === "FINAL_USER" ?
                                                    <>
                                                        <li className='sidebar-li'>

                                                            <Link href='/pages/qrScan'><QRCodeIcon className="w-6 h-6 cursor-pointer" />                      <span
                                                                className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                                                            >
                                                                QR Scan
                                                            </span></Link>
                                                        </li>
                                                    </>
                                                    : ""
                                        }




                                    </ul>
                                </nav>

                            </div>
                            <div className='px-3 absolute bottom-20 flex justify-between w-full justify-self-end gap-3 transition-all duration-300 ease-in-out'>
                                <ul className='flex flex-col gap-5'>
                                    <li className='sidebar-li'>
                                        <Link href="/pages/accountSettings">  <SettingsIcon className="w-6 h-6 cursor-pointer" />
                                            <span
                                                className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                                            >
                                                Settings
                                            </span></Link>
                                    </li>
                                    <li className='sidebar-li'>

                                        <button className="flex gap-2 cursor-pointer" onClick={() => handleLogout()} >
                                            <LogoutIcon className="w-6 h-6 cursor-pointer text-red-500" />
                                            <span className={`text-red-500 font-semibold transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                                            >
                                                Logout
                                            </span></button>
                                    </li>
                                </ul>



                            </div>





                        </header>
                        : null
            }



        </>



    )
}

