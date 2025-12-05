import {useState} from 'react';
import { Edit3, LogOutIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import EditUser from './EditUser';
import { fromatDateTime } from '../lib/utils';

const UserDashboard = () => {
  const {logout, authUser} = useAuthStore();
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="min-h-screen bg-color-2 p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-8">
          <div>
            <h1 className="text-color-4 text-3xl sm:text-4xl font-bold">User Dashboard</h1>
            <p className="text-color-4 text-md sm:text-lg">Inspect and update your profile</p>
          </div>

          <div>
            <button
              onClick={logout}
              className='py-2 sm:py-3 px-4 sm:px-10  md:px-14 rounded-md bg-color-4 text-color-2 font-semibold flex items-center justify-center w-full gap-2 cursor-pointer hover:opacity-90'
            >
              <span className='hidden md:block'>Logout</span>
              <LogOutIcon size='20'/>
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-color-1 w-full rounded-2xl p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-4">
            <div className="bg-color-2 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="size-20 rounded-full bg-color-4 flex items-center justify-center text-4xl font-bold mb-3">
                  {authUser.fullName.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-bold text-color-4 text-xl">{authUser.fullName}</h2>
                <p className="text-color-4 opacity-80 text-md sm:text-lg">{authUser.email}</p>
              </div>
            </div>

            <div className="bg-color-2 py-5 px-4 sm:px-8 rounded-xl">

              <div className="flex items-center justify-between border-b border-gray-400 pb-3 mb-5">
                  <h1 className="text-color-4 text-[18px] sm:text-2xl font-bold">User Information</h1>
                  <button 
                  className="bg-color-4 flex items-center justify-center gap-2 py-1 px-3 sm:px-5 rounded-md hover:opacity-90 cursor-pointer font-medium"
                  onClick={() => setEditingUser(authUser)}
                  >
                    <span className="text-color-1 text-lg">Edit</span>
                    <Edit3 className="size-4 text-color-1"/>
                  </button>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="cols-span-1 md:col-span-2 bg-color-1 py-4 px-6 sm:py-6 sm:px-8 rounded-xl text-color-4">
                  <span className="opacity-90">Id: <span className='font-bold'>{authUser._id}</span></span>
                </div>

                <div className="bg-color-1 py-4 px-6 sm:py-6 sm:px-8 rounded-xl text-color-4">
                  <span className="opacity-90">Name: <span className='font-bold'>{authUser.fullName}</span></span>
                </div>

                <div className="bg-color-1 py-4 px-6 sm:py-6 sm:px-8 rounded-xl text-color-4">
                  <span className="opacity-90">Role: <span className=' font-bold text-sm bg-color-4 text-color-1 py-1 px-3 rounded-full'>{authUser.role.toUpperCase()}</span></span>
                </div>

                <div className="bg-color-1 py-4 px-6 sm:py-6 sm:px-8 rounded-xl text-color-4">
                  <span className="opacity-90">Joined At: </span>
                  <p className='font-bold'>{fromatDateTime(authUser.createdAt)}</p>
                </div>

                <div className="bg-color-1 py-4 px-6 sm:py-6 sm:px-8 rounded-xl text-color-4">
                  <span className="opacity-90">Last Updated: </span>
                  <p className='font-bold'>{fromatDateTime(authUser.updatedAt)}</p>
                </div>  
              
              </div>
            </div>
          </div>
        </div>

        {editingUser && 
          <EditUser editingUser={editingUser} setEditingUser={setEditingUser}/>
        }

      </div>  
    </div>
  )
}

export default UserDashboard