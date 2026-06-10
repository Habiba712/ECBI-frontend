'use client'
import { useEffect, useState } from "react";
import SectionHeader from "../../components/sections/HeaderSection"
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CreateOwner() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [telephone, setTelephone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [iseAuthorized, setIseAuthorized] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const[session, setSession] = useState("")
    const router = useRouter();
      

//     useEffect(()=>{
//         const session = localStorage.getItem("sessionData");
//         if(!session){
//             router.push("/pages/login");
//         }
//        let sessionInfo;

//        try{
//           sessionInfo = JSON.parse(session);
//           setSession(sessionInfo);
//        }catch{
//             router.push("/pages/login");
// return
//        }
//        if(sessionInfo.token && sessionInfo.role === "SUPER_ADMIN"){
       
//             setIseAuthorized(true);
//             console.log("admin", sessionData.role);

//           }
//           else{
//               setIseAuthorized(false);
//               router.push("/pages/login");
//           }

          
       
//     },[router])
    const handleCancel = () => {
        setEmail("");
        setPassword("");
        setBusinessName("");
        setName("");
        setTelephone("");
    }
    const handleCreateOwner = async (e) => {
        e.preventDefault();
        console.log(email, password, telephone, name, businessName);
        // const formData = new FormData();
        // formData.append("email", email);
        // formData.append("password", password);
      
        if (!email || !password) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }
        // we need to ckech th token and role before redirecting to 
        

        // const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        // if(session && session.role === "SUPER_ADMIN"){
        //     console.log("admin", session.role);

              try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/createOwner`, {
                headers: { 'Content-Type': 'application/json'

                    ,'Authorization': `Bearer ${session.token}`
                   
                    
                 },
                method: "POST",
                body: JSON.stringify({ 
                    email,
                    name,
                    businessName,
                    telephone,
                    password })
            }).then((res) => {
                if (res.ok) {
                           router.push("/pages/login");
                 
                }
            }
            )
        } catch (err) {
            console.log(err);
            alert("Invalid Credentials");
        }
        // }
        // else{
        //     alert("You are not authorized to create an owner");
        //     router.push("/");
        // }

      


    }

    // if(iseAuthorized === null){
    //     return <div className="flex items-center justify-center h-screen text-white">Checking Permission...</div>
    // }
    // if(iseAuthorized === false){
    //     return <div className="flex items-center justify-center h-screen text-white">You are not authorized here :( </div>
    // }
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
            <SectionHeader title="Register" description="Welcome to the ECBI system" />

            <div className="py-4">
                <form className="flex flex-col gap-3 px-2 py-4  w-full"
                    onSubmit={handleCreateOwner}
                >
                    <div className="">
                        <div className="formFields flex justify-between w-full items-center py-2">
                            <div className=" flex justify-center items-center ">
                                <label className="">Name</label>

                            </div>
                            <div className=" flex items-center justify-center"> <input
                                className=""
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            /></div>

                        </div>
                          <div className="formFields flex justify-between w-full items-center py-2">
                            <div className=" flex justify-center items-center ">
                                <label className="">Business Name</label>

                            </div>
                            <div className=" flex items-center justify-center"> <input
                                className=""
                                type="text"
                                placeholder="Enter your business name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}

                            /></div>

                        </div>
                         <div className="formFields flex justify-between w-full items-center py-2">
                            <div className=" flex justify-center items-center ">
                                <label className="">Phone</label>

                            </div>
                            <div className=" flex items-center justify-center"> <input
                                className=""
                                type="text"
                                placeholder="Enter your phone number"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}

                            /></div>

                        </div>
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
                        <div className="w-full flex flex-col justify-center items-center gap-3">
                            <button className="auth-button"  type="submit">Save Owner</button>
                            <button type="button" onClick={()=> handleCancel()}  className="bg-white text-blue-800 font-semibold text-md hover:scale-110 transition-all duration-300 w-full ease-in-out">Cancel</button>
                            <div
                            
                            className="flex justify-end items-center w-full py-3 gap-3">
                                {/* <div className="flex justify-center items-start  w-full h-full">
                                    <label className="flex justify-center items-start ">Remember me  <input className="h-full flex justify-center items-end" type="checkbox" id="remember" name="remember"  /></label>
                                </div> */}
                                
                               
                                </div>
                        </div>
                    </div>

                    {/* <div className="mt-8">
                        <div className="flex justify-between w-full py-2 px-2 text-center items-center gap-3">

                            <p className="text-sm text-gray-500">Don't have an account? </p><a className="text-md font-semibold hover:scale-90 transition-all ease-in-out" href="/pages/register">Save</a>
                        </div>
                        <div className="flex justify-between items-center w-full py-2 px-2 gap-3"><p className="text-sm text-gray-500">

                            forgot your password?
                        </p><a className="text-md font-semibold hover:scale-90 transition-all ease-in-out" href="/pages/forgot-password">Forgot Password</a>
                        </div>
                    </div> */}


                </form>
            </div>
        </section>
    )
}