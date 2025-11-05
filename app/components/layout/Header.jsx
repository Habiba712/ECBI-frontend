'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SettingsIcon from "../../../public/svg/settings";
import DashboardIcon from "../../../public/svg/dashboard";
import RestaurantIcon from "../../../public/svg/restaurant";
import ReviewsIcon from "../../../public/svg/reviews";
export default function Header() {
    const pathname = usePathname();
    console.log(pathname.includes("/register"));
    const sessionData = JSON.parse(localStorage?.getItem("sessionData"));
    const token = sessionData?.token;
    const role = sessionData?.role;
    const buisinessName = sessionData?.businessName;

    const isLoginPage = pathname.includes("/register") || pathname.includes("/login") || pathname.includes("/createOwner") || pathname.includes("/password");

    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ token })
            }).then((res) => {
                if (res.ok) {
                    localStorage.removeItem("sessionData");
                    router.push("/");
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }



    return (

        <header className={`${isLoginPage ? 'hidden' : ' gap-3 py-3 flex bg-white justify-between items-center w-full'} : `}
         style={{
                "background": "linear-gradient(135deg,rgba (255,255,255,0.1),rgba(175, 158, 158, 0.17))",
                "WebkitBackdropFilter": "blur(20px)",
                "backdropFilter": "blur(5px)",
                "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.15)"
                 
            }}
        
        >

            <div className='px-3 py-3 flex jusitfy-between 
            w-fit'>
                <h1 className='font-bold  text-2xl text-navy-600 px-4 py-2 cursor-pointer  hover:scale-110 transition-all duration-300 w-full ease-in-out'
                style={{
                    
                }}
                >{buisinessName}</h1>
            </div>
            <div className='flex '>
                <nav className='w-fit'>
                    <ul className='px-3 py-3 w-full flex jusitfy-between gap-4' >
                        <li>
                            <a href="/pages/dashboard">
                                 <DashboardIcon className="w-7 h-7 cursor-pointer text-gray-500" />
                            </a>
                           
                        </li>
                        {
                            role === "RESTO_SUPER_ADMIN" && <li><a href="/pages/pointOfSale">
                                <RestaurantIcon className="w-7 h-7 cursor-pointer text-gray-500" />
                                </a></li>
                        }
                        <li>
                            <a href='/pages/reviews/owner'><ReviewsIcon className="w-7 h-7 cursor-pointer text-gray-500" />
                                </a>
                        </li>
                      
                        
                       
                    </ul>
                </nav>
                 <div className='px-3 py-3 flex justify-between w-fit justify-self-end gap-3'>
                   <SettingsIcon className="w-7 h-7 cursor-pointer text-gray-500" />
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
                {/* </div> */}

               

            </div>
            </div>
           





        </header>


    )
}