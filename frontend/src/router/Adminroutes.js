import React from "react";
import InviteUser from "views/admin/accounts/ajoutadmin";

const Adminroutes = [
  {
    name: "Invite User",
    layout: "/admin",
    path: "accounts/ajoutadmin",
    component: <InviteUser />,
  },
  // Add other routes here
];

export default Adminroutes;
