import { OptionsStyles } from './index.style';

const OptionsModal = (props) => {
  return (
    <OptionsStyles>
      <button className="change" onClick={props.onShowChangeAccountModal}>
        Change account type
      </button>
      <hr />
      <button className="deactivate" onClick={props.onShowDeleteAccountModal}>
        Deactivate account
      </button>
    </OptionsStyles>
  );
};

export default OptionsModal;
