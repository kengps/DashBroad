import { Box, Container, Grid, Paper, styled } from '@mui/material';
import { Button, Checkbox, Col, Modal, Row, Table, Typography } from 'antd'; // นำเข้าคอมโพเนนต์ Table จาก antd
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import sweetAlert from "sweetalert2";
import { useStoreSetting } from '../service/zustand/storeCase';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { DeleteOutlined } from '@ant-design/icons';
import { AccordionUI } from '../components/Menu/Index';
import SettingProblem from '../components/SettingProblem';
import InputCreateEditor from '../views/settingMunuBar/InputCreateEditor';
import SettingProblemType from './SettingProblemType';
import { storeAuth } from '../service/store/storeZustand';






const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SettingEditor = () => {




  const [textEmpty, setTextEmpty] = useState(false)

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  // func สำหรับการแก้ไชรายละเอียด

  //*state สำหรับการแก้ไข
  const [values, setValues] = useState({
    username: "",
  });

  const { user } = useSelector((state) => state);
  const { getEditors, changeEditor, resChangeEditor, deleteEditor, createEditor } = useStoreSetting();
  const data = useStoreSetting((state) => state.resEditor.resultData);


  
  const username = storeAuth((state) => state.user)
  // const getUser = username.payLoad.user.username;
  // console.log("🚀  file: SettingEditor.jsx:62  username2:", getUser)
  
  
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

      if (values.username === '') {
        setTextEmpty(true);
        return;
      }

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
    // {
    //   title: 'createdAt',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    // },
    // {
    //   title: 'updatedAt',
    //   dataIndex: 'updatedAt',
    //   key: 'updatedAt',
    // },
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
        title: "คุณต้องการเปลี่ยนผู้แก้ไขหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });

      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await changeEditor(username.token, value)

        const notify =
          resChangeEditor.select === true
            ? "ทำการเปลี่ยนผู้ใช้แก้ไขสำเร็จ"
            : "ทำการเปลี่ยนผู้ใช้แก้ไขสำเร็จ";


        toast.success(notify);

        getEditors(username.token);
      }
    } catch (error) {

    }

  };




  const handleEditor = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

  };



  return (
    <div>

      <Container maxWidth='xl' >

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Item>

              <Typography style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginTop: 60 }}>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>ผู้แก้ไข</Typography.Title>
                <Button
                  size='large'
                  type="primary"
                  onClick={showModal}
                  variant="warning"
                  style={{
                    alignItems: "center",
                    gap: "10px",
                    marginLeft: "5px",
                    // backgroundColor: '#ffc107'
                  }}
                >
                  <AddBoxOutlinedIcon
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </Button>
              </Typography>



              <Box component="span" sx={{ p: 2 }}>
                <Row justify="end">
                  <Col>


                  </Col>
                </Row>
                <Table
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                  dataSource={dataSource}
                  columns={columns}
                  bordered />
                <>
                  <InputCreateEditor values={values} handleEditor={handleEditor} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} textEmpty={textEmpty} />
                </>
                <Modal
                  title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "8px" }}>เพิ่มประเภท</span>
                      <AccordionUI />
                    </div>
                  }
                  open={isModalOpen1}
                  //onOk={handleOk1}
                  onCancel={handleCancel1}
                  footer={null}
                >
                  <SettingProblem onCloseModal={() => setIsModalOpen1(false)} />
                </Modal>
              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Item>
              <SettingProblemType showModals={showModal1} />
            </Item>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
};

export default SettingEditor;
