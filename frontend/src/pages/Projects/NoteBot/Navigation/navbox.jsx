import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import UserSettings from "./userSettings";
import Courses from "../courses/App";
import Favorites from "../favorites/App";
import MyCourses from "../my_courses/App";
import Tooltip from "@mui/material/Tooltip";

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default function navbox({user}) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "#ED7D31",
        }}>
            <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item></Grid>
                <Grid item >
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tooltip title="Go to My Notes" enterDelay={500}>
                            <Tab label="My Notes" {...a11yProps(0)} />
                        </Tooltip>
                        <Tooltip title="Go to My Courses" enterDelay={500}>
                            <Tab label="My Courses" {...a11yProps(1)} />
                        </Tooltip>
                        <Tooltip title="Go to Favorites" enterDelay={500}>
                            <Tab label="Favorites" {...a11yProps(2)} />
                        </Tooltip>
                    </Tabs>
                </Grid>
                <Grid item>
                    <UserSettings user={user.user}/>
                </Grid>
            </Grid>
            <Grid item sx={{width: "100%"}}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Courses uid={user.user.uid} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <MyCourses uid={user.user.uid} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Favorites uid={user.user.uid}/>
                </TabPanel>
            </Grid>
        </Grid>
    );
}
