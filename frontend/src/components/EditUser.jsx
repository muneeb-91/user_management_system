import {X, Check} from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";

const EditUser = ({editingUser, setEditingUser}) => {
    const {updateUser, checkAuth} = useAuthStore();

    const handleSaveEdit = async () => {
        const data = {
            fullName: editingUser.fullName,
            email: editingUser.email,
        }

        await updateUser(editingUser._id, data);
        setEditingUser(null);
        checkAuth();  
    }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg shadow-2xl p-6 w-full max-w-md bg-color-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-color-4">Edit User</h3>
              <button onClick={() => setEditingUser(null)} className='text-color-4 cursor-pointer'>
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Name</label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({...editingUser, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg outline-none bg-color-2 text-color-4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-color-4">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg outline-none bg-color-2 text-color-4"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-lg font-semibold transition hover:opacity-90 flex items-center justify-center gap-2 bg-color-4 text-color-1 cursor-pointer"
                >
                  <Check size={18} />
                  Save Changes
                </button>

                <button
                  onClick={() => setEditingUser(null)}
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

export default EditUser