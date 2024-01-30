import React from "react";
import IconButton from "@mui/material/IconButton";
import Section from "./section.jsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';

export default function Sections ({counter, addSection, addLayout, addWidget, setWidgetContent, initialNote}) {
    const handleShowLayoutSelector = () => {
        addSection();
    };
    return (<div>
        <Grid item container direction="column">
            <Grid item>
                {Array(counter).fill().map((_, index) => (
                            <Section
                                index={index}
                                addLayout={addLayout}
                                addWidget={addWidget}
                                setWidgetContent={setWidgetContent}
                                initialSection={initialNote.section[index]}
                            />
                ))}
            </Grid>
            <Grid item sx={{margin: 'auto'}}>
                <IconButton aria-label="add section" onClick={handleShowLayoutSelector} size="large">
                    <AddCircleIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    </div>)
};