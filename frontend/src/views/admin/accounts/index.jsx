import React from "react";
import { useNavigate } from "react-router-dom";
import TopCreatorTable from "./components/TableTopCreators";
import tableDataTopCreators from "views/admin/accounts/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/accounts/variables/tableColumnsTopCreators";

const Accounts = () => {
  const navigate = useNavigate();

  const handleAddAdmin = () => {
    navigate('/admin/accounts/ajoutadmin');
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      {/* Container for button and table */}
      <button
        onClick={handleAddAdmin}
        className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Ajouter Admin
      </button>
      <div className="pt-12">
        <div className="h-[600px] overflow-y-auto">
          <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          />
        </div>
      </div>
    </div>
  );
};

export default Accounts;
