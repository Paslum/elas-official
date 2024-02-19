import React from "react";
import IconButton from "@mui/material/IconButton";
import Section from "./section.jsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';

// Sections component responsible for rendering multiple sections
export default function Sections({counter, addSection, addLayout, addWidget, setWidgetContent, initialNote}) {
    // Function to add a new section
    const handleShowLayoutSelector = () => {
        addSection();
    };

    return (
        <div>
            {/* Container for rendering multiple sections */}
            <Grid item container direction="column">
                <Grid item>
                    {/* Map through sections and render Section components */}
                    {Array(counter).fill().map((_, index) => (
                        <Section
                            key={index}
                            index={index}
                            addLayout={addLayout}
                            addWidget={addWidget}
                            setWidgetContent={setWidgetContent}
                            initialSection={initialNote.section[index]}
                        />
                    ))}
                </Grid>
                <Grid item sx={{margin: 'auto'}}>
                    {/* Button to add a new section */}
                    <IconButton aria-label="add section" onClick={handleShowLayoutSelector} size="large">
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}
