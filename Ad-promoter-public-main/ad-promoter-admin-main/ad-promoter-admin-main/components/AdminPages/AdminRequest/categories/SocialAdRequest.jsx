import { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import { UndoContainer } from '../../AdminActivities/adminActivities.style';
import trash from '@/public/assets/trash.svg';
import close from '@/public/assets/close-circle-small.svg';
import { tick, cancel } from '@/public/assets/icon';
import { useWidth } from '@/hooks';
import { btnTick, btnCancel } from '@/public/assets/icon';
import { AdDisplay } from '../request.style';
import TruncatedText from '@/components/AdminReusables/TruncatedText';
import { toast } from 'react-hot-toast';

const breakpoint = 1024;
const SocialAdRequest = ({ socialData, token }) => {
  const { responsive } = useWidth(breakpoint);
  const [showBackdrop, setShowBackdrop] = useState(false);
  // const [socialDataState, setSocialDataState] = useState(socialData);
  console.log(socialData);

  const handleCheckbox = () => {
    const id = e.target.id;
    const data = [...rowData];
    const checkedValue = data.map((data) =>
      data.id === +id ? { ...data, value: !data.value } : data
    );
    setRowData(checkedValue);
  };

  const handleValidation = async (status, userId) => {
    console.log(status);
    try {
      const response = await fetch(
        `https://api.ad-promoter.com/api/v1/user/social-requests/update/${userId}?status=${status}`,
        {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();
      const data = json;

      if(response.ok){
        // setReportedAd(data);
        console.log(data);
  
  
        if (status) {
          toast.success('Social ad request accepted successfully');
        } else if (!status) {
          toast.success('Social ad request declined successfully');
        }
      }
      if(!response.ok){
        toast.error("Social ad request failed to process");
      }
      // setSocialDataState(socialData);
    } catch (error) {
      toast.error("Social ad request failed to process");
      console.log(error);
    }
  };

  const handleDelete = () => {
    const data = [...rowData];
    const rows = data.filter((item) => !item.value);
    setRowData(rows);

    if (rows.length !== data.length) {
      setShowBackdrop(true);
    }
  };

  return (
    <>
      {responsive ? (
        <div>
          {' '}
          {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)} />}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div className="undo" onClick={() => setShowBackdrop(false)}>
              <p>Undo</p>
              <Image src={close} alt="close" />
            </div>
          </UndoContainer>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>social Link</th>
                <th>Action</th>
                <th onClick={handleDelete}>
                  <Image src={trash} alt="trash" />
                </th>
              </tr>
            </thead>
            <tbody>
              {socialData &&
                socialData.data.map((data, index) => (
                  <tr className="row" key={data._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}
                        key={index}
                      >
                        <div
                          className="noImage"
                          style={{
                            width: '25px',
                            height: '25px',
                            textAlign: 'center',
                            background: '#a09ef9',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                          }}
                        >
                          {data.accountName.slice(0, 2)}
                        </div>
                        <p>{data.accountName}</p>
                      </div>
                    </td>
                    <td>
                      <a
                        href={`mailto:${data.email}`}
                        style={{
                          color: 'black',
                        }}
                      >
                        <TruncatedText maxLength={30} text={data.email} />
                      </a>
                    </td>
                    <td>
                      <a
                        href={data.socialLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: 'black',
                        }}
                      >
                        <TruncatedText maxLength={50} text={data.socialLink} />
                      </a>
                    </td>
                    {console.log(data)}
                    <td className="action-space">
                      <span className="action-btn">
                        <Image
                          src={tick}
                          onClick={() => handleValidation(true, data._id)}
                          alt=''
                        />{' '}
                      </span>
                      <span className="action-btn">
                        <Image
                          src={cancel}
                          onClick={() => handleValidation(false, data._id)}
                          alt=''
                        />
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={data.id}
                        checked={data.value}
                        // onChange={handleCheckbox}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AdDisplay className="ad-display">
          {' '}
          {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)} />}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div className="undo" onClick={() => setShowBackdrop(false)}>
              <p>Undo</p>
              <Image src={close} alt="close" />
            </div>
          </UndoContainer>
          <div className="ad-group">
            <div className="ad-header">
              <h3>Social Ad Request</h3>
              <Image src={trash} alt="trash" />
            </div>

            {socialData &&
              socialData.data.map((data) => (
                <div className="ad-column" key={data._id}>
                  <div className="ad-content">
                    <div className="ad-inner">
                      <div
                        className="noImage"
                        style={{
                          width: '25px',
                          height: '25px',
                          textAlign: 'center',
                          background: '#a09ef9',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '50%',
                        }}
                      >
                        {data.accountName.slice(0, 2)}
                      </div>{' '}
                      <span>{data.accountName}</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={data.id}
                        checked={data.value}
                        // onChange={handleCheckbox}
                      />
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Email Adress</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        {' '}
                        <a
                          href={`mailto:${data.email}`}
                          style={{
                            color: 'black',
                            display: 'block',
                            marginLeft: 'auto',
                            width: 'fit-content',
                          }}
                        >
                          <TruncatedText maxLength={25} text={data.email} />
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Social links</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        <a
                          href={data.socialLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: 'black',
                            display: 'block',
                            marginLeft: 'auto',
                            width: 'fit-content',
                          }}
                        >
                          <TruncatedText
                            maxLength={25}
                            text={data.socialLink}
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <button>
                      <Image
                        src={btnCancel}
                        alt="Wallet Icon"
                        className="img"
                        onClick={() => handleValidation(false, data._id)}
                      />
                      <span>Decline </span>
                    </button>
                    <button>
                      <Image
                        src={btnTick}
                        alt="Wallet Icon"
                        className="img"
                        onClick={() => handleValidation(true, data._id)}
                      />
                      <span>Accept </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </AdDisplay>
      )}{' '}
    </>
  );
};

export default SocialAdRequest;
