import { useState, useEffect } from "react";
import "./chatcontainer.css";
import { useSelector } from "react-redux";
import { BsTelephoneOutbound, BsThreeDots } from "react-icons/bs";
import {
  AiOutlinePlus,
  AiOutlineArrowLeft,
  AiOutlineSend,
} from "react-icons/ai";
import Pandaanimation from "../Animation/Pandaanimation";
import MessagesServices from "../../api/services/MessagesServices";


export default function Chatcontent(props) {
  const detail = useSelector((state) => state.user);
  const currentChatId = useSelector((state) => state.user.currentChat);
  const product = useSelector((state) => state.theme.themeMode);
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState([]);
  const usery = useSelector((state) => state.currentChat);
  useEffect(() => {

    console.log(currentChatId)
    MessagesServices.getMessages(user.token, currentChatId)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, currentChatId]);

  const handleChange = (e) => {
    // Handle input change
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      alert("key is pressed");
    }
  };

  return (
    <div className="container-fluid chatcontainer">
      {detail.userData ? (
        <>
          <div className="chatheader">
            <div onClick={props.toggleChat}>
              <AiOutlineArrowLeft />
            </div>
            <div className="chatimage">
              <img
                src={detail.userData?.image}
                id="chatimage"
                alt="User Avatar"
              />
            </div>
            <div className="chatcontentdetail">
              {detail.userData ? (
                <>
                  <h6>{detail.userData.title}</h6>
                  <span>{detail.userData.online ? "Online" : "Offline"}</span>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="functionality">
              <BsTelephoneOutbound />
              <BsThreeDots />
            </div>
          </div>
          <div className="chatinnercontainer">
            <div className="chat-container">
              {message.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender._id === user._id ? "sender" : "receiver"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chatfooter">
            <AiOutlinePlus className="SvgIcon" />
            <div className="input-group mb-3">
              <input
                type="text"
                className="footerChat"
                placeholder="Type a Message"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <AiOutlineSend className="SvgIcon" onClick={handleChange} />
          </div>
        </>
      ) : (
        <Pandaanimation />
      )}
    </div>
  );
}
