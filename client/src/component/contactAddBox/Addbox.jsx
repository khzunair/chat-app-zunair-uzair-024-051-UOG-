import { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import "./addBox.css";
import { useDispatch } from "react-redux";
import { setUser, setcontactBox } from "../Redux/userSlice";
import ConnectServices from "../../api/services/ConnectServices";

import { useSelector } from "react-redux";

// react hook form
import { useForm } from "react-hook-form";
import { Avatar, Box, Typography,Button } from "@mui/material";


import Snackbar from '@mui/material/Snackbar';

export default function Addbox() {
  const [search, setSearch] = useState([]);
  const [error, setError] = useState("");
  const [success , setSuccess] = useState("");
  const userID = useSelector((state) => state.user.user.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      alert("Key is pressed");
    }
  };

  const [snackTest, setSnackTest] = useState("")

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  const handleClose = () => {
    setState({ ...state, open: false });
  };


  return (
    <div className="addContactBox">
      <div className="addBox container-fluid">
        <div className="addheader">
          <div className="addTitle">
            <IoPersonAdd id="addBtn" />
            <h5>Add Friend </h5>
          </div>
          <div className="addBtn">
            <AiFillCloseCircle onClick={() => dispatch(setcontactBox(false))} />
          </div>
        </div>
        <div className="container-fluid addContainer">
          <div className="addinnerContainer">
            <label>Search:</label>
            <input
              name="email"
              type="email"
              placeholder="Search by Username or Email"
              className="footerChat"
              onKeyPress={handlekeypress}
              onChange={handleChange}
              {...register("formData", {
                required: "Please enter valid Email Address",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "*Please enter valid Email Address",
                },
              })}
            />
            {errors.formData && (
              <span
                style={{
                  color: "red",
                  fontSize: "small",
                  textAlign: "center",
                }}
                role="alert"
              >
                {errors.formData.message}
              </span>
            )}
          </div>
          <div className="addinnerContainerBtn">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(async (formData) => {
                console.log(formData);
                console.log(userID);
                const email = formData.formData;
                const data = { email, userID };
                console.log(data);
                ConnectServices.searchUser(data)
                  .then((response) => {
                    console.log(response.data);
                    setError(null);
                    setSuccess("")
                    setSearch(response.data);
                  })
                  .catch((err) => {
                    console.log(err.response.data.msg);
                    setError(err.response.data.msg);
                    setSuccess("")
                    setSearch([]);
                  });
              })}
            >
              Search
            </button>
           
          </div>
          <div className="addResult">
            <h5>Result:</h5>
            {search && search.name && (
              <div className="contactlist-box contactbox resultbox">
                <div className="Resultimgbox">
                  <Avatar
                    src={search.avatar}
                    alt={search.name}
                    id="Resultimage"
                  />
                </div>
                <div className="resultDetail">
                  <Typography variant="h5" id="">{search.name} </Typography>
                  <Button variant="contained"
                  onClick={()=>handleRequestSend(search._id)}
                  >Add User</Button>
                </div>
              </div>
            )}
            {errors && <Typography variant="h5">{error}</Typography>} 
            {success && <Typography variant="h5">{success}</Typography>}
          </div>
        </div>

      </div>
    </div>
  );
}
