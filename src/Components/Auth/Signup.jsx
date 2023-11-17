import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Select } from "antd"
import { toast } from "react-hot-toast"
import { ThreeDots } from "react-loader-spinner"
import lottie from 'lottie-web';
import animationData from "./react.json"
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
  const [sshift, setshifts] = useState([])
  const [s, sets] = useState("")

  const alldepartments = async () => {
    try {
      setloader(true)
      const response = await axios.get("https://vercel-zpzg.vercel.app/api/v1/department");
      console.log(response.data.departments);
      setdepartments(response.data.departments);
      setloader(false)
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const shifts = async () => {
    const { data } = await axios.get("https://vercel-zpzg.vercel.app/api/v1/shifts")
    console.log(data)
    setshifts(data.shifts)
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloader(true)

    if (dept === "" || sem === "") {
      toast.error("Please fill all fields");

    }
    if (Password.length !== 6) {
      toast.error("Password  size should be 6 letters");
    }
    try {
      setloader(true)
      const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v1/register", {
        name: name,
        email: email,
        Enroll: enroll,
        password: Password,
        phone: phone,
        department: dept,
        sem: sem,
        shift: s
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
        toast.error("user already exist", {
          autoClose: 2000,
        })
        setloader(false)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          autoClose: 2000,
        });
        setloader(false)
      } else {
        toast.error("An error occurred:", error.message);
        setloader(false)
      }
    }

  }

  // http://localhost:5000/api/v1/getsembydep

  const getsems = async (dep) => {
    console.log("dd", dep);
    setloader(true)
    try {
      setloader(true)
      const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v1/getsembydep`, {
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
  const handles = (value) => {
    console.log("sem", value);
    sets(value);
  };

  useEffect(() => {

    alldepartments();
    shifts();
    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData, // Your animation data
    });
    return () => anim.destroy(); // Clean up animation on component unmount
  }, []);






  return (
    <div className='flex h-screen'>

      <div className='hidden sm:flex justify-center items-center w-1/2'>
        <div id="lottie-container" style={{ width: '800px', height: '600px' }} />
      </div>

      <div className='flex flex-col w-[100%] sm:w-1/2 justify-center items-center'>

        <form className='w-full px-6 md:px-[20vh]' onSubmit={handlesubmit}>

          <h1 className='text-center text-2xl font-bold text-blue-700'>Signup</h1>
          {loader ? <section className='flex justify-center items-center'>
            <ThreeDots size={23} color='blue' />
          </section> :
            <>
            </>}
          <input type='text' required placeholder='Name ' className='w-full p-2 border-2 mt-5 my-2 rounded-2xl'
            value={name} onChange={(e) => setname(e.target.value)} />
          <input type='email' required placeholder='Enter Email' className='w-full p-2 border-2  my-2 rounded-2xl'
            value={email} onChange={(e) => setemail(e.target.value)} />
          <input type='text' required placeholder='Enter Password ' className='w-full p-2 border-2 my-2 rounded-2xl'
            value={Password} onChange={(e) => setpassword(e.target.value)} />
          <input type='text' required placeholder='Enter Enroll' className='w-full p-2 border-2 rounded-2xl my-2 '
            value={enroll} onChange={(e) => setenroll(e.target.value)} />
          <input type='text' required placeholder='Enter Phone ' className='w-full p-2 border-2 rounded-2xl '
            value={phone} onChange={(e) => setphone(e.target.value)} />

          <Select className='w-full ant-input text-xl mt-4 rounded-2xl ' placeholder='Select a Department' onChange={handlechange}>
            {departments.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>

          <Select required className='w-full ant-input text-xl mt-4 rounded-2xl ' placeholder='Select a semester' onChange={handlesem}>
            {semester.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>


          <Select required className='w-full ant-input text-xl mt-4 rounded-2xl ' placeholder='Select a semester' onChange={handles}>
            {sshift.map((s) => (
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
