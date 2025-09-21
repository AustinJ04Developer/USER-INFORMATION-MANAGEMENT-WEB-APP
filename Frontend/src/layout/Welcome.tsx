import React from "react";
import { useNavigate } from "react-router-dom";

interface Section {
  title: string;
  description: string;
  color: string;
  path: string; 
}

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const sections: Section[] = [
	  {
      title: "Dashboard",
      description: "View overall application stats and summaries.",
      color: "bg-purple-500/50",
      path: "/dashboard",
    },
    {
      title: "User Form",
      description: "Add or update user details through forms.",
      color: "bg-green-500/50",
      path: "/userform",
    },
    {
      title: "User Data",
      description: "Browse and manage all user information.",
      color: "bg-blue-500/50",
      path: "/userdata",
    },
    {
      title: "About",
      description: "User Information Management System built with React, Redux Toolkit, Node.js, TypeORM, and MySQL.",
      color: "bg-yellow-500/50",
      path: "/about",
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl text-red-800 text-center italic font-bold font-serif mt-10 mb-4 md:mt-12 lg:mt-16">
        Welcome!
      </h1>

      {/* Responsive grid: 1 col (sm), 2 cols (md), 4 cols (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
			      onClick={() => navigate(section.path)}
            className={`p-6 border-2 rounded-lg shadow-md backdrop-blur-md hover:scale-105 transition-transform duration-200 md:py-18 cursor-pointer ${section.color}`}
          >
            <h2 className="text-xl font-bold md:text-3xl text-white mb-2">{section.title}</h2>
            <p className="text-white text-sm md:text-md italic">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
