import React from "react";

import UsersTable from "../../components/UsersTable";
import TeacherTable from "../../components/TeacherTable";
const TeacherList = () => {
  return (
    <div>
      <TeacherTable resultsPerPage={10} />
    </div>
  );
};

export default TeacherList;
