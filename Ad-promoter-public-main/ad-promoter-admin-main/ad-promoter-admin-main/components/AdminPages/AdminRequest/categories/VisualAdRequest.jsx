import { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import { UndoContainer } from '../../AdminActivities/adminActivities.style';
import trash from '@/public/assets/trash.svg';
import close from '@/public/assets/close-circle-small.svg';
import { tick, cancel, status } from '@/public/assets/icon';
import { useWidth } from '@/hooks';
import { btnTick, btnCancel } from '@/public/assets/icon';
import { AdDisplay } from '../request.style';
import Link from 'next/link';
import TruncatedText from '@/components/AdminReusables/TruncatedText';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const breakpoint = 1024;
const VisualAdRequest = ({ visualData, token }) => {
  const { responsive } = useWidth(breakpoint);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter()

  const handleCheckbox = (e) => {
    const id = e.target.id;
    const data = [...rowData];
    const checkedValue = data.map((data) =>
      data.id === +id ? { ...data, value: !data.value } : data
    );
    setRowData(checkedValue);
  };

  console.log(visualData);

  const handleValidation = async (status, userId) => {
    console.log(status);
    console.log(userId);
    try {
      const response = await fetch(
        `https://api.ad-promoter.com/api/v1/promotion/update-visual/${userId}?status=${status}`,
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
        console.log(data);
        if (status === 'approved') {
          toast.success('Visual ad request accepted successfully');
        } else if (status === 'declined') {
          toast.success('Visual ad request declined successfully');
        }
      }

      if(!response.ok){
        toast.error("Visual ad request failed to process");
        console.log(error);
      }



    } catch (error) {
      toast.error("Visual ad request failed to process");
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
                <th>Social Link</th>
                <th>Action</th>
                <th>Ad Source</th>
                <th onClick={handleDelete}>
                  <Image src={trash} alt="trash" />
                </th>
              </tr>
            </thead>
            <tbody>
              {visualData &&
                visualData.data.map((data, index) => (
                  <tr className="row" key={data.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}
                      >
                        {data.promoter && data.promoter.profilePicture ? (
                          <Image
                            src={data.promoter.profilePicture}
                            alt="profile"
                            width={25}
                            height={25}
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
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
                            {data && data.promoter
                              ? data.promoter.accountName.slice(0, 2)
                              : 'AD'}
                          </div>
                        )}
                        {data.promoter && (
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.accountName}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      {data.promoter && (
                        <a
                          href={`mailto:${data.promoter.email}`}
                          style={{ color: 'black' }}
                        >
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.email}
                          />
                        </a>
                      )}
                    </td>
                    <td>
                      {data.promoter && (
                        <a
                          href={data.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: 'black',
                          }}
                        >
                          <TruncatedText
                            maxLength={50}
                            text={data.link}
                          />
                        </a>
                      )}
                    </td>
                    <td className="action-space">
                      <span className="action-btn">
                        <Image
                          src={tick}
                          onClick={() => handleValidation('approved', data._id)}
                          alt=''
                        />{' '}
                      </span>
                      <span className="action-btn">
                        <Image
                          src={cancel}
                          onClick={() => handleValidation('declined', data._id)}
                          alt=''
                        />
                      </span>{' '}
                    </td>
                    <td>
                      <button onClick={()=>router.push((`/ad/${data.ad}`))} style={{display: 'flex',justifyContent:'center',alignItems:'center',padding:'0.8rem 2.4rem',background:'#f9f5ff',borderRadius: '0.8rem',fontWeight:'600',fontSize:'1.4rem',color:'#4F00CF',cursor: 'pointer'}} className='cta' >View</button>
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
              <h3>Visual Ad Request</h3>
              <Image src={trash} alt="trash" />
            </div>

            {visualData &&
              visualData.data.map((data) => (
                <div className="ad-column" key={data._id}>
                  <div className="ad-content">
                    <div className="ad-inner">
                      {data.promoter && data.promoter.profilePicture ? (
                        <Image
                          src={data.promoter.profilePicture}
                          alt="profile"
                          width={25}
                          height={25}
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
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
                          {data && data.promoter
                            ? data.promoter.accountName.slice(0, 2)
                            : 'AD'}
                        </div>
                      )}{' '}
                      <span>
                        {data.promoter && (
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.accountName}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={data._id}
                        checked={data.value}
                        onChange={handleCheckbox}
                      />
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Email Adress</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        {data.promoter && (
                          <a
                            href={`mailto:${data.promoter.email}`}
                            style={{ color: 'black' }}
                          >
                            <TruncatedText
                              maxLength={25}
                              text={data.promoter.email}
                            />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Social links</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        {data.promoter && (
                          <a
                            href={data.link}
                            rel="noreferrer"
                            target="_blank"
                            style={{
                              color: 'black',
                            }}
                          >
                            <TruncatedText
                              maxLength={25}
                              text={data.link}
                            />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Source Ad</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                      <button onClick={()=>router.push((`/ad/${data.ad}`))} style={{display: 'flex',justifyContent:'center',alignItems:'center',padding:'0.8rem 2.4rem',background:'#f9f5ff',borderRadius: '0.8rem',fontWeight:'600',fontSize:'1.4rem',color:'#4F00CF',cursor: 'pointer'}} className='cta' >View</button>
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <button className="sec">
                      <Image
                        src={btnCancel}
                        alt="Wallet Icon"
                        className="img"
                        onClick={() => handleValidation('declined', data._id)}
                      />
                      <span>Decline </span>
                    </button>
                    <button>
                      <Image
                        src={btnTick}
                        alt="Wallet Icon"
                        className="img"
                        onClick={() => handleValidation('approved', data._id)}
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

export default VisualAdRequest;
