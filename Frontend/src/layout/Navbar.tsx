import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import userlogo from '../assets/userlogo.png';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center bg-cyan-400/70 p-2 text-sm text-white font-bold md:text-2xl backdrop-blur-md shadow-md z-50">
            {/* Navbar Content */}
            <h1 className='font-serif italic'>
                {/* Navbar Title */}
                <button onClick={() => navigate('/')}>
                    <span className='flex flex-row gap-1.5'>
                        <span>
                            <img src={userlogo} alt="no-pic" width={30} height={30} className='border-2 rounded-3xl border-blue-900 md:h-10 md:w-10'/>
                        </span>
                        <span className='mt-1 md:mt-1'>
                            User Information
                        </span>
                    </span>
                </button>
            </h1>
            {/* Navbar menu icon with hover menu */}
            <div className='flex items-center'>
                <span
                    className='cursor-pointer text-2xl border-2 py-1 px-1 rounded-lg hover:bg-white hover:text-cyan-400 relative'
                    onClick={() => setShowMenu(!showMenu)}
                    onMouseLeave={() => setShowMenu(false)}

                >
                    <IoMenu/>
                    {showMenu && (
                        <div className='absolute right-0 mt-2 w-40 bg-fuchsia-800/80 text-red-500 italic rounded shadow-lg z-50 flex flex-col'>
                            <button
                                onClick={() => { setShowMenu(false); navigate('/'); }}
                                className='px-4 py-2 hover:bg-cyan-100 border-b border-gray-200 text-left'
                            >
                                Home
                            </button>
                            <button
                                onClick={() => { setShowMenu(false); navigate('/dashboard'); }}
                                className='px-4 py-2 hover:bg-cyan-100 border-b border-gray-200 text-left'
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => { setShowMenu(false); navigate('/userform'); }}
                                className='px-4 py-2 hover:bg-cyan-100 border-b border-gray-200 text-left'
                            >
                                User Form
                            </button>
                            <button
                                onClick={() => { setShowMenu(false); navigate('/userdata'); }}
                                className='px-4 py-2 hover:bg-cyan-100 text-left'
                            >
                                User Data
                            </button>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
};
