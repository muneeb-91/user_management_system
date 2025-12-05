import { useState, useEffect } from 'react';
import { Shield, Search, Plus, Users, LogOutIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import UsersList from './UsersList';

const App = () => {
  const {users, getAllUsers, logout} = useAuthStore();

  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(()=>{
    getAllUsers();
  }, [getAllUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="min-h-screen p-4 bg-color-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl text-color-4 font-bold mb-2">Admin Dashboard</h1>
            <p className="text-md sm:text-lg text-color-4">Manage users and monitor activity</p>
          </div>

          <div>
            <button
              onClick={logout}
              className='py-2 sm:py-3 px-4 sm:px-10  md:px-14 rounded-md bg-color-4 text-color-2 font-semibold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90'
            >
              <span className='hidden md:block'>Logout</span>
              <LogOutIcon size='20'/>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
          <div className="rounded-lg p-3 sm:p-6 transform hover:scale-105 transition bg-color-1 text-color-4">
            <div className="flex items-center justify-between mb-2">
              <Users size={24} />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
            <p className="text-sm">Total Users</p>
          </div>

          <div className="rounded-lg p-3 sm:p-6 transform hover:scale-105 transition bg-color-1 text-color-4">
            <div className="flex items-center justify-between mb-2">
              <Shield size={24} />
              <span className="text-3xl font-bold">{stats.admins}</span>
            </div>
            <p className="text-sm">Administrators</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="rounded-lg shadow-xl p-3 sm:p-6 mb-6 bg-color-1">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-3 text-color-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg outline-none bg-color-2 text-color-4 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3  py-3 rounded-lg outline-none bg-color-2 text-color-4"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>

              <button
                onClick={() => setAddingUser(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition hover:opacity-90 bg-color-4 cursor-cell"
              >
                <Plus size={20} />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users List */}
        <UsersList filteredUsers={filteredUsers} setViewingUser={setViewingUser} setEditingUser={setEditingUser}/>
      </div>

      {/* View User Modal */}
      {viewingUser && <ViewUser viewingUser={viewingUser} setViewingUser={setViewingUser}/>}

      {/* Edit User Modal */}
      {editingUser && <EditUser editingUser={editingUser} setEditingUser={setEditingUser}/>}

      {/* Add User Modal  */}
      {addingUser && <AddUser setAddingUser={setAddingUser}/>}
    </div>
  );
};

export default App;