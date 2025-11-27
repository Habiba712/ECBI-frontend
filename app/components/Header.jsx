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
import MenuBehaviorIcon from "../../public/svg/menuBehavior";
import { useRouter } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    console.log(pathname.includes("/register"));
    const router = useRouter();


    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [buisinessName, setBuisinessName] = useState("");
    const [fetchedUSer, setFetchedUser] = useState(null);

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
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById/${userOwnerId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    method: "GET"
                }
            ).then((res) => {
                if (res.ok) {
                    setFetchedUser(res.json());
                }
            }
            )
        } catch (err) {
            next(err)
        }
    }
    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData")) ? JSON.parse(localStorage?.getItem("sessionData")) : null;
        setToken(sessionData?.token);
        setRole(sessionData?.role);
        setBuisinessName(sessionData?.businessName);
        getUser();
    }, [])

    console.log('menu state', menuOpen);
    console.log('user', fetchedUSer);
    return (

        <header className={`
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
                            role === "RESTO_SUPER_ADMIN" &&
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

                          
                        }
                        {
                            role === "FINAL_USER" &&
                            <>
                              <li className='sidebar-li'>

                            <Link href='/pages/reviews/owner'><QRCodeIcon className="w-6 h-6 cursor-pointer" />                      <span
                                className={`transition-all duration-800 ease-in-out
              ${menuOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
                            >
                                QR Scan
                            </span></Link>
                        </li>
                            </>
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


    )
}

{/* <div>
                    <p>Welcome {role === "SUPER_ADMIN" ? "Admin" : role === "RESTO_SUPER_ADMIN" ? "Owner" : "User"}</p>
                </div>
                <div
                
                >  */}
{/* {token ? <button className="cursor-pointer"onClick={handleLogout}>
                     Logout
                </button> : <button>
                    <Link href="/pages/register"> Login</Link>
                </button>}


                {token && role === "SUPER_ADMIN" &&
                    <button>
                        <Link href="/pages/createOwner"> Create Owner</Link>
                    </button>
                }
                {
                    !token && <button >
                        <Link href="/pages/login"> Login</Link>
                    </button>
                }
                 */}
{/* </div> */ }
