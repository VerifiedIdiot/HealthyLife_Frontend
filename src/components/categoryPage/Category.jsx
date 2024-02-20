import React, { useState, useEffect } from "react";
import CateInsert from "./CateInsert";
import TodoList from "./CateList";
import CateTemplate from "./CateTemplate";
import Modal from "./Modal";
import CommunityAxiosApi from "../../api/CommunityAxios";

const Category = () => {
  const [cates, setCates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [maxCategories, setMaxCategories] = useState(5);
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
    if (cates.length >= maxCategories) {
      setModalOpen(true);
      setModalMessage("카테고리 개수는 최대 " + maxCategories + "개입니다.");
      return;
    }
    try {
      const rsp = await CommunityAxiosApi.cateInsert(text);
      if (rsp.status === 200) {
        setModalOpen(true);
        setModalMessage("카테고리가 등록 되었습니다.");

        const rsp = await CommunityAxiosApi.cateList();
        setCates(rsp.data);
      } else {
        setModalOpen(true);
        setModalMessage("카테고리 등록이 실패하셨습니다.");
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
        setModalOpen(true);
        setModalMessage("카테고리가 삭제 되었습니다.");
      } else {
        setModalOpen(true);
        setModalMessage("카테고리 삭제가 실패하셨습니다.");
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
