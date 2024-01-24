import React, { useState, useEffect } from "react";
import { Grid, ThemeProvider} from "@mui/material";
import { getUserInfo } from "./utils/api.js";

import Navigation from "./Navigation/navbox";

import noteBotLogo from "../../../assets/images/noteBot-logo.png";
import theme, {colors} from "./theme.js";

export default function NoteBot() {
  const [user, setUser] = useState({
    message: "Server not connected",
    user: {
      uid: "",
      name: "",
      username: "",
    },
  });

  useEffect(() => {
    let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
    async function getUserInfoFunction() {
      let response = await getUserInfo(elasUser.id);
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
      <ThemeProvider theme={theme}>
          <Grid container justifyContent="center" sx={{px: 2 }}>
                <Grid item
                  component="img"
                  src={noteBotLogo}
                  alt="NoteBot Logo"
                  xs={12}
                  sm={7}
                  md={4}
                  sx={{ width: "100%", py: 1}}
                />
                <Grid item sx={{
                  width: "100%",
                  border: 1,
                  borderRadius: 2,
                  borderColor: colors.main}}>

                  {user.user.username ? ( //If Server connected and User logged in
                      <Navigation user={user}/>
                  ) : ( //If Server not connected or User not logged in
                      <i>{user.message}</i>
                  )}
                </Grid>
          </Grid>
      </ThemeProvider>
  );
}
