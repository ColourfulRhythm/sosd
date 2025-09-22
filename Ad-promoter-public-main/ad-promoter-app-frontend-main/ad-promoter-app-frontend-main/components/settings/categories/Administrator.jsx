import { useState } from 'react';
import Image from 'next/image';
import profileImg from '../../../public/assets/profile.jpg';
import { StyledAdmin } from '../settings.style';
import ScrollContainer from 'react-indiana-drag-scroll';
import OptionsModal from '@/components/AdminModals/optionsModal';
import ChangeAccountModal from '@/components/AdminModals/changeAccountModal';
import DeleteAccountModal from '@/components/AdminModals/deleteAccountModal';
import InviteAdminModal from '@/components/AdminModals/inviteModal';

const administratorsData = [
  {
    number: '1',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Admin',
    status: 'Active',
    img: profileImg,
  },
  {
    number: '2',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Admin',
    status: 'Active',
    img: profileImg,
  },
  {
    number: '3',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Sub-Admin',
    status: 'Inactive',
    img: profileImg,
  },
  {
    number: '4',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Sub-Admin',
    status: 'Active',
    img: profileImg,
  },
  {
    number: '5',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Sub-Admin',
    status: 'Inactive',
    img: profileImg,
  },
  {
    number: '6',
    name: 'Maharrm Hasanli',
    email: 'Mahrarrmhas991@gmail.com',
    role: 'Sub-Admin',
    status: 'Inactive',
    img: profileImg,
  },
];

const Administrator = () => {
  const [optionModal, showOptionModal] = useState(false);
  const [clickedIndex, setClickedIndex] = useState({});
  const [changeAccountModal, showChangeAccountModal] = useState(false);
  const [deleteAccountModal, showDeleteAccountModal] = useState(false);
  const [inviteAdminModal, showInviteAdminModal] = useState(false);

  const handleClick = (index) => () => {
    setClickedIndex((state) => (console.log(state),{
      ...!state[index],
      [index]: !state[index],
    }));
  };

  console.log(clickedIndex);

  return (
    <StyledAdmin>
      <div className="header">
        <div className="header__title">Manage Members</div>
        <button onClick={() => showInviteAdminModal(true)}>
          Invite People
        </button>
      </div>
      <div>
        <ol>
          <li>
            <h2>S/N</h2>
            <div className="titles">
              <h2>Name</h2>
              <h2>Account Type</h2>
              <h2>Status</h2>
            </div>
          </li>
          {administratorsData.map((admin, index) => (
            <li
              key={admin.number}
              className={
                admin.status === 'Active' ? 'item active' : 'item inactive'
              }
            >
              <div style={{ fontSize: '14px' }}>{admin.number}</div>
              <div className="item__content">
                <div className="details">
                  <div>
                    <Image
                      src={admin.img}
                      alt="Admin Profile image"
                      style={{ borderRadius: '50%' }}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p>{admin.name}</p>
                    <p className="details__email">{admin.email}</p>
                  </div>
                </div>
                <div>{admin.role}</div>
                <div>{admin.status}</div>
                <div>
                  <button
                    className="options"
                    onClick={handleClick(index)}
                  >
                    <div
                      className="circle"
                      style={{
                        borderRadius: '50%',
                        background: '#000',
                        width: '4.5px',
                        height: '4.5px',
                        marginBottom: '3px',
                      }}
                    ></div>
                    <div
                      style={{
                        borderRadius: '50%',
                        background: '#000',
                        width: '4.5px',
                        height: '4.5px',
                        marginBottom: '3px',
                      }}
                    ></div>
                    <div
                      style={{
                        borderRadius: '50%',
                        background: '#000',
                        width: '4.5px',
                        height: '4.5px',
                        marginBottom: '3px',
                      }}
                    ></div>
                  </button>
                </div>
              </div>
              {/* {index === admin.number - 1 ? (
                <OptionsModal
                  onShowChangeAccountModal={() => showChangeAccountModal(true)}
                  onShowDeleteAccountModal={() => showDeleteAccountModal(true)}
                />
              ) : null} */}
              {clickedIndex[index] ? <OptionsModal
                  onShowChangeAccountModal={() => showChangeAccountModal(true)}
                  onShowDeleteAccountModal={() => showDeleteAccountModal(true)}
                /> : null}
            </li>
          ))}
        </ol>
        <button className="save">Save Changes</button>
      </div>
      {changeAccountModal ? (
        <ChangeAccountModal
          onClose={() => showChangeAccountModal(false)}
          show={changeAccountModal}
        />
      ) : null}
      {deleteAccountModal ? (
        <DeleteAccountModal
          onClose={() => showDeleteAccountModal(false)}
          show={deleteAccountModal}
        />
      ) : null}
      {inviteAdminModal ? (
        <InviteAdminModal
          onClose={() => showInviteAdminModal(false)}
          show={inviteAdminModal}
        />
      ) : null}
    </StyledAdmin>
  );
};

export default Administrator;
