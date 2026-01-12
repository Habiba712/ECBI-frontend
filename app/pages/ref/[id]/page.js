'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReferralPage() {
  const router = useRouter();
  const { linkId } = router.query;

  useEffect(() => {
    if (!linkId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/referralLink/getReferralLinkByLink/${linkId}`, {
      method: "GET",
      credentials: "include",
    })
      .finally(() => {
        router.replace("/"); // or /pos/[id]
      });

  }, [linkId]);

  return <p>Redirecting…</p>;
}
