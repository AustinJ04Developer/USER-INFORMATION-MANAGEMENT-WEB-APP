import React from "react";

export const About: React.FC = () => {
  return (
    <div className="p-6 mt-10 md:mt-12 space-y-8 mb-2">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-red-500 font-serif mb-2">About This Project</h1>

      {/* Project Overview */}
      <section className="bg-yellow-50/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
        <p className="text-gray-700">
          This is a **User Information Management System** designed to efficiently manage and organize user data. 
          The application provides a clean interface for adding, updating, viewing, and deleting user information. 
          It is built using modern technologies for scalability, maintainability, and performance.
        </p>
      </section>

      {/* Key Features */}
      <section className="bg-yellow-50/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Dashboard displaying overall stats and summaries.</li>
          <li>CRUD operations for user management (Create, Read, Update, Delete).</li>
          <li>Responsive UI built with React and Tailwind CSS.</li>
          <li>State management using Redux Toolkit for predictable state handling.</li>
          <li>Routing using React Router for smooth navigation.</li>
          <li>Secure backend API using Node.js, Express, and TypeScript.</li>
          <li>Data persistence via MySQL database with TypeORM ORM.</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="bg-yellow-50/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Frontend:</strong> React, Redux Toolkit, TypeScript, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express, TypeScript</li>
          <li><strong>Database:</strong> MySQL, TypeORM</li>
          <li><strong>Routing:</strong> React Router</li>
          <li><strong>Version Control:</strong> Git & GitHub</li>
        </ul>
      </section>

      {/* Architecture */}
      <section className="bg-yellow-50/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Application Architecture</h2>
        <p className="text-gray-700">
          The application follows a **client-server architecture**:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Frontend:</strong> React application that communicates with backend APIs.</li>
          <li><strong>Backend:</strong> RESTful API built with Node.js, handling business logic and database interactions.</li>
          <li><strong>Database:</strong> MySQL with TypeORM, providing relational data storage.</li>
          <li><strong>State Management:</strong> Redux Toolkit ensures centralized and predictable state.</li>
        </ul>
      </section>

      {/* Future Scope */}
      <section className="bg-yellow-50/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Future Scope</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Add user authentication and role-based access control.</li>
          <li>Integrate advanced analytics on the dashboard.</li>
          <li>Add support for file uploads and profile images.</li>
          <li>Implement notifications and email alerts.</li>
          <li>Deploy the application to cloud platforms for global access.</li>
        </ul>
      </section>
    </div>
  );
};
