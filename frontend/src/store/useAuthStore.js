import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isAuthenticating: true,
    isLoggingIn: false,
    isSigningUp: false,
    users: [],

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get('/user/check');
            set({authUser: res.data});
        }catch(error){
            console.log(error.response?.data?.message || error.message);
            set({authUser: null});
        }
        finally{
            set({isAuthenticating: false})
        }
    },

    login: async(formData) => {
        set({isLoggingIn: true})
        try{
            const res = await axiosInstance.post('/user/login', formData);
            await get().checkAuth();

            toast.success("Login Successful");
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }finally{
            set({isLoggingIn: false});
        }
    },

    signup: async(formData) => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post('/user/signup', formData);
            await get().checkAuth();
            
            toast.success("Signup Successful")
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }finally{
            set({issigningUp: false});
        }
    },

    logout: async () => {
        try{
            await axiosInstance.post('/user/logout');
            set({authUser: null});

            toast.success("Logout Successful");
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    },

    //Admin Side functions

    getAllUsers : async () => {
        try{
            const res = await axiosInstance.get('/user/getusers');
            set({users: res.data});
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    },

    updateUser: async (userId, data) => {
        try{
            const res = await axiosInstance.put(`/user/update/${userId}`, data);
            toast.success(res?.data?.message);

            set((state) => ({
                users: state.users.map((u) => u._id === userId ? res.data.user : u),
            }))
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    },

    deleteUser: async (userId) => {
        try{
            await axiosInstance.post(`/user/delete/${userId}`);
            set((state) => ({
                users: state.users.filter((u) => u._id !== userId),
            }))
            toast.success("User is deleted Successfully!")
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    },

    toggleRole: async (userId) => {
        try{
            const res = await axiosInstance.put(`/user/toggle-role/${userId}`);
            set((state) => ({
                users: state.users.map((u) => u._id === userId ? 
                {...u, role: u.role === 'admin' ? 'user' : 'admin'} : u)
            }))
            get().checkAuth();
            toast.success(res?.data?.message);
        }catch(error){
            toast.error(error.response?.data?.message);
        }
    },

    addUser: async (newUserData) => {
        try{
            const res = await axiosInstance.post('/user/add-user', newUserData);
            set((state) => ({
                users: [...state.users, res.data.user],
            }))
            toast.success(res?.data?.message);
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    },

}))