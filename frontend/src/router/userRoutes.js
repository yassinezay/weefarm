import React from "react";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import { MdHome, MdPerson, MdBarChart } from "react-icons/md";

const userRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "data-tables",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />,
  }
];

export default userRoutes;
