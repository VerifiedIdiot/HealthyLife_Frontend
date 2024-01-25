import styled from "styled-components";

const CateTemplateContainer = styled.div`
  width: 512px;
  margin: 6em auto;
  border-radius: 4px;
  overflow: hidden;
`;
const AppTitle = styled.div`
  background: rgba(255, 255, 255, 0.3);
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  background: white;
`;
const CateTemplate = ({ children }) => {
  return (
    <CateTemplateContainer>
      <AppTitle>게시판 카테고리</AppTitle>
      <Content>{children}</Content>
    </CateTemplateContainer>
  );
};
export default CateTemplate;
