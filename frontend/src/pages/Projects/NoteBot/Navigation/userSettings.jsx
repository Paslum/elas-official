import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

// UserSettings component responsible for rendering user profile settings popover
export default function UserSettings({ user }) {
    // State for managing the anchor element of the popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Function to handle click event and open the popover
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle close event and close the popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Boolean variable to check if the popover is open
    const open = Boolean(anchorEl);
    // Unique identifier for the popover
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            {/* Tooltip for the IconButton */}
            <Tooltip title="Profile settings" enterDelay={500}>
                {/* IconButton to open the popover */}
                <IconButton onClick={handleClick} style={{ float: "right" }}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            {/* Popover component for user settings */}
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
                {/* Paper component to contain user settings */}
                <Paper
                    elevation={3}
                    style={{ width: "300px", padding: "20px", textAlign: "center" }}
                >
                    {/* IconButton to close the popover */}
                    <IconButton
                        style={{ position: "absolute", top: "10px", right: "10px" }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    {/* Displaying the username */}
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        {user.username}
                    </Typography>
                    {/* Badge to edit avatar */}
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
                        {/* Avatar component */}
                        <Avatar
                            sx={{
                                bgcolor: "#4472C4",
                                width: 137,
                                height: 137,
                                margin: "auto",
                            }}
                        />
                    </Badge>
                    {/* Greeting message */}
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px" }}
                    >
                        Hello {user.name}!
                    </Typography>
                    {/* Button for profile settings */}
                    <Button
                        variant="outlined" disabled="true"
                    >
                        Profile Settings
                    </Button>
                </Paper>
            </Popover>
        </div>
    );
}