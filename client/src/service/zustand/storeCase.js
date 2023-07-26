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
      console.log('====================================');
      console.log(dataLogin);
      console.log('====================================');
    } catch (error) {
      console.error('Error while posting to API:', error);
      // Handle the error as needed
    }

  },

}));



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