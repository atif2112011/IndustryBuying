import { useNavigate } from 'react-router-dom'
import login1 from '../assets/images/loginpage/login2.jpg'
function Login(){

    const navigate=useNavigate();


    return<div className="flex items-center justify-center h-screen">
        <div className="flex flex-row w-3/5 h-3/4 rounded-2xl shadow-xl bg-white">

        {/* Left Div */}
        <div className="w-3/5 h-full">
        <img src={login1} alt="loginPage" className='h-full w-full rounded-2xl p-1'></img></div>
        {/* Left Div end*/}


        {/* Right Div  */}
        <div className="w-2/5 h-full py-10 px-8 flex flex-col">
        
        <div className='flex flex-col gap-1'>
        <p className='!text-xl !text-black font-semibold'>Sign In</p>
        <p className='!text-sm !text-gray-500'>Welcome !</p>
        </div>

        <div className='flex flex-col flex-1 justify-center gap-6'>
            
        
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
                <label className='!text-sm !text-gray-600'>Email</label>
                <input type="email" placeholder="Enter email" className='!text-sm !text-gray-500 border-1 border-gray-200 rounded-sm p-2 outline-none'></input>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='!text-sm !text-gray-600'>Password</label>
                <input type="password" placeholder="Enter password" className='!text-sm !text-gray-500 border-1 border-gray-200 rounded-sm p-2 outline-none'></input>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='!text-xs !text-blue-500 cursor-pointer transition-transform duration-200 hover:scale-105'>Forgot Password ?</p>
                <button className='bg-blue-500 !text-sm text-white rounded-md shadow-md py-2 px-10 transition-transform duration-200 hover:scale-105'>Login</button>
            </div>    
        </div>

        <button className='bg-white !text-sm border-1 border-gray-200 rounded-sm shadow-md px-2 py-2 items-center flex flex-row gap-4 justify-center transition-transform duration-200 hover:scale-105'>
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg> 
        Continue with Google  
        </button>
        <p className='!text-xs text-center transition-transform duration-200 hover:scale-105'>Don't have an account?  <span className='!text-xs !text-blue-500 cursor-pointer ' onClick={()=>{navigate('/user/register')}}>Register Here</span></p>

        </div>
        
        </div>
        {/* Right Div end */}
        </div>
    </div>
}

export default Login