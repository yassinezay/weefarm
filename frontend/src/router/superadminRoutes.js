import React from "react";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/accounts";
import Profile from "views/admin/profile";
import ProductTable from "views/admin/product/product"; // Changez le nom du composant ici
import { MdHome, MdPerson, MdBarChart } from "react-icons/md";

const superadminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Admins",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
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
    path: "product",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <ProductTable />, // Changez aussi le nom du composant ici
  }
];

export default superadminRoutes;
