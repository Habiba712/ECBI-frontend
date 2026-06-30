'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isTimerActive) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsTimerActive(false);
          return 900;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
        setMessage("Email sent! Please check your inbox.");
        setTimeLeft(900);
        setIsTimerActive(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              {/* lock icon */}
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Forgot Password</h1>
            <p className="text-white/60 text-sm mt-1">
              {sent ? message : "Enter your email to reset your password"}
            </p>
          </div>

          {/* success state */}
          {sent && (
            <div
              style={{ borderRadius: "12px" }}
              className="mb-5 bg-green-500/20 border border-green-400/40 text-green-200 text-sm text-center py-3 px-4"
            >
              ✓ Check your inbox for the reset link
            </div>
          )}

          {/* error */}
          {errorMessage && (
            <div
              style={{ borderRadius: "12px" }}
              className="mb-5 bg-red-500/20 border border-red-400/40 text-red-200 text-sm text-center py-2.5 px-4"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isTimerActive}
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  width: "100%",
                  boxSizing: "border-box",
                  opacity: isTimerActive ? 0.5 : 1,
                }}
                className="px-4 py-3 text-sm placeholder-white/30 outline-none focus:border-white/50"
              />
            </div>

            {/* timer */}
            {isTimerActive && (
              <div className="text-center">
                <p className="text-white/50 text-xs mb-1">Resend available in</p>
                <p className="text-white font-bold text-lg tracking-widest">{formatTimer(timeLeft)}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isTimerActive}
              style={{
                borderRadius: "12px",
                width: "100%",
                boxSizing: "border-box",
              }}
              className="bg-white text-purple-700 font-bold py-3 text-sm hover:bg-white/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90"/>
                  </svg>
                  Sending...
                </>
              ) : isTimerActive ? "Email Sent" : "Send Reset Link"}
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