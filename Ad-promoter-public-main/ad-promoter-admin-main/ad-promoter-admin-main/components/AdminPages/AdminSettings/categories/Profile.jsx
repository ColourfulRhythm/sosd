import { useEffect, useState } from 'react';
import {
  StyledProfile,
  StyledProfileMobile,
  Button,
  Danger,
} from '../settings.style';
import Image from 'next/image';
import upload from '../../../../public/assets/upload.png';
import { VscClose } from 'react-icons/vsc';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useWidth } from '@/hooks';
import AWS from 'aws-sdk';
import { BsArrowLeftCircle } from 'react-icons/bs';

const breakpoint = 1024;
const Profile = ({ userData, onRemoveSelect }) => {
  const { responsive } = useWidth(breakpoint);
  const dateOfBirthPayload = userData?.dateOfBirth;
  const dob = new Date(dateOfBirthPayload);
  const day = dob.getDay();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();
  const dobFormatted = `${day}/${month}/${year}`;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileModal, setProfileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChangesMade, setIsChangesMade] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const ClickedList = (e) => {
    setListValue(e.target.innerText);
    setIsChangesMade(true);
    setShowDropdown(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsChangesMade(false);
  };

  const handleEdit = async (e) => {
    setIsChangesMade(false);
    e.preventDefault();
    try {
      const requestBody = {
        accountName: name ? name : undefined,
        email: email ? email : undefined,
        phoneNumber: phoneNumber ? phoneNumber : undefined,
        gender: gender ? gender : undefined,
        dateOfBirth: dateOfBirth ? dateOfBirth : undefined,
      };
      const response = await fetch('https://api.ad-promoter.com/api/v1/user', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const editUpdateRes = await response.json();
      console.log(editUpdateRes);
      alert('Success');
    } catch (error) {
       alert('Failed to save');
    }
  };

  const handleUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const s3 = new AWS.S3({
    accessKeyId: '<your-access-key>',
    secretAccessKey: '<your-secret-key>',
    region: '<your-bucket-region>',
  });

  const uploadImageToS3 = (file) => {
    const params = {
      Bucket: '<your-bucket-name>',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.Location);
      });
    });
  };

  const handleGender = (option) => {
    setGender(option);
  };
  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    try {
      // const imageUrl = await uploadImageToS3(profilePicture);
      const formData = {
        profilePicture:
          'https://raw.githubusercontent.com/PatrickAlphaC/hardhat-nft-fcc/65375a47bf2eec439b55d71857cd136f7d01a34d/images/dynamicNft/happy.svg',
      };
      const response = await fetch('https://api.ad-promoter.com/api/v1/user', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const profileUpload = await response.json();
      // if (profileUpload.message.includes('request entity too large')) {
      //   return alert('Image too Large');
      // }
      console.log(profileUpload);
      alert('Success');
    } catch (error) {
      console.error(error);
      return alert('Failed to save');
    }
    console.log(profilePicture);
  };

  return (
    <>
      {responsive && (
        <StyledProfile style={{ alignItems: profileModal && 'center' }}>
          <div className="profile-image">
            <p> Profile picture </p>
            <div className="image-wrapper">
              {userData && userData.profilePicture == 'string' ? (
                <div
                  className="noImage"
                  onClick={() => setProfileModal(true)}
                  style={{
                    width: '134px',
                    height: '134px',
                    textAlign: 'center',
                    background: 'green',
                    fontSize: '50px',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                  }}
                >
                  {userData.accountName.slice(0, 2)}
                </div>
              ) : (
                <Image
                  src={userData?.profilePicture}
                  alt="profile"
                  height={105}
                  width={105}
                  onClick={() => setProfileModal(true)}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                  objectFit="contain"
                />
              )}
              <div className="upload-icon">
                <Image
                  src={upload}
                  onClick={() => setProfileModal(true)}
                  alt="Profile"
                  height={20}
                  width={20}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          {profileModal && (
            <div className="blurred" onClick={() => setProfileModal(false)} />
          )}

          {profileModal && (
            <div className="modal photo-modal">
              <div
                className="close-modal"
                onClick={() => setProfileModal(false)}
              >
                <VscClose
                  style={{
                    height: '19px',
                    width: '19px',
                    color: 'var(--dark-gray)',
                  }}
                />
              </div>

              <div className="contents">
                {/* <TbLogout style={{ height: '27px', width: '27px', color: 'red' }} /> */}
                <p> Change Profile Photo </p>

                {/* <div className="upload">
                  <AiOutlineCloudUpload
                    style={{ height: '20px', width: '20px', color: 'black' }}
                  />

                  <label htmlFor="input">
                    {' '}
                    <span> Upload new photo </span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="input"
                    onChange={handleUpload}
                  />
                </div> */}

                <div className="upload">
                  <AiOutlineCloudUpload
                    style={{ height: '20px', width: '20px', color: 'black' }}
                  />
                  <span> Upload new photo </span>
                </div>
                <div className="cancel">
                  <Button onClick={handleProfilePictureSubmit}>Save</Button>
                </div>
                <div className="cancel">
                  <Danger onClick={() => setProfileModal(false)}>
                    {' '}
                    Cancel
                  </Danger>
                </div>
              </div>
            </div>
          )}

          <div className="profile-details">
            <h2>Edit Details</h2>
            <div className="form-field account-name edit">
              <label htmlFor="name">Account Name </label>
              <input
                type="text"
                name="name"
                value={name}
                id="name"
                onChange={(e) => {
                  setName(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.accountName}
              />
            </div>
            <div className="form-field account-address">
              <label htmlFor="account-address"> Email Address </label>
              <input
                type="email"
                name="account-address"
                value={email}
                id="name"
                onChange={(e) => {
                  setEmail(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.email}
              />
            </div>
            <div className="form-field account-phoneNumber">
              <label htmlFor="account-phoneNumber"> Phone Number </label>
              <input
                type="number"
                maxLength={14}
                name="account-phoneNumber"
                value={phoneNumber}
                id="name"
                onChange={(e) => {
                  setPhoneNumber(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.phoneNumber}
              />
            </div>
            <div className="form-field account-birth">
              <label htmlFor="date"> Date Of Birth </label>
              <input
                type="date"
                name="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value), setIsChangesMade(true);
                }}
              />
            </div>
            <div
              className="dropdownContainer form-field"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <h3>Gender</h3>
              <div className="dropdown">
                <p className="inputText">{gender}</p>
              </div>
              {showDropdown && (
                <ul className="">
                  <li onClick={() => handleGender('Male')}>Male</li>
                  <li onClick={() => handleGender('Female')}>Female</li>
                  <li onClick={() => handleGender('Prefer not to say')}>
                    Prefer not to say
                  </li>
                </ul>
              )}
            </div>
            {/* <div className="dropdownContainer form-field">
              <h3>Gender</h3>
              <div
                className="dropdown"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <select
                  name="Gender"
                  id=""
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div> */}
          </div>

          <div className="controls">
            <button className="button discard"> Discard </button>
            <button
              onClick={handleEdit}
              className={` button ${isChangesMade ? '' : 'active'}`}
            >
              {' '}
              Save changes
            </button>
          </div>
        </StyledProfile>
      )}

      {!responsive && (
        <StyledProfileMobile>
          <div className="tab-head">
            <BsArrowLeftCircle className="left-back" onClick={onRemoveSelect} />
            <span> </span>
            <h4>Profile </h4>
            <span> </span>
          </div>
          <div className="profile-image">
            <div className="image-wrapper">
              {userData && userData.profilePicture == 'string' ? (
                <div
                  className="noImage"
                  onClick={() => setProfileModal(true)}
                  style={{
                    width: '134px',
                    height: '134px',
                    textAlign: 'center',
                    background: 'green',
                    fontSize: '50px',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                  }}
                >
                  {userData.accountName.slice(0, 2)}
                </div>
              ) : (
                <Image
                  src={userData?.profilePicture}
                  alt="profile"
                  height={105}
                  width={105}
                  onClick={() => setProfileModal(true)}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                  objectFit="contain"
                />
              )}
              <div className="upload-icon">
                <Image
                  src={upload}
                  onClick={() => setProfileModal(true)}
                  alt="Profile"
                  height={20}
                  width={20}
                  objectFit="contain"
                />
              </div>
            </div>
            <span className="profile-text">Profile image</span>
          </div>

          {profileModal && (
            <div className="blurred" onClick={() => setProfileModal(false)} />
          )}

          {profileModal && (
            <div className="modal photo-modal">
              <div
                className="close-modal"
                onClick={() => setProfileModal(false)}
              >
                <VscClose
                  style={{
                    height: '19px',
                    width: '19px',
                    color: 'var(--dark-gray)',
                  }}
                />
              </div>

              <div className="contents">
                {/* <TbLogout style={{ height: '27px', width: '27px', color: 'red' }} /> */}
                <p> Change Profile Photo </p>
                <div className="upload">
                  <AiOutlineCloudUpload
                    style={{ height: '20px', width: '20px', color: 'black' }}
                  />

                  <label htmlFor="input">
                    {' '}
                    <span> Upload new photo </span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="input"
                    onChange={handleUpload}
                  />
                </div>

                <div className="cancel">
                  <Button onClick={handleProfilePictureSubmit}>Save</Button>
                </div>
                <div className="cancel">
                  <Danger onClick={() => setProfileModal(false)}>
                    {' '}
                    Cancel{' '}
                  </Danger>
                </div>
              </div>
            </div>
          )}

          <div className="profile-details">
            <div className="form-field account-name edit">
              <label htmlFor="name">Account Name </label>
              <input
                type="text"
                name="name"
                value={name}
                id="name"
                onChange={(e) => {
                  setName(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.accountName}
              />
            </div>
            <div className="form-field account-address">
              <label htmlFor="account-address"> Email Address </label>
              <input
                type="email"
                name="account-address"
                value={email}
                id="name"
                onChange={(e) => {
                  setEmail(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.email}
              />
            </div>
            <div className="form-field account-phoneNumber">
              <label htmlFor="account-phoneNumber"> Phone Number </label>
              <input
                type="number"
                maxLength={14}
                name="account-phoneNumber"
                value={phoneNumber}
                id="name"
                onChange={(e) => {
                  setPhoneNumber(e.target.value), setIsChangesMade(true);
                }}
                placeholder={userData?.phoneNumber}
              />
            </div>
            <div className="form-field account-birth">
              <label htmlFor="date"> Date Of Birth </label>
              <input
                type="date"
                name="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value), setIsChangesMade(true);
                }}
              />
            </div>
            {/* <div className="dropdownContainer form-field">
              <h3>Gender</h3>
              <div
                className="dropdown"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <p className="inputText">{listValue}</p>
              </div>
              {showDropdown && (
                <ul className="">
                  <li onClick={ClickedList}>Male</li>
                  <li onClick={ClickedList}>Female</li>
                </ul>
              )}
            </div> */}
            {/* <div className="dropdownContainer form-field">
              <h3>Gender</h3>
              <div
                className="dropdown"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <select
                  name="Gender"
                  id=""
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div> */}
          </div>

          <div className="controls">
            <button className="button discard"> Discard </button>
            <button
              onClick={handleEdit}
              className={` button ${isChangesMade ? '' : 'active'}`}
            >
              {' '}
              Save changes
            </button>
          </div>
        </StyledProfileMobile>
      )}
    </>
  );
};

export default Profile;
