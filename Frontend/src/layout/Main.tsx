import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const Main: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Navbar />
			<main className="flex-1 p-4">
				<Outlet />
			</main>
		</div>
	);
};
