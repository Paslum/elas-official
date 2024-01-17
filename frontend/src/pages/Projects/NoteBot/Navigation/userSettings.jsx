import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

import { getUserInfo } from "../utils/api.js";
import {useEffect, useState} from "react";

export default function userSettings({user}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <IconButton onClick={handleClick} style={{ float: "right" }}>
                <SettingsIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Paper
                    elevation={3}
                    style={{ width: "300px", padding: "20px", textAlign: "center" }}
                >
                    <IconButton
                        style={{ position: "absolute", top: "10px", right: "10px" }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        {user.username}
                    </Typography>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <IconButton>
                                <Avatar style={{ width: 39, height: 39 }}>
                                    <EditIcon sx={{ color: "white" }} />
                                </Avatar>
                            </IconButton>
                        }
                    >
                        <Avatar
                            sx={{
                                bgcolor: "#4472C4",
                                width: 137,
                                height: 137,
                                margin: "auto",
                            }}
                        />
                    </Badge>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px" }}
                    >
                        Hello {user.name}!
                    </Typography>
                    <Button
                        variant="outlined"
                    >
                        Profile Settings
                    </Button>

                    {/* Material-UI Grid für Home Icon und Text */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            gap: "8px",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton aria-label="Go back to ELAS">
                            <HomeIcon />
                            <Typography variant="subtitle2" component="h2">
                                Go back to ELAS
                            </Typography>
                        </IconButton>
                    </div>
                </Paper>
            </Popover>
        </div>
    );
}
