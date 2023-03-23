import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import FormCase from '../pages/FormCase'


const AppRoutes = () => {
  return (

    <div className='AppRoutes'>
        <Routes>
              <Route path='/1' element={<DashBoard/>}/>
              <Route path='/2' element={<FormCase/>}/>
        </Routes>

    </div>
  )
}

export default AppRoutes