

'use client'
    // console.log('data to add', data);
import { Suspense, use } from "react";
import ReferralPage from "../../components/modals/referral";
import AuthWrapper from "../../utils/withAuth";

export default function ReferralPageLink({params}) {
    const { id } = use(Promise.resolve(params));
  
    return (
       <Suspense fallback={<div>Loading...</div>}>
        <AuthWrapper>
           <ReferralPage params={id} />
        </AuthWrapper>
       </Suspense>
    
    )
}