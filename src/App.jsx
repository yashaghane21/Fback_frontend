import React from 'react'
import Signup from './Components/Auth/Signup'
import Sidebar from './Components/Admin/Sidebar'
import Hsidebar from "./Components/Hod/Hsidebar"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Ssidebar from './Components/Student/Ssidebar'
import Layout from './Components/Layout'
import { Toaster } from 'react-hot-toast';
import Teacher from './Components/Hod/Manage/Teacher'
import Login from "./Components/Auth/Login";
import { Authprovider } from './Components/Auth/AuthContext'
import Home from './Components/Student/Home'
import Cofeedback from './Components/Student/Cofeedback'
import Done from './Components/Student/Done'
import Hhome from './Components/Hod/Hhome'
import Sems from './Components/Hod/Feedbacks/Sems'
import Feedbackpage from './Components/Hod/Feedbacks/Feedbackpage'
import Mainf from './Components/Hod/Feedbacks/Mainf'
import Subjects from "./Components/Hod/Manage/Subjects"
import Students from './Components/Hod/Manage/Students'
import Cform from './Components/Admin/Cform'
import Ecfeedback from './Components/Student/Ecfeedback'
import Ecform from './Components/Admin/Ecform'
import Endfeedbacks from './Components/Hod/Feedbacks/Endfeedbacks'
import Ecmainf from './Components/Hod/Feedbacks/Ecmainf'
import Manage from './Components/Admin/Manage'
import About from './Components/About'
const App = () => {
  return (
    <Authprovider>


      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Layout />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
     
          <Route path='/admin' element={<Sidebar />}>
            <Route index element={<Cform />} />
            <Route path='cform' element={<Cform />} />
            <Route path='ecf' element={<Ecform />} />
            <Route path='manage' element={<Manage />} />
          </Route>

          <Route path='/student' element={<Ssidebar />} />
         
            <Route path='/cof' element={<Cofeedback />} />
            <Route path='/done' element={<Done />} />
            <Route path='/ecf' element={<Ecfeedback />} />
     

          <Route path='/hod' element={<Hsidebar />}>
            <Route index element={<Hhome />} />
            <Route path='home' element={<Hhome />} />
            <Route path='sems' element={<Sems />} />
            <Route path='fpage/:id' element={<Feedbackpage />} />
            <Route path='mainf/:id' element={<Mainf />} />
            <Route path='teacher' element={< Teacher />} />
            <Route path='sub' element={< Subjects />} />
            <Route path='students' element={< Students />} />
            <Route path='efb' element={< Endfeedbacks />} />
            <Route path='ecmain/:id' element={< Ecmainf />} />
          </Route>

          <Route exact path='/login' element={<Login />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Authprovider>
  )
}

export default App
