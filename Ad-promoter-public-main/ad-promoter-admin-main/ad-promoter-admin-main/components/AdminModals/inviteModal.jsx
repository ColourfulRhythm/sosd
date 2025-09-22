import Image from 'next/image';
import { useState } from 'react';
import ModalContainer from './ModalContainer';
import close from '@/public/assets/close-circle.svg';
import BlueCopyIcon from '@/public/assets/blue-copylink';
import { InviteAdminModalStyles } from './index.style';

const text = 'lorem ipsum rubbish';

const InviteAdminModal = (props) => {
  const [emailValue, setEmailValue] = useState();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(
      'https://api.ad-promoter.com/api/v1/auth/invite-admin',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({ email: emailValue }),
      }
    );

    const data = await response;

    console.log(data);
  };

  const onhandleEmail = (event) => {
    setEmailValue(event.target.value);

    console.log(event.target.value);
  };

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
          <form className="" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="to">To:</label>
              <div>
                <textarea
                  name="to"
                  id="to"
                  placeholder="name@gmail.com"
                  onChange={onhandleEmail}
                />
              </div>
            </div>
            <div className="actions">
              <span></span>
              {/*<button className="actions__copy">
                <BlueCopyIcon />
                Copy invite link
              </button>*/}
              <button className="actions__send">Send</button>
            </div>
          </form>
        </div>
      </InviteAdminModalStyles>
    </ModalContainer>
  );
};

export default InviteAdminModal;
