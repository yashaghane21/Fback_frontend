import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Select } from "antd"
import { toast } from "react-hot-toast"
import img from "./login1.png"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from 'react-router-dom'
const Option = Select


const Signup = () => {

  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [Password, setpassword] = useState("")
  const [enroll, setenroll] = useState("")
  const [phone, setphone] = useState("")
  const [departments, setdepartments] = useState([]);
  const [dept, setdept] = useState("")
  const [semester, setsemester] = useState([]);
  const [sem, setsem] = useState("")
  const [loader, setloader] = useState(false)

  const alldepartments = async () => {
    try {
      setloader(true)
      const response = await axios.get("https://f-backend-7g5y.onrender.com/api/v1/department");
      console.log(response.data.departments);
      setdepartments(response.data.departments);
      setloader(false)
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    setloader(true)
    try {
      setloader(true)
      const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v1/register", {
        name: name,
        email: email,
        Enroll: enroll,
        password: Password,
        phone: phone,
        department: dept,
        sem: sem
      });
      console.log(data)
      if (data.success) {
        toast.success("Registration Successfully ! ", {
          autoClose: 2000,

        })
        setloader(false)
        navigate("/login")
      }
      else {
        toast.warn("user already exist", {
          autoClose: 2000,
        })
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.warn(error.response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred:", error.message);
      }
    }

  }

  // http://localhost:5000/api/v1/getsembydep

  const getsems = async (dep) => {
    console.log("dd", dep);
    setloader(true)
    try {
      setloader(true)
      const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v1/getsembydep`, {
        dep: dep
      });

      console.log(data.sems);
      setsemester(data.sems);
      setloader(false)

    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };


  const handlechange = (value) => {
    console.log("department", value)
    getsems(value)
    setdept(value)

  };

  const handlesem = (value) => {
    console.log("sem", value);
    setsem(value);
  };

  useEffect(() => {

    alldepartments();

  }, [])




  return (
    <div className='flex h-screen'>

      <div className='hidden sm:flex justify-center items-center bg-blue-500 w-1/2'>
        <img src={img} alt='ff' className='w-[50%] h-[40%]' />
      </div>

      <div className='flex flex-col w-[100%] sm:w-1/2 justify-center items-center'>

        <form className='w-full px-6 md:px-[20vh]' onSubmit={handlesubmit}>

          <h1 className='text-center text-2xl font-bold'>Signup</h1>
          {loader ? <section className='flex justify-center items-center'>
            <ThreeDots height="20"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true} />
          </section> :
            <>
            </>}
          <input type='text' placeholder='Name ' className='w-full p-2 border-2 mt-5 my-2 rounded-2xl'
            value={name} onChange={(e) => setname(e.target.value)} />
          <input type='email' placeholder='Enter Email' className='w-full p-2 border-2  my-2 rounded-2xl'
            value={email} onChange={(e) => setemail(e.target.value)} />
          <input type='text' placeholder='Enter Password ' className='w-full p-2 border-2 my-2 rounded-2xl'
            value={Password} onChange={(e) => setpassword(e.target.value)} />
          <input type='text' placeholder='Enter Enroll' className='w-full p-2 border-2 rounded-2xl my-2 '
            value={enroll} onChange={(e) => setenroll(e.target.value)} />
          <input type='text' placeholder='Enter Phone ' className='w-full p-2 border-2 rounded-2xl '
            value={phone} onChange={(e) => setphone(e.target.value)} />

          <Select className='w-full ant-input text-xl mt-4 rounded-2xl ' placeholder='Select a Department' onChange={handlechange}>
            {departments.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>

          <Select className='w-full ant-input text-xl mt-4 rounded-2xl ' placeholder='Select a semester' onChange={handlesem}>
            {semester.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>

          <input type='submit' className='w-[100%] bg-blue-700 border-2 rounded-2xl  p-2 mt-6 text-white' />
          <h1 className='text-center mt-2 font-semibold'>Already Registered ? <Link to="/login" className='text-blue-800'>Sign in Here</Link></h1>
        </form>
      </div>
    </div>
  )


}

export default Signup
