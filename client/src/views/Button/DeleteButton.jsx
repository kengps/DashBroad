import { Button } from 'antd'
import React from 'react'

const DeleteButton = ({ handleClickDelete }) => {
    return (
        <div>

            <Button type="primary" danger onClick={handleClickDelete}>ลบ</Button>
        </div>
    )
}

export default DeleteButton