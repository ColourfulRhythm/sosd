import Image from 'next/image';
import ModalContainer from './ModalContainer';
import { ChangeAccountModalStyles } from './index.style';
import close from '@/public/assets/close-circle.svg';

const ChangeAccountModal = (props) => {
  return (
    <ModalContainer>
      <ChangeAccountModalStyles>
        <div className="close">
          <button onClick={props.onClose}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <div className="modalContent">
          <h2>Change Maharrm Masali’s account type</h2>
          <p>
            Choose what account type Maharrm Masali will have at AD-PROMOTER
          </p>
          <form>
            <div className="inputs">
              <div className='inputs__radio'>
                <input type="radio" name="admin" id="admin" />
                <span className='checkmark'></span>
                <label htmlFor="admin">Admin</label>
              </div>
              <div className='inputs__radio'>
                <input type="radio" name="subAdmin" id="subAdmin" />
                <span className='checkmark'></span>
                <label htmlFor="subAdmin">Sub-admin</label>
              </div>
            </div>
            <div className='actions'>
              <button className='actions__cancel' onClick={props.onClose}>Cancel</button>
              <button className='actions__save'>Save</button>
            </div>
          </form>
        </div>
      </ChangeAccountModalStyles>
    </ModalContainer>
  );
};

export default ChangeAccountModal;
