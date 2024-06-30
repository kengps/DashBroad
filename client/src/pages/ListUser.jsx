import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import sweetAlert from "sweetalert2";

import { toast } from "react-toastify";

import { storeAuth } from "../service/store/storeZustand";
import { useStore } from "../service/zustand/storeCase";
import TableUser from "../views/users/TableUser";


const ListUser = () => {

  //const listUse1 = useStore((state) => state.listUser);
  // const userList = useStore((state) => state.userList);
  const { listUser, userList, deleteUsers, responseDelete, changStatusUser, changRoleUser } = useStore();


  const { user } = useSelector((state) => state);

  const dataUser = storeAuth((state) => state.user)





  const resChangStatus = useStore((state) => state.resChangStatus);



  useEffect(() => {
    loadData(dataUser.token);

  }, []);


  const loadData = (authtoken) => {
    listUser(authtoken)

  };


  //TOdo Func สำหรับลบข้อมล โดยเรียก api จาก  deleteUser
  //! สามารถเขียนรวมได้ใน if (result.isConfirmed) ใน func handleClick ได้นะ
  const confirmDelete = async (id) => {
    const res = await deleteUsers(id)
    sweetAlert.fire("แจ้งเตือน", res, "success");
    loadData();
    // loadUser(user.token);
  };

  //* หากมีการคลิกที่ปุ่มลบ
  const handleClick = async (id) => {
    //todo หากกดปุ่มลบ จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });

      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await confirmDelete(id);
      }
    } catch (error) {
    }
  };

  //* style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  //* function สำหรับการเปิด-ปิด user
  const handleOnchange = async (e, id) => {
    //หากใช้ checkbox ให้ใช่ e.target.checked
    //หากใช้ switch ให้ใช่ e


    const checked = e.target.checked
    console.log(`⩇⩇:⩇⩇🚨  file: ListUser.jsx:88  checked :`, checked);

    const value = {
      id: id,
      enabled: checked,
    };
    console.log(`⩇⩇:⩇⩇🚨  file: ListUser.jsx:94  value :`, value);

    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบปิดการใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await changStatusUser(dataUser.token, value)
      }

      // สามารถเข้าถึงค่าที่คืนมาจาก changStatusUser ได้เลยโดยใช้ตัวแปร resChangStatus

      const notify =
        resChangStatus.enabled === true
          ? "ทำการเปิดการใช้งานสำเร็จ"
          : "ทำการปิดการใช้งานสำเร็จ";


      toast.success(notify);

      loadData(dataUser.token);
    } catch (error) {
    }


  };

  //แก้ไขระดับ


  // function สำหรับการแก้ไข role เมื่อมีการเปลี่ยนแปลงข้อมูลตรง select สามารถ copy จากhandleOnchange ได้เลยแต่ต้องเปลี่ยนชื่อ function  เอง
  const handleOnchangeRole = async (e, id) => {
    try {
      const value = {
        id: id,
        role: e,
      };

      //changRole คือ function การยิง API
      await changRoleUser(dataUser.token, value)

      toast.success("ทำการแก้ไขระดับสำเร็จ");

      loadData(dataUser.token);

    } catch (error) {
    }

  };


  return (
    <>

      <TableUser value={userList} handleOnchange={handleOnchange} handleClick={handleClick} handleOnchangeRole={handleOnchangeRole} dataUser={dataUser} />
      

    </>

  );
};

export default ListUser;
