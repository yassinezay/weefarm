import React from "react";
import InviteUser from "views/admin/accounts/ajoutadmin";
import EditAdmin from "views/admin/accounts/editadmin";

const Adminroutes = [
  {
    name: "Invite User",
    layout: "/admin",
    path: "accounts/ajoutadmin",
    component: <InviteUser />,
  },
  {
    name: "Edit Admin",
    layout: "/admin",
    path: "accounts/editadmin/:id",
    component: <EditAdmin />,
  }
  // Add other routes here
];

export default Adminroutes;
