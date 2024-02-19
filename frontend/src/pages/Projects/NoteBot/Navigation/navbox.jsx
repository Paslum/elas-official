import * as React from "react";
import {Grid, Typography, Tabs, Tab, Tooltip} from "@mui/material";
import PropTypes from "prop-types";
import UserSettings from "./userSettings";
import Courses from "../courses/App";
import Favorites from "../favorites/App";
import MyCourses from "../my_courses/App";

// Component for rendering individual tab panels
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container>
                    <Grid item xs={12} sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

// Prop types for TabPanel component
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// Function to generate accessibility properties for tabs
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

// Navigation box component containing tabs and corresponding content
export default function NavBox({ user }) {
    // State for managing the current tab value
    const [value, setValue] = React.useState(0);

    // Function to handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            {/* Container for navigation elements */}
            <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item></Grid>
                {/* Tabs for navigation */}
                <Grid item >
                    <Tabs value={value} onChange={handleChange} centered>
                        {/* Tab for My Notes */}
                        <Tooltip title={value === 0 ? "You are currently here" : ("Go to My Notes")} enterDelay={500}>
                            <Tab label="My Notes" {...a11yProps(0)} />
                        </Tooltip>
                        {/* Tab for My Courses */}
                        <Tooltip title={value === 1 ? "You are currently here" : ("Go to My Courses")} enterDelay={500}>
                            <Tab label="My Courses" {...a11yProps(1)} />
                        </Tooltip>
                        {/* Tab for Favorites */}
                        <Tooltip title={value === 2 ? "You are currently here" : ("Go to Favorites")} enterDelay={500}>
                            <Tab label="Favorites" {...a11yProps(2)} />
                        </Tooltip>
                    </Tabs>
                </Grid>
                {/* Component for user settings */}
                <Grid item>
                    <UserSettings user={user.user}/>
                </Grid>
            </Grid>
            {/* Container for tab content */}
            <Grid item xs={12}>
                {/* Panel for My Notes */}
                <TabPanel value={value} index={0}>
                    <Courses uid={user.user.uid} />
                </TabPanel>
                {/* Panel for My Courses */}
                <TabPanel value={value} index={1}>
                    <MyCourses uid={user.user.uid} />
                </TabPanel>
                {/* Panel for Favorites */}
                <TabPanel value={value} index={2}>
                    <Favorites uid={user.user.uid}/>
                </TabPanel>
            </Grid>
        </Grid>
    );
}
