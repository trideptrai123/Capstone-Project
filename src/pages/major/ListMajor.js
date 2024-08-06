import React from "react";

import UsersTable from "../../components/UsersTable";
import TeacherTable from "../../components/TeacherTable";
import MajorTable from "../../components/MajorTable";
const MajorList = () => {
  return (
    <div>
      <MajorTable resultsPerPage={10} />
    </div>
  );
};

export default MajorList;
