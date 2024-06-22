import React, { useEffect, useState } from "react";
import "./contactlist.css";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMoon } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { MdEmojiPeople } from "react-icons/md";
import { BiSolidGroup } from "react-icons/bi";


export default function Contactlist(props) {
  const [contactlist, setContactList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.themeMode);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);

  const focuses = () => {
    setFocus(true);
  };

  const changetheme = () => {
    const newTheme = theme === "darkTheme" ? "lightTheme" : "darkTheme";
    dispatch(setThemeMode(newTheme));
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contactlist.filter((contact) =>
      contact.title.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
  };

  useEffect(() => {
    ChatServices.getChats(token)
      .then((res) => {
        setContactList(res.data);
        setFilteredContacts(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="container-fluid contactcontainer ">
      <div className="contactheader">
        <div className="imagebox">
          <img
            src={user.pic}
            id="Avatarimage"
            onClick={props.onClick}
            alt="Avatar"
          />{" "}
          {/* Add your image here */}
        </div>
       
                <span>Add Friend</span>
              </li>
              <li onClick={() => dispatch(setFriendList(true))}>
                <a>
                  <BsPersonVcardFill className="themeBtn dropdown-item" />
                </a>
                <span>Friend List</span>
              </li>
            </ul>
          </div>
          <span id="span"></span>
          <div className="dropdown">
            <a
              className="btn btn-secondary  "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <MdEmojiPeople
                className="themeBtn btn btn-secondary"
                onClick={() => dispatch(setNotification(true))}
              />
            </a>
          </div>

          <BiMoon
            onClick={changetheme}
            className="themeBtn btn btn-secondary"
          />
        </div>
      </div>

      <div className="searchsection">
        <div className="input-group mb-3">
          <input
            type="text"
            className="inputtt"
            placeholder="Search for Contact"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <h4>Chats</h4>
      <div className="contactlist container-fluid">
        <div onClick={props.toggleChat}>
          {filteredContacts.length === 0 ? (
            <p>No records found</p>
          ) : (
            filteredContacts.map((item, key) => (
              <Contactlistbox
                id = {item._id}
                title={item.users[1].name}
                message={item.latestMessage.content}
                key={key}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
