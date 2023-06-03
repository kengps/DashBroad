import { Typography } from 'antd'
import React from 'react'

const AppFooter = () => {
  return (
    <div className='AppFooter' >
        <Typography.Link href='tel:+123456'>+1234567890</Typography.Link>
        <Typography.Text >© 2023 Copyright: By 1212312121</Typography.Text>
        <Typography.Link href='https://www.google.com/' target={'_blank'}>google</Typography.Link>
      
    </div>
  )
}

export default AppFooter