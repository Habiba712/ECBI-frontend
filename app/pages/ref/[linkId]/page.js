'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralPage({ params }) {
  const { linkId } = params;
  const router = useRouter();

  useEffect(() => {
    if (!linkId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/referralLink/getReferralLinkByLink/${linkId}`,
      { method: "GET" }
    ).finally(() => {
      router.replace("/");
    });

  }, [linkId, router]);

  return <p>Redirecting…</p>;
}
