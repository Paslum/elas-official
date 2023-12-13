import React, { useState, useEffect } from "react";
import { Grid, Typography} from "@mui/material";
import { getUserInfo } from "./utils/api.js";

import Navigation from "./Navigation/navbox";

import noteBotLogo from "../../../assets/images/noteBot-logo.png";

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
    async function getUserInfoFunction(userId) {
      let reponse = await getUserInfo(userId);
      setUser((prevState) => ({
        ...prevState,
        message: reponse.message,
        user: {
          uid: reponse.user.uid,
          name: reponse.user.name,
          username: reponse.user.username,
        },
      }));
    }
    getUserInfoFunction(elasUser.id);
  }, []);

  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent={"center"}>
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={12}
              sm={7}
              md={4}
              sx={{ width: "100%", pb: 2 }}
            />
          </Grid>
          <Grid container sx={{ width: "100%" }} spacing={2}>
            <Grid item xs>

              {user.user.username ? ( //If Server connected and User logged in
                  <div>
                    <Navigation user={user}/>
                  </div>
              ) : ( //If Server not connected or User not logged in
                <Typography variant="h5" align="center">
                  <i>{user.message}</i>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
