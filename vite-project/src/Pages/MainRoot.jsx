import React from 'react'
import Header from '../Layout/Header'
import { Outlet } from 'react-router'

const MainRoot = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default MainRoot
