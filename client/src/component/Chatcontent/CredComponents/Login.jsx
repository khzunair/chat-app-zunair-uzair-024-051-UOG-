import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserServices from "../../api/services/UserServices"
import { Alert, AlertTitle, Backdrop, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://convopanda.com/">
        Covo Panda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [signUp, setSignUp] = React.useState(false);

  const [errorsInService, setErrorsInService] = React.useState([]);
  const [ifExists, setIfExists] = React.useState(false);
  const [openDropBox, setOpenDropBox] = React.useState(false);
  const dispatch = useDispatch();
  // heidiud

  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  const signUpUser =  (data) => {
    setOpenDropBox(true)
     UserServices.registerUser(data)
      .then((res)=>{
        console.log(res.data)
        setOpenDropBox(true)
        dispatch(setUser(res.data));

      })
      .catch((err)=>{
        console.log(err)
        setIfExists(true);
        setErrorsInService(err.response.data.message);
        setOpenDropBox(false)
      })
  }

  const signInUser =  (data) => {
    setOpenDropBox(true)
     UserServices.signInUser(data)
      .then((res)=>{
        console.log(res.data)
        setOpenDropBox(true)
        dispatch(setUser(res.data));

      })
      .catch((err)=>{
        console.log(err)
        // console.log(err.response.data.errors[0].msg);
        setIfExists(true);
        setErrorsInService(err.response.data.message);
        setOpenDropBox(false)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(signUp){
    const fields = JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      });
     console.log(fields)
     signUpUser(fields)

    }else {
    const fields = JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      });
     console.log(fields)
     signInUser(fields)
    }

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openDropBox}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            {signUp ? (
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
                 {ifExists && (
                <div key={errorsInService}>
                  <Alert severity="error">
                    <AlertTitle>{errorsInService}</AlertTitle>
                  </Alert>
                </div>
              )}

              {signUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email" 
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {signUp ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={openDropBox}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={openDropBox}
                >
                  Sign In
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Button href="#" variant="body2">
                    Forgot password?
                  </Button>
                </Grid>
                {signUp ? (
              <Grid item>
              <Button onClick={handleSignUp} variant="body2">
                {"Already have an account? Sign In"}
              </Button>
              </Grid>
            ) : (
              <Grid item>
                  <Button onClick={handleSignUp} href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Button>
                  </Grid>
            )}
          
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
