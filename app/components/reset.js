"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setErrorMessage("Please enter a new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      if (res.ok) {
        router.push("/pages/login");
      } else {
        setErrorMessage("Reset link is invalid or expired.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
    >
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );

  return (
    <div className="w-full overflow-hidden px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="w-full" style={{ maxWidth: "400px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.13)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            borderRadius: "24px",
          }}
          className="w-full p-6"
        >
          {/* header */}
          <div className="text-center mb-8">
            <div
              style={{ borderRadius: "14px" }}
              className="inline-flex items-center justify-center w-12 h-12 bg-white mb-4"
            >
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Reset Password</h1>
            <p className="text-white/60 text-sm mt-1">Enter your new password below</p>
          </div>

          {/* error */}
          {errorMessage && (
            <div
              style={{ borderRadius: "12px" }}
              className="mb-5 bg-red-500/20 border border-red-400/40 text-red-200 text-sm text-center py-2.5 px-4"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* new password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">New Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "white",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  className="px-4 py-3 pr-11 text-sm placeholder-white/30 outline-none focus:border-white/50"
                />
                <EyeToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
              </div>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "white",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  className="px-4 py-3 pr-11 text-sm placeholder-white/30 outline-none focus:border-white/50"
                />
                <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                borderRadius: "12px",
                width: "100%",
                boxSizing: "border-box",
              }}
              className="bg-white text-purple-700 font-bold py-3 text-sm hover:bg-white/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-1"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90"/>
                  </svg>
                  Saving...
                </>
              ) : "Save New Password"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-white/60">Remember your password?</p>
            <a href="/pages/login" className="text-white text-sm font-semibold hover:underline transition-all">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}