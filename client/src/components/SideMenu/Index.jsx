import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>

      <Menu onClick={(item)=> {
        //item.key
        navigate(item.key)
      }} items={[
        {
          label: "home1",
          key: '/1'
        },
        {
          label: "home2",
          key: '/2'
        },
        {
          label: "home3",
          key: '/3'
        },
        {
          label: "home4",
          key: '/4'
        },
        {
          label: "home5",
          key: '/5'
        },
      ]}>

      </Menu>
      </div>
  )
}

export default SideMenu 