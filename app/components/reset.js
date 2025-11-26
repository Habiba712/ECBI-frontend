"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeaders from "./sections/HeaderSection";
 
export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log('token',token);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    }).then((res)=> {
    if (res.ok) router.push("/pages/login");
    }
    )
   
  };

  return (
     <section className="flex flex-col items-center justify-center mx-auto max-w-md p-4 text-gray-300 border-gray-300 rounded-lg shadow-lg "
                style={{
                    "background": "linear-gradient(135deg,rgba (255,255,255,0.1),rgba(175, 158, 158, 0.17))",
                    "WebkitBackdropFilter": "blur(20px)",
                    "backdropFilter": "blur(5px)",
                    "boxShadow": "0 8px 20px 0 rgba(0,0,0,0.37)",
                    "border": "1px solid rgba(255,255,255,0.18)",
                    "borderRadius": "20px",
                }}
            >
                <SectionHeaders title="Reset Your Password" description="Enter your new password" />
    
                <div className="py-4 w-full flex flex-col gap-3">
                    {errorMessage ? <p className="text-red-500 text-center">{errorMessage}</p> : null}
                    <form className="flex flex-col gap-3 px-2 py-4 w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="border-gray-300 w-full">
                            <div className="formFields flex justify-between w-full items-center py-2">
                               
                                <div className=" flex items-center justify-center w-full"> <input
                                    className=""
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
    
                                /></div>
    
                            </div>
                           
                            <div className="w-full flex justify-center items-center py-2 gap-3">
                                <button type="submit">Save</button>
                            </div>
                        </div>
    
                     
    
                    </form>
                </div>
            </section>
  );
}
