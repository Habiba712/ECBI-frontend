'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReferralPage({ params }) {
  const id = params; // directly use params.id in client component
  console.log('id', id);
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchReferral = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinkByLink/${id}`
        ).then((res) => res.json().
        then((data) => 
            {
                console.log('data', data);
                setData(data)
            } ));
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
                  <div className="h-[200px] flex flex-col justify-center bg-gradient-to-r from-purple-800 to-blue-600 items-center w-full py-5 px-4 text-white">
                      <div className="flex gap-2 w-full px-5 py-5">
                          <div className="flex flex-col items-start justify-center">
                              {/* <Image src={loggedInUser?.base?.avatar} alt="pos cover image" width={50} height={50} className="rounded-full" /> */}
                          </div>
                          <div className="flex flex-col items-start justify-center px-1">
                              <h5 className=" flex items-end font-semibold text-lg ">
                                  {/* {loggedInUser?.base?.name} */}
                              </h5>
                              <p className=" font-sm ">
                                  {/* {loggedInUser?.base?.username} */}
                              </p>
                          </div>
                      </div>
      
                      <div className="w-full flex justify-around">
                          <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                              {/* <h4 className="text-xl font-semibold">{loggedInUser?.finalUser?.points}</h4> */}
                              <p className="text-lg ">Points</p>
                          </div>
                          <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                              {/* <h4 className="text-xl font-semibold">{loggedInUser?.finalUser?.posts?.length}</h4> */}
                              <p className="text-lg ">Posts</p>
                          </div>
                          <div className="rounded-lg bg-black-100  flex flex-col justify-center items-center px-5 py-2 max-w-24 w-full bg-white/30 backdrop-blur-lg">
                              <h4 className="text-xl font-semibold">0</h4>
                              <p className="text-lg">Referrals</p>
                          </div>
                      </div>
      
                  </div>
                  </section>
    );
  }

  return <p>Referral not found</p>;
}
