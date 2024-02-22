import React, { useState, useEffect } from "react";
import { Grid, ThemeProvider} from "@mui/material";
import { getUserInfo } from "./utils/api.js";
import Navigation from "./Navigation/navbox";
import noteBotLogo from "../../../assets/images/noteBot-logo.png";
import theme, {colors} from "./theme.js";

export default function NoteBot() {
  // State for user data
  const [user, setUser] = useState({
      message: "Server not connected", // Default message if server is not connected
      user: {
          uid: "",
          name: "",
          username: "",
      },
  });

  // Fetch user information when component mounts
  useEffect(() => {
      // Retrieving user data from session storage
      let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
      async function getUserInfoFunction() {
          // Fetch user info from the server
          let response = await getUserInfo(elasUser.id);
          // Update user state with fetched user data
          setUser((prevState) => ({
              ...prevState,
              message: response.message,
              user: {
                  uid: response.user.uid,
                  name: response.user.name,
                  username: response.user.username,
              },
          }));
      }
      getUserInfoFunction();
  }, []);

  return (
      // Providing the theme for the NoteBot interface
      <ThemeProvider theme={theme}>
          {/* Container for NoteBot interface */}
          <Grid container justifyContent="center" sx={{ px: 2 }}>
              {/* Container for NoteBot logo */}
              <Grid item
                  component="img"
                  src={noteBotLogo}
                  alt="NoteBot Logo"
                  xs={12}
                  sm={7}
                  md={4}
                  sx={{ width: "100%", py: 1 }}
              />
              {/* Container for user interface */}
              <Grid item sx={{
                  width: "100%",
                  border: 1,
                  borderRadius: 2,
                  borderColor: colors.main}}>
                  {/* Conditional rendering based on user login status */}
                  {user.user.username ? ( // If server connected and user logged in
                      <Navigation user={user} /> // Render Navigation component
                  ) : ( // If server not connected or user not logged in
                      <i>{user.message}</i> // Render error message
                  )}
              </Grid>
          </Grid>
      </ThemeProvider>
  );
}