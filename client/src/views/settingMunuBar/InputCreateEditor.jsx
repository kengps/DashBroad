import { Input, Modal } from 'antd'; // นำเข้าคอมโพเนนต์ Table จาก antd
import React from 'react';


import { UserOutlined } from '@ant-design/icons';



const InputCreateEditor = ({ handleEditor, values ,isModalOpen,handleOk,handleCancel}) => {

    return (
        <section>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input size="large" placeholder="Name" prefix={<UserOutlined />}
                    name='username'
                    onChange={handleEditor}
                    value={values.username}
                    
                />
            </Modal>
        </section>

    )
}

export default InputCreateEditor