import React, { useEffect, useState } from 'react';
import profile1 from '@/public/assets/hassan.svg';
import trash from '@/public/assets/trash.svg';
import close from '@/public/assets/close-circle-small.svg';
import Image from 'next/image';
import {
  UndoContainer,
  Container,
} from '@/components/AdminPages/AdminActivities/adminActivities.style';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import UseFetch from '@/hooks/useFetch';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx/index.jsx';
import { useWidth } from '@/hooks';
import AdminActivityStyle from '@/components/AdminPages/AdminActivities/style';
import { arrowDown, arrowUp } from '@/public/assets/icon';

const breakpoint = 1024;
const Activities = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { responsive } = useWidth(breakpoint);

  const [token, setToken] = useState(true);
  const [tokenAvailale, setTokenAvailable] = useState(false);

  const [deletedItems, setDeletedItems] = useState([]);
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
      console.log(userToken.token);
    }
  }, []);

  const { data, pending, error } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/activities/all'
  );
  console.log(data);
  const [rowData, setRowData] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filterOptions, setFilterOptions] = useState('all');

  useEffect(() => {
    if (data) {
      setRowData(
        data.data.map((item) => ({
          ...item,
          value: false,
        }))
      );
    }
  }, [data]);

  const handleSort = (filterOption) => {
    setFilterOptions(filterOption);
    setShowDropdown(false)
  };
  const filterData = rowData?.filter((activity) => {
    const updatedAt = new Date(activity?.updatedAt);
    const today = new Date();
    const twodays = new Date(today.setDate(today.getDate() - 2));
    const oneWeek = new Date(today.setDate(today.getDate() - 5));
    const lessThanTwoWeeks = new Date(today.setDate(today.getDate() - 7));
    const last30days = new Date(today.setDate(today.getDate() - 23));

    if (filterOptions === 'twoday') {
      return updatedAt >= twodays;
    } else if (filterOptions === 'oneWeek') {
      return updatedAt >= oneWeek;
    } else if (filterOptions === 'lastTwoWeeks') {
      return updatedAt >= lessThanTwoWeeks;
    } else if (filterOptions === 'last30days') {
      return updatedAt >= last30days;
    } else {
      return true;
    }
  });

  const handleCheckbox = (event) => {
    const { id, checked } = event.target;
    setRowData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item._id === id);
      newData[index].value = checked;
      return newData;
    });
  };

  const [deleted, setDeleted] = useState([]);
  const handleDelete = async () => {
    try {
      const deleted = rowData.filter((item) => item.value);
      setDeleted(deleted);

      const rows = rowData.filter((item) => !item.value);
      setRowData(rows);
      if (rows.length !== rowData.length) {
        setShowBackdrop(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUndo = () => {
    window.location.reload();
  };
  const DeleteFromApi = async () => {
    try {
      const response = await Promise.all(
        deleted.map((item) =>
          fetch(`https://api.ad-promoter.com/api/v1/activities/${item._id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const showUndoButton = deletedItems.length > 0;

  if (pending) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          textAlign: 'center',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (!data) {
    return <PageLoader />;
  }

  return (
    <Container>
      {responsive ? (
        <>
          {showBackdrop && (
            <Backdrop
              onCancel={() => {
                setShowBackdrop(false);
                DeleteFromApi();
              }}
            />
          )}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div
              className="undo"
              onClick={() => {
                setShowBackdrop(false);
                handleUndo();
              }}
            >
              <p>Undo</p>
              <Image src={close} alt="close" onClick={DeleteFromApi} />
            </div>
          </UndoContainer>
          <div className="log">
            <p>Activity Log</p>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="filter"
            >
              <div>Filter</div>
              {showDropdown ? (
                <Image src={arrowDown} alt="" />
              ) : (
                <Image src={arrowUp} alt="" />
              )}
            </div>

            {showDropdown && (
              <ul className="dropdown_list">
                <li onClick={() => handleSort('all')}>All</li>
                <li onClick={() => handleSort('twoday')}>Recent</li>
                <li onClick={() => handleSort('oneWeek')}>A week ago</li>
                <li onClick={() => handleSort('lastTwoWeeks')}>
                  Less than 2 weeks
                </li>
                <li onClick={() => handleSort('last30days')}>Last 30 days</li>
              </ul>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>User ID</th>
                <th>Action</th>
                <th>Date</th>
                <th onClick={handleDelete}>
                  <Image src={trash} alt="trash" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData &&
                filterData.map((data, index) => (
                  <tr className="row" key={index}>
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
                        <Image
                          src={profile1}
                          alt="profile"
                          width={20}
                          height={20}
                        />
                        <p>{data.recipient?.accountName}</p>
                      </div>
                    </td>
                    <td>#{data?.userID.slice(9, 18)}</td>
                    <td>{data?.type}</td>
                    <td>{data?.updatedAt && data?.updatedAt.slice(0, 10)}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={data._id}
                        checked={data.value}
                        onChange={handleCheckbox}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>
          {showBackdrop && (
            <Backdrop
              onCancel={() => {
                setShowBackdrop(false);
                DeleteFromApi();
              }}
            />
          )}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div
              className="undo"
              onClick={() => {
                setShowBackdrop(false);
                handleUndo();
              }}
            >
              <p>Undo</p>
              <Image src={close} alt="close" onClick={DeleteFromApi} />
            </div>
          </UndoContainer>
          <AdminActivityStyle>
            <div className="log">

              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="filter"
              >
                <div>Filter</div>
                {showDropdown ? (
                  <Image src={arrowDown} alt="" />
                ) : (
                  <Image src={arrowUp} alt="" />
                )}
              </div>

              {showDropdown && (
                <ul className="dropdown_list">
                  <li onClick={() => handleSort('all')}>All</li>
                  <li onClick={() => handleSort('twoday')}>Recent</li>
                  <li onClick={() => handleSort('oneWeek')}>A week ago</li>
                  <li onClick={() => handleSort('lastTwoWeeks')}>
                    Less than 2 weeks
                  </li>
                  <li onClick={() => handleSort('last30days')}>Last 30 days</li>
                </ul>
              )}
            </div>

            <div>
              {' '}
              <div className="ad-group">
                <div className="ad-header">
                  <h3>Activity log</h3>
                  <Image src={trash} alt="trash" />
                </div>

                {rowData.map((data) => (
                  <div className="ad-column" key={data.id}>
                    <div className="ad-content">
                      <div className="ad-inner">
                        <Image
                          src={profile1}
                          alt="profile"
                          width={20}
                          height={20}
                        />
                        <p>{data.recipient?.accountName}</p>{' '}
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
                        <span>User ID</span>
                      </div>
                      <div className="ad-text-small">
                        <span>#{data?.userID.slice(9, 18)}</span>
                      </div>
                    </div>
                    <div className="ad-text-content">
                      <div className="ad-text-smaller">
                        <span>Action</span>
                      </div>
                      <div className="ad-text-small">
                        <span>{data?.type}</span>
                      </div>
                    </div>
                    <div className="ad-text-content">
                      <div className="ad-text-smaller">
                        <span>Date</span>
                      </div>
                      <div className="ad-text-small">
                        <span>
                          {data?.updatedAt && data?.updatedAt.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AdminActivityStyle>
        </div>
      )}{' '}
    </Container>
  );
};

export default Activities;
