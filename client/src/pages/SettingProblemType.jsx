import React, { useEffect, useState } from 'react';
import TableB from 'react-bootstrap/Table';
import { AccordionUI } from '../components/Menu/Index';
import { useStore } from '../service/zustand/storeCase';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Table, Typography } from 'antd';
import SettingProblem from '../components/SettingProblem';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
const SettingProblemType = ({ showModals }) => {

  const { fetchData, fetchTypesName } = useStore()

  const typeData = useStore((state) => state.cases);

  const typeNameData = useStore((state) => state.typesName);

  const groupedData = typeNameData.reduce((acc, current) => {
    const existingItem = acc.find(item => item.data.main.typeName === current.data.main.typeName);
    if (!existingItem) {
      acc.push(current);
    }
    return acc;
  }, []);



  const [modalData, setModalData] = useState({ name: "", detail: "" });

  // const typeDataTypes0 = [...new Set(typeData.map((item) => item.data.type.types))]
  // .filter(type => type !== "");



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



  const [selectedItemId, setSelectedItemId] = useState(null); // เพิ่ม state เพื่อเก็บ ID 

  const typeDataTypes = typeData.map((item) => { return item.data.type.types });

  const typeNameData2 = typeNameData.map((item) => { return item.data.main.typeName });


  const typeDataTypes2 = ([...new Set(typeDataTypes)]).filter(Boolean);

  const typeNameData3 = ([...new Set(typeDataTypes2)]).filter(Boolean)



  const newDataType = [...new Set(typeData.map((item) => item.data.type.types))].filter((type) => type !== "")






  const typeDataTypes4 = typeData.map((item) => { return item.data });

  const nameAndDetail = typeNameData.map((item) => { return item.data.main });



  useEffect(() => {
    fetchData()
    fetchTypesName();
  }, [])



  const handleClick = async (item) => {

    // นำข้อมูล name และ detail จาก data และแสดงใน Modal
    const typeName = item.data.main.typeName;
    const names = typeNameData
      .filter(data => data.data.main.typeName === typeName)
      .map(data => data.data.main.sub.name)
      .join(", ");
    const details = typeNameData
      .filter(data => data.data.main.typeName === typeName)
      .map(data => data.data.main.sub.detail)
      .join(", ");
    setModalData({
      name: names,
      detail: details
    });
    showModal();
  };






  const dataSource = groupedData.map((item, index) => ({
    key: (index + 1).toString(),
    id: item._id,
    typeName: item.data.main.typeName,
    data: item.data,
  }));
  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      key: 'index',
    },
    {
      title: 'ชื่อประเภท',
      dataIndex: 'typeName',
      key: 'TypeName',
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'รายละเอียด',
      dataIndex: 'typeName',
      key: 'details',
      render: (typeName, item) => (
        <Button
          onClick={() => handleClick(item)}
          style={{ backgroundColor: '#ffc107', color: 'white' }}
        >
          รายละเอียด
        </Button>
      ),
    },
  ];

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {

    setIsModalOpen(true);

  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>

        <Typography style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginTop: 60 }}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>ประเภทปัญหา</Typography.Title>
          <Button
            size='large'
            type="primary"
            onClick={showModal1}
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
        {/* 
        <Button
          type="primary"
          onClick={showModal1}
          variant="warning"
          style={{
            alignItems: "center",
            gap: "10px",
            marginLeft: "5px",
            // backgroundColor: '#ffc107'
          }}
        >
          <SettingOutlined
            style={{ display: "flex", justifyContent: "center" }}
          />
        </Button> */}
        {/* <Button onClick={showModal1}>Click</Button> */}
      </div>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type Name</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {newDataType.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item}</td>
              <td><button>รายละเอียด</button></td>
            </tr>
          ))}


        </tbody>
      </Table> */}
      <Table
        dataSource={dataSource}
        columns={columns}
      />

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <TableB striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อ</th>
              <th>รายละเอียด</th>

            </tr>
          </thead>
          <tbody>
            {modalData.name
              .split(",")
              .map((name, index) => ({
                name: name.trim(),
                detail: modalData.detail.split(",")[index].trim(),
              }))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.detail}</td>
                </tr>
              ))}


          </tbody>
        </TableB>
      </Modal>



      < Modal
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

    </div>
  )
}

export default SettingProblemType