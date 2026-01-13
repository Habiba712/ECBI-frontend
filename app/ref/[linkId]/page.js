'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralPage({ params }) {
  const { linkId } = params;
  const router = useRouter();

  console.log("linkId:", linkId);

  useEffect(() => {
    if (!linkId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinkByLink/${linkId}`,
      { method: "GET" }
    ).finally(() => {
      router.replace("/profile/inf");
    });

  }, [linkId, router]);

  return <p>Redirecting…</p>;
}
