import { X } from 'lucide-react';

const ViewUser = ({viewingUser, setViewingUser }) => {
  return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg shadow-2xl p-6 w-full max-w-2xl bg-color-1 box-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-color-4">User Details</h3>
              <button onClick={() => setViewingUser(null)} className='text-color-4 cursor-pointer'>
                <X size={24} />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 bg-color-4">
                <span className="text-4xl font-bold text-color-1">
                  {viewingUser.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h4 className="text-xl font-bold text-color-4">{viewingUser.fullName}</h4>
              <p className='text-color-4 opacity-90'>{viewingUser.email}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-lg p-4 bg-color-2 col-span-2 sm:col-span-1">
                <p className="text-sm mb-1 text-color-4">User ID</p>
                <p className="font-mono font-bold text-color-4">#{viewingUser._id}</p>
              </div>

              <div className="rounded-lg p-4 bg-color-2 col-span-2 sm:col-span-1">
                <p className="text-sm mb-1 text-color-4">Role</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${viewingUser.role === 'admin' ? 'bg-color-4 text-color-1' : 'bg-color-1 text-color-4'}`}>
                  {viewingUser.role.toUpperCase()}
                </span>
              </div>

              <div className="rounded-lg p-4 bg-color-2 col-span-2">
                <p className="text-sm mb-1 text-color-4">Join Date</p>
                <p className="font-bold text-color-4">{viewingUser.createdAt}</p>
              </div>

            </div>

            <button
              onClick={() => setViewingUser(null)}
              className="w-full mt-6 py-3 rounded-lg font-semibold transition hover:opacity-90 bg-color-4 text-color-1 cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
  )
}

export default ViewUser