import { Typography } from 'antd'
import React from 'react'

const AppFooter = () => {
  return (
    <div className='AppFooter'>
        <Typography.Link href='tel:+123456'>+123456</Typography.Link>
        <Typography.Link href='https://www.google.com/' target={'_blank'}>asdfasdfasdfdsa</Typography.Link>
        <Typography.Link href='https://www.google.com/' target={'_blank'}>KEngzerzad</Typography.Link>
      
    </div>
  )
}

export default AppFooter