import { create } from "zustand";
import { persist } from 'zustand/middleware'
import axios from "axios";



export const useStore = create((set) => ({
  cases: [],
  fetchData: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/listdetail2`); // Remove the "value" parameter here
      set({ cases: response.data });
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  },
  response: [],
  createCase: async (data) => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/createcase`, data);
      set({ response: response.data });
      return response.data
    } catch (error) {
      console.error('Error while posting to API:', error);
      // Handle the error as needed
    }
  },
  dataLogin: [],
  login: async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login`, data);
      set({ dataLogin: response.data });
    } catch (error) {
      console.error('Error while posting to API:', error);
      // Handle the error as needed
    }
  },
  dataResetpassword: [],
  resetPasswords: async (authtoken, id, values) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/user/${id}`,
        values,

        {
          headers: {
            authtoken,
          },
        }
      );
      console.log('================id====================', id);

      set({ dataResetpassword: response });
    } catch (error) {
      console.error('Error while posting to API:', error);
    }
  },
  userList: [],
  // เมื่อเรียกใช้ action listUser เพื่อดึงข้อมูลผู้ใช้
  listUser: async (value) => {
    try {
      // ใช้ axios เรียก API ดึงข้อมูลผู้ใช้
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/list-user`,
        value
      );

      // หากสำเร็จให้อัปเดต state userList ด้วยข้อมูลที่ได้จาก API
      set({ userList: response.data });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  },
  responseDelete: {},
  // เมื่อเรียกใช้ action listUser เพื่อดึงข้อมูลผู้ใช้
  deleteUsers: async (id) => {
    try {
      // ใช้ axios เรียก API ดึงข้อมูลผู้ใช้
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/delete-user/${id}`
      );
      // หากสำเร็จให้อัปเดต state userList ด้วยข้อมูลที่ได้จาก API
      return response.data.message
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  },
  resChangStatus: [],
  changStatusUser: async (authtoken, value) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/change-user`,
        value,
        {
          headers: {
            authtoken,
          },
        }
      );

      set({ resChangStatus: response.data });
    } catch (error) {
      console.error('Error while posting to API:', error);
    }
  },
  resChangRole: [],
  changRoleUser: async (authtoken, value) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/change-role-user`,
        value,
        {
          headers: {
            authtoken,
          },
        }
      );

      set({ resChangRole: response.data });
    } catch (error) {
      console.error('Error while posting to API:', error);
    }
  },
}));


export const useStoreCase = create((set) => ({
  resCasePending: [],
  listCasePending: async (value, currentPage, ITEM_PER_PAGE) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/listcase`,
        {
          params: {
            page: currentPage,
            limit: ITEM_PER_PAGE,
            value: value,
          },
        }

      );
      set({ resCasePending: response.data })
    } catch (error) {
      console.error('Error while posting to API:', error);
    }
  },
  resChangeStatus: [],
  changeStatusCase: async (value) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/change-status`,
        value
      );
      set({ resChangStatus: response.data })
    } catch (error) {

    }
  },
  resChangeDetailCase: [],
  changeDetailCase: async (id, value) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/change-detail/${id}`,
        value
      );
      set({ resChangeDetailCase: response.data })
    } catch (error) {

    }
  },
  resDeleteCase: {}, // กำหนดค่าเริ่มต้นให้เป็น object ที่มี key message และมีค่าเป็นสตริงเปล่า
  DeleteCase: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/delete/${id}`
      );
      return response.data.message
    } catch (error) {
      // ในกรณีเกิด error คุณอาจจะต้องจัดการเพิ่มเติม หรือแสดงข้อความ error ออกมา
    }
  },

}));

export const useStoreCaseAll = create((set) => ({
  currentPages: 0, // กำหนดค่าเริ่มต้นสำหรับหน้าปัจจุบัน
  resListCaseAll: [], // กำหนดค่าเริ่มต้นสำหรับข้อมูล
  listCaseAll: async (currentPages, ITEM_PER_PAGE) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API
        }/listcase?page=${currentPages + 1}&limit=${ITEM_PER_PAGE}`
      );

      set({ resListCaseAll: response.data });
    } catch (error) {
      alert(error);
    }
  },
  setCurrentPages: (newPage) => set({ currentPages: newPage }),
}));






export const useStoreSetting = create((set) => ({
  resDetail: [],
  createDetails: async (value) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/detail-case`,
        value)
      set({ resDetail: response.data })
      return response.data
    } catch (error) {
      alert(error);
    }
  }

}))

// let store = (set) => ({

//   response: null,
//   createCase: async (data) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/createcase`, data);
//       set({ response: response.data });

//     } catch (error) {
//       console.error('Error while posting to API:', error);
//       // Handle the error as needed
//     }
//   /* The above code is defining a React component or function that uses the `useStorePost` hook to
//   access the `createCase` function from the store's state. */
//   },
// });

// store = persist(store, {name: "nameCase"})

// export const useStorePost = create(store)