import React, {useEffect, useState} from "react";
import {Divider, Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextFieldsIcon from "@mui/icons-material/TextFields.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf.js";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary.js";
import {LayoutSelector} from "../LayoutSelector.jsx";

export default function Section () {
    const [isLayoutSelectorVisible, setLayoutSelectorVisible] = React.useState(true);

    const [selectedLayout, setSelectedLayout] = React.useState(null);
    const handleLayoutSelect = (columns) => {
        setSelectedLayout(columns);
    };

    const [textFieldContent, setTextFieldContent] = React.useState(""); // Hinzugefügt

    const handleTextIconClick = () => {
        // Fügen Sie hier die Aktion für das Text-Icon hinzu
        console.log("Text Icon clicked");
        setTextFieldContent("");
    };
    return (<div>
        {isLayoutSelectorVisible ? (
            <React.Fragment>
                <Divider />
                {selectedLayout ? (
                    <Grid container sx={{
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#ED7D31',
                        padding: 2,
                        marginTop: 2,
                    }}>
                        {selectedLayout.map((column, index) => (
                            <Grid item container xs={column} key={index} justifyContent="center" alignItems="center"
                                  sx={{
                                      height: 250,
                                      border: "dashed 2px",
                                      borderRadius: 2,
                                      borderColor: '#A5A5A5',
                                  }}>
                                {textFieldContent ? (
                                    <TextField
                                        multiline
                                        fullWidth
                                        value={textFieldContent}
                                        onChange={(e) => setTextFieldContent(e.target.value)}
                                    />
                                ) : (
                                    <Grid item>
                                        <Typography variant="h6">Choose a Widget</Typography>
                                        <Button onClick={handleTextIconClick}>
                                            <TextFieldsIcon style={{ color: "Blue" }}/>
                                        </Button>
                                        <Button disabled="true">
                                            <PictureAsPdfIcon/>
                                        </Button>
                                        <Button disabled="true">
                                            <VideoLibraryIcon/>
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <LayoutSelector onLayoutSelect={handleLayoutSelect} />
                )}
                <Divider />
            </React.Fragment>
        ) : (
            <LayoutSelector onLayoutSelect={handleLayoutSelect} />
        )}
    </div>)
};