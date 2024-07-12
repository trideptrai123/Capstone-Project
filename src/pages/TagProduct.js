import { Card } from "@windmill/react-ui";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TagTable from "../components/TagTable";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const TagProduct = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");

  const handleFilter = (filter_name) => {
    // console.log(filter_name);
    if (filter_name == "all") {
      setFilter("all");
    }
    if (filter_name == "approved") {
      setFilter("approved");
    }
    if (filter_name == "pending") {
      setFilter("pending");
    }
  };

  return (
    <div>
      <PageTitle>Tag sản phẩm</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Trang chủ
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Tag sản phẩm</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
    
      </Card>

      {/* Table */}
      <TagTable  resultsPerPage={resultsPerPage} filter={filter} />
    </div>
  );
};

export default TagProduct;
