import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className='fixed bottom-0 w-full'>
        {/* Footer Content */}
        <div className='text-center p-0.5 bg-black/50 text-sm text-white font-semibold md:text-lg lg:text-xl'>
            &copy; 2025 User Information. All rights reserved.
        </div>
    </footer>
  )
}
