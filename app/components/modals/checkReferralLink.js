

'use client'
import { useEffect, useState } from "react";

export default function CheckReferralLink() {
    const id = "692f6edd819f5cdcd659276c";
    const [owner, setOwner] = useState("");
    const [myReferralLinksForThisPos, setMyReferralLinksForThisPos] = useState([]);

    const findReferralLink = async () => {
    if (!owner || !id) return;
            const params = new URLSearchParams({
    posId: id,
    visitorId: owner
});
 
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getAllReferralLinks?${params.toString()}`);
            const data = await res.json();
            console.log('dataaaa', data);
            setMyReferralLinksForThisPos(data);
            // console.log('data', data.referralLinks);
            return data.referralLink;

        } catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        const sessionData = JSON.parse(localStorage?.getItem("sessionData")) ? JSON.parse(localStorage?.getItem("sessionData")) : null;
        setOwner(sessionData?.userId);
    }, []);

    useEffect(() => {
        console.log('oue', owner, id)
        findReferralLink();
    }, [id, owner])
    console.log('referral links', myReferralLinksForThisPos);
    return (
        <div className="z-0 w-full  bg-black/50 fixed inset-0
        flex items-center justify-center  h-full max-w-md mx-auto px-3 ">

            <div className="bg-white rounded-lg p-6 w-full min-h-100 felx flex-col mx-6">
                <h2 className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-3 py-2 text-center font-semibold rounded-full">Check your referral link</h2>
            </div>
        </div>
    )
}