'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    console.log(pathname.includes("/register"));
    const sessionData = JSON.parse(localStorage?.getItem("sessionData"));
    const token = sessionData?.token;
    const role = sessionData?.role;

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

        <header className={`${isLoginPage ? 'hidden' : 'border gap-3 py-3 flex justify-between w-full'} : `}>

            <div className='px-3 py-3 flex jusitfy-between 
            w-fit'>
                <h1 className='font-bold  text-2xl text-navy-600 px-4 py-2 cursor-pointer  hover:scale-110 transition-all duration-300 w-full ease-in-out'
                style={{
                    
                }}
                >Point of Sale</h1>
            </div>
            <div className='flex border'>
                <nav className='w-fit'>
                    <ul className='px-3 py-3 w-full flex jusitfy-between gap-4' >
                        <li>Home</li>
                        {
                            role === "RESTO_SUPER_ADMIN" && <li><a href="/pages/pointOfSale">
                                My Point of Sale</a></li>
                        }
                      
                        <li>Products</li>  
                       
                    </ul>
                </nav>
                 <div className='px-3 py-3 flex justify-between w-fit justify-self-end gap-3'>
                <div>
                    <p>Welcome {role === "SUPER_ADMIN" ? "Admin" : role === "RESTO_SUPER_ADMIN" ? "Owner" : "User"}</p>
                </div>
                <div> {token ? <button className="cursor-pointer"onClick={handleLogout}>
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
                }</div>

               

            </div>
            </div>
           





        </header>


    )
}