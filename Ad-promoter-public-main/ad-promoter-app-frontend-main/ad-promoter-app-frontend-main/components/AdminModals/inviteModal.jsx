import Image from 'next/image';

import ModalContainer from '../promoterModal/ModalContainer';
import close from '@/public/assets/close-circle.svg';
import BlueCopyIcon from '@/public/assets/blue-copylink';
import { InviteAdminModalStyles } from './index.style';

const text = "lorem ipsum rubbish";

const InviteAdminModal = (props) => {
  return (
    <ModalContainer>
      <InviteAdminModalStyles>
        <div className="close">
          <button onClick={props.onClose}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <div className="modalContent">
          <h2>Invite a new admin to AD-PROMOTER</h2>
          <form>
            <div>
              <label htmlFor="to">To:</label>
              <div>
                <textarea name="to" id="to" placeholder="name@gmail.com" />
              </div>
            </div>
            <div className="actions">
              <button className="actions__copy">
                <BlueCopyIcon />
                Copy invite link
              </button>
              <button className="actions__send" onClick={navigator.clipboard.writeText(text)}>Send</button>
            </div>
          </form>
        </div>
      </InviteAdminModalStyles>
    </ModalContainer>
  );
};

export default InviteAdminModal;
