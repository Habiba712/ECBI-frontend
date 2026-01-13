'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralPage({ params }) {
    console.log('params', params);
  const { linkId } = params;
  const router = useRouter();
  console.log('linkIdkkkk', linkId);

  useEffect(() => {
    if (!linkId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinkByLink/${linkId}`,
      { method: "GET" }
    ).then((res) => {
      console.log('resss', res);
      if (res.ok) {
        console.log('ok');
        router.push(`/pages/profile/inf`);
      }
    });

  }, []);

  return <p>Redirecting…</p>;
}
