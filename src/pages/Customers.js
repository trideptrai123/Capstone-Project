import React from "react";

import UsersTable from "../components/UsersTable";
const Customers = () => {
  return (
    <div>
      <UsersTable resultsPerPage={10} />
    </div>
  );
};

export default Customers;
