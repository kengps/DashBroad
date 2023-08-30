import { Box } from '@mui/material';
import { Button, Checkbox, Modal, Table, Input, Row, Col } from 'antd'; // นำเข้าคอมโพเนนต์ Table จาก antd
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import sweetAlert from "sweetalert2";
import { useStore, useStoreSetting } from '../service/zustand/storeCase';


import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import InputCreateEditor from '../views/settingMunuBar/InputCreateEditor';
import DeleteButton from '../views/Button/DeleteButton';



const SettingEditor = () => {


  // func สำหรับการแก้ไชรายละเอียด

  //*state สำหรับการแก้ไข
  const [values, setValues] = useState({
    username: "",
  });

  const { user } = useSelector((state) => state);
  const { getEditors, changeEditor, resChangeEditor, deleteEditor, createEditor } = useStoreSetting();
  const data = useStoreSetting((state) => state.resEditor.resultData);

  useEffect(() => {
    getEditors();

  }, []);


  const handleClickDelete = async (e, id) => {
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      if (result.isConfirmed) {
        await deleteEditor(id)

        sweetAlert.fire('แจ้งเตือน', 'ทำการลบผู้แก้ไขสำเร็จ', 'success')
      }
      getEditors();

    } catch (error) {
      alert(error)
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (e) => {


    try {

      const result = await sweetAlert.fire({
        title: `คุณต้องการเพิ่มผู้แก้ไขชื่อ <i><b>${values.username}</b></i> หรือไม่`,
        icon: "warning",
        showCancelButton: true,
      });
      if (result.isConfirmed) {

        await createEditor(values)
        setValues('')
        setIsModalOpen(false);

        sweetAlert.fire('แจ้งเตือน', 'ทำการเพิ่มผู้แก้ไขสำเร็จ', 'success')

        getEditors();


      }

    } catch (error) {

    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValues('')
  };

  const handleDelete = async (e, id) => {
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      if (result.isConfirmed) {
        await deleteEditor(id)

        sweetAlert.fire('แจ้งเตือน', 'ทำการลบผู้แก้ไขสำเร็จ', 'success')
      }
      getEditors();

    } catch (error) {
      alert(error)
    }
  }



  // const loadData = (authtoken) => {
  //   listUser(authtoken)

  // };

  if (!data) {
    // Data is not available yet, you can show a loading indicator or return null
    return <div>Loading...</div>;
  }
  const columns = [ // กำหนดคอลัมน์ของตาราง
    {
      title: 'ลำดับ',
      dataIndex: 'index', // คอลัมน์นี้จะเป็นลำดับของข้อมูล
      key: 'index',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'เปิด/ปิด',
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (text, item) =>
        <div>
          <Row justify={'center'}>
            <Col>
              <Checkbox
                style={{ marginRight: 8 }}
                onChange={(e) => onChange(e, item._id, item.username)}
                checked={item.select}
              />
            </Col>
          </Row>

        </div>,

    },
    {
      title: 'การจัดการ',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, item) =>
        <div>
          <Row justify={'center'}>
            <Col>
              <Button type="primary" danger
                onClick={(e) => handleDelete(e, item._id)}
              >
                <Box

                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <DeleteOutlined />

                </Box>
              </Button>

            </Col>
          </Row>
        </div>,

    },
    // คอลัมน์อื่นๆ...
  ];

  // แปลงข้อมูลให้เป็นรูปแบบที่ antd Table รับ (มี key และ index)
  const dataSource = data
    .sort((a, b) => (a.select === true && b.select !== true ? -1 : 1))
    .sort((a, b) => b.id - a.id)
    .map((item, index) => ({
      ...item,
      key: index,
      index: index + 1,
    }));

  const onChange = async (e, id, username) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(`username = ${username}`);
    const checked = e.target.checked
    const value = {
      id: id,
      select: checked
    }
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });

      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await changeEditor(user.token, value)

        const notify =
          resChangeEditor.select === true
            ? "ทำการเปิดการใช้งานสำเร็จ"
            : "ทำการปิดการใช้งานสำเร็จ";


        toast.success(notify);

        getEditors(user.token);
      }
    } catch (error) {

    }

  };




  const handleEditor = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

  };



  return (
    <Box component="span" sx={{ p: 2 }}>
      <Row justify="end" style={{ marginTop: "50px", marginBottom: '5px' }}>
        <Col>
          <Button onClick={showModal} type="primary">เพิ่ม</Button>
        </Col>
      </Row>

      <Table
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
        dataSource={dataSource}
        columns={columns}
        bordered />
      <>
        <InputCreateEditor values={values} handleEditor={handleEditor} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      </>

    </Box>
  );
};

export default SettingEditor;
