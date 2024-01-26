import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxiosApi";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import { FaSearch } from "react-icons/fa";
const Select = styled.select`
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 40;

  &:hover {
    @media (max-width: 1024px) {
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
  }
`;
const SearchInput = styled.input`
  padding: 0;
  width: 100%;
  float: left;
  font-size: 1rem;
  line-height: 25px;
  transition: width 0.4s, opacity 0.4s, visibility 0.4s;
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
      navigate(`/community/search/${keyword}`, {
        state: { result: result.data },
      });
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
          <option value="nickname">글쓴이</option>
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
