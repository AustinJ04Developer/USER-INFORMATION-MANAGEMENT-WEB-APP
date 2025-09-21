import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import { addUserAsync, updateUserAsync } from '../redux/UserSlice';
import type { User, NewUser } from '../redux/UserSlice';

export const UserForm: React.FC = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const editingUser = users.find(u => u.id === Number(id)) || null;

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Pending'>('Active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setDateOfBirth(editingUser.dateOfBirth);
      setEmail(editingUser.email);
      setAddress(editingUser.address);
      setPhone(editingUser.phone);
      setStatus(editingUser.status);
    }
  }, [editingUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingUser) {
        const updatedUser: User = {
          ...editingUser,
          name,
          dateOfBirth,
          email,
          address,
          phone,
          status,
        };
        await dispatch(updateUserAsync(updatedUser)).unwrap();
        toast.success('User updated successfully!', { toastId: 'user-update-success', onClose:() => navigate('/userdata') });
      } else {
        const newUser: NewUser = { name, dateOfBirth, email, address, phone, status };
        await dispatch(addUserAsync(newUser)).unwrap();
        toast.success('User added successfully!', { toastId: 'user-add-success' });
        // Reset form
        setName('');
        setDateOfBirth('');
        setEmail('');
        setAddress('');
        setPhone('');
        setStatus('Active');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save user');
      toast.error(err.message || 'Failed to save user', { toastId: 'user-save-error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white/50 backdrop-blur-md p-1.5 rounded-lg shadow-md flex flex-col gap-1 m-6 mt-16 md:m-20 md:mt-30 lg:mx-100">
      <h2 className="text-2xl font-bold text-center text-red-800 italic font-serif">
        {editingUser ? 'Update User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Name */}
        <div className="p-1 flex flex-col gap-1">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        {/* Date of Birth */}
        <div className="p-1 flex flex-col gap-1">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={e => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        {/* Email */}
        <div className="p-1 flex flex-col gap-1">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Address */}
        <div className="p-1 flex flex-col gap-1">
          <label>Address:</label>
          <textarea
            placeholder="Address"
            value={address}
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>
        {/* Phone */}
        <div className="p-1 flex flex-col gap-1">
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        {/* Status */}
        <div className="p-1 flex flex-col gap-1">
          <label>Status:</label>
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Active" | "Inactive" | "Pending")}
              className="border rounded p-1 w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded font-semibold text-white transition-colors duration-200 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
          >
            {loading ? (editingUser ? 'Updating...' : 'Adding...') : (editingUser ? 'Update User' : 'Add User')}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};
