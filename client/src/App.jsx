
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import Chatcontent from './component/Chatcontent/Chatcontent';
import Contactlist from './component/Contactlist/Contactlist';
import Login from './component/CredComponents/Login';
import Profile from './component/Profile/Profile';
import { useState, useEffect } from 'react';
import { logoutUser } from "./component/Redux/userSlice";
import Addbox from './component/contactAddBox/Addbox';
import FriendList from './component/FriendList/FriendList';
import Notification from './component/Notification/Notification';
function App() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showChat, setShowChat] = useState(true);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  // const userList = useSelector((state) => state.conditionalRendering.addUserList);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  const theme=useSelector((state)=>state.theme.themeMode);
  console.log(theme)

  const addContactbox=useSelector((state)=>state.user.addContactBox);
  const friendList=useSelector((state)=>state.conditional.friendList);
  const notification=useSelector((state)=>state.conditional.notification);
  // console.log(addContactbox)
  const toggleComponent = () => {
    setShowFirstComponent(!showFirstComponent);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // useEffect(()=>{

  // },[theme])
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Conditional rendering based on the loggedIn state
  return (
    <>
      <div className={`app-container ${theme}`} >
        {loggedIn ? ( // If loggedIn is true, render the main content
          <>
            {screenWidth < 901 ? (
              showFirstComponent ? (
                showChat ? (
                  <Contactlist onClick={toggleComponent} toggleChat={toggleChat} />
                ) : (
                  <Chatcontent toggleChat={toggleChat} />
                )
              ) : (
                <Profile onClick={toggleComponent} />
              )
            ) : (
              <>
                {showFirstComponent ? (
                  <Contactlist onClick={toggleComponent} />
                ) : (
                  <Profile onClick={toggleComponent} />
                )}
                <Chatcontent />
              </>
            )}
          </>
        ) : ( // If loggedIn is false, render the login page or any other login-related component
          // You can replace this with your actual login component
          <>
            {/* <h1>Login Page</h1> */}
            <Login />
            {/* <button onClick={() => setLoggedIn(true)}>Log In</button> */}
          </>
        )}
        {addContactbox ? <Addbox/>: ''}
        {friendList ? <FriendList/>: ''}
        {notification ? <Notification/>:''}
        
      </div>
    </>
  );
}

export default App;
