import ButtonStyles from './styles';


const Button = (props) => {
  // console.log(props);
  const toggleModals = () => {
    props.onClose();
    props.onOpen();
  }
  return (
    <ButtonStyles>
      <button onClick={toggleModals}>
        {props.text}   
      </button>
    </ButtonStyles>
  );
};

export default Button;
