import React from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Project from "./components/Project";

const ProfileOverview = () => {
  // Retrieve user data from localStorage
  const fullname = localStorage.getItem('fullname') || "Default Name";
  const email = localStorage.getItem('email') || "default@example.com";


  return (
    <div className="flex w-full flex-col gap-5">
      {/* Center the Banner */}
      <div className="flex justify-center w-full mt-3">
        <div className="w-full max-w-4xl">
          <Banner fullname={fullname} />
        </div>
      </div>

      {/* all project & ... */}
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General fullname={fullname} email={email} />
        </div>

      </div>
    </div>
  );
};

export default ProfileOverview;
