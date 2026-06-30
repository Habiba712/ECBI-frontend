'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import default_user from "../../../public/default_user.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setName("");
    setTelephone("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !telephone) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, name, telephone, password, default_user }),
      });
      if (res.ok) {
        router.push("/pages/login");
      } else {
        setErrorMessage("This email is already registered.");
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
              <span className="text-purple-600 text-xl font-black">E</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Register</h1>
            <p className="text-white/60 text-sm mt-1">Welcome to the ECBI system</p>
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* name */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="px-4 py-3 text-sm placeholder-white/30 outline-none focus:border-white/50"
              />
            </div>

            {/* email */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Email</label>
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
                className="px-4 py-3 text-sm placeholder-white/30 outline-none focus:border-white/50"
              />
            </div>

            {/* phone */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="px-4 py-3 text-sm placeholder-white/30 outline-none focus:border-white/50"
              />
            </div>

            {/* password */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-white/70 text-xs font-semibold ml-1">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
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
                {/* <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
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
                </button> */}
              </div>
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
              className="bg-white text-purple-700 font-bold py-3 text-sm hover:bg-white/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-1"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90"/>
                  </svg>
                  Creating account...
                </>
              ) : "Create Account"}
            </button>

            {/* cancel */}
            <button
              type="button"
              onClick={handleCancel}
              style={{
                borderRadius: "12px",
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
              className="text-white/70 font-semibold py-3 text-sm hover:bg-white/10 active:scale-95 transition-all"
            >
              Clear
            </button>
          </form>

          {/* login link */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-white/60">Already have an account?</p>
            <a href="/pages/login" className="text-white text-sm font-semibold hover:underline transition-all">
              Sign In
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}