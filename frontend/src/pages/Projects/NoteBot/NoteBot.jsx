import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
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
              <Typography variant="h5" align="center" gutterBottom>
                NoteBot is a learnsourcing application.
              </Typography>

              {user.user.username ? (
                  <div>
                    {/*<Typography variant="h5" align="center">
                      Welcome <i>{user.user.name} </i><br/><br/>
                      --HIER ENTSTEHT EIN TEST--<br/>
                      username: <b>{user.user.username}</b><br/>
                      userId: {user.user.uid}<br/>
                      user name: {user.user.name}<br/>
                      message: {user.message}<br/>
                      --------------------------------------------
                    </Typography>*/}
                    <Navigation />
                  </div>
              ) : (
                <Typography variant="h5" align="center">
                  Message from server <i>{user.message} </i>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
