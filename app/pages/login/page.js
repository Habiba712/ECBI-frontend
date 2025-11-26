'use client'
import { useState } from "react";
import SectionHeader from "../../components/sections/HeaderSection"
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);
        // const formData = new FormData();
        // formData.append("email", email);
        // formData.append("password", password);
      
        if (!email || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                headers: { 'content-Type': 'application/json' },
                method: "POST",
                credentials: 'include', 
                body: JSON.stringify({ email, password })
            }).then((res) => {
                if (res.ok) {
                    return res.json().then((data) => {
                        setToken(data.token);
                        setRole(data.role);
                        console.log(data.token);
                        localStorage.setItem("sessionData", JSON.stringify(data));
                       router.push("/");
                    });
                }
                else{
                    setErrorMessage("Invalid Credentials");
                }
            }
            )
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
            <SectionHeader title="Login" description="" />

            <div className="py-4  ">
                {errorMessage ? <p className="text-red-500 text-center">{errorMessage}</p> : null}
                <form className="flex flex-col gap-3 px-2 py-4  w-full"
                    onSubmit={handleLogin}
                >
                    <div className="border-b border-gray-300">
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
                        <div className="formFields flex justify-between w-full items-center py-2">
                            <div className=" flex justify-center items-center ">
                                <label className="">Password</label>

                            </div>
                            <div className=" flex items-center justify-center"> <input
                                className=""
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /></div>

                        </div>
                        <div className="w-full flex justify-center items-center py-2 gap-3">
                            <button type="submit">Login</button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between w-full py-2 px-2 text-center items-center gap-3">

                            <p className="text-sm text-gray-500">Don't have an account? </p><a className="text-md font-semibold hover:scale-90 transition-all ease-in-out" href="/pages/register">Register</a>
                        </div>
                        <div className="flex justify-between items-center w-full py-2 px-2 gap-3"><p className="text-sm text-gray-500">

                            forgot your password?
                        </p><a className="text-md font-semibold hover:scale-90 transition-all ease-in-out" href="/pages/password/forgot">Forgot Password</a>
                        </div>
                    </div>


                </form>
            </div>
        </section>
    )
}