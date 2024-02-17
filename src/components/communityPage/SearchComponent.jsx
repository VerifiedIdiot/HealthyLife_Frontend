import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import { FaSearch } from "react-icons/fa";
const Select = styled.select`
  flex: 1;
  width: 100%;
  /* height: 100%; */
  padding: 5px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: #fff;
  border: 1px solid #2446da;
  transition: 1s;
  transition: width 0.4s, opacity 0.4s, visibility 0.4s;

  &:hover {
    box-shadow: 0px 0px 1px 1px #2446da;
    width: 700px;
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
`;
const SearchButton = styled.a`
  text-decoration: none;
  float: right;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2446da;
  transition: width 0.4s, opacity 0.4s, visibility 0.4s;

  &:hover {
    background-color: #fff;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 3em;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
const SearchInput = styled.input`
  padding: 0;
  width: 0;
  opacity: 0;
  visibility: hidden;
  border: none;
  background: none;
  outline: none;
  float: left;
  font-size: 1rem;
  line-height: 30px;
  transition: width 0.4s, opacity 0.4s, visibility 0.4s;
  cursor: pointer;

  ${SearchBox}:hover & {
    width: 700px;
    padding: 0 6px;
    opacity: 1;
    visibility: visible;
  }
`;
const SearchComponent = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("titleAndContent");

  const search = async () => {
    try {
      const result = await CommunityAxiosApi.searchCommunity(
        searchType,
        keyword
      );

      // navigate를 사용하여 결과 페이지로 이동. 두번째 파라미터로 상태를 전달.
      console.log(result.data);
      navigate(`/communitypage/search/${keyword}`, {
        state: { result: result.data },
      });
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SearchContainer>
        <Select onChange={(event) => setSearchType(event.target.value)}>
          <option value="titleAndContent">제목+내용</option>
          <option value="title">제목</option>
          <option value="nickName">작성자</option>
          <option value="comment">댓글</option>
        </Select>
        <SearchBox>
          <SearchInput
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            placeholder="검색어를 입력하세요"
          />
          <SearchButton href="">
            <FaSearch />
          </SearchButton>
        </SearchBox>
      </SearchContainer>
    </>
  );
};
export default SearchComponent;
