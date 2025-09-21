import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserAsync } from "../redux/UserSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  address: string;
  phone: string;
  status: 'Active' | 'Completed';
};

export const UserData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users) as User[];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => toast.success('Users loaded successfully!', { toastId: "load-success" }))
      .catch((err: Error) => {
        setError(err.message);
        toast.error(err.message || 'Failed to load users', { toastId: "load-error" });
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await dispatch(deleteUserAsync(id)).unwrap();
      toast.success("User deleted successfully!", { toastId: "delete-success" });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user", { toastId: "delete-error" });
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/userform/${id}`); // ✅ correct route for editing
  };

  const handleAdd = () => {
    navigate('/userform'); // ✅ new user
  };

  return (
    <div className="my-20 px-6">
      <h2 className="text-2xl font-bold mb-4 text-red-400 italic font-serif text-center">
        User Data List
      </h2>

      <div className="flex justify-center mb-6">
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 border-2 border-cyan-200 rounded-lg hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {loading && <p className="text-blue-300">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Mobile view */}
      <div className="block lg:hidden">
        <ul className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <li key={user.id} className="p-6 bg-blue-500/60 shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition backdrop-blur-md">
              <div className="mb-2"><span className="font-semibold text-gray-700">Name:</span> {user.name}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Date of Birth:</span> {user.dateOfBirth || 'N/A'}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Email:</span> {user.email}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Address:</span> {user.address}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Phone:</span> {user.phone}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Status:</span> {user.status}</div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block">
        <table className="min-w-full bg-white/70 rounded-xl shadow-md font-serif backdrop-blur-md overflow-hidden">
          <thead>
            <tr className="bg-blue-500/40 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Date of Birth</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.dateOfBirth || 'N/A'}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.address}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.status}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
