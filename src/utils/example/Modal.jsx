import { styled } from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: white;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: var(--VIOLET);
      font-weight: 600;
      text-align: left;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
      }
    }
    div {
      padding: 16px;
      border-bottom: 2px solid #dee2e6;
      text-align: center;
      color: #333;
      white-space: pre-line;
      line-height: 1.4;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        background-color: var(--VIOLET);
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
`;

const Modal = (props) => {
  const {
    open,
    confirm,
    close,
    type,
    header,
    children,
    closeEvt = () => {},
  } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <div>{children}</div>
            <footer>
              {type && (
                <Button
                  onClick={() => {
                    confirm();
                  }}
                >
                  확인
                </Button>
              )}
              <Button
                onClick={() => {
                  close();
                  closeEvt();
                }}
              >
                {type ? "취소" : "확인"}
              </Button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Modal;