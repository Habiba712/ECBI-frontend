'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        headers: { "content-Type": "application/json" },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("sessionData", JSON.stringify(data));
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict; Secure`;
        router.push("/");
      } else {
        setErrorMessage("Invalid email or password.");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* 
      This outer div fills whatever the BackgroundWrapper gives it.
      px-4 keeps 16px breathing room on both sides on any screen.
      w-full + overflow-hidden prevents the horizontal bleed you're seeing.
    */
    <div className="w-full overflow-hidden px-4 py-8 flex justify-center items-center min-h-screen bg-[linear-gradient(135deg,#6D5BFF_0%,#8A7CFF_35%,#A78BFA_70%,#60A5FA_100%)]">
      <div
        className="w-full"
        style={{ maxWidth: "400px" }}
      >
        {/* glass card */}
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
              <span className="text-purple-600 text-xl font-black">E</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Login</h1>
            <p className="text-white/60 text-sm mt-1">Everybody Can Be Influencer</p>
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

          {/* form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* email field */}
            <div className="flex flex-col items-start gap-1.5">
              <label className=" text-white/70 text-xs font-semibold ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="px-4 py-3 text-sm placeholder-white/30 outline-none focus:border-white/50 "
              />
            </div>

            {/* password field */}
            <div className="flex flex-col items-start gap-1.5">
              <label className=" text-white/70 text-xs font-semibold ml-1">Password</label>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                         </div>
            </div>

            {/* forgot */}
            <div className="flex justify-end -mt-1">
              <a href="/pages/password/forgot" className="text-xs text-white/50 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isLoading}
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
                  Signing in...
                </>
              ) : "Sign In"}
            </button>
          </form>

          {/* links */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">Don&apos;t have an account?</p>
              <a href="/pages/register" className="text-white text-sm font-semibold hover:underline transition-all">
                Register
              </a>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">Forgot your password?</p>
              <a href="/pages/password/forgot" className="text-white text-sm font-semibold hover:underline transition-all">
                Reset it
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}