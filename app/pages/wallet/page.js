
"use client";

import { useState, useEffect } from 'react';
import RightArrowIcon from '../../../public/svg/rightArrow';
import { QuestionMarkIcon } from '../../../public/svg/question-mark';


export default function WalletPage() {
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    return (
        <section className="min-h-screen h-full max-w-md mx-auto flex flex-col   w-full mb-20">
            <div className={`h-[100px] flex flex-col justify-start  items-center  px-4 py-3 text-white rounded-b-full w-full bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]`}
            >
                <div className="w-full flex items-center justify-between relative z-10 ">

                     <button
                        onClick={() => router.back()}
                        className=""
                    >
                        <RightArrowIcon className="w-6 h-6 text-white rotate-180 stroke-2 cursor-pointer" />
                    </button>

                    <h2
                        className="w-full text-center"
                        style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            letterSpacing: ".5px",
                            color: "white",
                            opacity: 0.95,
                            fontFamily: "sans-serif",
                        }}
                    >
                        My Wallet
                    </h2>

                        <button>
                            <QuestionMarkIcon className="w-6 h-6 text-white cursor-pointer " />
                            </button>


                </div>



            </div>
            <div>
                
            </div>
        </section>
    )
}