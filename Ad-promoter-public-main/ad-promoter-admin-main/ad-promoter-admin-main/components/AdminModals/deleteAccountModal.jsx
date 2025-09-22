import Image from 'next/image';

import ModalContainer from './ModalContainer';
import close from '@/public/assets/close-circle.svg';
import { DeleteAccountModalStyles } from './index.style';

const DeleteAccountModal = (props) => {
  return (
    <ModalContainer>
      <DeleteAccountModalStyles>
        <div className="close">
          <button onClick={props.onClose}>
            <Image src={close} alt="Exit icon" />
          </button>
        </div>
        <div className="modalContent">
          <h2>Permanently delete Maharrm Masali’s profile?</h2>
          <div>
            <p>
              Here’s what happens when an admin/sub-admin’s profile is deleted
            </p>
            <ul>
              <li>
                Their profile information will be deleted from the database.
              </li>
              <li>Any message they sent will still be on AD-PROMOTER.</li>
              <li>This is not a reversible change.</li>
            </ul>
          </div>
        </div>
        <div className="actions">
          <button className="actions__cancel" onClick={props.onClose}>
            Cancel
          </button>
          <button className="actions__save">Delete Profile</button>
        </div>
      </DeleteAccountModalStyles>
    </ModalContainer>
  );
};

export default DeleteAccountModal;
