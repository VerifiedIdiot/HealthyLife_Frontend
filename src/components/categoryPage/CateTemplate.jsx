import styled from "styled-components";
import { Main, Container } from "../../styles/Layouts";

const CateTemplateContainer = styled.div`
  margin: 6rem auto;
  width: 600px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const AppTitle = styled.div`
  color: #495057;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Content = styled.div`
  background: white;
`;
const CateTemplate = ({ children }) => {
  return (
    <Main $justify="center">
      <Container $justify="center" $align="center">
        <CateTemplateContainer>
          <AppTitle>게시판 카테고리</AppTitle>
          <Content>{children}</Content>
        </CateTemplateContainer>
      </Container>
    </Main>
  );
};
export default CateTemplate;
