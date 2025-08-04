import { useNavigate, useParams } from "react-router-dom";
import login1 from "../assets/images/loginpage/login2.jpg";
import { useState } from "react";
import { loginUser, ResetPassword } from "../apis/auth";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";
import { useAuth } from "../contexts/AuthContext";


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setMessage, setShowSnackBar } = useAlert();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [mailSend, setMailSend] = useState(false);
  const { setLoading } = useLoader();
  const { setUser } = useAuth();
  const {token}=useParams();

  const handleGoogleAuth = async () => {
    window.location.href =
      import.meta.env.VITE_PRODUCTION == "true"
        ? "/auth/google"
        : "http://localhost:5000/auth/google";
    // "http://localhost:5000";
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) throw new Error("Please fill all the Details");
      const response = await loginUser({ email, password });
      if (response.success) {
        setMessage(response.message);
        setShowSnackBar(true);
        navigate("/");
      } else throw new Error(response.message);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setShowSnackBar(true);
    }
  };

  const handleSendMail=async()=>{
    if(!token)
    {
      setMessage("No Valid Token !Use Link Sent By Email");
      setShowSnackBar(true);
      return
    }
    setLoading(true);
    const response=await ResetPassword({password:forgotPasswordEmail,token:token});
    setLoading(false);
    if(response.success){
      setMessage(response.message);
      setShowSnackBar(true);
      setMailSend(true);
    }
    else{
      setMessage(response.message);
      setShowSnackBar(true);
    }
    
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-9/10 md:flex-row md:w-3/5 md:h-3/4 rounded-2xl shadow-xl bg-white">
        {/* Left Div */}
        <div className="hidden md:block w-3/5 h-full">
          <img
            src={login1}
            alt="loginPage"
            className="h-full w-full rounded-2xl p-1 object-cover"
          ></img>
        </div>
        {/* Left Div end*/}

        {/* Right Div  */}
        {(
          <div className="md:w-2/5 h-full py-8 md:py-10 px-8 flex flex-col">
            <div className="flex flex-col gap-1 md:m-0 mb-4">
              <p className="!text-xl !text-black font-semibold">Forgot Password</p>
              <p className="!text-sm !text-gray-500">Welcome! Enter your new password</p>
            </div>

            <div className="flex flex-col flex-1 justify-center gap-6">
              {!mailSend? <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label className="!text-sm !text-gray-600">Enter your new Password :</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="!text-sm !text-gray-500 border-1 border-gray-200 rounded-sm p-2 outline-none"
                  ></input>
                </div>
                
                <div className="flex flex-row justify-between flex-wrap">
                  <button
                    onClick={handleSendMail}
                    className="bg-blue-500 !text-sm text-white rounded-md shadow-md py-2 px-10 transition-transform duration-200 hover:scale-105"
                  >
                    Reset Password
                  </button>
                </div>
              </div>:<div className="flex flex-col gap-6">
                
                <p className="!text-xs md:!text-sm !text-green-800 font-semibold">Your Password has been reset. Login from <a onClick={()=>navigate("/user/login")} className="text-blue-600 cursor-pointer">here</a></p>
                
            
                
                
              </div>}

              
             
            </div>
          </div>
        )}
        {/* Right Div end */}
      </div>
    </div>
  );
}

export default ForgotPassword;
