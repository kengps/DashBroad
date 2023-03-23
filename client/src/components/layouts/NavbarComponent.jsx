import React from 'react'
import AppHeader from '../AppHeader/Index'

import {Space} from 'antd'
import SideMenu from '../SideMenu/Index'
import PageContent from '../PageContent/Index'
import AppFooter from '../AppFooter/Index'
const NavbarComponent = () => {
  return (
    <div className='App'>
            <AppHeader/>
                <Space className='SideMenuAndPageContent'>
                        <SideMenu/>
                        <PageContent/>
                </Space>
            <AppFooter/>
    </div>
  )
}

export default NavbarComponent