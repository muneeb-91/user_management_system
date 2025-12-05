import { useState } from 'react';
import { X, Eye, EyeOff, Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const AddUser = ({setAddingUser}) => {
    const {addUser} = useAuthStore();
    const [showpassword, setShowPassword] = useState(false);
    

  const handleAddUser = async (newUserData) => {
    await addUser(newUserData);
    setAddingUser(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg shadow-2xl p-6 w-full max-w-md bg-color-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-color-4">Add New User</h3>
              <button onClick={() => setAddingUser(false)} className='text-color-4 cursor-pointer'>
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Name</label>
                <input
                  type="text"
                  required
                  id="newUserName"
                  className="w-full px-4 py-3 rounded-lg outline-none bg-color-2 text-color-4"
                  placeholder="Enter name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Email</label>
                <input
                  type="email"
                  required
                  id="newUserEmail"
                  className="w-full px-4 py-3 rounded-lg outline-none bg-color-2 text-color-4"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Password</label>
                <div className='relative'>
                  <input
                    type={showpassword === true ? 'text' : 'password'}
                    required
                    id="newUserPassword"
                    className="w-full px-4 py-3 pr-7 rounded-lg outline-none bg-color-2 text-color-4"
                    placeholder="••••••••"
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}
                  > 
                  {
                    showpassword === true ?
                    <EyeOff className='size-5 text-color-4'/>
                    :
                    <Eye className='size-5 text-color-4'/>
                  }
                  </button>
                </div>  
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Role</label>
                <select
                  id="newUserRole"
                  className="w-full px-4 py-3 rounded-lg outline-none bg-color-2 text-color-4"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type='submit'
                  onClick={() => {
                    const fullName = document.getElementById('newUserName').value;
                    const email = document.getElementById('newUserEmail').value;
                    const role = document.getElementById('newUserRole').value;
                    const password = document.getElementById('newUserPassword').value;
                    if (fullName && email && password) {
                      handleAddUser({ fullName, email, password, role});
                    }
                  }}
                  className="flex-1 py-3 rounded-lg font-semibold transition hover:opacity-90 flex items-center justify-center gap-2 bg-color-4 text-color-1 cursor-pointer"
                >
                  <Plus size={18} />
                  Add User
                </button>
                <button
                  onClick={() => setAddingUser(false)}
                  className="flex-1 py-3 rounded-lg font-semibold transition hover:opacity-90 bg-color-2 text-color-4 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AddUser