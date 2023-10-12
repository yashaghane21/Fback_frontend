import React, { useCallback } from 'react'
import { useState } from 'react'
import img from "./ss.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useAuth } from './AuthContext'
import { ThreeDots } from "react-loader-spinner"

const Login = () => {

  const navigate = useNavigate()
  const { auth, setauth, setsem, setcusername } = useAuth()
  const [email, setemail] = useState("")
  const [Password, setpassword] = useState("")
  const [loader, setloader] = useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloader(true)
    try {
      const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v1/login", {
        email: email,
        password: Password
      })
      if (data.success) {
        toast.success(" login succesfully ", {
          autoClose: 2000,
        });
        setloader(false)
        navigate("/")
        setauth({
          ...auth,
          user: data.user,
          token: data.token
        });
        localStorage.setItem("username", data?.user.name);
        setcusername(data.user.name)
        localStorage.setItem("userid", data?.user._id)
        localStorage.setItem("auth", JSON.stringify(data));
      }
      else {
        toast.error("check email or password")
        setloader(false)
      }


    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred:", error.message);
        setloader(false)
      }
    }
  }
  return (
    <div className='flex h-screen w-full'>

      <div className='hidden sm:flex justify-center items-center bg-blue-700 w-1/2'>
        <img src={img} alt='ff' className='w-[80%] h-[90%]' />
      </div>

      <div className='flex flex-col w-[100%] sm:w-1/2 justify-center items-center'>

        <form className='w-full px-6 md:px-[20vh]' onSubmit={handlesubmit}>
          <h1 className='text-center text-3xl font-bold'>Login</h1>
          {loader ? <section className='flex justify-center items-center'>
            <ThreeDots size={23} color='blue' />
          </section> :
            <>
            </>}
          <h1 className='font-bold text-lg '>Email:</h1>


          <input type='text' placeholder='Enter Email' className='w-full p-2 border-2 rounded-2xl mt-2 ' value={email} onChange={(e) => setemail(e.target.value)} />
          <h1 className='my-2 font-bold text-lg'>Password</h1>

          <input type='password' placeholder='Enter Password ' className='w-full p-2 border-2 rounded-2xl mt-2 ' value={Password} onChange={(e) => setpassword(e.target.value)} />


          <input type='submit' className='w-[100%] bg-blue-700 border-2 rounded-2xl font-bold p-2 mt-6 text-white' />

          <h1 className='text-center mt-2 font-semibold'>Not Registered ? <Link to="/signup" className='text-blue-800'>Register Here</Link></h1>
        </form>
      </div>
    </div>
  )

}

export default Login;
