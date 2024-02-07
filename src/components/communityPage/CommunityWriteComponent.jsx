import { useState, useEffect, useRef } from "react";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

import { Main, Container } from "../../styles/Layouts";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import MemberApi from "../../api/MemberApi";

const WriteSection = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const WriteHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;
const WriteHeadingText = styled.p`
  width: 200px;
  color: #2446da;
  font-size: 1.5rem;
  font-family: "noto sans";
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  margin-bottom: 10px;
  border-top: 2px solid #2446da;
`;
const WriteBorder = styled.input`
  display: flex;
  font-size: 1.4rem;
  font-family: "noto sans";
  width: ${(props) => props.width || "100%"};
  align-items: center;
  border: none;
`;

const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 5px;
  font-size: 1.2rem;
  font-family: "noto sans";
  border-radius: 4px;
  margin-bottom: 10px;
  width: 150px; // 드롭다운 너비 조정
`;
const StyledReactQuill = styled(ReactQuill)`
  background-color: rgba(36, 70, 218, 0.6);
  z-index: 4;
  margin-top: 10px;
  .ql-container {
    width: 100%;
    height: 50vh;
    font-size: 1.2rem;
    font-family: "noto sans";

    overflow-y: auto;
    opacity: 1;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    border: none;
  }

  .ql-toolbar {
    display: flex;
    flex-wrap: wrap; // 버튼들이 다음 줄로 넘어가지 않도록
    justify-content: flex-start; // 버튼들을 왼쪽에서부터 나열
  }
  .ql-toolbar .ql-formats {
    margin-right: 2px !important; // 버튼들 사이의 간격을 2px로
  }
  @media (max-width: 1024px) {
    .ql-container {
      width: 100%; // 모바일 환경에서는 에디터의 높이를 줄입니다.
    }
    .ql-toolbar {
    }
  }
  .ql-fill {
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;
const WriteComponent = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [email, setEmail] = useState("");

  const quillRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await CommunityAxiosApi.cateList();
        setCategories(rsp.data);
        setSelectedCategory(rsp.data[0].categoryId);
      } catch (error) {
        console.log(error);
      }
    };

    const quillInstance = quillRef.current.getEditor();
    const changeHandler = function () {
      // 편집기 내용에서 이미지와 동영상 태그 찾기
      const Delta = quillInstance.getContents();
      const mediaTags = [];

      Delta.ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          mediaTags.push(op.insert.image);
        }
        if (op.insert && op.insert.video) {
          mediaTags.push(op.insert.video);
        }
      });

      // content에서 이미지와 동영상 태그 제거하고 상태 업데이트
      const textOnly = quillInstance.getText();
      setText(textOnly);
      console.log(textOnly);
    };

    quillInstance.on("text-change", changeHandler);

    getCategories();

    return () => {
      // Cleanup function
      quillInstance.off("text-change", changeHandler);
    };
  }, []);
  const PostRegister = async () => {
    try {
      const response = await MemberApi.getMemberDetail();
      const email = response.data.email;
      setEmail(email);

      if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 입력하세요.");
        return;
      }
      const communityDto = {
        title: title,
        content: content,
        text: text,
        categoryId: selectedCategory,
        email: email,
      };
      const response2 = await CommunityAxiosApi.communityPost(communityDto);
      console.log(response2.data);
      if (response2.status === 200) {
        alert("게시글이 등록되었습니다.");
        navigate("/");
      }
    } catch (error) {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  //  quill 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 헤더 레벨을 드롭다운 메뉴로
      ["bold", "italic", "underline", "strike"], // 텍스트 스타일 버튼
      [{ color: [] }, { background: [] }], // 색상 선택을 드롭다운 메뉴로
      [{ font: [] }], // 폰트 선택을 드롭다운 메뉴로
      [{ align: [] }], // 정렬 선택을 드롭다운 메뉴로
      ["link", "image", "video"], // 링크, 이미지, 동영상 업로드 버튼
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"], // 포맷 초기화 버튼
    ],
  };
  return (
    <Main>
      <Container $align="center">
        <WriteSection>
          <WriteHeading>
            <WriteHeadingText>Community</WriteHeadingText>
          </WriteHeading>
          <Line />
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </CategorySelect>
          <WriteBorder
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledReactQuill
            ref={quillRef}
            placeholder="내용을 입력해주세요."
            defaultValue={content}
            onChange={(value) => setContent(value)}
            formats={["image"]}
            modules={modules}
            readOnly={false}
          />

          <ButtonContainer>
            <SmallButton onClick={() => navigate("/")}>취소</SmallButton>
            <SmallButton onClick={PostRegister}>작성</SmallButton>
          </ButtonContainer>
        </WriteSection>
      </Container>
    </Main>
  );
};

export default WriteComponent;
