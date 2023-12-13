import * as React from "react";
import Course from "./course";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function app({uid}) {
    return (
        <div>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
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
                </Grid>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                style={{
                                        color: "#ED7D31",
                                        borderColor: "#ED7D31",
                                    }}
                            >
                                Recently Deleted
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#ED7D31" }}
                            >
                                + Add Note
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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
