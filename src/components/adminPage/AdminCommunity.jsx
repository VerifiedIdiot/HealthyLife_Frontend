import { useState, useEffect, useCallback } from "react";
import AdminAxiosApi from "../../api/AdminApi";
import {
  PageButton,
  PaginationContainer,
  RightBox,
  SideBar,
} from "./AdminMember";

const AdminCommunityComp = () => {
  const [dataList, setDataLIst] = useState([]);

  //페이지 네이션 관련
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(10); // 총 페이지 수
  const [isTrue, setIsTrue] = useState(false);
  // 리렌더링 용
  const reRender = () => {
    setIsTrue((prev) => !prev);
  };

  // 날짜 포멧
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
    return formattedDate;
  };

  // 페이지 api 정의
  useEffect(() => {
    const fetchTotalPage = async () => {
      try {
        const res = await AdminAxiosApi.getAdminPages(0, 10);
        setTotalPage(res.data);
        console.log("멤버전체" + res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalPage();
  }, []);

  // 게시글 api 정의
  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const res = await AdminAxiosApi.getCommunityList(currentPage, 10);
        console.log(res.data);
        setDataLIst(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataList();
  }, [currentPage, isTrue]);

  // 페이지네이션 - 페이지 이동 기능
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  // 페이지네이션 버튼
  const renderPagination = () => {
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };

  // 게시글 삭제
  const HandleDeleteCommunity = async (editId) => {
    const communityDel = async () => {
      try {
        const rsp = await AdminAxiosApi.deleteCommunity(editId);
        console.log(editId);
        if (rsp.status === 200) {
          alert("게시글 삭제가 완료되었습니다.");
          reRender();
        }
      } catch (e) {
        console.log("에러");
      }
    };
    communityDel();
  };
  return (
    <>
      <SideBar>
        <RightBox>
          <h1>게시글 관리</h1>
          <div className="scrollBox">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>작성자</th>
                  <th>카테고리</th>
                  <th>게시글 제목</th>
                  <th>조회수</th>
                  <th>작성 날짜</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((community, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{community.nickName}</td>
                    <td>{community.categoryName}</td>
                    <td>{community.title}</td>
                    <td>{community.viewCount}</td>
                    <td>{formatDate(community.regDate)}</td>
                    {/* <td> */}
                    {/* {member.memberGrade === "paid" ? "구독중" : "미구독"} */}
                    {/* {member.isKakao === false ? "카카오" : member.isKakao} */}
                    {/* </td> */}
                    <td>
                      <button
                        onClick={() =>
                          HandleDeleteCommunity(community.communityId)
                        }
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </RightBox>
      </SideBar>
    </>
  );
};
export default AdminCommunityComp;
