import React, { useState, useEffect } from "react";
import CateInsert from "./CateInsert";
import TodoList from "./CateList";
import CateTemplate from "./CateTemplate";
import Modal from "./Modal";
import CommunityAxiosApi from "../../api/CommunityAxiosApi";
// import { jwtDecode } from "jwt-decode";

const Category = () => {
  const [cates, setCates] = useState([]);
  const [email, setEmail] = useState("admin@admin.com");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const todoList = async () => {
      try {
        const rsp = await CommunityAxiosApi.cateList();
        if (rsp.status === 200) setCates(rsp.data);
        console.log(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    todoList();
  }, []);

  const onInsert = async (text) => {
    // console.log("onInsert : " + text + " " + decodedToken.sub);
    try {
      const rsp = await CommunityAxiosApi.cateInsert(email, text);
      if (rsp.data === true) {
        const rsp = await CommunityAxiosApi.cateList();
        if (rsp.status === 200) setCates(rsp.data);
        console.log(rsp.data);
      } else {
        setModalOpen(true);
        setModalMessage("등록 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRemove = async (id) => {
    try {
      const rsp = await CommunityAxiosApi.cateDelete(id);
      if (rsp.data === true) {
        const rsp = await CommunityAxiosApi.cateList();
        if (rsp.status === 200) setCates(rsp.data);
        console.log(rsp.data);
      } else {
        setModalOpen(true);
        setModalMessage("삭제 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CateTemplate>
      <CateInsert onInsert={onInsert} />
      <TodoList todos={cates} onRemove={onRemove} />
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalMessage}
      </Modal>
    </CateTemplate>
  );
};
export default Category;
