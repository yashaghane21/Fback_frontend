import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import u from "./Manage/user.png"
import axios from 'axios'
import { toast } from "react-hot-toast"
const Edit = () => {
  const id = localStorage.getItem("userid")
  const { theme } = useAuth()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [dob, setdob] = useState("")
  const [gender, setgender] = useState("")
  const getUserData = async () => {
    try {
      console.log("Fetching user data for id:", id)
      const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v3/user`, {
        id: id
      })
      console.log(data.user)
      setname(data.user.name)
      setemail(data.user.email)
      setphone(data.user.phone)
      setgender(data.user.gender)
      setdob(data.user.dob)

    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const upfac = async (e) => {
    e.preventDefault();
    console.log("dfshfgh")
    try {
      const { data } = await axios.put("https://vercel-zpzg.vercel.app/api/v2/updatehod", {
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        dob: dob,
        id: id
      });
      console.log(data)
      if (data.success) {
        toast.success(" Profile updated Succesfully  ", {
          autoClose: 2000,
        });

      }
    } catch (error) {
      // Handle error
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto  w-full`}>

      <h1 className={`p-2 mx-2 sm:mt-10 font-bold text-2xl ${theme == "light" ? "text-black" : "text-white"}`}>Edit Profile</h1>
      <section className='h-[10%] mt-5 flex' >
        <img src={u} className='h-[90%] mx-5' alt='ss' />
        <h1 className={`font-bold mt-2 text-lg ${theme == "light" ? "text-black" : "text-white"}`}>{name}</h1>
      </section>
      <form onSubmit={upfac}>
        <section className='mx-5'>
          <section>
            <h1 className={` font-bold  ${theme == "light" ? "text-black" : "text-white"}`}>Name</h1>
            <input defaultValue={name} type='text'
              value={name}
              onChange={(e) => setname(e.target.value)}
              className={`p-1 py-2 sm:w-[40%] w-[100%] px-4  rounded-md ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] text-white border-none"}`} />
          </section >

          <h1 className={` font-bold my-2 ${theme == "light" ? "text-black" : "text-white"}`}>Email</h1>
          <input defaultValue={email} type='text'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className={`p-1 py-2 sm:w-[40%] w-[100%] px-4  rounded-md ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] text-white border-none"}`} />

          <h1 className={` my-1 font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Gender</h1>
          <select
            onChange={(e) => setgender(e.target.value)} placeholder="Selct a gender" className={`p-1 py-2 sm:w-[40%] w-[100%] px-4  rounded-md ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] text-white border-none"}`} >
            <option value="" disabled selected hidden>
              Select a gender
            </option>
            <option>Male</option>
            <option>Female</option>

          </select>
          <h1 className={` my-1 font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Phone</h1>
          <input defaultValue={phone} type='text'
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            className={`p-1 py-2 sm:w-[40%] w-[100%] px-4  rounded-md ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] text-white border-none"}`} />
          <h1 className={` my-1 font-bold ${theme == "light" ? "text-black" : "text-white"}`}>DOB</h1>
          <input type='date'
            defaultValue={dob}
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            className={`p-1 py-2 sm:w-[40%] w-[100%] px-4  rounded-md ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none text-white bg-[#0c131d] border-none"}`} />

          <section className='flex justify-center sm:w-[40%] w-[100%]'>
            <button
              type='submit'
              className={`p-1 mt-5 font-bold py-2 sm:w-[20%] w-[400%] px-4  rounded-md ${theme == "light" ? "bg-blue-700 text-white" : "focus:outline-none bg-blue-700 border-none"
                }`}
            >
              Submit
            </button>


          </section>
        </section >
      </form >

      {/* <div className='flex justify-start h-[28%] items-center'>
        <h1>Edit Profile</h1>
      </div> */}
    </div >
  )
}

export default Edit
