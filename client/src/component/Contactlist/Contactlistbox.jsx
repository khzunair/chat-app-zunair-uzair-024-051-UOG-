import React, { useEffect } from 'react';
import img from '../Contactlist/img1.png';
import './contactlist.css';
import { PiNumberCircleOneDuotone } from 'react-icons/pi';
import Chatcontent from '../Chatcontent/Chatcontent';
import { useDispatch } from 'react-redux';
import { getuser, setCurrentChatID } from '../Redux/userSlice';

export default function Contactlistbox(props) {
  const dispatch = useDispatch();

  const detailtransfer = (value) => {
    dispatch(getuser(value));
    // console.log("clicked", value)
    dispatch(setCurrentChatID(value.id))
    console.log("dispatched")
    console.log(value.id)
  };

  const toggleChat = () => {
    // Call the toggleChat function when the contact is clicked
    // This function should come from your App component
    props.toggleChat();
  };

  // Truncate the message text to 24 characters and add "..." if it exceeds that length
  const truncatedMessage = props.message.length > 15 ? `${props.message.slice(0, 15)}...` : props.message;

  return (
    <div className='contactlist-box contactbox' onClick={() => { detailtransfer(props); }}>
      <div className='contactimagebox'>
        <img src={props.image} id='Avatarimage' alt='User Avatar' />
      </div>
      <div className='contactDetail'>
        <div className='contactname'>
          <h6>{props.title}</h6>
          <span className='color'>{props.time}</span>
        </div>
        <div className='shortmsg'>
          <span>{truncatedMessage}</span>
          <span>
            <PiNumberCircleOneDuotone className='color'></PiNumberCircleOneDuotone>
          </span>
        </div>
      </div>
    </div>
  );
}
