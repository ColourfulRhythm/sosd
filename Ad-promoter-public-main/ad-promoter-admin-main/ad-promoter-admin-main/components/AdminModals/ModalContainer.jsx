import ModalContainerStyles from "./styles";

const ModalContainer = (props) => {
  return (
    <ModalContainerStyles>
      <div className="content">{props.children}</div>
    </ModalContainerStyles>
  );
};

export default ModalContainer;
