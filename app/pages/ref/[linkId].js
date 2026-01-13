'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ReferralPage() {
  const router = useRouter();
  const { linkId } = router.query;

  console.log("linkId:", linkId);

  useEffect(() => {
    if (!router.isReady || !linkId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/referralLink/getReferralLinkByLink/${linkId}`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          router.push("/pages/profile/inf");
        }
      })
      .catch(console.error);

  }, [router.isReady, linkId]);

  return <p>Redirecting…</p>;
}
