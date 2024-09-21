import { Tooltip, List, Form, Button, Row, Avatar, message,Rate } from "antd";
import { Comment } from "@ant-design/compatible";

import moment from "moment";
import "./Comment.css";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetListCommentByPostIdQuery,
  useUpdateCommentMutation,
} from "../../redux/commentUniversitySlice";
import { useParams } from "react-router-dom";
import { handleErrorHttp } from "../../utils/helpers";

const getFirstName = (name) => {
  if (typeof name === "string" && name?.length > 0) {
    return name[0].toUpperCase();
  }
};
export const AddComment = ({
  isReply,
  isAnswer,
  parentComment,
  callback = () => {},
  mode = "add",
  itemUpdate,
}) => {
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(0);


  const [addComment, { isLoading }] = useAddCommentMutation();
  const [updateComment, { isLoadingUpdate }] = useUpdateCommentMutation();
  const { userInfo } = useSelector((state) => state.auth);


  const { id } = useParams();
 
    useEffect(() => {
      if(itemUpdate && mode === "edit"){
          setValue(itemUpdate?.contentText)
      }
    },[itemUpdate])
    const handleRateChange = (value) => {
      setRating(value);
  };
  const onSubmit = async () => {
    const body = {
      content: value,
      universityId: id,
      userId: userInfo?._id,
      rating: rating,
      parentComment: parentComment || null,
    };
    try {
      mode === "add"
        ? await addComment(body)
        : await updateComment({
            data: body,
            id: itemUpdate?.id,
          });
      setValue("");
      setRating(0);
      callback();
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  return (
 
    <Comment
      style={{
        paddingInline: 10,
      }}
      avatar={
        <Avatar
          style={{
            marginTop: 20,
          }}
        >
          {getFirstName(userInfo?.name)}
        </Avatar>
      }
      content={
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Rate onChange={handleRateChange} value={rating} hidden={isAnswer} />
          <TextArea
            style={{
              width: 500,
            }}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />

          <Button
            disabled={!value?.trim()}
            style={{
              marginTop: 10,
              background: "#56ccf2",
              color: "white",
              width: 120,
            }}
            htmlType="submit"
            loading={isLoading || isLoadingUpdate}
            onClick={onSubmit}
          >
            {mode === "add" ? "Thêm bình luận" : "Sửa bình luận"}
          </Button>
        </div>
      }
    />

  );
};
const ListCommentUniversity = () => {
  const { id } = useParams();

  const [isAnswer, setAnwser] = useState(false);
  const { data: list } = useGetListCommentByPostIdQuery(id);
  const [currentIdReply, setCurrentIdReply] = useState(null);
  const [currentIdReply2, setCurrentIdReply2] = useState(null);
  const [mode, setMode] = useState("add");
  const [deleteComment] = useDeleteCommentMutation();
  const { _id: userId, isAdmin } = useSelector((state) => state.auth)?.userInfo || {};
  const { userInfo } = useSelector((state) => state.auth);
  // Delete Comment
  const handleDelete = async (id) => {
    await deleteComment(id);
    message.success("Đã xóa bình luận");
    try {
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  const mapItem = (isparent) => (commetItem) => {
    const userIdComment = commetItem?.userId?._id;
    const item = {
      contentText: commetItem?.content,
      universityId: commetItem?.universityId,
      rating: commetItem?.rating,
      userId: userIdComment,
      parentComment: commetItem?.parentComment || null,
      id: commetItem?._id,
     
      actions: [
        <span
          hidden= {!userInfo}
          onClick={() => {
            setAnwser(true) 
            isparent === true 
              ? setCurrentIdReply(commetItem?._id)
              : setCurrentIdReply2(String(commetItem?._id));
            setMode("add");
          }}
          key="comment-list-reply-to-0"
        >
          Trả lời
        </span>,
        
        isAdmin || userIdComment === userId ? (
          <span
            onClick={() => {
              isparent === true
                ? setCurrentIdReply(commetItem?._id)
                : setCurrentIdReply2(String(commetItem?._id));
              setMode("edit");
            }}
            key="comment-list-reply-to-0"
          >
            Sửa
          </span>
        ) : null,
        isAdmin || userIdComment === userId ?(
        <span
          onClick={() => handleDelete(commetItem?._id)}
          key="comment-list-reply-to-0"
        >
          Xóa
        </span>
        ) : null
    
      ],
      
      author: commetItem?.userId?.name,
      avatar: (
        <Avatar
          style={{
            marginTop: 20,
          }}
        >
          {getFirstName(commetItem?.userId?.name)}
        </Avatar>
      ),
      content: <span>{commetItem.content}</span>,
      datetime: (
        <Tooltip
          title={moment(commetItem.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment(commetItem.updatedAt).fromNow()}</span>
        </Tooltip>
      ),
    };
    return item;
    
  };
  const data = list?.map((commetItem) => {
    const item = mapItem(true)(commetItem);
    if (Array.isArray(commetItem.replies) && commetItem?.replies?.length > 0) {
      item.replies = commetItem.replies
        .map(mapItem(false))
        .map((i) => ({ ...i, pid: commetItem?._id }));
    }
    return item;
  });
  let lengthComment = 0;
  data?.forEach((i) => {
    if (Array.isArray(i.replies)) {
      lengthComment += i?.replies?.length;
    }
  });
  lengthComment += data?.length;

  const getItemUpdate = (commetItem = {}) => {
    console.log(commetItem)
    return {
      contentText: commetItem?.contentText,
      universityId: commetItem?.universityId,
      userId: commetItem?.userId,
      parentComment: commetItem?.parentComment || null,
      id:commetItem?.id
    };
  };
  return (
    <>
      <h3
        style={{
          textAlign: "start",
        }}
      >
        Bình luận về bài viết
      </h3>
      <p
        style={{
          fontSize: 14,
        }}
      >{`${lengthComment} bình luận`}</p>
    {userInfo  && userInfo?.universityId === id  &&
      <AddComment isAnswer={isAnswer}/>
    }
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              style={{
                paddingInline: 10,
              }}
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            >
              <Rate value={item.rating} />
              {currentIdReply == item.id && (
                <AddComment
                  isAnswer={isAnswer}
                  isReply = {true}
                  itemUpdate={getItemUpdate(item)}
                  mode={mode}
                  callback={() => {
                    setCurrentIdReply(null);
                  }}
                  parentComment={item.id}
                />
              )}
              { item?.replies?.map((i) => (
                <>
                  <Comment
                    style={{
                      paddingInline: 10,
                    }}
                    actions={i.actions}
                    author={i.author}
                    avatar={i.avatar}
                    content={i.content}
                    datetime={i.datetime}
                  />
                  {currentIdReply2 === i.id && (
                    <AddComment
                    isAnswer={isAnswer}
                    isReply = {true}
                      itemUpdate={getItemUpdate(i)}
                      mode={mode}
                      callback={() => {
                        setCurrentIdReply2(null);
                      }}
                      parentComment={i.pid}
                    />
                  )}
                </>
              ))}
            </Comment>
          </li>
        )}
      />

      <div></div>
    </>
  );
};
export default ListCommentUniversity;
