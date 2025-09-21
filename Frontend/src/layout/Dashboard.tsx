import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchUsers } from "../redux/UserSlice";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // --- Summary cards ---
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "Active").length;
  const inactiveUsers = users.filter(u => u.status === "Inactive").length;
  const pendingUsers = users.filter(u => u.status === "Pending").length;

  const summaryCards = [
    { title: "Total Users", value: totalUsers, bg: "bg-purple-500/50" },
    { title: "Active Users", value: activeUsers, bg: "bg-green-500/50" },
    { title: "Inactive Users", value: inactiveUsers, bg: "bg-red-500/50" },
    { title: "Pending Users", value: pendingUsers, bg: "bg-yellow-500/50" },
  ];

  // --- Prepare monthly user growth based on dateOfBirth ---
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const userStats = months.map((month, index) => ({
    month,
    users: users.filter(u => new Date(u.dateOfBirth).getMonth() === index).length,
  }));

  // --- Prepare Pie chart data ---
  const taskStats = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
    { name: "Pending", value: pendingUsers },
  ];

  return (
    <div className="p-4 md:p-6 mt-10 md:mt-14 space-y-8">
      <h1 className="text-3xl md:text-4xl font-serif text-center font-bold text-red-600">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
        {summaryCards.map(card => (
          <div key={card.title} className={`p-4 ${card.bg} backdrop-blur-md rounded-xl text-center shadow-md`}>
            <h2 className="text-lg md:text-xl font-semibold">{card.title}</h2>
            <p className="text-2xl md:text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-md w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">User Births Distribution by Month</h2>
        <div className="w-full h-72 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userStats}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-md w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">User Status Distribution</h2>
        <div className="w-full h-72 md:h-96 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {taskStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-md w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Monthly User Births</h2>
        <div className="w-full h-72 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
