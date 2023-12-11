import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import UserSettings from "./userSettings";
import Courses from "../courses/App";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ED7D31",
        },
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
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

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 1000,
                    minHeight: 500,
                    borderColor: "#ED7D31",
                }}
            >
                <React.Fragment>
                    <Box sx={{ flexGrow: 0 }}>
                        <UserSettings user={user.user}/>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                            textColor="#ED7D31"
                            indicatorColor="secondary"
                        >
                            <Tab label="My Notes" {...a11yProps(0)} />
                            <Tab label="Favorites" {...a11yProps(1)} />
                            <Tab label="My Courses" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CardContent>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Courses uid={user.user.uid} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            Item Three
                        </TabPanel>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}
