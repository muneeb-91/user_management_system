import { Mail, Calendar, Eye, Edit2, Shield, Trash2, Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { fromatDateTime } from '../lib/utils';

const UsersList = ({filteredUsers, setViewingUser, setEditingUser}) => {
    const { authUser, toggleRole, deleteUser } = useAuthStore();

    const handleEdit = (user) => {
        setEditingUser({...user});
    };

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
        deleteUser(userId);
        }
    };
  return (
        <div className="rounded-lg shadow-xl p-3 sm:p-6 bg-color-1">
          <h2 className="text-2xl font-bold mb-6 text-color-4">All Users ({filteredUsers.length})</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {filteredUsers.map(user => (
              <div key={user._id} className="rounded-lg p-5 hover:shadow-lg transition bg-color-2">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-color-1">
                      <span className="text-2xl font-bold text-color-4">
                        {user.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1 text-color-4">{user.fullName} {user._id === authUser._id ? 
                        <span className='text-color-4 font-semibold'>(My Account)</span> 
                        : 
                        <span></span>}
                      </h3> 
                      <div className="flex items-center gap-2 text-sm mb-2 text-color-4">
                        <Mail size={14} />
                        <span className="truncate opacity-70">{user.email}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center text-xs text-color-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span className="opacity-70"> Joined: </span><span className='trancate'>{fromatDateTime(user.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-color-4 text-color-1' : 'bg-color-1 text-color-4'}`}>
                          <span className='opacity-90'>{user.role.toUpperCase()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() => setViewingUser(user)}
                      className="px-4 py-2 rounded-lg transition hover:opacity-80 text-sm font-medium flex items-center gap-2 bg-color-4 text-color-1 cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(user)}
                      className="px-4 py-2 rounded-lg transition hover:opacity-80 text-sm font-medium flex items-center gap-2 bg-color-1 text-color-4 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => toggleRole(user._id)}
                      className="px-4 py-2 rounded-lg transition hover:opacity-80 text-sm font-medium bg-color-1 text-color-4 cursor-pointer"
                      title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    >
                      <Shield size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 rounded-lg transition hover:opacity-80 text-sm font-medium bg-color-4 text-color-1 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-color-4">
                <Users size={48} className="mx-auto mb-4 text-color-4 opacity-70" />
                <p className="text-lg">No users found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
  )
}

export default UsersList