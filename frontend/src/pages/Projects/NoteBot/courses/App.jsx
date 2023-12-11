import * as React from "react";
import Course from "./course";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function app() {
    return (
        <div>
            <Box sx={{ flexGrow: 0 }}>
                <Button
                    variant="contained"
                    style={{ float: "right", backgroundColor: "#ED7D31" }}
                >
                    + Add Note
                </Button>
                <Button
                    variant="outlined"
                    style={{
                        float: "right",
                        color: "#ED7D31",
                        borderColor: "#ED7D31",
                        marginRight: 16,
                    }}
                >
                    Recently Deleted
                </Button>
                <Typography
                    variant="subtitle1"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        color: "Black",
                        fontSize: 28,
                        paddingBottom: 1,
                    }}
                >
                    My Notes
                </Typography>
            </Box>
            <Divider />
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
                <Grid container item>
                    <Course />
                </Grid>
            </Grid>
        </div>
    );
}
