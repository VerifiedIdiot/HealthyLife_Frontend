import styled from "styled-components";
import { MdRemoveCircleOutline } from "react-icons/md";

const CateListItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const Checkbox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    flex: 1;
  }
  &.checked {
    svg {
      color: #22b8cf;
    }
    .text {
      color: #abd5bd;
      text-decoration: line-through;
    }
  }
`;
const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #2446da;
  cursor: pointer;
  &:hover {
    color: #2446da;
  }
`;

const CateListItem = ({ cate, onRemove }) => {
  try {
    const { categoryId, categoryName } = cate;
    return (
      <CateListItemContainer>
        <Checkbox>
          <div className="text">{categoryName}</div>
        </Checkbox>
        <Remove onClick={() => onRemove(categoryId)}>
          <MdRemoveCircleOutline />
        </Remove>
      </CateListItemContainer>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default CateListItem;
