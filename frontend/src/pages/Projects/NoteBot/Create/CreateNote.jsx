import React, { useState, useEffect } from "react";
import { Grid, Typography} from "@mui/material";


import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

export default function CreateNote() {
  

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

             
                <Typography variant="h5" align="center">
                  CreateNote
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
