'use client'
import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import SectionHeaders from "../../../components/sections/HeaderSection";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage]= useState("Please enter your email to reset your password");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [timeLeft, setTimeLeft] = useState(900); // 900 seconds = 15 minutes
const [isTimerActive, setIsTimerActive] = useState(false);

    const router = useRouter();
    useEffect(()=>{

        if (!isTimerActive) {
            return;
        }
        const interval = setInterval(()=>{
            setTimeLeft(prev=>{
                if(prev <= 0){
                    clearInterval(interval);
                    setIsTimerActive(false);
                    return 900;

                }
                else{
                    return prev -1;
                }
            })

        },1000)

        return ()=> clearInterval(interval);

    },[isTimerActive])

    const formatTimer = (seconds) =>{
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
      
       
        if (!email) {
            setErrorMessage('Please enter your email');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ email })
            }).then((res)=>{
                if(res.ok){
setMessage("Email sent, please check your inbox");
 setTimeLeft(900); // reset to 15 minutes
  setIsTimerActive(true);
                }
            })
        } catch (err) {
            console.log(err);
           
        }


    }
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
            <SectionHeaders title="Forgot Password" description={isTimerActive && message} />

            <div className="">
                {errorMessage ? <p className="w-70 text-red-500 text-center">{errorMessage}</p> : null}
              
                <form className="flex flex-col gap-3 px-2 py-4 mt-4 w-full"
                    onSubmit={handleForgotPassword}
                >
                    <div className="border-gray-300">
                        <div className="formFields flex justify-between w-full items-center py-2">
                            <div className=" flex justify-center items-center ">
                                <label className="">Email</label>

                            </div>
                            <div className=" flex items-center justify-center"> <input
                                className=""
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            /></div>

                        </div>
                       
                        <div className="w-full flex justify-center items-center py-2 gap-3">
                            <button type="submit">Send</button>
                        </div>
                        <div lassName="w-full flex justify-center items-center py-2 gap-3">
                            {isTimerActive && <p className="w-full text-center">Time Left: {formatTimer(timeLeft)}</p>}
                        </div>
                    </div>

                 

                </form>
            </div>
        </section>
    )
}