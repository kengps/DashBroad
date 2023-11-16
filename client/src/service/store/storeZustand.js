import axios from 'axios';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { currentUser, login, loginLine } from '../../api/auth';


const store = (set) => ({

    isAuthenticated: false,
    user: null,
    errorRes: null,
    // เพิ่มฟังก์ชันอัปเดตสถานะ
    updateUserInfo: (newInfo) => set(newInfo),
    logout: () => {
        localStorage.clear()
        set({ isAuthenticated: false, user: null })
    },

    login: async (value) => {

        try {
            const response = await login(value)
            const userData = response.data
            set({ isAuthenticated: true, user: userData });
            return response.data

        } catch (error) {
            const response = error.response
            set({ errorRes: response })

        }
    },
    loginLine: async (value) => {

        try {
            const response = await loginLine(value)
            const userData = response.data
            set({ isAuthenticated: true, user: userData });
            return response.data

        } catch (error) {
            const response = error.response
            set({ errorRes: response })

        }
    },
    fetchUserInfo: async (idToken) => {
        try {
            if (idToken) {
               await currentUser(idToken).then((res) => {  
                    console.log("🚀  file: storeZustand.js:51  res:", res)
                    set({
                        isAuthenticated: true,
                        user: {
                            token: idToken,
                            payLoad: {
                                user: {
                                    username: res.data.username,
                                    role: res.data.role,
                                    id: res.data._id
                                }
                            }
                        }
                    });

                })

            }

        } catch (error) {
            console.log("➡️  file: storeZustand.js:16  error:", error)
        }
    }

});
export const storeAuth = create(devtools(store));