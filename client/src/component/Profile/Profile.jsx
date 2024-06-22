import { useState, useEffect } from 'react';
import '../Contactlist/contactlist.css';
import './profile.css';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export default function Profile(props) {
  // const initialUserData = {
  //   username: 'Zunair',
  //   email: 'Zunair@gmail.com',
  //   password: 'oldPassword', // Replace with the actual old password
  //   dob: '29/03/2002',
  // };
  const user = useSelector((state) => state.user.user);
  // console.log(user)

  const [userData, setUserData] = useState(user);
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    dob: false,
  });

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // const handleEnterKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     setIsCheckingPassword(true);
  //     if (enteredPassword === userData.password) {
  //       setIsUnlocked(true);
  //       setEnteredPassword('');
  //       setIsCheckingPassword(false); // Reset the isCheckingPassword state
  //     } else {
  //       alert('Old password is incorrect.');
  //       setIsCheckingPassword(false); // Reset the isCheckingPassword state
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!editableFields.password) {
  //     setIsCheckingPassword(false);
  //   }
  // }, [editableFields.password]);

  const handleShowPasswordFields = () => {
    setShowPasswordFields(true);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        password: newPassword,
      }));
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordFields(false);
    } else {
      alert('New password and confirm password do not match.');
    }
  };

  return (
    <div className='container-fluid profilecontainer'>
      <div className=' profileheader'>
        <AiOutlineArrowLeft id='icon' onClick={props.onClick} />
        <h5>Profile</h5>
      </div>
      <div className='imageprofilecontainer'>
        <img src={user.pic} id='profileimage' alt='Profile' />
      </div>
      <div className='informationbox container-fluid'>
       
        {/* {isUnlocked ? ( */}
          <>
          <label>Username:</label>
          <input
            className='footerChat'
            value={userData.name}
            onChange={(e) => handleInputChange(e, 'username')}
            readOnly={!editableFields.username}
            onClick={() => toggleEdit('username')}
          />
          </>
        {/* ) : (
          <input
            type="password"
            className='footerChat'
            placeholder="Enter Password to Unlock"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
        )} */}

        {/* {isUnlocked && ( */}
          <>
            <label>Email:</label>
            <input
              className='footerChat'
              value={userData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              readOnly={!editableFields.email}
              onClick={() => toggleEdit('email')}
            />

            {/* <label>D.O.B:</label>
            <input
              className='footerChat'
              value={userData.dob}
              onChange={(e) => handleInputChange(e, 'dob')}
              readOnly={!editableFields.dob}
              onClick={() => toggleEdit('dob')}
            /> */}


          </>
        {/* )} */}
      </div>
    </div>
  );
}
