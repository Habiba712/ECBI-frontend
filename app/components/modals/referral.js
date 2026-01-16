'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GiftIcon from '../../../public/svg/gift';
import Link from 'next/link';

export default function ReferralPage({ params }) {
    const id = params; // directly use params.id in client component
    console.log('id', id);
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posData, setPosData] = useState(null);
    const [referrerUser, setReferrerUser] = useState(null);
    // const [loadingPos, setLoadingPos] = useState(true);
    useEffect(() => {
        if (!id) return;

        const fetchReferral = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinkByLink/${id}`
                ).then((res) => res.json().
                    then((data) => {
                        console.log('data', data);
                        setData(data)
                        setPosData(data?.pos)
                        setReferrerUser(data?.referrerUser)
                    }));
                ;
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReferral();
    }, [id]);

    //next I need to fetch for the user "Friend"
    //fetch the POS for the image bg, the name



    if (loading) return <p>Loading…</p>;

    // optionally redirect if needed
    if (data) {
        // router.push('/profile/inf'); // uncomment when ready
        return (
            <section className="min-h-screen h-full max-w-md mx-auto  overflow-scroll w-full  mb-15">
                {/* first section */}
                <div className="h-[300px] flex flex-col justify-center items-center w-full py-6 px-3 text-white bg-cover bg-center rounded-br-full rounded-bl-full relative overflow-hidden"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(107, 33, 168, 0.5), rgba(37, 99, 235, 0.5)), url('${posData?.coverImage}')`
                    }}>
                    <div className="flex flex-col items-center justify-center gap-2 w-full py-6 px-2 h-full ">
                        <div className="flex flex-col items-start w-full justify-start h-full ">
                            <h2 className='font-semibold text-xl w-100 text-center'>Hey! Your friend {referrerUser?.base?.name} sent you a gift.</h2>
                            <span className='px-6 text-xs font-thin'>Via {posData?.name}</span>
                            <div className='w-full  flex flex-col  items-center justify-center'>
                                <div className='border-4 rounded-full'>
                                    <Image src={referrerUser?.base?.avatar} alt="pos cover image" width={100} height={100} className="rounded-full" />

                                </div>
                                <div className="flex flex-col items-start justify-center rounded-full w-15 h-15 bg-white py-2 relative left-8 -top-10">
                                    <div className='w-full flex justify-center'>
                                        <GiftIcon className="stroke-purple-500 w-5 h-5 text-black" />
                                    </div>

                                    <span className='text-black font-semibold whitespace-wrap text-center px-1'
                                        style={{
                                            fontSize: "10px"
                                        }}
                                    >{posData?.name}</span>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                <div className="flex flex-col items-start justify-center px-3 py-3">
                    <h3 className='font-semibold'>
                        Value Propsition
                    </h3>
                    <p className='font-semibold py-2'>
                        Discover <span className='text-purple-700'>{posData?.name}</span> , one of the best spots for delicious cofee & pastries. If check in today, you help {posData?.name} to ear <span className='text-purple-700'>50  points </span>, and we'll give YOU <span className='text-purple-700'>20  points </span>as a welcome gift!
                    </p>
                    <h4
                    className=' text-sm font-semibold text-center w-full mb-2'
                    >{referrerUser?.base?.name}'s Reward</h4>
                    <div className='h-5 flex items-center justify-between  bg-gray-100 mb-4 w-full  rounded-full overflow-hidden gap-2 px-1'>
                        <div
                        className={`h-3 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 transition-all duration-500 ease-in-out w-${loading === true ? '0' : '50'}`}
                        ></div>
                        <GiftIcon className="w-5 h-5 stroke-purple-500" />
                    </div>


                    <h3 className='font-semibold'>
                        Action Zone</h3>
                    <div className='w-full my-3 flex justify-center transition-all duration-500 ease-in-out '>
                        <button 
                        
                        className="w-full animation-bounce rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 cursor-pointer text-white font-semibold hover:animate-pulse transition-all duration-500 ease-in-out">
                            <Link href="/pages/qrScan">Let's Go !</Link>
                        </button>
                    </div>
                    <span className='text-xs text-gray-500 text-center w-full'>
                        it only takes 30 seconds to set your profile!
                    </span>
                    <span className='mt-3 text-xs text-blue-400 font-semibold border-b-1 border-blue-400 text-center w-fit mx-auto cursor-pointer hover:text-blue-500 transition-all duration-500 ease-in-out'>
                        <Link href="/pages/login">Already have an account? Log in</Link>
                        
                    </span>
                </div>

            </section>
        );
    }

    return <p>Referral not found</p>;
}
