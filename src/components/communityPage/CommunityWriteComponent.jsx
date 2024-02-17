import { useState, useEffect, useRef } from "react";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import { useParams } from "react-router-dom";
import { Main } from "../../styles/Layouts";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import MemberApi from "../../api/MemberApi";

const Container = styled.div`
  display: flex;
  width: 1000px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  opacity: var(--, 1);
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const WriteSection = styled.div`
  height: 1494.03px;
  align-self: stretch;
  opacity: var(--, 1);
  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

const WriteHeading = styled.div`
  display: flex;
  align-items: flex-start;
`;
const WriteHeadingText = styled.p`
  color: #2446da;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 80px;
  margin-bottom: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  margin-bottom: 20px;
  border-top: 2px solid #2446da;
`;
const WriteBorder = styled.input`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  border: none;
`;

const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 10px 0 10px 0;
  border-radius: 4px;
  margin-bottom: 20px;
`;
const StyledReactQuill = styled(ReactQuill)`
  background-color: rgba(36, 70, 218, 0.3);
  margin-top: 20px;
  margin-bottom: 20px;

  .ql-container {
    display: flex;
    background: #fff;
    flex-wrap: wrap;
    height: 600px;
    width: 100%;
    max-height: 500px;
    opacity: 1;
  }

  .ql-toolbar {
    display: flex;
    flex-wrap: wrap; // 버튼들이 다음 줄로 넘어가지 않도록
    justify-content: flex-start; // 버튼들을 왼쪽에서부터 나열
  }
  .ql-toolbar .ql-formats {
    margin-right: 2px !important; // 버튼들 사이의 간격을 2px로
  }
  .selector-class {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    .ql-container {
      width: 100%; // 모바일 환경에서는 에디터의 높이를 줄입니다.
    }
    .ql-toolbar {
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
`;
const WriteComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState("");
  const { id } = useParams();
  const quillRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await CommunityAxiosApi.cateList();
        setCategories(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const postResponse = await CommunityAxiosApi.getCommunityDetail(id);
          setPosts(postResponse.data);
          setTitle(postResponse.data.title);
          setContent(postResponse.data.content);
          setSelectedCategory(postResponse.data.categoryId);
          console.log(postResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    if (quillRef.current) {
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

      return () => {
        // Cleanup function
        quillInstance.off("text-change", changeHandler);
      };
    }
  }, [quillRef]);
  const PostRegister = async () => {
    try {
      let response = await MemberApi.getMemberDetail();
      const email = response.data.email;

      if (
        !id &&
        (!title.trim() || !content.trim() || !selectedCategory.trim())
      ) {
        alert("제목, 내용, 카테고리를 모두 입력해주세요.");
        return;
      }

      const communityDto = {
        title: title,
        content: content,
        text: content,
        categoryId: selectedCategory,
        email: email,
      };

      if (id) {
        response = await CommunityAxiosApi.modifyCommunity(id, communityDto);
      } else {
        response = await CommunityAxiosApi.communityPost(communityDto);
      }

      if (response.status === 200) {
        alert(id ? "게시글이 수정되었습니다." : "게시글이 등록되었습니다.");
        navigate("/communitypage");
      }
    } catch (error) {
      console.error("게시글 등록 또는 수정 중 오류:", error);
      alert("게시글 등록 또는 수정 중 오류가 발생했습니다.");
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
    <Main $height="auto" $justify="center" $align="center">
      <Container>
        <WriteSection>
          <WriteHeading>
            <WriteHeadingText>Community</WriteHeadingText>
          </WriteHeading>
          <Line />
          <CategorySelect
            value={selectedCategory || ""} // selectedCategory가 undefined이면 빈 문자열로 설정
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">카테고리를 선택하세요.</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </CategorySelect>
          <WriteBorder
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledReactQuill
            ref={quillRef}
            placeholder="내용을 입력해주세요"
            value={content !== undefined ? content : ""}
            onChange={(value) => setContent(value)}
            modules={modules}
          />

          <ButtonContainer>
            <MiddleButton onClick={() => navigate("/communitypage")}>
              취소
            </MiddleButton>
            <MiddleButton onClick={PostRegister}>
              {id ? "저장" : "작성"}
            </MiddleButton>
          </ButtonContainer>
        </WriteSection>
      </Container>
    </Main>
  );
};

export default WriteComponent;
