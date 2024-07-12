import { Card, CardBody } from "@windmill/react-ui";
import React, { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import stylesheet của Quill
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postApi } from "../api/postApi";
import PageTitle from "../components/Typography/PageTitle";
import useFetchData from "../hook/useFetchData";
import { dateFormat } from "../utils/helper";

const DetailPost = () => {
  const fileRef = useRef();
  const { id } = useParams();
  const { data: listCategory } = useFetchData(postApi.getCategoryPost);
  const [detail, setDetail] = useState(null);
  const history = useHistory();
  const [dataPost, setDataPost] = useState({
    headerImage: "",
    title: "",
    content: "",
    category: "",
  });

  // Get detail by id
  useFetchData(() => postApi.getPostbyid(id), setDetail, [id]);
  // Set Init
  return (
    <div className="text-[#F0F0F0]">
     <Card className="row-span-1 md:col-span-1 mt-4 px-5 mb-5">
     <CardBody>
     <PageTitle>{detail?.title}</PageTitle>
      <div className="-mt-5">
        <div
          style={{
            color: "#DCDCDC",
          }}
          className="font-semibold"
        >
          {detail?.category?.name}
        </div>
        <div className="italic text-gray-400 text-sm">
          {dateFormat(detail?.updatedAt)}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 col-span-3 ">
          <div
            style={{
              color: "#DCDCDC",
            }}
            dangerouslySetInnerHTML={{ __html: detail?.content }}
          />
          
           
          
        </div>
      </div>
     </CardBody>
     
      </Card>
    </div>
  );
};

export default DetailPost;
