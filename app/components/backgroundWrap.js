'use client'

import { usePathname } from 'next/navigation';

export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname.includes("/register") ||
    pathname.includes("/login") ||
    pathname.includes("/createOwner") ||
    pathname.includes("/password");

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)] px-4">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full">
      {children}
    </div>
  );
}